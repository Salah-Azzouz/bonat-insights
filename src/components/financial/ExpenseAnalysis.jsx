import React from 'react';
import KPICard from '../dashboard/KPICard';
import ChartCard from '../dashboard/ChartCard';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const EXPENSE_COLORS = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function ExpenseAnalysis({ operatingExpenses }) {
  // Mock expense data
  const expenseMetrics = {
    totalExpenses: { value: 233000, change: 3.2, sparkline: [220000, 223000, 226000, 229000, 233000] },
    salariesExpenses: { value: 145000, change: 2.1, sparkline: [140000, 141000, 143000, 144000, 145000] },
    infrastructureExpenses: { value: 28000, change: 5.5, sparkline: [25000, 26000, 26500, 27500, 28000] },
    marketingExpenses: { value: 18000, change: 12.5, sparkline: [15000, 15500, 16500, 17500, 18000] },
  };

  const expenseTrend = [
    { month: 'Aug 25', salaries: 140000, infrastructure: 25000, marketing: 15000, sales: 11000, rd: 20000, operations: 7500 },
    { month: 'Sep 25', salaries: 141000, infrastructure: 26000, marketing: 15500, sales: 11200, rd: 20500, operations: 7600 },
    { month: 'Oct 25', salaries: 143000, infrastructure: 26500, marketing: 16500, sales: 11500, rd: 21000, operations: 7700 },
    { month: 'Nov 25', salaries: 144000, infrastructure: 27500, marketing: 17500, sales: 11800, rd: 21500, operations: 7800 },
    { month: 'Dec 25', salaries: 145000, infrastructure: 28000, marketing: 18000, sales: 12000, rd: 22000, operations: 8000 },
  ];

  const expenseByCategory = [
    { category: 'Salaries', amount: 145000, percentage: 62.2 },
    { category: 'R&D', amount: 22000, percentage: 9.4 },
    { category: 'Infrastructure', amount: 28000, percentage: 12.0 },
    { category: 'Marketing', amount: 18000, percentage: 7.7 },
    { category: 'Sales', amount: 12000, percentage: 5.2 },
    { category: 'Operations', amount: 8000, percentage: 3.4 },
  ];

  const departmentBudget = [
    { department: 'Engineering', budget: 85000, actual: 82500, variance: -2500 },
    { department: 'Sales & Marketing', budget: 32000, actual: 30000, variance: -2000 },
    { department: 'Product', budget: 28000, actual: 29500, variance: 1500 },
    { department: 'Operations', budget: 18000, actual: 17000, variance: -1000 },
    { department: 'Customer Success', budget: 15000, actual: 15200, variance: 200 },
  ];

  return (
    <div className="space-y-6">
      {/* Expense KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Total Expenses" value={expenseMetrics.totalExpenses.value} prefix="SAR" change={expenseMetrics.totalExpenses.change} sparkline={expenseMetrics.totalExpenses.sparkline} />
        <KPICard title="Salaries" value={expenseMetrics.salariesExpenses.value} prefix="SAR" change={expenseMetrics.salariesExpenses.change} sparkline={expenseMetrics.salariesExpenses.sparkline} />
        <KPICard title="Infrastructure" value={expenseMetrics.infrastructureExpenses.value} prefix="SAR" change={expenseMetrics.infrastructureExpenses.change} sparkline={expenseMetrics.infrastructureExpenses.sparkline} />
        <KPICard title="Marketing" value={expenseMetrics.marketingExpenses.value} prefix="SAR" change={expenseMetrics.marketingExpenses.change} sparkline={expenseMetrics.marketingExpenses.sparkline} />
      </div>

      {/* Expense Trend */}
      <ChartCard title="Expense Trend by Category">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={expenseTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Line type="monotone" dataKey="salaries" stroke="#ef4444" strokeWidth={2} name="Salaries" />
            <Line type="monotone" dataKey="infrastructure" stroke="#f59e0b" strokeWidth={2} name="Infrastructure" />
            <Line type="monotone" dataKey="marketing" stroke="#10b981" strokeWidth={2} name="Marketing" />
            <Line type="monotone" dataKey="rd" stroke="#3b82f6" strokeWidth={2} name="R&D" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Operating Expenses */}
      <ChartCard title="Operating Expenses">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={operatingExpenses}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="category" stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Bar dataKey="amount" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-2 gap-6">

        {/* Expense Distribution */}
        <ChartCard title="Expense Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} (${percentage.toFixed(1)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
              >
                {expenseByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#1B2A4A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Department Budget vs Actual */}
        <ChartCard title="Department Budget vs Actual">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/70">Department</TableHead>
                <TableHead className="text-white/70 text-right">Budget</TableHead>
                <TableHead className="text-white/70 text-right">Actual</TableHead>
                <TableHead className="text-white/70 text-right">Variance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departmentBudget.map((row, idx) => (
                <TableRow key={idx} className="border-white/10">
                  <TableCell className="font-medium text-white">{row.department}</TableCell>
                  <TableCell className="text-right text-white/70">SAR {row.budget.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-white/70">SAR {row.actual.toLocaleString()}</TableCell>
                  <TableCell className={`text-right font-semibold ${row.variance < 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {row.variance > 0 ? '+' : ''}SAR {row.variance.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ChartCard>
      </div>
    </div>
  );
}