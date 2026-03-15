import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const SUGGESTED_QUESTIONS = [
  'What is our current MRR?',
  'Which merchants are at risk?',
  'Show me sales performance by rep',
  'What is our NPS score?',
  'How many active merchants do we have?',
  'What are the top feedback themes?',
];

const MOCK_RESPONSES = {
  'What is our current MRR?': {
    text: 'Your current **Monthly Recurring Revenue (MRR)** is **SAR 298,500**, up **8.3%** from last month.',
    highlight: { label: 'MRR', value: 'SAR 298,500' },
  },
  'Which merchants are at risk?': {
    text: 'There are currently **4 merchants** classified as at-risk based on health scores below 40.',
    table: [
      { merchant: 'مجموعة الراشد التجارية', score: 32, mrr: 'SAR 8,500' },
      { merchant: 'شركة النخبة للتجزئة', score: 28, mrr: 'SAR 6,200' },
      { merchant: 'متاجر الأمل', score: 35, mrr: 'SAR 4,800' },
      { merchant: 'مؤسسة الابتكار', score: 38, mrr: 'SAR 7,100' },
    ],
  },
  default: {
    text: 'I can help you analyze your business metrics. Try asking about MRR, active merchants, sales performance, or at-risk merchants.',
  },
};

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI business intelligence assistant. I can help you analyze your data and answer questions about your business metrics. What would you like to know?',
    },
  ]);
  const [input, setInput] = useState('');
  const [recentQueries, setRecentQueries] = useState([]);

  const handleSend = (question) => {
    const userMessage = question || input;
    if (!userMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Add to recent queries
    if (!recentQueries.includes(userMessage)) {
      setRecentQueries(prev => [userMessage, ...prev].slice(0, 5));
    }

    // Simulate AI response
    setTimeout(() => {
      const response = MOCK_RESPONSES[userMessage] || MOCK_RESPONSES.default;
      setMessages(prev => [...prev, { role: 'assistant', content: response.text, data: response }]);
    }, 500);

    setInput('');
  };

  return (
    <div className="grid grid-cols-4 gap-6 h-[calc(100vh-180px)]">
      {/* Sidebar */}
      <div className="col-span-1 space-y-4">
        <Card className="bg-[#1B2A4A] border-white/10">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Suggested Questions
            </h3>
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(question)}
                  className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {recentQueries.length > 0 && (
          <Card className="bg-[#1B2A4A] border-white/10">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Recent Queries</h3>
              <div className="space-y-2">
                {recentQueries.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(query)}
                    className="w-full text-left px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all truncate"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Chat Area */}
      <div className="col-span-3 flex flex-col">
        <Card className="bg-[#1B2A4A] border-white/10 flex-1 flex flex-col">
          <CardContent className="p-6 flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-2xl rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-white text-[#1B2A4A]'
                        : 'bg-white/5 text-white border border-white/10'
                    }`}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                    
                    {/* Highlight Box */}
                    {message.data?.highlight && (
                      <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <p className="text-xs text-green-400 mb-1">{message.data.highlight.label}</p>
                        <p className="text-2xl font-bold text-green-400">{message.data.highlight.value}</p>
                      </div>
                    )}
                    
                    {/* Table */}
                    {message.data?.table && (
                      <div className="mt-3 overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="text-left py-2 text-white/60">Merchant</th>
                              <th className="text-right py-2 text-white/60">Health Score</th>
                              <th className="text-right py-2 text-white/60">MRR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {message.data.table.map((row, i) => (
                              <tr key={i} className="border-b border-white/5">
                                <td className="py-2">{row.merchant}</td>
                                <td className="text-right">
                                  <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/50">
                                    {row.score}
                                  </Badge>
                                </td>
                                <td className="text-right text-white/70">{row.mrr}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mb-4 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-xs text-amber-400">
                <strong>Note:</strong> AI responses are based on company data. Please verify critical decisions with the actual dashboards.
              </p>
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about your business metrics..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40"
              />
              <Button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}