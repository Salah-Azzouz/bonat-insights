import React, { useState, useEffect } from 'react';
import { useDateRange } from '../utils/dateRangeContext';
import { getFinancialReportsData } from '../utils/dataService';
import ChartCard from '../dashboard/ChartCard';
import LoadingCard from '../dashboard/LoadingCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FinancialReports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStatement, setSelectedStatement] = useState('income');
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getFinancialReportsData(dateRange);
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

  const renderIncomeStatement = () => (
    <ChartCard title="Income Statement">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70 w-2/3">Account</TableHead>
            <TableHead className="text-white/70 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Revenue Section */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white">Revenue</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Subscription Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.revenue.subscriptionRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Marketplace Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.revenue.marketplaceRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Pickup Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.revenue.pickupRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">SMS Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.revenue.smsRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">WhatsApp Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.revenue.whatsappRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Revenue</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.incomeStatement.revenue.total)}</TableCell>
          </TableRow>

          {/* Cost of Revenue */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-6">Cost of Revenue</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Platform Costs</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.costOfRevenue.platformCosts)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Transaction Fees</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.costOfRevenue.transactionFees)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Customer Support</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.costOfRevenue.customerSupport)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Cost of Revenue</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.incomeStatement.costOfRevenue.total)}</TableCell>
          </TableRow>

          {/* Gross Profit */}
          <TableRow className="border-white/10 bg-green-500/10">
            <TableCell className="font-bold text-green-400 pt-4">Gross Profit</TableCell>
            <TableCell className="text-right font-bold text-green-400">{formatCurrency(data.incomeStatement.grossProfit)}</TableCell>
          </TableRow>

          {/* Operating Expenses */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-6">Operating Expenses</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Salaries & Benefits</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.operatingExpenses.salaries)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Infrastructure</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.operatingExpenses.infrastructure)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Marketing</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.operatingExpenses.marketing)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Sales</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.operatingExpenses.sales)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">R&D</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.operatingExpenses.rd)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Operations</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.operatingExpenses.operations)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Operating Expenses</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.incomeStatement.operatingExpenses.total)}</TableCell>
          </TableRow>

          {/* Operating Income */}
          <TableRow className="border-white/10 bg-red-500/10">
            <TableCell className="font-bold text-red-400 pt-4">Operating Income (Loss)</TableCell>
            <TableCell className="text-right font-bold text-red-400">{formatCurrency(data.incomeStatement.operatingIncome)}</TableCell>
          </TableRow>

          {/* Other Income/Expense */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-6">Other Income (Expense)</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Interest Income</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.otherIncomeExpense.interestIncome)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Interest Expense</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.incomeStatement.otherIncomeExpense.interestExpense)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Other Income</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.incomeStatement.otherIncomeExpense.total)}</TableCell>
          </TableRow>

          {/* Net Income */}
          <TableRow className="border-white/10 bg-green-500/10">
            <TableCell className="font-bold text-green-400 pt-4 text-lg">Net Income</TableCell>
            <TableCell className="text-right font-bold text-green-400 text-lg">{formatCurrency(data.incomeStatement.netIncome)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ChartCard>
  );

  const renderBalanceSheet = () => (
    <ChartCard title="Balance Sheet">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70 w-2/3">Account</TableHead>
            <TableHead className="text-white/70 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Assets */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white">ASSETS</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          
          {/* Current Assets */}
          <TableRow className="border-white/10">
            <TableCell className="font-semibold text-white pl-4">Current Assets</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Cash and Cash Equivalents</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.assets.current.cash)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Accounts Receivable</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.assets.current.accountsReceivable)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Prepaid Expenses</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.assets.current.prepaidExpenses)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Current Assets</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.balanceSheet.assets.current.total)}</TableCell>
          </TableRow>

          {/* Non-Current Assets */}
          <TableRow className="border-white/10">
            <TableCell className="font-semibold text-white pl-4 pt-4">Non-Current Assets</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Property & Equipment</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.assets.nonCurrent.propertyEquipment)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Intangible Assets</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.assets.nonCurrent.intangibleAssets)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Non-Current Assets</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.balanceSheet.assets.nonCurrent.total)}</TableCell>
          </TableRow>

          {/* Total Assets */}
          <TableRow className="border-white/10 bg-blue-500/10">
            <TableCell className="font-bold text-blue-400 pt-4 text-lg">TOTAL ASSETS</TableCell>
            <TableCell className="text-right font-bold text-blue-400 text-lg">{formatCurrency(data.balanceSheet.assets.totalAssets)}</TableCell>
          </TableRow>

          {/* Liabilities */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-8">LIABILITIES</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>

          {/* Current Liabilities */}
          <TableRow className="border-white/10">
            <TableCell className="font-semibold text-white pl-4">Current Liabilities</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Accounts Payable</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.liabilities.current.accountsPayable)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Accrued Expenses</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.liabilities.current.accruedExpenses)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Deferred Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.liabilities.current.deferredRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Current Liabilities</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.balanceSheet.liabilities.current.total)}</TableCell>
          </TableRow>

          {/* Non-Current Liabilities */}
          <TableRow className="border-white/10">
            <TableCell className="font-semibold text-white pl-4 pt-4">Non-Current Liabilities</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Long-Term Debt</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.liabilities.nonCurrent.longTermDebt)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-semibold text-white pl-8">Total Non-Current Liabilities</TableCell>
            <TableCell className="text-right font-semibold text-white">{formatCurrency(data.balanceSheet.liabilities.nonCurrent.total)}</TableCell>
          </TableRow>

          {/* Total Liabilities */}
          <TableRow className="border-white/10 bg-orange-500/10">
            <TableCell className="font-bold text-orange-400 pt-4">TOTAL LIABILITIES</TableCell>
            <TableCell className="text-right font-bold text-orange-400">{formatCurrency(data.balanceSheet.liabilities.totalLiabilities)}</TableCell>
          </TableRow>

          {/* Equity */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-8">EQUITY</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Common Stock</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.equity.commonStock)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Retained Earnings</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.balanceSheet.equity.retainedEarnings)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-green-500/10">
            <TableCell className="font-bold text-green-400 pt-4">TOTAL EQUITY</TableCell>
            <TableCell className="text-right font-bold text-green-400">{formatCurrency(data.balanceSheet.equity.totalEquity)}</TableCell>
          </TableRow>

          {/* Total Liabilities & Equity */}
          <TableRow className="border-white/10 bg-blue-500/10">
            <TableCell className="font-bold text-blue-400 pt-4 text-lg">TOTAL LIABILITIES & EQUITY</TableCell>
            <TableCell className="text-right font-bold text-blue-400 text-lg">{formatCurrency(data.balanceSheet.totalLiabilitiesEquity)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ChartCard>
  );

  const renderCashFlowStatement = () => (
    <ChartCard title="Cash Flow Statement">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-white/70 w-2/3">Account</TableHead>
            <TableHead className="text-white/70 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Operating Activities */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white">Cash Flows from Operating Activities</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Net Income</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.operatingActivities.netIncome)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="font-semibold text-white pl-4 pt-4">Adjustments to Reconcile Net Income:</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Depreciation & Amortization</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.operatingActivities.adjustments.depreciation)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Increase in Accounts Receivable</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.operatingActivities.adjustments.accountsReceivable)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Increase in Accounts Payable</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.operatingActivities.adjustments.accountsPayable)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-8">Increase in Deferred Revenue</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.operatingActivities.adjustments.deferredRevenue)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-green-500/10">
            <TableCell className="font-bold text-green-400 pt-4">Net Cash from Operating Activities</TableCell>
            <TableCell className="text-right font-bold text-green-400">{formatCurrency(data.cashFlowStatement.operatingActivities.netCashFromOperating)}</TableCell>
          </TableRow>

          {/* Investing Activities */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-6">Cash Flows from Investing Activities</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Purchase of Property & Equipment</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.investingActivities.propertyEquipment)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Purchase of Intangible Assets</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.investingActivities.intangibleAssets)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-red-500/10">
            <TableCell className="font-bold text-red-400 pt-4">Net Cash from Investing Activities</TableCell>
            <TableCell className="text-right font-bold text-red-400">{formatCurrency(data.cashFlowStatement.investingActivities.netCashFromInvesting)}</TableCell>
          </TableRow>

          {/* Financing Activities */}
          <TableRow className="border-white/10 bg-white/5">
            <TableCell className="font-bold text-white pt-6">Cash Flows from Financing Activities</TableCell>
            <TableCell className="text-right text-white"></TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Proceeds from Long-Term Debt</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.financingActivities.longTermDebtProceeds)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pl-4">Repayment of Long-Term Debt</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.financingActivities.longTermDebtRepayment)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-green-500/10">
            <TableCell className="font-bold text-green-400 pt-4">Net Cash from Financing Activities</TableCell>
            <TableCell className="text-right font-bold text-green-400">{formatCurrency(data.cashFlowStatement.financingActivities.netCashFromFinancing)}</TableCell>
          </TableRow>

          {/* Net Change in Cash */}
          <TableRow className="border-white/10 bg-blue-500/10">
            <TableCell className="font-bold text-blue-400 pt-6">Net Increase in Cash</TableCell>
            <TableCell className="text-right font-bold text-blue-400">{formatCurrency(data.cashFlowStatement.netCashChange)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10">
            <TableCell className="text-white/70 pt-4">Cash at Beginning of Period</TableCell>
            <TableCell className="text-right text-white/70">{formatCurrency(data.cashFlowStatement.beginningCash)}</TableCell>
          </TableRow>
          <TableRow className="border-white/10 bg-green-500/10">
            <TableCell className="font-bold text-green-400 pt-2 text-lg">Cash at End of Period</TableCell>
            <TableCell className="text-right font-bold text-green-400 text-lg">{formatCurrency(data.cashFlowStatement.endingCash)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ChartCard>
  );

  return (
    <div className="space-y-6">
      {/* Statement Selector */}
      <div className="flex justify-end">
        <Select value={selectedStatement} onValueChange={setSelectedStatement}>
          <SelectTrigger className="w-64 bg-[#1B2A4A] border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="income">Income Statement</SelectItem>
            <SelectItem value="balance">Balance Sheet</SelectItem>
            <SelectItem value="cashflow">Cash Flow Statement</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Render Selected Statement */}
      {selectedStatement === 'income' && renderIncomeStatement()}
      {selectedStatement === 'balance' && renderBalanceSheet()}
      {selectedStatement === 'cashflow' && renderCashFlowStatement()}
    </div>
  );
}