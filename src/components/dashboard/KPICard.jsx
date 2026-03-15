import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function KPICard({ title, value, change, suffix = '', prefix = '', sparkline = [] }) {
  const isPositive = change >= 0;
  const isMonetary = prefix === 'SAR';

  const formatValue = (val) => {
    if (suffix === '%' || suffix === ' months') {
      return val.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    }
    
    // Format large numbers with K/M notation
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'K';
    }
    
    return val.toLocaleString('en-US');
  };

  return (
    <Card className="bg-[#1B2A4A] border-white/10 hover:border-white/20 transition-all">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4 gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/60 font-medium uppercase tracking-wide mb-2">
              {title}
            </p>
            <p className="text-2xl font-bold text-white flex items-baseline flex-wrap overflow-hidden">
              {prefix && <span className="text-lg text-white/60 mr-1">{prefix}</span>}
              <span>{formatValue(value)}</span>
              {suffix && <span className="text-lg text-white/60 ml-1">{suffix}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-semibold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className="text-xs text-white/50">vs last period</span>
        </div>
      </CardContent>
    </Card>
  );
}