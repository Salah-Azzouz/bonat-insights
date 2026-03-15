import React, { useState } from 'react';
import KPICard from '../dashboard/KPICard';
import ChartCard from '../dashboard/ChartCard';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SEGMENT_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];
const PRODUCT_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function RevenueAnalysis({ revenueData, revenueByProduct, revenueTrend }) {
  const [cashflowPeriod, setCashflowPeriod] = useState('monthly');

  // Mock revenue segmentation data
  const revenueBySegment = [
    { segment: 'Enterprise', revenue: 145000, percentage: 48.6, growth: 8.5 },
    { segment: 'Professional', revenue: 89000, percentage: 29.8, growth: 6.2 },
    { segment: 'Business', revenue: 42000, percentage: 14.1, growth: 12.3 },
    { segment: 'Starter', revenue: 22500, percentage: 7.5, growth: 15.8 },
  ];

  const revenueByRegion = [
    { region: 'Riyadh', revenue: 128000, percentage: 42.9 },
    { region: 'Jeddah', revenue: 89000, percentage: 29.8 },
    { region: 'Dammam', revenue: 52500, percentage: 17.6 },
    { region: 'Other', revenue: 29000, percentage: 9.7 },
  ];

  const monthlyRecurringRevenue = [
    { month: 'Aug 25', subscription: 120000, marketplace: 78000, pickup: 42000, sms: 26000, whatsapp: 16000 },
    { month: 'Sep 25', subscription: 122000, marketplace: 79000, pickup: 43000, sms: 26500, whatsapp: 16500 },
    { month: 'Oct 25', subscription: 123000, marketplace: 80000, pickup: 43500, sms: 27000, whatsapp: 17000 },
    { month: 'Nov 25', subscription: 124000, marketplace: 81000, pickup: 44000, sms: 27500, whatsapp: 17500 },
    { month: 'Dec 25', subscription: 125000, marketplace: 82000, pickup: 45000, sms: 28500, whatsapp: 18000 },
  ];

  const revenueGrowthRate = [
    { month: 'Aug 25', growthRate: 5.2 },
    { month: 'Sep 25', growthRate: 5.8 },
    { month: 'Oct 25', growthRate: 6.1 },
    { month: 'Nov 25', growthRate: 5.9 },
    { month: 'Dec 25', growthRate: 6.5 },
  ];

  const cashflowMonthly = [
    { period: 'Feb 25', cashIn: 265000, cashOut: 220000 },
    { period: 'Mar 25', cashIn: 272000, cashOut: 225000 },
    { period: 'Apr 25', cashIn: 278500, cashOut: 230000 },
    { period: 'May 25', cashIn: 285000, cashOut: 235000 },
    { period: 'Jun 25', cashIn: 291000, cashOut: 240000 },
    { period: 'Jul 25', cashIn: 298500, cashOut: 245000 },
    { period: 'Aug 25', cashIn: 305200, cashOut: 252000 },
    { period: 'Sep 25', cashIn: 312800, cashOut: 258500 },
    { period: 'Oct 25', cashIn: 318400, cashOut: 263000 },
    { period: 'Nov 25', cashIn: 325000, cashOut: 270000 },
    { period: 'Dec 25', cashIn: 332000, cashOut: 275000 },
    { period: 'Jan 26', cashIn: 340000, cashOut: 280000 },
  ];

  const cashflowQuarterly = [
    { period: 'Q1 2025', cashIn: 875000, cashOut: 720000 },
    { period: 'Q2 2025', cashIn: 905000, cashOut: 745000 },
    { period: 'Q3 2025', cashIn: 940000, cashOut: 770000 },
    { period: 'Q4 2025', cashIn: 975000, cashOut: 800000 },
  ];

  const cashflowYearly = [
    { period: '2023', cashIn: 2850000, cashOut: 2380000 },
    { period: '2024', cashIn: 3250000, cashOut: 2720000 },
    { period: '2025', cashIn: 3695000, cashOut: 3035000 },
  ];

  const getCashflowData = () => {
    switch (cashflowPeriod) {
      case 'quarterly': return cashflowQuarterly;
      case 'yearly': return cashflowYearly;
      default: return cashflowMonthly;
    }
  };

  return (
    <div className="space-y-6">
      {/* Revenue KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="MRR" value={revenueData.net.value} prefix="SAR" change={revenueData.net.change} sparkline={revenueData.net.sparkline} />
        <KPICard title="ARR" value={revenueData.net.value * 12} prefix="SAR" change={revenueData.net.change} sparkline={revenueData.net.sparkline.map(v => v * 12)} />
        <KPICard title="ARPA" value={revenueData.arpm.value} prefix="SAR" change={revenueData.arpm.change} sparkline={revenueData.arpm.sparkline} />
        <KPICard title="Revenue Growth Rate" value={6.5} suffix="%" change={1.2} sparkline={[5.2, 5.8, 6.1, 5.9, 6.5]} />
      </div>

      {/* Revenue by Product */}
      <ChartCard title="Revenue by Product">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={revenueByProduct}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {revenueByProduct.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Revenue Trend */}
      <ChartCard title="Revenue Trend by Product Line">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={monthlyRecurringRevenue}>
            <defs>
              <linearGradient id="subscription" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="marketplace" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="pickup" x1="0" y1="0" x2="0" y2="1">
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
            <Area type="monotone" dataKey="subscription" stackId="1" stroke="#10b981" fillOpacity={1} fill="url(#subscription)" name="Subscription" />
            <Area type="monotone" dataKey="marketplace" stackId="1" stroke="#3b82f6" fillOpacity={1} fill="url(#marketplace)" name="Marketplace" />
            <Area type="monotone" dataKey="pickup" stackId="1" stroke="#8b5cf6" fillOpacity={1} fill="url(#pickup)" name="Pickup" />
            <Area type="monotone" dataKey="sms" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="SMS" />
            <Area type="monotone" dataKey="whatsapp" stackId="1" stroke="#ec4899" fill="#ec4899" name="WhatsApp" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Revenue by Segment */}
        <ChartCard title="Revenue by Customer Segment">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">Segment</TableHead>
                <TableHead className="text-white/70 text-right">Revenue</TableHead>
                <TableHead className="text-white/70 text-right">Share</TableHead>
                <TableHead className="text-white/70 text-right">Growth</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenueBySegment.map((row, idx) => (
                <TableRow key={idx} className="border-white/10">
                  <TableCell className="font-medium text-white">{row.segment}</TableCell>
                  <TableCell className="text-right text-white/70">SAR {row.revenue.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-white/70">{row.percentage.toFixed(1)}%</TableCell>
                  <TableCell className="text-right text-green-400 font-semibold">+{row.growth}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>

        {/* Revenue by Region */}
        <ChartCard title="Revenue by Region">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={revenueByRegion}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, percentage }) => `${region} (${percentage.toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {revenueByRegion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SEGMENT_COLORS[index % SEGMENT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                formatter={(value) => `SAR ${value.toLocaleString()}`}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Cashflow Analysis */}
      <ChartCard 
        title="Cash Flow - Cash In vs Cash Out"
        action={
          <Select value={cashflowPeriod} onValueChange={setCashflowPeriod}>
            <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        }
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={getCashflowData()}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="period" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              formatter={(value) => `SAR ${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="cashIn" fill="#10b981" name="Cash In" radius={[4, 4, 0, 0]} />
            <Bar dataKey="cashOut" fill="#ef4444" name="Cash Out" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Revenue Growth Rate */}
      <ChartCard title="Month-over-Month Revenue Growth Rate">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={revenueGrowthRate}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              formatter={(value) => `${value}%`}
            />
            <Line type="monotone" dataKey="growthRate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}