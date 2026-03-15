import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getMerchantsData } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import MerchantLookup from '../components/merchants/MerchantLookup';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HEALTH_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];
const PLAN_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

export default function Merchants() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getMerchantsData(dateRange);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(10)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-[#1B2A4A] border border-white/10">
        <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
        <TabsTrigger value="lookup" className="data-[state=active]:bg-white/10">Merchant Lookup</TabsTrigger>
      </TabsList>

      <TabsContent value="lookup">
        <MerchantLookup />
      </TabsContent>

      <TabsContent value="overview">
        <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Active Merchants" value={data.metrics.active} change={4.2} sparkline={[]} />
        <KPICard title="New Merchants" value={data.metrics.new} change={18.5} sparkline={[]} />
        <KPICard title="Churned" value={data.metrics.churned} change={-12.3} sparkline={[]} />
        <KPICard title="Net Growth" value={data.metrics.netGrowth} change={24.2} sparkline={[]} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <KPICard title="Churn Rate" value={data.metrics.churnRate} suffix="%" change={-0.5} sparkline={[]} />
        <KPICard title="Retention Rate" value={data.metrics.retentionRate} suffix="%" change={0.5} sparkline={[]} />
        <KPICard title="Activation Rate" value={data.metrics.activationRate} suffix="%" change={2.8} sparkline={[]} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <KPICard title="Active Subscriptions" value={data.metrics.activeSubscriptions} change={5.8} sparkline={[]} />
        <KPICard title="New Subscriptions" value={data.metrics.newSubscriptions} change={15.8} sparkline={[]} />
        <KPICard title="Subscription Churn Rate" value={data.metrics.subscriptionChurnRate} suffix="%" change={-0.8} sparkline={[]} />
      </div>

      {/* Growth Trend */}
      <ChartCard title="Merchant Growth Trend">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data.growthTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{ color: 'rgba(255,255,255,0.7)' }} />
            <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} name="Active" />
            <Line type="monotone" dataKey="new" stroke="#3b82f6" strokeWidth={2} name="New" />
            <Line type="monotone" dataKey="churned" stroke="#ef4444" strokeWidth={2} name="Churned" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Health Distribution */}
        <ChartCard title="Merchant Health Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.healthDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {data.healthDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={HEALTH_COLORS[index % HEALTH_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* By Region */}
        <ChartCard title="Merchants by Region">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.byRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="region" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* At-Risk Merchants Table */}
      <ChartCard title="At-Risk Merchants">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Merchant Name</TableHead>
              <TableHead className="text-white/70">Plan</TableHead>
              <TableHead className="text-white/70 text-right">MRR</TableHead>
              <TableHead className="text-white/70 text-right">Health Score</TableHead>
              <TableHead className="text-white/70">Last Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.atRiskMerchants.map((merchant, idx) => (
              <TableRow key={idx} className="border-white/10">
                <TableCell className="font-medium text-white">{merchant.name}</TableCell>
                <TableCell className="text-white/70">{merchant.plan}</TableCell>
                <TableCell className="text-right text-white/70">SAR {merchant.mrr.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/50">
                    {merchant.healthScore}
                  </Badge>
                </TableCell>
                <TableCell className="text-white/60 text-sm">{merchant.lastActive}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
        </div>
      </TabsContent>
    </Tabs>
  );
}