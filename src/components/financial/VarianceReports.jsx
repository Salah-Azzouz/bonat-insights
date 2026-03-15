import React, { useState, useEffect } from 'react';
import { useDateRange } from '../utils/dateRangeContext';
import { getVarianceReportsData } from '../utils/dataService';
import ChartCard from '../dashboard/ChartCard';
import LoadingCard from '../dashboard/LoadingCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function VarianceReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getVarianceReportsData(dateRange);
      setData(result);
      setLoading(false);
    };
    fetchData();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <LoadingCard />
      </div>
    );
  }

  if (!data) return null;

  const formatCurrency = (value) => {
    return `SAR ${value.toLocaleString()}`;
  };

  const renderVarianceCell = (variance, variancePercent) => {
    const isPositive = variance >= 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    
    return (
      <div className={`flex items-center gap-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        <Icon className="w-4 h-4" />
        <span className="font-semibold">
          {isPositive ? '+' : ''}{formatCurrency(variance)}
        </span>
        <span className="text-sm">
          ({isPositive ? '+' : ''}{variancePercent.toFixed(1)}%)
        </span>
      </div>
    );
  };

  const revenueChartData = data.revenue.map(item => ({
    category: item.category.replace(' Revenue', ''),
    Budgeted: item.budgeted,
    Actual: item.actual,
  }));

  const expenseChartData = data.expenses.map(item => ({
    category: item.category.replace(' & Benefits', ''),
    Budgeted: item.budgeted,
    Actual: item.actual,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <ChartCard title="Revenue Variance">
          <div className="p-6">
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(data.summary.totalRevenueActual)}
            </div>
            <div className="text-sm text-white/60 mb-4">
              vs {formatCurrency(data.summary.totalRevenueBudgeted)} budgeted
            </div>
            {renderVarianceCell(data.summary.totalRevenueVariance, data.summary.totalRevenueVariancePercent)}
          </div>
        </ChartCard>

        <ChartCard title="Expense Variance">
          <div className="p-6">
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(data.summary.totalExpensesActual)}
            </div>
            <div className="text-sm text-white/60 mb-4">
              vs {formatCurrency(data.summary.totalExpensesBudgeted)} budgeted
            </div>
            {renderVarianceCell(data.summary.totalExpensesVariance, data.summary.totalExpensesVariancePercent)}
          </div>
        </ChartCard>

        <ChartCard title="Net Income Variance">
          <div className="p-6">
            <div className="text-3xl font-bold text-white mb-2">
              {formatCurrency(data.summary.netIncomeActual)}
            </div>
            <div className="text-sm text-white/60 mb-4">
              vs {formatCurrency(data.summary.netIncomeBudgeted)} budgeted
            </div>
            {renderVarianceCell(data.summary.netIncomeVariance, data.summary.netIncomeVariancePercent)}
          </div>
        </ChartCard>
      </div>

      {/* Revenue Variance Chart */}
      <ChartCard title="Revenue: Budgeted vs Actual">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="category" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
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
                formatter={(value) => `SAR ${value.toLocaleString()}`}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
              />
              <Bar dataKey="Budgeted" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Actual" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Revenue Variance Table */}
      <ChartCard title="Revenue Variance Details">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Category</TableHead>
              <TableHead className="text-white/70 text-right">Budgeted</TableHead>
              <TableHead className="text-white/70 text-right">Actual</TableHead>
              <TableHead className="text-white/70 text-right">Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.revenue.map((row, idx) => (
              <TableRow key={idx} className="border-white/10">
                <TableCell className="font-medium text-white">{row.category}</TableCell>
                <TableCell className="text-right text-white/70">{formatCurrency(row.budgeted)}</TableCell>
                <TableCell className="text-right text-white/70">{formatCurrency(row.actual)}</TableCell>
                <TableCell className="text-right">
                  {renderVarianceCell(row.variance, row.variancePercent)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-white/10 bg-white/5">
              <TableCell className="font-bold text-white">Total Revenue</TableCell>
              <TableCell className="text-right font-semibold text-white">{formatCurrency(data.summary.totalRevenueBudgeted)}</TableCell>
              <TableCell className="text-right font-semibold text-white">{formatCurrency(data.summary.totalRevenueActual)}</TableCell>
              <TableCell className="text-right">
                {renderVarianceCell(data.summary.totalRevenueVariance, data.summary.totalRevenueVariancePercent)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ChartCard>

      {/* Expense Variance Chart */}
      <ChartCard title="Expenses: Budgeted vs Actual">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={expenseChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="category" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
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
                formatter={(value) => `SAR ${value.toLocaleString()}`}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
              />
              <Bar dataKey="Budgeted" fill="#6366f1" radius={[8, 8, 0, 0]} />
              <Bar dataKey="Actual" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Expense Variance Table */}
      <ChartCard title="Expense Variance Details">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-white/70">Category</TableHead>
              <TableHead className="text-white/70 text-right">Budgeted</TableHead>
              <TableHead className="text-white/70 text-right">Actual</TableHead>
              <TableHead className="text-white/70 text-right">Variance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.expenses.map((row, idx) => (
              <TableRow key={idx} className="border-white/10">
                <TableCell className="font-medium text-white">{row.category}</TableCell>
                <TableCell className="text-right text-white/70">{formatCurrency(row.budgeted)}</TableCell>
                <TableCell className="text-right text-white/70">{formatCurrency(row.actual)}</TableCell>
                <TableCell className="text-right">
                  {renderVarianceCell(row.variance, row.variancePercent)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="border-white/10 bg-white/5">
              <TableCell className="font-bold text-white">Total Expenses</TableCell>
              <TableCell className="text-right font-semibold text-white">{formatCurrency(data.summary.totalExpensesBudgeted)}</TableCell>
              <TableCell className="text-right font-semibold text-white">{formatCurrency(data.summary.totalExpensesActual)}</TableCell>
              <TableCell className="text-right">
                {renderVarianceCell(data.summary.totalExpensesVariance, data.summary.totalExpensesVariancePercent)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ChartCard>
    </div>
  );
}