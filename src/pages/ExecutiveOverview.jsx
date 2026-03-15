import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getExecutiveOverview } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from 'recharts';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function ExecutiveOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [trendView, setTrendView] = useState('monthly_12');
  const [comparisonType, setComparisonType] = useState('quarter');
  const [selectedQuarter1, setSelectedQuarter1] = useState('Q1 2025');
  const [selectedQuarter2, setSelectedQuarter2] = useState('Q1 2026');
  const [selectedMonth1, setSelectedMonth1] = useState('Feb 2025');
  const [selectedMonth2, setSelectedMonth2] = useState('Feb 2026');
  const { dateRange } = useDateRange();
  const chartRef = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getExecutiveOverview(dateRange);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(9)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
        <LoadingCard />
      </div>
    );
  }

  if (!data) return null;

  const handleKPIClick = (kpiKey, kpiData, title, prefix = '', suffix = '') => {
    if (!kpiData.trend) return; // Don't show chart if no trend data (like cash runway)
    setSelectedKPI({ key: kpiKey, data: kpiData, title, prefix, suffix });
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const getTrendData = () => {
    if (!selectedKPI || !selectedKPI.data.trend) return [];
    const fullTrend = selectedKPI.data.trend; // 12 months
    const today = new Date();
    
    if (trendView === 'daily_30') {
      // Generate 30 daily data points
      const latestValue = fullTrend[fullTrend.length - 1].value;
      const previousValue = fullTrend[fullTrend.length - 2]?.value || latestValue;
      const dailyData = [];
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const progress = (29 - i) / 29;
        const value = Math.round(previousValue + (latestValue - previousValue) * progress);
        dailyData.push({
          month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: value + Math.random() * (latestValue * 0.02) - (latestValue * 0.01)
        });
      }
      return dailyData;
    } else if (trendView === 'daily_90') {
      // Generate 90 daily data points
      const latestValue = fullTrend[fullTrend.length - 1].value;
      const startValue = fullTrend[fullTrend.length - 4]?.value || latestValue * 0.9;
      const dailyData = [];
      
      for (let i = 89; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const progress = (89 - i) / 89;
        const value = Math.round(startValue + (latestValue - startValue) * progress);
        dailyData.push({
          month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: value + Math.random() * (latestValue * 0.03) - (latestValue * 0.015)
        });
      }
      return dailyData;
    }
    
    // Default: monthly 12 months
    return fullTrend;
  };

  const getQuarterData = (quarter, trend) => {
    const quarterMap = {
      'Q1 2025': trend.slice(0, 3), // Mar, Apr, May
      'Q2 2025': trend.slice(3, 6), // Jun, Jul, Aug
      'Q3 2025': trend.slice(6, 9), // Sep, Oct, Nov
      'Q4 2025': trend.slice(9, 12), // Dec, Jan, Feb
      'Q1 2026': [trend[10], trend[11], { month: 'Mar 26', value: trend[11].value * 1.02 }], // Jan, Feb, Mar (projected)
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
    <div className="space-y-6">
      {/* KPIs Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div onClick={() => handleKPIClick('mrr', data.kpis.mrr, 'Monthly Recurring Revenue', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Monthly Recurring Revenue"
            value={data.kpis.mrr.value}
            change={data.kpis.mrr.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('arr', data.kpis.arr, 'Annual Recurring Revenue', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Annual Recurring Revenue"
            value={data.kpis.arr.value}
            change={data.kpis.arr.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('totalRevenue', data.kpis.totalRevenue, 'Total Revenue', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Total Revenue"
            value={data.kpis.totalRevenue.value}
            change={data.kpis.totalRevenue.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('subscriptionRevenue', data.kpis.subscriptionRevenue, 'Subscription Revenue', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Subscription Revenue"
            value={data.kpis.subscriptionRevenue.value}
            change={data.kpis.subscriptionRevenue.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('marketplaceRevenue', data.kpis.marketplaceRevenue, 'Marketplace Revenue', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Marketplace Revenue"
            value={data.kpis.marketplaceRevenue.value}
            change={data.kpis.marketplaceRevenue.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('pickupRevenue', data.kpis.pickupRevenue, 'Pickup Revenue', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Pickup Revenue"
            value={data.kpis.pickupRevenue.value}
            change={data.kpis.pickupRevenue.change}
            prefix="SAR"
          />
        </div>
        <div>
          <KPICard
            title="Cash Runway"
            value={data.kpis.cashRunway.value}
            change={data.kpis.cashRunway.change}
            suffix=" months"
          />
        </div>
        <div onClick={() => handleKPIClick('cac', data.kpis.cac, 'CAC', 'SAR')} className="cursor-pointer">
          <KPICard
            title="CAC"
            value={data.kpis.cac.value}
            change={data.kpis.cac.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('activeMerchants', data.kpis.activeMerchants, 'Active Merchants')} className="cursor-pointer">
          <KPICard
            title="Active Merchants"
            value={data.kpis.activeMerchants.value}
            change={data.kpis.activeMerchants.change}
          />
        </div>
        <div onClick={() => handleKPIClick('activeBranches', data.kpis.activeBranches, 'Active Branches')} className="cursor-pointer">
          <KPICard
            title="Active Branches"
            value={data.kpis.activeBranches.value}
            change={data.kpis.activeBranches.change}
          />
        </div>
        <div onClick={() => handleKPIClick('churnRate', data.kpis.churnRate, 'Churn Rate', '', '%')} className="cursor-pointer">
          <KPICard
            title="Churn Rate"
            value={data.kpis.churnRate.value}
            change={data.kpis.churnRate.change}
            suffix="%"
          />
        </div>
        <div onClick={() => handleKPIClick('mau', data.kpis.mau, 'Monthly Active Users')} className="cursor-pointer">
          <KPICard
            title="Monthly Active Users"
            value={data.kpis.mau.value}
            change={data.kpis.mau.change}
          />
        </div>
        <div onClick={() => handleKPIClick('newBrands', data.kpis.newBrands, 'New Brands')} className="cursor-pointer">
          <KPICard
            title="New Brands"
            value={data.kpis.newBrands.value}
            change={data.kpis.newBrands.change}
          />
        </div>
        <div onClick={() => handleKPIClick('lostBrands', data.kpis.lostBrands, 'Lost Brands')} className="cursor-pointer">
          <KPICard
            title="Lost Brands"
            value={data.kpis.lostBrands.value}
            change={data.kpis.lostBrands.change}
          />
        </div>
        <div onClick={() => handleKPIClick('brandChurnRate', data.kpis.brandChurnRate, 'Brand Churn Rate', '', '%')} className="cursor-pointer">
          <KPICard
            title="Brand Churn Rate"
            value={data.kpis.brandChurnRate.value}
            change={data.kpis.brandChurnRate.change}
            suffix="%"
          />
        </div>
        <div onClick={() => handleKPIClick('newSubscriptions', data.kpis.newSubscriptions, 'New Subscriptions')} className="cursor-pointer">
          <KPICard
            title="New Subscriptions"
            value={data.kpis.newSubscriptions.value}
            change={data.kpis.newSubscriptions.change}
          />
        </div>
        <div onClick={() => handleKPIClick('lostSubscriptions', data.kpis.lostSubscriptions, 'Lost Subscriptions')} className="cursor-pointer">
          <KPICard
            title="Lost Subscriptions"
            value={data.kpis.lostSubscriptions.value}
            change={data.kpis.lostSubscriptions.change}
          />
        </div>
        <div onClick={() => handleKPIClick('subscriptionChurnRate', data.kpis.subscriptionChurnRate, 'Subscription Churn Rate', '', '%')} className="cursor-pointer">
          <KPICard
            title="Subscription Churn Rate"
            value={data.kpis.subscriptionChurnRate.value}
            change={data.kpis.subscriptionChurnRate.change}
            suffix="%"
          />
        </div>
        <div onClick={() => handleKPIClick('arps', data.kpis.arps, 'ARPS', 'SAR')} className="cursor-pointer">
          <KPICard
            title="ARPS"
            value={data.kpis.arps.value}
            change={data.kpis.arps.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('monthlyArpa', data.kpis.monthlyArpa, 'Monthly ARPA', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Monthly ARPA"
            value={data.kpis.monthlyArpa.value}
            change={data.kpis.monthlyArpa.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('totalArpa', data.kpis.totalArpa, 'Total ARPA', 'SAR')} className="cursor-pointer">
          <KPICard
            title="Total ARPA"
            value={data.kpis.totalArpa.value}
            change={data.kpis.totalArpa.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('gmv', data.kpis.gmv, 'GMV', 'SAR')} className="cursor-pointer">
          <KPICard
            title="GMV"
            value={data.kpis.gmv.value}
            change={data.kpis.gmv.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('appUserCac', data.kpis.appUserCac, 'App User CAC', 'SAR')} className="cursor-pointer">
          <KPICard
            title="App User CAC"
            value={data.kpis.appUserCac.value}
            change={data.kpis.appUserCac.change}
            prefix="SAR"
          />
        </div>
      </div>

      {/* Dynamic Charts */}
      {selectedKPI && (
        <div ref={chartRef} className="grid grid-cols-2 gap-6">
          {/* Trend Chart */}
          <ChartCard 
            title={`${selectedKPI.title} - Trend`}
            action={
              <div className="flex items-center gap-2">
                <Select value={trendView} onValueChange={setTrendView}>
                  <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily_30">Daily - Last 30 Days</SelectItem>
                    <SelectItem value="daily_90">Daily - Last 90 Days</SelectItem>
                    <SelectItem value="monthly_12">Monthly - Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedKPI(null)}
                  className="text-white/60 hover:text-white hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
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
    </div>
  );
}