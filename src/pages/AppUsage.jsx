import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getAppUsageData } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AppUsage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getAppUsageData(dateRange);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-3 gap-6">
        <KPICard title="Daily Active Users" value={data.metrics.dau} change={3.2} sparkline={[]} />
        <KPICard title="Monthly Active Users" value={data.metrics.mau} change={6.8} sparkline={[]} />
        <KPICard title="DAU/MAU Ratio" value={data.metrics.dauMauRatio} suffix="%" change={-0.8} sparkline={[]} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <KPICard title="Uptime" value={data.metrics.uptime} suffix="%" change={0.1} sparkline={[]} />
        <KPICard title="Support Tickets" value={data.metrics.supportTickets} change={-8.5} sparkline={[]} />
        <KPICard title="Avg Resolution Time" value={data.metrics.avgResolutionTime} suffix=" hours" change={-12.3} sparkline={[]} />
      </div>

      {/* Engagement Trend */}
      <ChartCard title="User Engagement Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.engagementTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} interval={0} angle={-45} textAnchor="end" height={80} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
            <Line type="monotone" dataKey="dau" stroke="#10b981" strokeWidth={2} name="DAU" />
            <Line type="monotone" dataKey="mau" stroke="#3b82f6" strokeWidth={2} name="MAU" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Feature Adoption */}
      <ChartCard title="Feature Adoption Rates">
        <div className="space-y-4 pt-4">
          {data.featureAdoption.map((feature, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-white/70">{feature.feature}</span>
                <span className="text-sm font-semibold text-white">{feature.adoption}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${feature.adoption}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}