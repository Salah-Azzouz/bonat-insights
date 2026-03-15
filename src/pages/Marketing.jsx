import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Mail, MousePointer, Users, DollarSign } from 'lucide-react';

const CHANNEL_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function Marketing() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call - Ready for HubSpot integration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockData = {
        kpis: {
          totalLeads: { value: 3842, change: 12.5, sparkline: [3250, 3380, 3520, 3680, 3842] },
          mql: { value: 1876, change: 15.8, sparkline: [1580, 1650, 1720, 1810, 1876] },
          sql: { value: 892, change: 18.2, sparkline: [745, 780, 820, 860, 892] },
          conversionRate: { value: 23.2, change: 4.3, sparkline: [21.5, 22.0, 22.5, 23.0, 23.2] },
          cpl: { value: 185, change: -8.5, sparkline: [210, 205, 198, 190, 185] },
          roi: { value: 385, change: 12.8, sparkline: [335, 345, 360, 375, 385] },
          websiteTraffic: { value: 125800, change: 9.2, sparkline: [112000, 115000, 118000, 122000, 125800] },
          emailOpenRate: { value: 28.5, change: 3.2, sparkline: [26.8, 27.2, 27.8, 28.2, 28.5] },
        },
        leadTrend: [
          { month: 'Aug 25', totalLeads: 3250, mql: 1580, sql: 745 },
          { month: 'Sep 25', totalLeads: 3380, mql: 1650, sql: 780 },
          { month: 'Oct 25', totalLeads: 3520, mql: 1720, sql: 820 },
          { month: 'Nov 25', totalLeads: 3680, mql: 1810, sql: 860 },
          { month: 'Dec 25', totalLeads: 3842, mql: 1876, sql: 892 },
        ],
        leadsByChannel: [
          { channel: 'Organic Search', leads: 1245, percentage: 32.4 },
          { channel: 'Paid Ads', leads: 892, percentage: 23.2 },
          { channel: 'Social Media', leads: 685, percentage: 17.8 },
          { channel: 'Email Marketing', leads: 568, percentage: 14.8 },
          { channel: 'Referrals', leads: 452, percentage: 11.8 },
        ],
        campaignPerformance: [
          { name: 'Q4 Brand Awareness', leads: 1245, conversions: 298, roi: 425, budget: 45000, status: 'active' },
          { name: 'Product Launch 2026', leads: 892, conversions: 245, roi: 385, budget: 38000, status: 'active' },
          { name: 'Holiday Promotion', leads: 756, conversions: 198, roi: 320, budget: 32000, status: 'completed' },
          { name: 'Webinar Series', leads: 645, conversions: 178, roi: 295, budget: 28000, status: 'active' },
          { name: 'Content Marketing', leads: 534, conversions: 142, roi: 268, budget: 22000, status: 'active' },
        ],
        contentPerformance: [
          { month: 'Aug 25', blogPosts: 18, whitepapers: 4, webinars: 2, engagement: 12500 },
          { month: 'Sep 25', blogPosts: 20, whitepapers: 5, webinars: 3, engagement: 14200 },
          { month: 'Oct 25', blogPosts: 22, whitepapers: 6, webinars: 3, engagement: 15800 },
          { month: 'Nov 25', blogPosts: 24, whitepapers: 5, webinars: 4, engagement: 17500 },
          { month: 'Dec 25', blogPosts: 25, whitepapers: 6, webinars: 3, engagement: 18900 },
        ],
      };
      
      setData(mockData);
      setLoading(false);
    };
    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getStatusColor = (status) => {
    if (status === 'active') return 'bg-green-500/20 text-green-400 border-green-500/30';
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="space-y-6">
      {/* HubSpot Integration Notice */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-sm text-blue-400">
          <strong>HubSpot Integration:</strong> Connect your HubSpot account to sync live marketing data. Currently showing mock data.
        </p>
      </div>

      {/* Marketing KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Total Leads" value={data.kpis.totalLeads.value} change={data.kpis.totalLeads.change} sparkline={data.kpis.totalLeads.sparkline} />
        <KPICard title="Marketing Qualified Leads" value={data.kpis.mql.value} change={data.kpis.mql.change} sparkline={data.kpis.mql.sparkline} />
        <KPICard title="Sales Qualified Leads" value={data.kpis.sql.value} change={data.kpis.sql.change} sparkline={data.kpis.sql.sparkline} />
        <KPICard title="Conversion Rate" value={data.kpis.conversionRate.value} suffix="%" change={data.kpis.conversionRate.change} sparkline={data.kpis.conversionRate.sparkline} />
      </div>

      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Cost Per Lead" value={data.kpis.cpl.value} prefix="SAR" change={data.kpis.cpl.change} sparkline={data.kpis.cpl.sparkline} />
        <KPICard title="Marketing ROI" value={data.kpis.roi.value} suffix="%" change={data.kpis.roi.change} sparkline={data.kpis.roi.sparkline} />
        <KPICard title="Website Traffic" value={data.kpis.websiteTraffic.value} change={data.kpis.websiteTraffic.change} sparkline={data.kpis.websiteTraffic.sparkline} />
        <KPICard title="Email Open Rate" value={data.kpis.emailOpenRate.value} suffix="%" change={data.kpis.emailOpenRate.change} sparkline={data.kpis.emailOpenRate.sparkline} />
      </div>

      {/* Lead Generation Trend */}
      <ChartCard title="Lead Generation Funnel">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data.leadTrend}>
            <defs>
              <linearGradient id="totalLeads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="mql" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="sql" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend />
            <Area type="monotone" dataKey="totalLeads" stroke="#3b82f6" fillOpacity={1} fill="url(#totalLeads)" name="Total Leads" />
            <Area type="monotone" dataKey="mql" stroke="#10b981" fillOpacity={1} fill="url(#mql)" name="MQL" />
            <Area type="monotone" dataKey="sql" stroke="#8b5cf6" fillOpacity={1} fill="url(#sql)" name="SQL" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Leads by Channel */}
        <ChartCard title="Leads by Channel">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.leadsByChannel}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ channel, percentage }) => `${channel} (${percentage}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="leads"
              >
                {data.leadsByChannel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Content Performance */}
        <ChartCard title="Content Production & Engagement">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.contentPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="blogPosts" fill="#10b981" name="Blog Posts" radius={[4, 4, 0, 0]} />
              <Bar dataKey="whitepapers" fill="#3b82f6" name="Whitepapers" radius={[4, 4, 0, 0]} />
              <Bar dataKey="webinars" fill="#8b5cf6" name="Webinars" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Campaign Performance Table */}
      <ChartCard title="Campaign Performance">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Campaign Name</TableHead>
              <TableHead className="text-white/70 text-right">Leads</TableHead>
              <TableHead className="text-white/70 text-right">Conversions</TableHead>
              <TableHead className="text-white/70 text-right">ROI</TableHead>
              <TableHead className="text-white/70 text-right">Budget</TableHead>
              <TableHead className="text-white/70 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.campaignPerformance.map((campaign, idx) => (
              <TableRow key={idx} className="border-white/10">
                <TableCell className="font-medium text-white">{campaign.name}</TableCell>
                <TableCell className="text-right text-white/70">{campaign.leads}</TableCell>
                <TableCell className="text-right text-white/70">{campaign.conversions}</TableCell>
                <TableCell className="text-right text-green-400 font-semibold">{campaign.roi}%</TableCell>
                <TableCell className="text-right text-white/70">SAR {campaign.budget.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${getStatusColor(campaign.status)} border capitalize`}>
                    {campaign.status}
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