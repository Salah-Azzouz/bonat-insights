import React from 'react';
import KPICard from '../dashboard/KPICard';
import ChartCard from '../dashboard/ChartCard';
import { BarChart, Bar, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PerformanceAnalysis({ leaderboard }) {
  // Calculate team metrics
  const totalDealsCreated = leaderboard.reduce((sum, rep) => sum + rep.dealsCreated, 0);
  const totalDealsWon = leaderboard.reduce((sum, rep) => sum + rep.dealsWon, 0);
  const totalRevenue = leaderboard.reduce((sum, rep) => sum + rep.revenue, 0);
  const avgQuotaAttainment = leaderboard.reduce((sum, rep) => sum + rep.quotaAttainment, 0) / leaderboard.length;

  const teamMetrics = {
    totalDealsCreated: { value: totalDealsCreated, change: 12.5, sparkline: [345, 358, 372, 385, 389] },
    totalDealsWon: { value: totalDealsWon, change: 15.2, sparkline: [115, 121, 127, 135, 144] },
    totalRevenue: { value: totalRevenue, change: 14.8, sparkline: [980000, 1020000, 1065000, 1105000, 1134000] },
    avgQuotaAttainment: { value: avgQuotaAttainment, change: 8.3, sparkline: [72, 75, 78, 82, 83] },
  };

  // Top performers
  const topPerformers = [...leaderboard]
    .sort((a, b) => b.quotaAttainment - a.quotaAttainment)
    .slice(0, 5);

  // Performance trends
  const performanceTrend = [
    { month: 'Aug 25', teamQuota: 75, avgDealsWon: 10, teamRevenue: 980000 },
    { month: 'Sep 25', teamQuota: 78, avgDealsWon: 11, teamRevenue: 1020000 },
    { month: 'Oct 25', teamQuota: 80, avgDealsWon: 11, teamRevenue: 1065000 },
    { month: 'Nov 25', teamQuota: 82, avgDealsWon: 12, teamRevenue: 1105000 },
    { month: 'Dec 25', teamQuota: 83, avgDealsWon: 12, teamRevenue: 1134000 },
  ];

  // Rep performance comparison
  const repComparison = leaderboard.slice(0, 8).map(rep => ({
    name: rep.name.split(' ')[0], // First name only
    dealsWon: rep.dealsWon,
    revenue: rep.revenue / 1000, // In thousands
    quota: rep.quotaAttainment,
  }));

  // Skills radar data for top performer
  const topRepSkills = [
    { skill: 'Prospecting', score: 92 },
    { skill: 'Negotiation', score: 88 },
    { skill: 'Closing', score: 95 },
    { skill: 'Relationship', score: 90 },
    { skill: 'Product Knowledge', score: 85 },
  ];

  const getQuotaColor = (quota) => {
    if (quota >= 100) return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (quota >= 80) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (quota >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Team Performance KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Total Deals Created" value={teamMetrics.totalDealsCreated.value} change={teamMetrics.totalDealsCreated.change} sparkline={teamMetrics.totalDealsCreated.sparkline} />
        <KPICard title="Total Deals Won" value={teamMetrics.totalDealsWon.value} change={teamMetrics.totalDealsWon.change} sparkline={teamMetrics.totalDealsWon.sparkline} />
        <KPICard title="Total Revenue" value={teamMetrics.totalRevenue.value} prefix="SAR" change={teamMetrics.totalRevenue.change} sparkline={teamMetrics.totalRevenue.sparkline} />
        <KPICard title="Avg Quota Attainment" value={teamMetrics.avgQuotaAttainment.value} suffix="%" change={teamMetrics.avgQuotaAttainment.change} sparkline={teamMetrics.avgQuotaAttainment.sparkline} />
      </div>

      {/* Performance Trends */}
      <ChartCard title="Team Performance Trends">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="teamQuota" stroke="#10b981" strokeWidth={2} name="Team Quota %" dot={{ fill: '#10b981', r: 4 }} />
            <Line yAxisId="left" type="monotone" dataKey="avgDealsWon" stroke="#3b82f6" strokeWidth={2} name="Avg Deals Won" dot={{ fill: '#3b82f6', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Rep Performance Comparison */}
        <ChartCard title="Sales Rep Performance Comparison">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={repComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="dealsWon" fill="#10b981" name="Deals Won" radius={[4, 4, 0, 0]} />
              <Bar dataKey="quota" fill="#3b82f6" name="Quota %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Performer Skills */}
        <ChartCard title="Top Performer Skills Profile">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={topRepSkills}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="skill" stroke="rgba(255,255,255,0.6)" fontSize={11} />
              <PolarRadiusAxis stroke="rgba(255,255,255,0.3)" fontSize={10} />
              <Radar name="Skills" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Performers Table */}
      <ChartCard title="Top 5 Sales Representatives">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Rank</TableHead>
              <TableHead className="text-white/70">Sales Rep</TableHead>
              <TableHead className="text-white/70 text-right">Deals Created</TableHead>
              <TableHead className="text-white/70 text-right">Deals Won</TableHead>
              <TableHead className="text-white/70 text-right">Pipeline Value</TableHead>
              <TableHead className="text-white/70 text-right">Revenue</TableHead>
              <TableHead className="text-white/70 text-right">Quota Attainment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPerformers.map((rep, idx) => (
              <TableRow key={rep.repId} className="border-white/10">
                <TableCell className="font-bold text-white">#{idx + 1}</TableCell>
                <TableCell className="font-medium text-white">{rep.name}</TableCell>
                <TableCell className="text-right text-white/70">{rep.dealsCreated}</TableCell>
                <TableCell className="text-right text-white/70">{rep.dealsWon}</TableCell>
                <TableCell className="text-right text-white/70">SAR {rep.pipelineValue.toLocaleString()}</TableCell>
                <TableCell className="text-right text-white/70">SAR {rep.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${getQuotaColor(rep.quotaAttainment)} border`}>
                    {rep.quotaAttainment}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  );
}