import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getMarketplaceData } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import LoadingCard from '../components/dashboard/LoadingCard';
import ChartCard from '../components/dashboard/ChartCard';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Marketplace() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productFilter, setProductFilter] = useState('total');
  const [topN, setTopN] = useState('10');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [timePeriod, setTimePeriod] = useState('month');
  const [selectedKPI, setSelectedKPI] = useState(null);
  const [trendView, setTrendView] = useState('monthly_12');
  const [chartDisplay, setChartDisplay] = useState('all');
  const itemsPerPage = 50;
  const { dateRange } = useDateRange();
  const chartRef = React.useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getMarketplaceData(dateRange, timePeriod);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange, timePeriod]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => <LoadingCard key={i} type="kpi" />)}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const handleKPIClick = (title, value, change, prefix = '', suffix = '') => {
    setSelectedKPI({ title, value, change, prefix, suffix });
    setTimeout(() => {
      chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const getTrendChartData = () => {
    if (!selectedKPI) return [];
    return generateTrendData(selectedKPI.value, selectedKPI.change);
  };

  const generateTrendData = (currentValue, changePercent) => {
    if (trendView === 'daily_30') {
      // Generate 30 daily data points
      const previousValue = currentValue / (1 + changePercent / 100);
      const dailyData = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const progress = (29 - i) / 29;
        const value = Math.round(previousValue + (currentValue - previousValue) * progress);
        dailyData.push({
          month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: value + Math.random() * (currentValue * 0.02) - (currentValue * 0.01)
        });
      }
      return dailyData;
    } else if (trendView === 'daily_90') {
      // Generate 90 daily data points
      const startValue = currentValue / (1 + changePercent / 100);
      const dailyData = [];
      const today = new Date();
      
      for (let i = 89; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const progress = (89 - i) / 89;
        const value = Math.round(startValue + (currentValue - startValue) * progress);
        dailyData.push({
          month: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: value + Math.random() * (currentValue * 0.03) - (currentValue * 0.015)
        });
      }
      return dailyData;
    }
    
    // Default: monthly - last 12 months
    const months = ['Mar 25', 'Apr 25', 'May 25', 'Jun 25', 'Jul 25', 'Aug 25', 'Sep 25', 'Oct 25', 'Nov 25', 'Dec 25', 'Jan 26', 'Feb 26'];
    const data = [];
    const monthlyChange = changePercent / 11; // Distribute change across 11 months
    
    for (let i = 0; i < 12; i++) {
      const percentFromCurrent = (11 - i) * monthlyChange;
      const value = Math.round(currentValue / (1 + changePercent / 100) * (1 + percentFromCurrent / 100));
      data.push({ month: months[i], value });
    }
    
    return data;
  };

  const filteredMerchants = data.merchants ? data.merchants.map(merchant => {
    let transactions, revenue;
    if (productFilter === 'giftCards') {
      transactions = merchant.giftCardTransactions;
      revenue = merchant.giftCardRevenue;
    } else if (productFilter === 'coupons') {
      transactions = merchant.couponTransactions;
      revenue = merchant.couponRevenue;
    } else {
      transactions = merchant.totalTransactions;
      revenue = merchant.totalRevenue;
    }
    return { ...merchant, transactions, revenue };
  }).sort((a, b) => b.revenue - a.revenue)
    .filter(merchant => merchant.name.toLowerCase().includes(searchQuery.toLowerCase()))
  : [];

  const displayedMerchants = topN === 'all' 
    ? filteredMerchants
    : filteredMerchants.slice(0, parseInt(topN));

  const totalPages = Math.ceil(displayedMerchants.length / itemsPerPage);
  const paginatedMerchants = topN === 'all'
    ? displayedMerchants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : displayedMerchants;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-[#1B2A4A] border border-white/10">
        <TabsTrigger value="overview" className="data-[state=active]:bg-white/10">Overview</TabsTrigger>
        <TabsTrigger value="performance" className="data-[state=active]:bg-white/10">Merchant Performance</TabsTrigger>
        <TabsTrigger value="resell" className="data-[state=active]:bg-white/10">Marketplace Resell</TabsTrigger>
        <TabsTrigger value="external" className="data-[state=active]:bg-white/10">External Marketplace</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div onClick={() => handleKPIClick('Total MP Revenue', data.metrics.totalRevenue.value, data.metrics.totalRevenue.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Total MP Revenue"
            value={data.metrics.totalRevenue.value}
            change={data.metrics.totalRevenue.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Monthly MP Revenue', data.metrics.monthlyRevenue.value, data.metrics.monthlyRevenue.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Monthly MP Revenue"
            value={data.metrics.monthlyRevenue.value}
            change={data.metrics.monthlyRevenue.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Total MP Profit', data.metrics.totalProfit.value, data.metrics.totalProfit.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Total MP Profit"
            value={data.metrics.totalProfit.value}
            change={data.metrics.totalProfit.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Monthly MP Profit', data.metrics.monthlyProfit.value, data.metrics.monthlyProfit.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Monthly MP Profit"
            value={data.metrics.monthlyProfit.value}
            change={data.metrics.monthlyProfit.change}
            prefix="SAR"
          />
        </div>
      </div>

      {/* Gift Card Sales Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div onClick={() => handleKPIClick('Total Gift Card Sales', data.metrics.totalGiftCardSales.value, data.metrics.totalGiftCardSales.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Total Gift Card Sales"
            value={data.metrics.totalGiftCardSales.value}
            change={data.metrics.totalGiftCardSales.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Internal Gift Card Sales', data.metrics.internalGiftCardSales.value, data.metrics.internalGiftCardSales.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Internal Gift Card Sales"
            value={data.metrics.internalGiftCardSales.value}
            change={data.metrics.internalGiftCardSales.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('External Gift Card Sales', data.metrics.externalGiftCardSales.value, data.metrics.externalGiftCardSales.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="External Gift Card Sales"
            value={data.metrics.externalGiftCardSales.value}
            change={data.metrics.externalGiftCardSales.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Gift Cards Sold', data.metrics.giftCardsSold.value, data.metrics.giftCardsSold.change)} className="cursor-pointer">
          <KPICard
            title="Gift Cards Sold"
            value={data.metrics.giftCardsSold.value}
            change={data.metrics.giftCardsSold.change}
          />
        </div>
      </div>

      {/* Coupon Sales Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div onClick={() => handleKPIClick('Total Coupon Sales', data.metrics.totalCouponSales.value, data.metrics.totalCouponSales.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Total Coupon Sales"
            value={data.metrics.totalCouponSales.value}
            change={data.metrics.totalCouponSales.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Internal Coupon Sales', data.metrics.internalCouponSales.value, data.metrics.internalCouponSales.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Internal Coupon Sales"
            value={data.metrics.internalCouponSales.value}
            change={data.metrics.internalCouponSales.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('External Coupon Sales', data.metrics.externalCouponSales.value, data.metrics.externalCouponSales.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="External Coupon Sales"
            value={data.metrics.externalCouponSales.value}
            change={data.metrics.externalCouponSales.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Coupons Sold', data.metrics.couponsSold.value, data.metrics.couponsSold.change)} className="cursor-pointer">
          <KPICard
            title="Coupons Sold"
            value={data.metrics.couponsSold.value}
            change={data.metrics.couponsSold.change}
          />
        </div>
      </div>

      {/* Other Metrics */}
      <div className="grid grid-cols-6 gap-6">
        <div onClick={() => handleKPIClick('Average Profit Margin', data.metrics.avgProfitMargin.value, data.metrics.avgProfitMargin.change, '', '%')} className="cursor-pointer">
          <KPICard
            title="Average Profit Margin"
            value={data.metrics.avgProfitMargin.value}
            change={data.metrics.avgProfitMargin.change}
            suffix="%"
          />
        </div>
        <div onClick={() => handleKPIClick('Number of Customers', data.metrics.numberOfCustomers.value, data.metrics.numberOfCustomers.change)} className="cursor-pointer">
          <KPICard
            title="Number of Customers"
            value={data.metrics.numberOfCustomers.value}
            change={data.metrics.numberOfCustomers.change}
          />
        </div>
        <div onClick={() => handleKPIClick('Customer to Active User Ratio', data.metrics.customerToActiveUserRatio.value, data.metrics.customerToActiveUserRatio.change, '', '%')} className="cursor-pointer">
          <KPICard
            title="Customer to Active User Ratio"
            value={data.metrics.customerToActiveUserRatio.value}
            change={data.metrics.customerToActiveUserRatio.change}
            suffix="%"
          />
        </div>
        <div onClick={() => handleKPIClick('Avg Check - Gift Card', data.metrics.avgCheckGiftCard.value, data.metrics.avgCheckGiftCard.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Avg Check - Gift Card"
            value={data.metrics.avgCheckGiftCard.value}
            change={data.metrics.avgCheckGiftCard.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Avg Check - Coupon', data.metrics.avgCheckCoupon.value, data.metrics.avgCheckCoupon.change, 'SAR')} className="cursor-pointer">
          <KPICard
            title="Avg Check - Coupon"
            value={data.metrics.avgCheckCoupon.value}
            change={data.metrics.avgCheckCoupon.change}
            prefix="SAR"
          />
        </div>
        <div onClick={() => handleKPIClick('Total Transactions', data.metrics.totalTransactions.value, data.metrics.totalTransactions.change)} className="cursor-pointer">
          <KPICard
            title="Total Transactions"
            value={data.metrics.totalTransactions.value}
            change={data.metrics.totalTransactions.change}
          />
        </div>
      </div>

      {/* Trend Chart */}
      {selectedKPI && (
        <div ref={chartRef}>
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
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getTrendChartData()}>
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
        </div>
      )}
      </TabsContent>

      <TabsContent value="performance" className="space-y-6">
        <ChartCard 
          title="Top 30 Merchants Comparison"
          action={
            <Select value={chartDisplay} onValueChange={setChartDisplay}>
              <SelectTrigger className="w-44 bg-white/5 border-white/10 text-white text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                <SelectItem value="giftcard">Gift Cards Only</SelectItem>
                <SelectItem value="coupon">Coupons Only</SelectItem>
                <SelectItem value="total">Total Only</SelectItem>
              </SelectContent>
            </Select>
          }
        >
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredMerchants.slice(0, 30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.5)"
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
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
                  formatter={(value, name) => ['SAR ' + value.toLocaleString(), name]}
                />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                  iconType="rect"
                />
                {(chartDisplay === 'all' || chartDisplay === 'giftcard') && (
                  <Bar dataKey="giftCardRevenue" name="Gift Cards" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                )}
                {(chartDisplay === 'all' || chartDisplay === 'coupon') && (
                  <Bar dataKey="couponRevenue" name="Coupons" fill="#10b981" radius={[4, 4, 0, 0]} />
                )}
                {(chartDisplay === 'all' || chartDisplay === 'total') && (
                  <Bar dataKey="totalRevenue" name="Total" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard 
          title="Merchant Performance" 
          action={
            <div className="flex gap-3">
              <Input
                placeholder="Search merchant..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-64 bg-white/5 border-white/10 text-white placeholder:text-white/50"
              />
              <Select value={timePeriod} onValueChange={(value) => {
                setTimePeriod(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">By Month</SelectItem>
                  <SelectItem value="quarter">By Quarter</SelectItem>
                  <SelectItem value="year">By Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={topN} onValueChange={(value) => {
                setTopN(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-32 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Top 10</SelectItem>
                  <SelectItem value="25">Top 25</SelectItem>
                  <SelectItem value="50">Top 50</SelectItem>
                  <SelectItem value="100">Top 100</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="w-48 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total">Total (All Products)</SelectItem>
                  <SelectItem value="giftCards">Gift Cards Only</SelectItem>
                  <SelectItem value="coupons">Coupons Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          }
        >
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">Rank</TableHead>
                <TableHead className="text-white/70">Merchant Name</TableHead>
                <TableHead className="text-white/70 text-right">Transactions</TableHead>
                <TableHead className="text-white/70 text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMerchants.length > 0 ? (
                paginatedMerchants.map((merchant, idx) => {
                  const actualRank = topN === 'all' 
                    ? (currentPage - 1) * itemsPerPage + idx + 1
                    : idx + 1;
                  return (
                    <TableRow key={merchant.id} className="border-white/10">
                      <TableCell className="text-white/70">{actualRank}</TableCell>
                      <TableCell className="font-medium text-white">{merchant.name}</TableCell>
                      <TableCell className="text-right text-white/70">
                        {merchant.transactions.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right text-white">
                        SAR {merchant.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-white/50 py-8">
                    No merchants found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {topN === 'all' && totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
              <div className="text-sm text-white/60">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, displayedMerchants.length)} of {displayedMerchants.length} merchants
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-white/80">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </ChartCard>
      </TabsContent>

      <TabsContent value="resell" className="space-y-6">
        <div className="grid grid-cols-4 gap-6">
          <KPICard
            title="Total Sales"
            value={data.resell.totalSales.value}
            change={data.resell.totalSales.change}
            prefix="SAR"
          />
          <KPICard
            title="Total Purchase"
            value={data.resell.totalPurchase.value}
            change={data.resell.totalPurchase.change}
            prefix="SAR"
          />
          <KPICard
            title="Avg Markup"
            value={data.resell.avgMarkup.value}
            change={data.resell.avgMarkup.change}
            suffix="%"
          />
          <KPICard
            title="Avg Profit Margin"
            value={data.resell.avgProfitMargin.value}
            change={data.resell.avgProfitMargin.change}
            suffix="%"
          />
        </div>

        <div className="grid grid-cols-4 gap-6">
          <KPICard
            title="Profit Margin"
            value={data.resell.profitMargin.value}
            change={data.resell.profitMargin.change}
            suffix="%"
          />
          <KPICard
            title="Avg Inventory Turnover"
            value={data.resell.avgInventoryTurnover.value}
            change={data.resell.avgInventoryTurnover.change}
          />
          <KPICard
            title="Avg Merchant Discount"
            value={data.resell.avgMerchantDiscount.value}
            change={data.resell.avgMerchantDiscount.change}
            suffix="%"
          />
          <KPICard
            title="Avg App Discount"
            value={data.resell.avgAppDiscount.value}
            change={data.resell.avgAppDiscount.change}
            suffix="%"
          />
        </div>
      </TabsContent>

      <TabsContent value="external" className="space-y-6">
        <div className="grid grid-cols-5 gap-6">
          <KPICard
            title="Total Sales"
            value={data.externalMarketplace.totalSales.value}
            change={data.externalMarketplace.totalSales.change}
            prefix="SAR"
          />
          <KPICard
            title="Avg Margin"
            value={data.externalMarketplace.avgMargin.value}
            change={data.externalMarketplace.avgMargin.change}
            suffix="%"
          />
          <KPICard
            title="Total Profit"
            value={data.externalMarketplace.totalProfit.value}
            change={data.externalMarketplace.totalProfit.change}
            prefix="SAR"
          />
          <KPICard
            title="Total Transactions"
            value={data.externalMarketplace.totalTransactions.value}
            change={data.externalMarketplace.totalTransactions.change}
          />
          <KPICard
            title="Avg Transaction"
            value={data.externalMarketplace.avgTransaction.value}
            change={data.externalMarketplace.avgTransaction.change}
            prefix="SAR"
          />
        </div>

        <ChartCard title="External Merchants">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">Rank</TableHead>
                <TableHead className="text-white/70">Merchant Name</TableHead>
                <TableHead className="text-white/70 text-right">Transactions</TableHead>
                <TableHead className="text-white/70 text-right">Revenue</TableHead>
                <TableHead className="text-white/70 text-right">Commission</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.externalMarketplace.merchants.map((merchant, idx) => (
                <TableRow key={idx} className="border-white/10">
                  <TableCell className="text-white/70">{idx + 1}</TableCell>
                  <TableCell className="font-medium text-white">{merchant.name}</TableCell>
                  <TableCell className="text-right text-white/70">
                    {merchant.transactions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-white">
                    SAR {merchant.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-white/70">
                    {merchant.commission}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </TabsContent>
    </Tabs>
  );
}