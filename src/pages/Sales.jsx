import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getSalesData } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import PerformanceAnalysis from '../components/sales/PerformanceAnalysis';

const LEAD_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function Sales() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { dateRange } = useDateRange();

  useEffect(() => {
    const init = async () => {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
    };
    init();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      const salesRepId = user.role === 'sales_rep' ? user.sales_rep_id : undefined;
      const result = await getSalesData(dateRange, salesRepId);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange, user]);

  if (loading || !user) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getQuotaColor = (attainment) => {
    if (attainment >= 100) return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (attainment >= 80) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    return 'bg-red-500/20 text-red-400 border-red-500/50';
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-[#1B2A4A] border border-white/10">
        <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
        <TabsTrigger value="performance" className="data-[state=active]:bg-white/10">Performance</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Win Rate" value={data.winRate} suffix="%" change={3.2} sparkline={[]} />
        <KPICard title="Deals Won" value={data.dealsWon} change={12.5} sparkline={[]} />
        <KPICard title="Total Leads" value={data.pipeline[0]?.count || 0} change={5.8} sparkline={[]} />
        <div className="bg-[#1B2A4A] border border-white/10 rounded-lg p-6">
          <p className="text-xs text-white/60 font-medium uppercase tracking-wide mb-2">Pipeline Value</p>
          <p className="text-3xl font-bold text-white mb-4">
            <span className="text-xl text-white/60 mr-1">SAR</span>
            {data.pipeline.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Sales Target Progress */}
      <ChartCard title="Sales Target vs Actual">
        <div className="space-y-4 pt-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-sm text-white/60">Actual Revenue</p>
              <p className="text-3xl font-bold text-white">SAR {data.salesTarget.actual.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/60">Target</p>
              <p className="text-2xl font-semibold text-white/70">SAR {data.salesTarget.target.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Progress</span>
              <span className="text-green-400 font-semibold">{data.salesTarget.percentage.toFixed(1)}%</span>
            </div>
            <Progress value={data.salesTarget.percentage} className="h-3 bg-white/10" />
          </div>
        </div>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Pipeline Funnel */}
        <ChartCard title="Sales Pipeline Funnel">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data.pipeline} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis type="category" dataKey="stage" stroke="rgba(255,255,255,0.5)" fontSize={12} width={100} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Lead Categories */}
        <ChartCard title="Lead Categories">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={data.leadCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, value }) => `${category} (${value}%)`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.leadCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={LEAD_COLORS[index % LEAD_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Sales Rep Leaderboard */}
      <ChartCard title="Sales Rep Leaderboard">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">Rank</TableHead>
                <TableHead className="text-white/70">Rep Name</TableHead>
                <TableHead className="text-white/70 text-right">Deals Created</TableHead>
                <TableHead className="text-white/70 text-right">Deals Won</TableHead>
                <TableHead className="text-white/70 text-right">Pipeline Value</TableHead>
                <TableHead className="text-white/70 text-right">Revenue</TableHead>
                <TableHead className="text-white/70 text-right">Quota Attainment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.leaderboard.map((rep, idx) => (
                <TableRow key={rep.repId} className="border-white/10">
                  <TableCell className="font-medium text-white">{idx + 1}</TableCell>
                  <TableCell className="font-medium text-white">{rep.name}</TableCell>
                  <TableCell className="text-right text-white/70">{rep.dealsCreated}</TableCell>
                  <TableCell className="text-right text-white/70">{rep.dealsWon}</TableCell>
                  <TableCell className="text-right text-white/70">SAR {rep.pipelineValue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-white/70">SAR {rep.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Badge className={getQuotaColor(rep.quotaAttainment)}>
                      {rep.quotaAttainment}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ChartCard>
      </TabsContent>

      <TabsContent value="performance">
        <PerformanceAnalysis leaderboard={data.leaderboard} />
      </TabsContent>
    </Tabs>
  );
}