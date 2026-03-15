import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CATEGORY_COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

export default function Pickup() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trendView, setTrendView] = useState('monthly_12');
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const generateOrderTrendData = () => {
        const currentOrders = 28450;
        const currentGmv = 4250000;
        const currentCommission = 212500;
        const today = new Date();
        
        if (trendView === 'daily_30') {
          const data = [];
          for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const progress = (29 - i) / 29;
            const orders = Math.round(22800 + (currentOrders - 22800) * progress);
            const gmv = Math.round(3550000 + (currentGmv - 3550000) * progress);
            const commission = Math.round(177500 + (currentCommission - 177500) * progress);
            data.push({
              month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              orders: orders + Math.random() * 500 - 250,
              gmv: gmv + Math.random() * 50000 - 25000,
              commission: commission + Math.random() * 2500 - 1250
            });
          }
          return data;
        } else if (trendView === 'daily_90') {
          const data = [];
          for (let i = 89; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const progress = (89 - i) / 89;
            const orders = Math.round(22800 + (currentOrders - 22800) * progress);
            const gmv = Math.round(3550000 + (currentGmv - 3550000) * progress);
            const commission = Math.round(177500 + (currentCommission - 177500) * progress);
            data.push({
              month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              orders: orders + Math.random() * 700 - 350,
              gmv: gmv + Math.random() * 70000 - 35000,
              commission: commission + Math.random() * 3500 - 1750
            });
          }
          return data;
        }
        
        // Default: monthly - last 12 months
        return [
          { month: 'Mar 25', orders: 19200, gmv: 2880000, commission: 144000 },
          { month: 'Apr 25', orders: 20100, gmv: 3015000, commission: 150750 },
          { month: 'May 25', orders: 20800, gmv: 3120000, commission: 156000 },
          { month: 'Jun 25', orders: 21500, gmv: 3225000, commission: 161250 },
          { month: 'Jul 25', orders: 22200, gmv: 3330000, commission: 166500 },
          { month: 'Aug 25', orders: 22800, gmv: 3550000, commission: 177500 },
          { month: 'Sep 25', orders: 24100, gmv: 3720000, commission: 186000 },
          { month: 'Oct 25', orders: 25600, gmv: 3890000, commission: 194500 },
          { month: 'Nov 25', orders: 27200, gmv: 4050000, commission: 202500 },
          { month: 'Dec 25', orders: 28450, gmv: 4250000, commission: 212500 },
          { month: 'Jan 26', orders: 28350, gmv: 4235000, commission: 211750 },
          { month: 'Feb 26', orders: 28450, gmv: 4250000, commission: 212500 },
        ];
      };
      
      const mockData = {
        kpis: {
          totalGMV: { value: 4250000, change: 18.5, sparkline: [3550000, 3720000, 3890000, 4050000, 4250000] },
          commissionRevenue: { value: 212500, change: 18.5, sparkline: [177500, 186000, 194500, 202500, 212500] },
          totalOrders: { value: 28450, change: 22.3, sparkline: [22800, 24100, 25600, 27200, 28450] },
          avgOrderValue: { value: 149.4, change: -3.1, sparkline: [155.7, 154.3, 152.0, 150.5, 149.4] },
          pickupUsers: { value: 156400, change: 16.2, sparkline: [132500, 138900, 145200, 151800, 156400] },
          activeMerchants: { value: 1245, change: 12.8, sparkline: [1085, 1120, 1165, 1210, 1245] },
          completionRate: { value: 94.2, change: 2.1, sparkline: [92.5, 93.0, 93.5, 93.8, 94.2] },
          userRetentionRate: { value: 87.3, change: 4.5, sparkline: [82.5, 84.0, 85.2, 86.5, 87.3] },
          repeatOrderRate: { value: 42.8, change: 5.6, sparkline: [38.5, 39.5, 40.8, 41.9, 42.8] },
        },
        orderTrend: generateOrderTrendData(),
        topMerchants: [
          { name: 'مطاعم الفخامة', orders: 2845, gmv: 425000, commission: 21250, growth: 18.5 },
          { name: 'كافيه الرياض', orders: 2420, gmv: 363000, commission: 18150, growth: 22.3 },
          { name: 'مخابز الطازج', orders: 2185, gmv: 327750, commission: 16387, growth: 15.2 },
          { name: 'حلويات الذوق', orders: 1980, gmv: 297000, commission: 14850, growth: 20.8 },
          { name: 'مطعم النخلة', orders: 1756, gmv: 263400, commission: 13170, growth: 12.4 },
          { name: 'بيتزا السريع', orders: 1625, gmv: 243750, commission: 12187, growth: 16.9 },
          { name: 'برجر المدينة', orders: 1489, gmv: 223350, commission: 11167, growth: 14.5 },
          { name: 'سوشي ماستر', orders: 1342, gmv: 201300, commission: 10065, growth: 19.2 },
        ],
        mostOrderedProducts: [
          { product: 'برجر كلاسيك', orders: 3845, revenue: 192250, category: 'Fast Food' },
          { product: 'بيتزا مارجريتا', orders: 3420, revenue: 171000, category: 'Pizza' },
          { product: 'شاورما دجاج', orders: 3180, revenue: 127200, category: 'Fast Food' },
          { product: 'قهوة أمريكانو', orders: 2956, revenue: 44340, category: 'Beverages' },
          { product: 'سلطة سيزر', orders: 2745, revenue: 109800, category: 'Healthy' },
          { product: 'سندويش فلافل', orders: 2534, revenue: 76020, category: 'Fast Food' },
          { product: 'عصير برتقال', orders: 2389, revenue: 47780, category: 'Beverages' },
          { product: 'كنافة بالجبنة', orders: 2156, revenue: 107800, category: 'Desserts' },
        ],
        ordersByCategory: [
          { category: 'Fast Food', orders: 8920, percentage: 31.4 },
          { category: 'Restaurants', orders: 7560, percentage: 26.6 },
          { category: 'Cafes', orders: 5680, percentage: 20.0 },
          { category: 'Bakeries', orders: 3845, percentage: 13.5 },
          { category: 'Desserts', orders: 2445, percentage: 8.5 },
        ],
        hourlyOrders: [
          { hour: '8AM', orders: 420 },
          { hour: '9AM', orders: 685 },
          { hour: '10AM', orders: 892 },
          { hour: '11AM', orders: 1245 },
          { hour: '12PM', orders: 2156 },
          { hour: '1PM', orders: 2842 },
          { hour: '2PM', orders: 1956 },
          { hour: '3PM', orders: 1245 },
          { hour: '4PM', orders: 892 },
          { hour: '5PM', orders: 1156 },
          { hour: '6PM', orders: 1845 },
          { hour: '7PM', orders: 2456 },
          { hour: '8PM', orders: 2842 },
          { hour: '9PM', orders: 2156 },
        ],
      };
      
      setData(mockData);
      setLoading(false);
    };
    fetchData();
  }, [dateRange, trendView]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(9)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Pickup KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Total GMV" value={data.kpis.totalGMV.value} prefix="SAR" change={data.kpis.totalGMV.change} sparkline={data.kpis.totalGMV.sparkline} />
        <KPICard title="Commission Revenue" value={data.kpis.commissionRevenue.value} prefix="SAR" change={data.kpis.commissionRevenue.change} sparkline={data.kpis.commissionRevenue.sparkline} />
        <KPICard title="Total Orders" value={data.kpis.totalOrders.value} change={data.kpis.totalOrders.change} sparkline={data.kpis.totalOrders.sparkline} />
        <KPICard title="Avg Order Value" value={data.kpis.avgOrderValue.value} prefix="SAR" change={data.kpis.avgOrderValue.change} sparkline={data.kpis.avgOrderValue.sparkline} />
      </div>

      <div className="grid grid-cols-5 gap-6">
        <KPICard title="# of Pickup Users" value={data.kpis.pickupUsers.value} change={data.kpis.pickupUsers.change} sparkline={data.kpis.pickupUsers.sparkline} />
        <KPICard title="Active Pickup Merchants" value={data.kpis.activeMerchants.value} change={data.kpis.activeMerchants.change} sparkline={data.kpis.activeMerchants.sparkline} />
        <KPICard title="Completion Rate" value={data.kpis.completionRate.value} suffix="%" change={data.kpis.completionRate.change} sparkline={data.kpis.completionRate.sparkline} />
        <KPICard title="PU User Retention Rate" value={data.kpis.userRetentionRate.value} suffix="%" change={data.kpis.userRetentionRate.change} sparkline={data.kpis.userRetentionRate.sparkline} />
        <KPICard title="Repeat Order Rate" value={data.kpis.repeatOrderRate.value} suffix="%" change={data.kpis.repeatOrderRate.change} sparkline={data.kpis.repeatOrderRate.sparkline} />
      </div>

      {/* Orders & Revenue Trend */}
      <ChartCard 
        title="Orders & Revenue Trend"
        action={
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
        }
      >
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data.orderTrend}>
            <defs>
              <linearGradient id="orders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="gmv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis yAxisId="left" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="orders" stroke="#10b981" fillOpacity={1} fill="url(#orders)" name="Orders" />
            <Area yAxisId="right" type="monotone" dataKey="gmv" stroke="#3b82f6" fillOpacity={1} fill="url(#gmv)" name="GMV (SAR)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">
        {/* Orders by Category */}
        <ChartCard title="Orders by Category">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.ordersByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} (${percentage}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="orders"
              >
                {data.ordersByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Hourly Orders Pattern */}
        <ChartCard title="Orders by Hour">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.hourlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="hour" stroke="rgba(255,255,255,0.5)" fontSize={11} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
              <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Selling Merchants */}
      <ChartCard title="Top Selling Merchants">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Merchant Name</TableHead>
              <TableHead className="text-white/70 text-right">Orders</TableHead>
              <TableHead className="text-white/70 text-right">GMV</TableHead>
              <TableHead className="text-white/70 text-right">Commission</TableHead>
              <TableHead className="text-white/70 text-right">Growth</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.topMerchants.map((merchant, idx) => (
              <TableRow key={idx} className="border-white/10">
                <TableCell className="font-medium text-white">{merchant.name}</TableCell>
                <TableCell className="text-right text-white/70">{merchant.orders.toLocaleString()}</TableCell>
                <TableCell className="text-right text-white/70">SAR {merchant.gmv.toLocaleString()}</TableCell>
                <TableCell className="text-right text-white/70">SAR {merchant.commission.toLocaleString()}</TableCell>
                <TableCell className="text-right text-green-400 font-semibold">+{merchant.growth}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>

      {/* Most Ordered Products */}
      <ChartCard title="Most Ordered Products">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Product Name</TableHead>
              <TableHead className="text-white/70">Category</TableHead>
              <TableHead className="text-white/70 text-right">Orders</TableHead>
              <TableHead className="text-white/70 text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.mostOrderedProducts.map((product, idx) => (
              <TableRow key={idx} className="border-white/10">
                <TableCell className="font-medium text-white">{product.product}</TableCell>
                <TableCell className="text-white/70">
                  <Badge className="bg-white/10 text-white/70 border-white/20">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-white/70">{product.orders.toLocaleString()}</TableCell>
                <TableCell className="text-right text-white/70">SAR {product.revenue.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  );
}