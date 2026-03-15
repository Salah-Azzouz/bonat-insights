import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getFinancialData } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ExpenseAnalysis from '../components/financial/ExpenseAnalysis';
import RevenueAnalysis from '../components/financial/RevenueAnalysis';
import FinancialReports from '../components/financial/FinancialReports';
import VarianceReports from '../components/financial/VarianceReports';

const PRODUCT_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function Financial() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [comparisonType, setComparisonType] = useState('quarter');
  const [selectedQuarter1, setSelectedQuarter1] = useState('Q1 2025');
  const [selectedQuarter2, setSelectedQuarter2] = useState('Q1 2026');
  const [selectedMonth1, setSelectedMonth1] = useState('Feb 2025');
  const [selectedMonth2, setSelectedMonth2] = useState('Feb 2026');
  const { dateRange } = useDateRange();
  const chartRef = React.useRef(null);

  useEffect(() => {
    const init = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getFinancialData(dateRange);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange]);

  if (loading || !user) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  // Hide financial details for managers
  const showDetails = user.role === 'admin';

  const handleKPIClick = (kpiKey, kpiData, title, prefix = '', suffix = '') => {
    if (!kpiData.sparkline) return;
    // Extend sparkline to 12 months by interpolating missing data
    const baseSparkline = kpiData.sparkline;
    const extendedData = [];
    
    // Generate 12 months of data
    for (let i = 0; i < 12; i++) {
      const sourceIndex = Math.min(Math.floor((i / 12) * baseSparkline.length), baseSparkline.length - 1);
      extendedData.push(baseSparkline[sourceIndex] * (1 + (i * 0.01))); // Small growth trend
    }
    
    const trend = extendedData.map((value, index) => ({
      month: ['Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26'][index],
      value: value
    }));
    setSelectedKPI({ key: kpiKey, data: { ...kpiData, trend }, title, prefix, suffix });
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const getTrendData = () => {
    if (!selectedKPI || !selectedKPI.data.trend) return [];
    return selectedKPI.data.trend;
  };

  const getQuarterData = (quarter, trend) => {
    const quarterMap = {
      'Q1 2025': trend.slice(0, 3),
      'Q2 2025': trend.slice(3, 6),
      'Q3 2025': trend.slice(6, 9),
      'Q4 2025': trend.slice(9, 12),
      'Q1 2026': [trend[10], trend[11], { month: 'Mar 26', value: trend[11].value * 1.02 }],
    };
    const data = quarterMap[quarter] || [];
    return data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.value, 0) / data.length) : 0;
  };

  const getMonthData = (month, trend) => {
    const monthMap = {
      'Mar 25': trend[0]?.value || 0,
      'Apr 25': trend[1]?.value || 0,
      'May 25': trend[2]?.value || 0,
      'Jun 25': trend[3]?.value || 0,
      'Jul 25': trend[4]?.value || 0,
      'Aug 25': trend[5]?.value || 0,
      'Sep 25': trend[6]?.value || 0,
      'Oct 25': trend[7]?.value || 0,
      'Nov 25': trend[8]?.value || 0,
      'Dec 25': trend[9]?.value || 0,
      'Jan 26': trend[10]?.value || 0,
      'Feb 26': trend[11]?.value || 0,
    };
    return Math.round(monthMap[month] || 0);
  };

  const getComparisonData = () => {
    if (!selectedKPI || !selectedKPI.data.trend) return [];
    
    const trend = selectedKPI.data.trend;
    
    if (comparisonType === 'quarter') {
      return [
        { period: selectedQuarter1, value: getQuarterData(selectedQuarter1, trend) },
        { period: selectedQuarter2, value: getQuarterData(selectedQuarter2, trend) }
      ];
    } else {
      return [
        { period: selectedMonth1, value: getMonthData(selectedMonth1, trend) },
        { period: selectedMonth2, value: getMonthData(selectedMonth2, trend) }
      ];
    }
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-[#1B2A4A] border border-white/10">
        <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
        <TabsTrigger value="revenue" className="data-[state=active]:bg-white/10">Revenue Analysis</TabsTrigger>
        <TabsTrigger value="expenses" className="data-[state=active]:bg-white/10">Expense Analysis</TabsTrigger>
        <TabsTrigger value="reports" className="data-[state=active]:bg-white/10">Financial Reports</TabsTrigger>
        <TabsTrigger value="variance" className="data-[state=active]:bg-white/10">Variance Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* Revenue Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div onClick={() => handleKPIClick('gross', data.revenue.gross, 'Total Revenue', 'SAR')} className="cursor-pointer">
          <KPICard title="Total Revenue" value={data.revenue.gross.value} prefix="SAR" change={data.revenue.gross.change} sparkline={data.revenue.gross.sparkline} />
        </div>
        <div onClick={() => handleKPIClick('arpm', data.revenue.arpm, 'ARPA', 'SAR')} className="cursor-pointer">
          <KPICard title="ARPA" value={data.revenue.arpm.value} prefix="SAR" change={data.revenue.arpm.change} sparkline={data.revenue.arpm.sparkline} />
        </div>
        <div onClick={() => handleKPIClick('gmv', data.revenue.gmv, 'Bonat App GMV', 'SAR')} className="cursor-pointer">
          <KPICard title="Bonat App GMV" value={data.revenue.gmv.value} prefix="SAR" change={data.revenue.gmv.change} sparkline={data.revenue.gmv.sparkline} />
        </div>
        <div onClick={() => handleKPIClick('grossMargin', data.revenue.grossMargin, 'Gross Margin', '', '%')} className="cursor-pointer">
          <KPICard title="Gross Margin" value={data.revenue.grossMargin.value} suffix="%" change={data.revenue.grossMargin.change} sparkline={data.revenue.grossMargin.sparkline} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        <div onClick={() => handleKPIClick('cashOnHand', data.revenue.cashOnHand, 'Cash on Hand', 'SAR')} className="cursor-pointer">
          <KPICard title="Cash on Hand" value={data.revenue.cashOnHand.value} prefix="SAR" change={data.revenue.cashOnHand.change} sparkline={data.revenue.cashOnHand.sparkline} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div onClick={() => handleKPIClick('netMargin', data.revenue.netMargin, 'Net Margin', '', '%')} className="cursor-pointer">
          <KPICard title="Net Margin" value={data.revenue.netMargin.value} suffix="%" change={data.revenue.netMargin.change} sparkline={data.revenue.netMargin.sparkline} />
        </div>
        {showDetails && (
          <>
            <div onClick={() => handleKPIClick('clv', data.revenue.clv, 'CLV', 'SAR')} className="cursor-pointer">
              <KPICard title="CLV" value={data.revenue.clv.value} prefix="SAR" change={data.revenue.clv.change} sparkline={data.revenue.clv.sparkline} />
            </div>
            <div onClick={() => handleKPIClick('clvCacRatio', data.revenue.clvCacRatio, 'CLV:CAC Ratio')} className="cursor-pointer">
              <KPICard title="CLV:CAC Ratio" value={data.revenue.clvCacRatio.value} change={data.revenue.clvCacRatio.change} sparkline={data.revenue.clvCacRatio.sparkline} />
            </div>
          </>
        )}
      </div>

      {showDetails && (
        <div className="grid grid-cols-3 gap-6">
          <div onClick={() => handleKPIClick('monthlyBurnRate', data.revenue.monthlyBurnRate, 'Monthly Burn Rate', 'SAR')} className="cursor-pointer">
            <KPICard title="Monthly Burn Rate" value={data.revenue.monthlyBurnRate.value} prefix="SAR" change={data.revenue.monthlyBurnRate.change} sparkline={data.revenue.monthlyBurnRate.sparkline} />
          </div>
          <div onClick={() => handleKPIClick('costOfRevenue', data.revenue.costOfRevenue, 'Cost of Revenue', 'SAR')} className="cursor-pointer">
            <KPICard title="Cost of Revenue" value={data.revenue.costOfRevenue.value} prefix="SAR" change={data.revenue.costOfRevenue.change} sparkline={data.revenue.costOfRevenue.sparkline} />
          </div>
          <div onClick={() => handleKPIClick('grossProfit', data.revenue.grossProfit, 'Gross Profit', 'SAR')} className="cursor-pointer">
            <KPICard title="Gross Profit" value={data.revenue.grossProfit.value} prefix="SAR" change={data.revenue.grossProfit.change} sparkline={data.revenue.grossProfit.sparkline} />
          </div>
        </div>
      )}

      {/* Dynamic Charts */}
      {selectedKPI && (
        <div ref={chartRef} className="grid grid-cols-2 gap-6">
          {/* Trend Chart */}
          <ChartCard 
            title={`${selectedKPI.title} - Trend`}
            action={
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedKPI(null)}
                className="text-white/60 hover:text-white hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </Button>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getTrendData()}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1B2A4A', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => [
                      `${selectedKPI.prefix || ''}${value.toLocaleString()}${selectedKPI.suffix || ''}`,
                      selectedKPI.title
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Comparison Chart */}
          <ChartCard 
            title={`${selectedKPI.title} - Year over Year`}
            action={
              <div className="flex items-center gap-2">
                <Select value={comparisonType} onValueChange={setComparisonType}>
                  <SelectTrigger className="w-44 bg-white/5 border-white/10 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarter">Quarter to Quarter</SelectItem>
                    <SelectItem value="month">Month to Month</SelectItem>
                  </SelectContent>
                </Select>
                
                {comparisonType === 'quarter' ? (
                  <>
                    <Select value={selectedQuarter1} onValueChange={setSelectedQuarter1}>
                      <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                        <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                        <SelectItem value="Q3 2025">Q3 2025</SelectItem>
                        <SelectItem value="Q4 2025">Q4 2025</SelectItem>
                        <SelectItem value="Q1 2026">Q1 2026</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-white/60 text-sm">vs</span>
                    <Select value={selectedQuarter2} onValueChange={setSelectedQuarter2}>
                      <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Q1 2025">Q1 2025</SelectItem>
                        <SelectItem value="Q2 2025">Q2 2025</SelectItem>
                        <SelectItem value="Q3 2025">Q3 2025</SelectItem>
                        <SelectItem value="Q4 2025">Q4 2025</SelectItem>
                        <SelectItem value="Q1 2026">Q1 2026</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <>
                    <Select value={selectedMonth1} onValueChange={setSelectedMonth1}>
                      <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mar 25">Mar 25</SelectItem>
                        <SelectItem value="Apr 25">Apr 25</SelectItem>
                        <SelectItem value="May 25">May 25</SelectItem>
                        <SelectItem value="Jun 25">Jun 25</SelectItem>
                        <SelectItem value="Jul 25">Jul 25</SelectItem>
                        <SelectItem value="Aug 25">Aug 25</SelectItem>
                        <SelectItem value="Sep 25">Sep 25</SelectItem>
                        <SelectItem value="Oct 25">Oct 25</SelectItem>
                        <SelectItem value="Nov 25">Nov 25</SelectItem>
                        <SelectItem value="Dec 25">Dec 25</SelectItem>
                        <SelectItem value="Jan 26">Jan 26</SelectItem>
                        <SelectItem value="Feb 26">Feb 26</SelectItem>
                      </SelectContent>
                    </Select>
                    <span className="text-white/60 text-sm">vs</span>
                    <Select value={selectedMonth2} onValueChange={setSelectedMonth2}>
                      <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mar 25">Mar 25</SelectItem>
                        <SelectItem value="Apr 25">Apr 25</SelectItem>
                        <SelectItem value="May 25">May 25</SelectItem>
                        <SelectItem value="Jun 25">Jun 25</SelectItem>
                        <SelectItem value="Jul 25">Jul 25</SelectItem>
                        <SelectItem value="Aug 25">Aug 25</SelectItem>
                        <SelectItem value="Sep 25">Sep 25</SelectItem>
                        <SelectItem value="Oct 25">Oct 25</SelectItem>
                        <SelectItem value="Nov 25">Nov 25</SelectItem>
                        <SelectItem value="Dec 25">Dec 25</SelectItem>
                        <SelectItem value="Jan 26">Jan 26</SelectItem>
                        <SelectItem value="Feb 26">Feb 26</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                )}
              </div>
            }
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getComparisonData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="period" 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1B2A4A', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => [
                      `${selectedKPI.prefix || ''}${value.toLocaleString()}${selectedKPI.suffix || ''}`,
                      selectedKPI.title
                    ]}
                  />
                  <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      )}



      {showDetails && (
        <>
          {/* AR Aging */}
          <ChartCard title="Accounts Receivable Aging">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/70">Age Bucket</TableHead>
                  <TableHead className="text-white/70 text-right">Amount</TableHead>
                  <TableHead className="text-white/70 text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.arAging.map((row, idx) => (
                  <TableRow key={idx} className="border-white/10">
                    <TableCell className="font-medium text-white">{row.bucket}</TableCell>
                    <TableCell className="text-right text-white/70">SAR {row.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-white/70">{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ChartCard>
        </>
      )}
      </TabsContent>

      <TabsContent value="revenue">
        <RevenueAnalysis 
          revenueData={data.revenue} 
          revenueByProduct={data.revenueByProduct} 
          revenueTrend={data.revenueTrend}
        />
      </TabsContent>

      <TabsContent value="expenses">
        <ExpenseAnalysis operatingExpenses={data.operatingExpenses} />
      </TabsContent>

      <TabsContent value="reports">
        <FinancialReports />
      </TabsContent>

      <TabsContent value="variance">
        <VarianceReports />
      </TabsContent>
    </Tabs>
  );
}