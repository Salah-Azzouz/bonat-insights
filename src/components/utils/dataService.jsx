// Centralized data service - all mock data functions that can be easily replaced with real API calls
// This modular architecture allows the dev team to swap mock data with real endpoints later

// Sales Reps with Arabic names
export const SALES_REPS = [
  { id: 'rep_1', name: 'أحمد العتيبي', email: 'ahmed@bonat.sa' },
  { id: 'rep_2', name: 'فاطمة المطيري', email: 'fatima@bonat.sa' },
  { id: 'rep_3', name: 'محمد القحطاني', email: 'mohammed@bonat.sa' },
  { id: 'rep_4', name: 'نورة الدوسري', email: 'noura@bonat.sa' },
  { id: 'rep_5', name: 'عبدالله السعيد', email: 'abdullah@bonat.sa' },
  { id: 'rep_6', name: 'ريم الشمري', email: 'reem@bonat.sa' },
  { id: 'rep_7', name: 'خالد الحربي', email: 'khaled@bonat.sa' },
  { id: 'rep_8', name: 'سارة العمري', email: 'sarah@bonat.sa' },
  { id: 'rep_9', name: 'يوسف الزهراني', email: 'yousef@bonat.sa' },
  { id: 'rep_10', name: 'منى الغامدي', email: 'mona@bonat.sa' },
  { id: 'rep_11', name: 'سعود البقمي', email: 'saud@bonat.sa' },
  { id: 'rep_12', name: 'لمى الجهني', email: 'lama@bonat.sa' },
  { id: 'rep_13', name: 'طارق العنزي', email: 'tareq@bonat.sa' },
];

// Core metrics - consistent across all pages
const CORE_METRICS = {
  mrr: 298500,
  arr: 3582000,
  activeMerchants: 2187,
  activeBranches: 4892,
  loyaltyMembers: 9023450,
  nps: 67,
};

// Executive Overview Data
export const getExecutiveOverview = async (dateRange) => {
  await simulateDelay();
  
  return {
    kpis: {
      mrr: { 
        value: CORE_METRICS.mrr, 
        change: 8.3, 
        trend: [
          { month: 'Mar 25', value: 265000 },
          { month: 'Apr 25', value: 271000 },
          { month: 'May 25', value: 278000 },
          { month: 'Jun 25', value: 283000 },
          { month: 'Jul 25', value: 287000 },
          { month: 'Aug 25', value: 289000 },
          { month: 'Sep 25', value: 291000 },
          { month: 'Oct 25', value: 293000 },
          { month: 'Nov 25', value: 295000 },
          { month: 'Dec 25', value: 297000 },
          { month: 'Jan 26', value: 298000 },
          { month: 'Feb 26', value: 298500 },
        ]
      },
      arr: { 
        value: CORE_METRICS.arr, 
        change: 8.3, 
        trend: [
          { month: 'Mar 25', value: 3180000 },
          { month: 'Apr 25', value: 3252000 },
          { month: 'May 25', value: 3336000 },
          { month: 'Jun 25', value: 3396000 },
          { month: 'Jul 25', value: 3444000 },
          { month: 'Aug 25', value: 3468000 },
          { month: 'Sep 25', value: 3492000 },
          { month: 'Oct 25', value: 3516000 },
          { month: 'Nov 25', value: 3540000 },
          { month: 'Dec 25', value: 3564000 },
          { month: 'Jan 26', value: 3576000 },
          { month: 'Feb 26', value: 3582000 },
        ]
      },
      totalRevenue: { 
        value: 315000, 
        change: 5.2, 
        trend: [
          { month: 'Mar 25', value: 285000 },
          { month: 'Apr 25', value: 289000 },
          { month: 'May 25', value: 293000 },
          { month: 'Jun 25', value: 297000 },
          { month: 'Jul 25', value: 301000 },
          { month: 'Aug 25', value: 304000 },
          { month: 'Sep 25', value: 307000 },
          { month: 'Oct 25', value: 310000 },
          { month: 'Nov 25', value: 312000 },
          { month: 'Dec 25', value: 314000 },
          { month: 'Jan 26', value: 315000 },
          { month: 'Feb 26', value: 315000 },
        ]
      },
      subscriptionRevenue: { 
        value: 125000, 
        change: 4.8, 
        trend: [
          { month: 'Mar 25', value: 112000 },
          { month: 'Apr 25', value: 114000 },
          { month: 'May 25', value: 116000 },
          { month: 'Jun 25', value: 118000 },
          { month: 'Jul 25', value: 120000 },
          { month: 'Aug 25', value: 121000 },
          { month: 'Sep 25', value: 122000 },
          { month: 'Oct 25', value: 123000 },
          { month: 'Nov 25', value: 124000 },
          { month: 'Dec 25', value: 124500 },
          { month: 'Jan 26', value: 125000 },
          { month: 'Feb 26', value: 125000 },
        ]
      },
      marketplaceRevenue: { 
        value: 82000, 
        change: 12.5, 
        trend: [
          { month: 'Mar 25', value: 68000 },
          { month: 'Apr 25', value: 70000 },
          { month: 'May 25', value: 72000 },
          { month: 'Jun 25', value: 74000 },
          { month: 'Jul 25', value: 76000 },
          { month: 'Aug 25', value: 77500 },
          { month: 'Sep 25', value: 79000 },
          { month: 'Oct 25', value: 80000 },
          { month: 'Nov 25', value: 81000 },
          { month: 'Dec 25', value: 81500 },
          { month: 'Jan 26', value: 82000 },
          { month: 'Feb 26', value: 82000 },
        ]
      },
      pickupRevenue: { 
        value: 45000, 
        change: 8.2, 
        trend: [
          { month: 'Mar 25', value: 39000 },
          { month: 'Apr 25', value: 40000 },
          { month: 'May 25', value: 41000 },
          { month: 'Jun 25', value: 42000 },
          { month: 'Jul 25', value: 42500 },
          { month: 'Aug 25', value: 43000 },
          { month: 'Sep 25', value: 43500 },
          { month: 'Oct 25', value: 44000 },
          { month: 'Nov 25', value: 44500 },
          { month: 'Dec 25', value: 44800 },
          { month: 'Jan 26', value: 45000 },
          { month: 'Feb 26', value: 45000 },
        ]
      },
      cashRunway: { value: 18.5, change: -2.1 },
      cac: { 
        value: 4200, 
        change: -2.1, 
        trend: [
          { month: 'Mar 25', value: 4680 },
          { month: 'Apr 25', value: 4620 },
          { month: 'May 25', value: 4550 },
          { month: 'Jun 25', value: 4490 },
          { month: 'Jul 25', value: 4430 },
          { month: 'Aug 25', value: 4380 },
          { month: 'Sep 25', value: 4340 },
          { month: 'Oct 25', value: 4310 },
          { month: 'Nov 25', value: 4280 },
          { month: 'Dec 25', value: 4250 },
          { month: 'Jan 26', value: 4220 },
          { month: 'Feb 26', value: 4200 },
        ]
      },
      activeMerchants: { 
        value: CORE_METRICS.activeMerchants, 
        change: 4.2, 
        trend: [
          { month: 'Mar 25', value: 2056 },
          { month: 'Apr 25', value: 2072 },
          { month: 'May 25', value: 2089 },
          { month: 'Jun 25', value: 2105 },
          { month: 'Jul 25', value: 2121 },
          { month: 'Aug 25', value: 2137 },
          { month: 'Sep 25', value: 2148 },
          { month: 'Oct 25', value: 2159 },
          { month: 'Nov 25', value: 2168 },
          { month: 'Dec 25', value: 2175 },
          { month: 'Jan 26', value: 2181 },
          { month: 'Feb 26', value: 2187 },
        ]
      },
      activeBranches: { 
        value: CORE_METRICS.activeBranches, 
        change: 5.8, 
        trend: [
          { month: 'Mar 25', value: 4520 },
          { month: 'Apr 25', value: 4568 },
          { month: 'May 25', value: 4612 },
          { month: 'Jun 25', value: 4658 },
          { month: 'Jul 25', value: 4702 },
          { month: 'Aug 25', value: 4745 },
          { month: 'Sep 25', value: 4782 },
          { month: 'Oct 25', value: 4818 },
          { month: 'Nov 25', value: 4848 },
          { month: 'Dec 25', value: 4868 },
          { month: 'Jan 26', value: 4882 },
          { month: 'Feb 26', value: 4892 },
        ]
      },
      churnRate: { 
        value: 2.3, 
        change: -0.5, 
        trend: [
          { month: 'Mar 25', value: 2.9 },
          { month: 'Apr 25', value: 2.8 },
          { month: 'May 25', value: 2.8 },
          { month: 'Jun 25', value: 2.7 },
          { month: 'Jul 25', value: 2.6 },
          { month: 'Aug 25', value: 2.6 },
          { month: 'Sep 25', value: 2.5 },
          { month: 'Oct 25', value: 2.5 },
          { month: 'Nov 25', value: 2.4 },
          { month: 'Dec 25', value: 2.4 },
          { month: 'Jan 26', value: 2.3 },
          { month: 'Feb 26', value: 2.3 },
        ]
      },
      mau: { 
        value: 142500, 
        change: 6.8, 
        trend: [
          { month: 'Mar 25', value: 128000 },
          { month: 'Apr 25', value: 130500 },
          { month: 'May 25', value: 132000 },
          { month: 'Jun 25', value: 134500 },
          { month: 'Jul 25', value: 136000 },
          { month: 'Aug 25', value: 137500 },
          { month: 'Sep 25', value: 139000 },
          { month: 'Oct 25', value: 140000 },
          { month: 'Nov 25', value: 141000 },
          { month: 'Dec 25', value: 141500 },
          { month: 'Jan 26', value: 142000 },
          { month: 'Feb 26', value: 142500 },
        ]
      },
      newBrands: { 
        value: 92, 
        change: 12.2, 
        trend: [
          { month: 'Mar 25', value: 76 },
          { month: 'Apr 25', value: 79 },
          { month: 'May 25', value: 81 },
          { month: 'Jun 25', value: 83 },
          { month: 'Jul 25', value: 85 },
          { month: 'Aug 25', value: 86 },
          { month: 'Sep 25', value: 88 },
          { month: 'Oct 25', value: 89 },
          { month: 'Nov 25', value: 90 },
          { month: 'Dec 25', value: 91 },
          { month: 'Jan 26', value: 91 },
          { month: 'Feb 26', value: 92 },
        ]
      },
      lostBrands: { 
        value: 51, 
        change: -8.5, 
        trend: [
          { month: 'Mar 25', value: 62 },
          { month: 'Apr 25', value: 60 },
          { month: 'May 25', value: 58 },
          { month: 'Jun 25', value: 57 },
          { month: 'Jul 25', value: 56 },
          { month: 'Aug 25', value: 55 },
          { month: 'Sep 25', value: 54 },
          { month: 'Oct 25', value: 53 },
          { month: 'Nov 25', value: 53 },
          { month: 'Dec 25', value: 52 },
          { month: 'Jan 26', value: 52 },
          { month: 'Feb 26', value: 51 },
        ]
      },
      lostSubscriptions: { 
        value: 185, 
        change: -6.2, 
        trend: [
          { month: 'Mar 25', value: 212 },
          { month: 'Apr 25', value: 208 },
          { month: 'May 25', value: 204 },
          { month: 'Jun 25', value: 200 },
          { month: 'Jul 25', value: 198 },
          { month: 'Aug 25', value: 195 },
          { month: 'Sep 25', value: 192 },
          { month: 'Oct 25', value: 190 },
          { month: 'Nov 25', value: 188 },
          { month: 'Dec 25', value: 187 },
          { month: 'Jan 26', value: 186 },
          { month: 'Feb 26', value: 185 },
        ]
      },
      brandChurnRate: { 
        value: 2.3, 
        change: -0.5, 
        trend: [
          { month: 'Mar 25', value: 2.9 },
          { month: 'Apr 25', value: 2.8 },
          { month: 'May 25', value: 2.8 },
          { month: 'Jun 25', value: 2.7 },
          { month: 'Jul 25', value: 2.6 },
          { month: 'Aug 25', value: 2.6 },
          { month: 'Sep 25', value: 2.5 },
          { month: 'Oct 25', value: 2.5 },
          { month: 'Nov 25', value: 2.4 },
          { month: 'Dec 25', value: 2.4 },
          { month: 'Jan 26', value: 2.3 },
          { month: 'Feb 26', value: 2.3 },
        ]
      },
      newSubscriptions: { 
        value: 342, 
        change: 15.8, 
        trend: [
          { month: 'Mar 25', value: 278 },
          { month: 'Apr 25', value: 285 },
          { month: 'May 25', value: 292 },
          { month: 'Jun 25', value: 298 },
          { month: 'Jul 25', value: 305 },
          { month: 'Aug 25', value: 312 },
          { month: 'Sep 25', value: 318 },
          { month: 'Oct 25', value: 324 },
          { month: 'Nov 25', value: 330 },
          { month: 'Dec 25', value: 335 },
          { month: 'Jan 26', value: 339 },
          { month: 'Feb 26', value: 342 },
        ]
      },
      subscriptionChurnRate: { 
        value: 3.2, 
        change: -0.8, 
        trend: [
          { month: 'Mar 25', value: 4.1 },
          { month: 'Apr 25', value: 4.0 },
          { month: 'May 25', value: 3.9 },
          { month: 'Jun 25', value: 3.8 },
          { month: 'Jul 25', value: 3.7 },
          { month: 'Aug 25', value: 3.6 },
          { month: 'Sep 25', value: 3.5 },
          { month: 'Oct 25', value: 3.4 },
          { month: 'Nov 25', value: 3.4 },
          { month: 'Dec 25', value: 3.3 },
          { month: 'Jan 26', value: 3.2 },
          { month: 'Feb 26', value: 3.2 },
        ]
      },
      arps: { 
        value: 1365, 
        change: 4.5, 
        trend: [
          { month: 'Mar 25', value: 1265 },
          { month: 'Apr 25', value: 1280 },
          { month: 'May 25', value: 1295 },
          { month: 'Jun 25', value: 1308 },
          { month: 'Jul 25', value: 1320 },
          { month: 'Aug 25', value: 1330 },
          { month: 'Sep 25', value: 1340 },
          { month: 'Oct 25', value: 1348 },
          { month: 'Nov 25', value: 1355 },
          { month: 'Dec 25', value: 1360 },
          { month: 'Jan 26', value: 1363 },
          { month: 'Feb 26', value: 1365 },
        ]
      },
      monthlyArpa: { 
        value: 136.5, 
        change: 3.8, 
        trend: [
          { month: 'Mar 25', value: 128.0 },
          { month: 'Apr 25', value: 129.5 },
          { month: 'May 25', value: 131.0 },
          { month: 'Jun 25', value: 132.2 },
          { month: 'Jul 25', value: 133.5 },
          { month: 'Aug 25', value: 134.5 },
          { month: 'Sep 25', value: 135.2 },
          { month: 'Oct 25', value: 135.8 },
          { month: 'Nov 25', value: 136.2 },
          { month: 'Dec 25', value: 136.4 },
          { month: 'Jan 26', value: 136.5 },
          { month: 'Feb 26', value: 136.5 },
        ]
      },
      totalArpa: { 
        value: 1638, 
        change: 4.2, 
        trend: [
          { month: 'Mar 25', value: 1536 },
          { month: 'Apr 25', value: 1554 },
          { month: 'May 25', value: 1572 },
          { month: 'Jun 25', value: 1590 },
          { month: 'Jul 25', value: 1602 },
          { month: 'Aug 25', value: 1614 },
          { month: 'Sep 25', value: 1622 },
          { month: 'Oct 25', value: 1630 },
          { month: 'Nov 25', value: 1634 },
          { month: 'Dec 25', value: 1636 },
          { month: 'Jan 26', value: 1637 },
          { month: 'Feb 26', value: 1638 },
        ]
      },
      gmv: { 
        value: 2850000, 
        change: 14.5, 
        trend: [
          { month: 'Mar 25', value: 2380000 },
          { month: 'Apr 25', value: 2450000 },
          { month: 'May 25', value: 2520000 },
          { month: 'Jun 25', value: 2590000 },
          { month: 'Jul 25', value: 2650000 },
          { month: 'Aug 25', value: 2710000 },
          { month: 'Sep 25', value: 2760000 },
          { month: 'Oct 25', value: 2800000 },
          { month: 'Nov 25', value: 2825000 },
          { month: 'Dec 25', value: 2838000 },
          { month: 'Jan 26', value: 2845000 },
          { month: 'Feb 26', value: 2850000 },
        ]
      },
      appUserCac: { 
        value: 145, 
        change: -5.2, 
        trend: [
          { month: 'Mar 25', value: 168 },
          { month: 'Apr 25', value: 165 },
          { month: 'May 25', value: 162 },
          { month: 'Jun 25', value: 160 },
          { month: 'Jul 25', value: 158 },
          { month: 'Aug 25', value: 156 },
          { month: 'Sep 25', value: 154 },
          { month: 'Oct 25', value: 152 },
          { month: 'Nov 25', value: 150 },
          { month: 'Dec 25', value: 148 },
          { month: 'Jan 26', value: 146 },
          { month: 'Feb 26', value: 145 },
        ]
      },
    },
    mrrTrend: [
      { month: 'Mar 25', value: 265000 },
      { month: 'Apr 25', value: 271000 },
      { month: 'May 25', value: 278000 },
      { month: 'Jun 25', value: 283000 },
      { month: 'Jul 25', value: 287000 },
      { month: 'Aug 25', value: 289000 },
      { month: 'Sep 25', value: 291000 },
      { month: 'Oct 25', value: 293000 },
      { month: 'Nov 25', value: 295000 },
      { month: 'Dec 25', value: 297000 },
      { month: 'Jan 26', value: 298000 },
      { month: 'Feb 26', value: 298500 },
    ],
    salesTarget: { target: 320000, actual: 298500, percentage: 93.3 },
    atRiskMerchants: [
      { name: 'مجموعة الراشد التجارية', healthScore: 32, mrr: 8500, reason: 'Low engagement, 45 days since last login' },
      { name: 'شركة النخبة للتجزئة', healthScore: 28, mrr: 6200, reason: 'Payment failed twice, support tickets open' },
      { name: 'متاجر الأمل', healthScore: 35, mrr: 4800, reason: 'Declining transaction volume' },
      { name: 'مؤسسة الابتكار', healthScore: 38, mrr: 7100, reason: 'Contract expiring in 30 days' },
    ],
  };
};

// Financial Data
export const getFinancialData = async (dateRange) => {
  await simulateDelay();
  
  return {
    revenue: {
      gross: { value: 315000, change: 5.2, sparkline: [302000, 305000, 308000, 312000, 315000] },
      net: { value: CORE_METRICS.mrr, change: 8.3, sparkline: [285000, 287000, 291000, 295000, 298500] },
      arpm: { value: 136.5, change: 3.8, sparkline: [130, 132, 134, 135, 136.5] },
      gmv: { value: 2850000, change: 14.5, sparkline: [2450000, 2550000, 2680000, 2750000, 2850000] },
      cac: { value: 4200, change: -2.1, sparkline: [4500, 4400, 4300, 4250, 4200] },
      clv: { value: 24500, change: 4.5, sparkline: [23000, 23500, 24000, 24200, 24500] },
      clvCacRatio: { value: 5.83, change: 6.2, sparkline: [5.1, 5.3, 5.5, 5.7, 5.83] },
      grossMargin: { value: 78.5, change: 1.8, sparkline: [77, 77.5, 78, 78.2, 78.5] },
      netMargin: { value: 65.2, change: 2.3, sparkline: [63, 63.5, 64, 64.5, 65.2] },
      monthlyBurnRate: { value: 185000, change: -3.5, sparkline: [198000, 195000, 190000, 188000, 185000] },
      costOfRevenue: { value: 67725, change: 2.8, sparkline: [65000, 66000, 66500, 67000, 67725] },
      grossProfit: { value: 247275, change: 6.2, sparkline: [237000, 239000, 241500, 245000, 247275] },
      cashOnHand: { value: 3425000, change: 4.8, sparkline: [3250000, 3300000, 3350000, 3400000, 3425000] },
    },
    revenueTrend: [
      { month: 'Aug 25', gross: 302000, net: 287000 },
      { month: 'Sep 25', gross: 305000, net: 289000 },
      { month: 'Oct 25', gross: 308000, net: 291000 },
      { month: 'Nov 25', gross: 310000, net: 293000 },
      { month: 'Dec 25', gross: 312000, net: 295000 },
      { month: 'Jan 26', gross: 314000, net: 297000 },
      { month: 'Feb 26', gross: 315000, net: 298500 },
    ],
    revenueByProduct: [
      { name: 'Subscription Revenue', value: 125000, percentage: 41.9 },
      { name: 'Marketplace Revenue', value: 82000, percentage: 27.5 },
      { name: 'Pickup Revenue', value: 45000, percentage: 15.1 },
      { name: 'SMS Revenue', value: 28500, percentage: 9.5 },
      { name: 'WhatsApp Revenue', value: 18000, percentage: 6.0 },
    ],
    operatingExpenses: [
      { category: 'Salaries', amount: 145000 },
      { category: 'Infrastructure', amount: 28000 },
      { category: 'Marketing', amount: 18000 },
      { category: 'Sales', amount: 12000 },
      { category: 'R&D', amount: 22000 },
      { category: 'Operations', amount: 8000 },
    ],
    arAging: [
      { bucket: '0-30 days', amount: 125000, count: 856 },
      { bucket: '31-60 days', amount: 42000, count: 198 },
      { bucket: '61-90 days', amount: 18500, count: 87 },
      { bucket: '90+ days', amount: 9200, count: 34 },
    ],
  };
};

// Sales Data
export const getSalesData = async (dateRange, salesRepId) => {
  await simulateDelay();
  
  const allLeaderboard = [
    { repId: 'rep_1', name: 'أحمد العتيبي', dealsCreated: 45, dealsWon: 18, pipelineValue: 285000, revenue: 142000, quotaAttainment: 118 },
    { repId: 'rep_2', name: 'فاطمة المطيري', dealsCreated: 38, dealsWon: 16, pipelineValue: 242000, revenue: 128000, quotaAttainment: 107 },
    { repId: 'rep_3', name: 'محمد القحطاني', dealsCreated: 42, dealsWon: 15, pipelineValue: 268000, revenue: 118000, quotaAttainment: 98 },
    { repId: 'rep_4', name: 'نورة الدوسري', dealsCreated: 36, dealsWon: 14, pipelineValue: 225000, revenue: 112000, quotaAttainment: 93 },
    { repId: 'rep_5', name: 'عبدالله السعيد', dealsCreated: 40, dealsWon: 13, pipelineValue: 238000, revenue: 105000, quotaAttainment: 88 },
    { repId: 'rep_6', name: 'ريم الشمري', dealsCreated: 33, dealsWon: 12, pipelineValue: 198000, revenue: 98000, quotaAttainment: 82 },
    { repId: 'rep_7', name: 'خالد الحربي', dealsCreated: 35, dealsWon: 11, pipelineValue: 208000, revenue: 89000, quotaAttainment: 74 },
    { repId: 'rep_8', name: 'سارة العمري', dealsCreated: 31, dealsWon: 10, pipelineValue: 185000, revenue: 82000, quotaAttainment: 68 },
    { repId: 'rep_9', name: 'يوسف الزهراني', dealsCreated: 29, dealsWon: 9, pipelineValue: 172000, revenue: 75000, quotaAttainment: 63 },
    { repId: 'rep_10', name: 'منى الغامدي', dealsCreated: 28, dealsWon: 8, pipelineValue: 165000, revenue: 68000, quotaAttainment: 57 },
    { repId: 'rep_11', name: 'سعود البقمي', dealsCreated: 26, dealsWon: 7, pipelineValue: 152000, revenue: 62000, quotaAttainment: 52 },
    { repId: 'rep_12', name: 'لمى الجهني', dealsCreated: 24, dealsWon: 6, pipelineValue: 142000, revenue: 55000, quotaAttainment: 46 },
    { repId: 'rep_13', name: 'طارق العنزي', dealsCreated: 22, dealsWon: 5, pipelineValue: 128000, revenue: 48000, quotaAttainment: 40 },
  ];

  const leaderboard = salesRepId 
    ? allLeaderboard.filter(rep => rep.repId === salesRepId)
    : allLeaderboard;

  const totalDealsWon = salesRepId 
    ? leaderboard[0]?.dealsWon || 0
    : allLeaderboard.reduce((sum, rep) => sum + rep.dealsWon, 0);

  const totalDealsLost = salesRepId ? 8 : 52;

  return {
    pipeline: [
      { stage: 'Lead', count: 185, value: 925000 },
      { stage: 'Qualified', count: 142, value: 782000 },
      { stage: 'Proposal', count: 95, value: 618000 },
      { stage: 'Negotiation', count: 58, value: 445000 },
      { stage: 'Closed Won', count: totalDealsWon, value: 1134000 },
    ],
    winRate: 40.2,
    dealsWon: totalDealsWon,
    dealsLost: totalDealsLost,
    salesTarget: { target: 1200000, actual: 1134000, percentage: 94.5 },
    leaderboard,
    leadCategories: [
      { category: 'Restaurants', value: 28 },
      { category: 'Cafes', value: 22 },
      { category: 'Salons', value: 18 },
      { category: 'Gas Stations', value: 12 },
      { category: 'Pharmacies', value: 10 },
      { category: 'Supermarkets', value: 10 },
    ],
  };
};

// Merchants Data
export const getMerchantsData = async (dateRange) => {
  await simulateDelay();
  
  return {
    metrics: {
      active: CORE_METRICS.activeMerchants,
      new: 92,
      churned: 51,
      netGrowth: 41,
      churnRate: 2.3,
      retentionRate: 97.7,
      activationRate: 86.5,
      activeSubscriptions: 4892,
      newSubscriptions: 342,
      subscriptionChurnRate: 3.2,
    },
    growthTrend: [
      { month: 'Aug 25', active: 2098, new: 78, churned: 42 },
      { month: 'Sep 25', active: 2125, new: 69, churned: 42 },
      { month: 'Oct 25', active: 2151, new: 82, churned: 56 },
      { month: 'Nov 25', active: 2168, new: 85, churned: 68 },
      { month: 'Dec 25', active: 2180, new: 73, churned: 61 },
      { month: 'Jan 26', active: 2185, new: 88, churned: 83 },
      { month: 'Feb 26', active: 2187, new: 92, churned: 51 },
    ],
    healthDistribution: [
      { category: 'Champion', count: 892, percentage: 40.8 },
      { category: 'Healthy', count: 756, percentage: 34.6 },
      { category: 'Needs Attention', count: 412, percentage: 18.8 },
      { category: 'At Risk', count: 127, percentage: 5.8 },
    ],
    atRiskMerchants: [
      { name: 'مجموعة الراشد التجارية', plan: 'Enterprise', mrr: 8500, healthScore: 32, lastActive: '45 days ago' },
      { name: 'شركة النخبة للتجزئة', plan: 'Professional', mrr: 6200, healthScore: 28, lastActive: '38 days ago' },
      { name: 'متاجر الأمل', plan: 'Professional', mrr: 4800, healthScore: 35, lastActive: '32 days ago' },
      { name: 'مؤسسة الابتكار', plan: 'Business', mrr: 7100, healthScore: 38, lastActive: '28 days ago' },
      { name: 'شركة الأفق التجارية', plan: 'Business', mrr: 5200, healthScore: 36, lastActive: '41 days ago' },
    ],
    byRegion: [
      { region: 'Riyadh', count: 856 },
      { region: 'Jeddah', count: 612 },
      { region: 'Dammam', count: 385 },
      { region: 'Makkah', count: 198 },
      { region: 'Madinah', count: 136 },
    ],
    byPlan: [
      { plan: 'Starter', count: 892, percentage: 40.8 },
      { plan: 'Business', count: 678, percentage: 31.0 },
      { plan: 'Professional', count: 425, percentage: 19.4 },
      { plan: 'Enterprise', count: 192, percentage: 8.8 },
    ],
  };
};

// Loyalty & Campaigns Data
export const getLoyaltyData = async (dateRange) => {
  await simulateDelay();
  
  return {
    loyalty: {
      programs: 1845,
      members: CORE_METRICS.loyaltyMembers,
      pointsIssued: 45820000,
      pointsRedeemed: 32185000,
      redemptionRate: 70.2,
      pointsLiability: 13635000,
      adoptionRate: 84.3,
    },
    giftCards: {
      sold: 125800,
      revenue: 18750000,
      redemptionRate: 82.5,
      avgValue: 149,
    },
    promotions: {
      active: 342,
      redemptionByType: [
        { type: 'Percentage Discount', count: 45820 },
        { type: 'Fixed Amount', count: 38650 },
        { type: 'Buy One Get One', count: 28420 },
        { type: 'Free Shipping', count: 18250 },
      ],
    },
    campaigns: {
      active: 156,
      performance: [
        { name: 'Summer Loyalty Boost', roi: 385, deliveryRate: 98.5, openRate: 42.8, merchants: 425 },
        { name: 'Gift Card Holiday Push', roi: 312, deliveryRate: 97.2, openRate: 38.5, merchants: 368 },
        { name: 'Valentine\'s Promotion', roi: 298, deliveryRate: 99.1, openRate: 45.2, merchants: 512 },
        { name: 'New Member Welcome', roi: 245, deliveryRate: 96.8, openRate: 36.9, merchants: 892 },
        { name: 'Re-engagement Campaign', roi: 218, deliveryRate: 94.5, openRate: 28.4, merchants: 215 },
      ],
    },
  };
};

// Feedback Data
export const getFeedbackData = async (dateRange) => {
  await simulateDelay();
  
  return {
    nps: CORE_METRICS.nps,
    avgRating: 4.3,
    responseCount: 8542,
    responseRate: 68.5,
    sentiment: [
      { category: 'Positive', count: 5826, percentage: 68.2 },
      { category: 'Neutral', count: 1825, percentage: 21.4 },
      { category: 'Negative', count: 891, percentage: 10.4 },
    ],
    ratingTrend: [
      { month: 'Aug 25', rating: 4.1 },
      { month: 'Sep 25', rating: 4.1 },
      { month: 'Oct 25', rating: 4.2 },
      { month: 'Nov 25', rating: 4.2 },
      { month: 'Dec 25', rating: 4.2 },
      { month: 'Jan 26', rating: 4.3 },
      { month: 'Feb 26', rating: 4.3 },
    ],
    topThemes: [
      { theme: 'Easy to use', mentions: 1248, sentiment: 'positive' },
      { theme: 'Great customer support', mentions: 985, sentiment: 'positive' },
      { theme: 'Missing features', mentions: 542, sentiment: 'negative' },
      { theme: 'Reliable platform', mentions: 892, sentiment: 'positive' },
      { theme: 'Pricing concerns', mentions: 385, sentiment: 'negative' },
    ],
    recentFeedback: [
      { merchant: 'مجموعة الفيصل', rating: 5, comment: 'The loyalty program integration is seamless and our customers love it!', sentiment: 'positive', date: '2026-02-14' },
      { merchant: 'متاجر النور', rating: 4, comment: 'Good platform overall, but would like to see more customization options', sentiment: 'positive', date: '2026-02-14' },
      { merchant: 'شركة الهدى التجارية', rating: 2, comment: 'Having issues with the gift card redemption process', sentiment: 'negative', date: '2026-02-13' },
      { merchant: 'مؤسسة الرواد', rating: 5, comment: 'Excellent support team, they resolved our issue within hours', sentiment: 'positive', date: '2026-02-13' },
      { merchant: 'متجر الأمانة', rating: 4, comment: 'The dashboard analytics are very helpful for our business', sentiment: 'positive', date: '2026-02-12' },
    ],
  };
};

// App Usage Data
export const getAppUsageData = async (dateRange) => {
  await simulateDelay();
  
  // Generate engagement trend data based on selected date range
  const getEngagementTrend = () => {
    const baseDAU = 48250;
    const baseMAU = 142500;
    
    switch(dateRange) {
      case 'last_7_days':
        return [
          { date: 'Feb 9', dau: 46800, mau: 141000 },
          { date: 'Feb 10', dau: 47200, mau: 141200 },
          { date: 'Feb 11', dau: 47500, mau: 141500 },
          { date: 'Feb 12', dau: 47800, mau: 141800 },
          { date: 'Feb 13', dau: 48000, mau: 142000 },
          { date: 'Feb 14', dau: 48100, mau: 142200 },
          { date: 'Feb 15', dau: 48250, mau: 142500 },
        ];
      case 'last_30_days':
        return Array.from({ length: 30 }, (_, i) => {
          const dau = baseDAU - (29 - i) * 150 + Math.random() * 500;
          const mau = baseMAU - (29 - i) * 400 + Math.random() * 800;
          return {
            date: `Day ${i + 1}`,
            dau: Math.round(dau),
            mau: Math.round(mau),
          };
        });
      case 'last_90_days':
        return Array.from({ length: 13 }, (_, i) => {
          const dau = baseDAU - (12 - i) * 450 + Math.random() * 800;
          const mau = baseMAU - (12 - i) * 1200 + Math.random() * 1500;
          return {
            date: `Week ${i + 1}`,
            dau: Math.round(dau),
            mau: Math.round(mau),
          };
        });
      case 'last_12_months':
        return [
          { date: 'Mar 25', dau: 41200, mau: 128000 },
          { date: 'Apr 25', dau: 42100, mau: 130500 },
          { date: 'May 25', dau: 42800, mau: 132000 },
          { date: 'Jun 25', dau: 43500, mau: 134500 },
          { date: 'Jul 25', dau: 44200, mau: 136000 },
          { date: 'Aug 25', dau: 44800, mau: 137500 },
          { date: 'Sep 25', dau: 45500, mau: 139000 },
          { date: 'Oct 25', dau: 46200, mau: 140000 },
          { date: 'Nov 25', dau: 46800, mau: 141000 },
          { date: 'Dec 25', dau: 47200, mau: 141500 },
          { date: 'Jan 26', dau: 47800, mau: 142000 },
          { date: 'Feb 26', dau: 48250, mau: 142500 },
        ];
      default:
        return [];
    }
  };
  
  return {
    metrics: {
      dau: 48250,
      mau: 142500,
      dauMauRatio: 33.9,
      uptime: 99.8,
      supportTickets: 285,
      avgResolutionTime: 4.2,
    },
    engagementTrend: getEngagementTrend(),
    featureAdoption: [
      { feature: 'Loyalty Programs', adoption: 84.3 },
      { feature: 'Gift Cards', adoption: 72.8 },
      { feature: 'Feedback Solutions', adoption: 68.5 },
      { feature: 'Promotions', adoption: 58.2 },
      { feature: 'Marketing Campaigns', adoption: 45.6 },
    ],
    supportTicketTrend: [
      { week: 'Week 1', tickets: 312, resolved: 298 },
      { week: 'Week 2', tickets: 298, resolved: 285 },
      { week: 'Week 3', tickets: 285, resolved: 276 },
      { week: 'Week 4', tickets: 275, resolved: 268 },
    ],
  };
};

// Marketplace Data
export const getMarketplaceData = async (dateRange, timePeriod = 'month') => {
  await simulateDelay();
  
  // Generate merchants with different rankings based on time period
  const merchants = generateMerchantsForPeriod(200, timePeriod);
  
  const mau = 142500; // From core metrics
  const numberOfCustomers = 284500;
  const customerToActiveUserRatio = ((mau / numberOfCustomers) * 100).toFixed(1);

  return {
    metrics: {
        totalRevenue: { value: 18750000, change: 12.5 },
        monthlyRevenue: { value: 1562500, change: 8.2 },
        totalProfit: { value: 5625000, change: 15.3 },
        monthlyProfit: { value: 468750, change: 9.8 },
        avgProfitMargin: { value: 30.0, change: 2.1 },
        numberOfCustomers: { value: numberOfCustomers, change: 14.8 },
        customerToActiveUserRatio: { value: parseFloat(customerToActiveUserRatio), change: -2.3 },
        giftCardsSold: { value: 125800, change: 18.5 },
      couponsSold: { value: 89400, change: 14.2 },
      subscriptionVouchersSold: { value: 34200, change: 22.8 },
      totalGiftCardSales: { value: 18750000, change: 15.2 },
      internalGiftCardSales: { value: 13125000, change: 16.8 },
      externalGiftCardSales: { value: 5625000, change: 11.5 },
      totalCouponSales: { value: 4470000, change: 12.8 },
      internalCouponSales: { value: 3129000, change: 14.2 },
      externalCouponSales: { value: 1341000, change: 9.5 },
      avgCheckGiftCard: { value: 149, change: -2.1 },
      avgCheckCoupon: { value: 50, change: -1.5 },
      totalTransactions: { value: 215200, change: 16.8 },
    },
    resell: {
      totalSales: { value: 8450000, change: 18.5 },
      totalPurchase: { value: 5915000, change: 16.2 },
      avgMarkup: { value: 42.8, change: 2.3 },
      avgProfitMargin: { value: 30.0, change: 1.8 },
      profitMargin: { value: 30.0, change: 1.8 },
      avgInventoryTurnover: { value: 6.8, change: 5.2 },
      avgMerchantDiscount: { value: 25.5, change: -1.2 },
      avgAppDiscount: { value: 12.3, change: 0.8 },
    },
    externalMarketplace: {
      totalSales: { value: 12450000, change: 24.8 },
      avgMargin: { value: 15.5, change: 2.4 },
      totalProfit: { value: 1929750, change: 28.2 },
      totalTransactions: { value: 342500, change: 21.5 },
      avgTransaction: { value: 36.35, change: 2.7 },
      merchants: [
        { name: 'Amazon', transactions: 45200, revenue: 1845000, commission: 15.0 },
        { name: 'McDonald\'s', transactions: 38500, revenue: 1425000, commission: 12.5 },
        { name: 'Sony', transactions: 28400, revenue: 1680000, commission: 10.0 },
        { name: 'IKEA', transactions: 22100, revenue: 1520000, commission: 8.5 },
        { name: 'Ocean Spa', transactions: 19800, revenue: 985000, commission: 14.0 },
        { name: 'Starbucks', transactions: 32500, revenue: 845000, commission: 13.0 },
        { name: 'Nike', transactions: 18200, revenue: 1125000, commission: 9.5 },
        { name: 'Adidas', transactions: 17500, revenue: 1050000, commission: 9.0 },
        { name: 'Apple', transactions: 12800, revenue: 1890000, commission: 7.0 },
        { name: 'Samsung', transactions: 15600, revenue: 1245000, commission: 7.5 },
        { name: 'Zara', transactions: 24300, revenue: 895000, commission: 11.0 },
        { name: 'H&M', transactions: 21800, revenue: 725000, commission: 11.5 },
        { name: 'Carrefour', transactions: 28900, revenue: 1150000, commission: 6.5 },
        { name: 'Panda', transactions: 26700, revenue: 1080000, commission: 6.0 },
        { name: 'Extra', transactions: 23400, revenue: 965000, commission: 8.0 },
        { name: 'Jarir Bookstore', transactions: 14200, revenue: 785000, commission: 10.5 },
        { name: 'Sephora', transactions: 16800, revenue: 920000, commission: 13.5 },
        { name: 'The Body Shop', transactions: 12500, revenue: 485000, commission: 12.0 },
        { name: 'Centrepoint', transactions: 19200, revenue: 825000, commission: 9.0 },
        { name: 'Toys R Us', transactions: 11400, revenue: 545000, commission: 5.5 },
        { name: 'Fitness Time', transactions: 9800, revenue: 425000, commission: 4.5 },
        { name: 'Paris Gallery', transactions: 8600, revenue: 685000, commission: 4.0 },
      ],
    },
    merchants,
  };
};

// Financial Reports Data
export const getFinancialReportsData = async (dateRange) => {
  await simulateDelay();
  
  return {
    cashFlowStatement: {
      operatingActivities: {
        netIncome: 475,
        adjustments: {
          depreciation: 15000,
          accountsReceivable: -12000,
          accountsPayable: 8500,
          deferredRevenue: 18000,
          total: 29500,
        },
        netCashFromOperating: 29975,
      },
      investingActivities: {
        propertyEquipment: -25000,
        intangibleAssets: -15000,
        netCashFromInvesting: -40000,
      },
      financingActivities: {
        longTermDebtProceeds: 50000,
        longTermDebtRepayment: -15000,
        netCashFromFinancing: 35000,
      },
      netCashChange: 24975,
      beginningCash: 3400025,
      endingCash: 3425000,
    },
    incomeStatement: {
      revenue: {
        subscriptionRevenue: 125000,
        marketplaceRevenue: 82000,
        pickupRevenue: 45000,
        smsRevenue: 28500,
        whatsappRevenue: 18000,
        total: 298500,
      },
      costOfRevenue: {
        platformCosts: 35000,
        transactionFees: 18500,
        customerSupport: 14225,
        total: 67725,
      },
      grossProfit: 230775,
      operatingExpenses: {
        salaries: 145000,
        infrastructure: 28000,
        marketing: 18000,
        sales: 12000,
        rd: 22000,
        operations: 8000,
        total: 233000,
      },
      operatingIncome: -2225,
      otherIncomeExpense: {
        interestIncome: 4200,
        interestExpense: -1500,
        total: 2700,
      },
      netIncome: 475,
    },
    balanceSheet: {
      assets: {
        current: {
          cash: 3425000,
          accountsReceivable: 194700,
          prepaidExpenses: 45000,
          total: 3664700,
        },
        nonCurrent: {
          propertyEquipment: 285000,
          intangibleAssets: 425000,
          total: 710000,
        },
        totalAssets: 4374700,
      },
      liabilities: {
        current: {
          accountsPayable: 125000,
          accruedExpenses: 67000,
          deferredRevenue: 238000,
          total: 430000,
        },
        nonCurrent: {
          longTermDebt: 850000,
          total: 850000,
        },
        totalLiabilities: 1280000,
      },
      equity: {
        commonStock: 2500000,
        retainedEarnings: 594700,
        totalEquity: 3094700,
      },
      totalLiabilitiesEquity: 4374700,
    },
  };
};

// Variance Reports Data
export const getVarianceReportsData = async (dateRange) => {
  await simulateDelay();
  
  return {
    revenue: [
      { category: 'Subscription Revenue', budgeted: 130000, actual: 125000, variance: -5000, variancePercent: -3.8 },
      { category: 'Marketplace Revenue', budgeted: 75000, actual: 82000, variance: 7000, variancePercent: 9.3 },
      { category: 'Pickup Revenue', budgeted: 50000, actual: 45000, variance: -5000, variancePercent: -10.0 },
      { category: 'SMS Revenue', budgeted: 25000, actual: 28500, variance: 3500, variancePercent: 14.0 },
      { category: 'WhatsApp Revenue', budgeted: 20000, actual: 18000, variance: -2000, variancePercent: -10.0 },
    ],
    expenses: [
      { category: 'Salaries & Benefits', budgeted: 140000, actual: 145000, variance: -5000, variancePercent: -3.6 },
      { category: 'Infrastructure', budgeted: 30000, actual: 28000, variance: 2000, variancePercent: 6.7 },
      { category: 'Marketing', budgeted: 20000, actual: 18000, variance: 2000, variancePercent: 10.0 },
      { category: 'Sales', budgeted: 15000, actual: 12000, variance: 3000, variancePercent: 20.0 },
      { category: 'R&D', budgeted: 25000, actual: 22000, variance: 3000, variancePercent: 12.0 },
      { category: 'Operations', budgeted: 10000, actual: 8000, variance: 2000, variancePercent: 20.0 },
    ],
    summary: {
      totalRevenueBudgeted: 300000,
      totalRevenueActual: 298500,
      totalRevenueVariance: -1500,
      totalRevenueVariancePercent: -0.5,
      totalExpensesBudgeted: 240000,
      totalExpensesActual: 233000,
      totalExpensesVariance: 7000,
      totalExpensesVariancePercent: 2.9,
      netIncomeBudgeted: 60000,
      netIncomeActual: 65500,
      netIncomeVariance: 5500,
      netIncomeVariancePercent: 9.2,
    },
  };
};

// Generate merchants data
const generateMerchants = (count) => {
  const merchantNames = [
    'مجموعة الفيصل التجارية', 'متاجر النور', 'شركة الهدى التجارية', 'مؤسسة الرواد', 'متجر الأمانة',
    'مجموعة الراشد', 'شركة البركة', 'متاجر السعادة', 'مؤسسة النجاح', 'شركة الأفق',
    'متجر الإبداع', 'مجموعة الأمل', 'شركة التميز', 'متاجر الخير', 'مؤسسة الازدهار',
    'شركة السلام', 'متاجر الفخامة', 'مجموعة الوفاء', 'مؤسسة الإنجاز', 'شركة الريادة',
    'متجر الجودة', 'مجموعة الثقة', 'شركة الابتكار', 'متاجر الرخاء', 'مؤسسة التطور',
    'شركة الإخلاص', 'متجر النجوم', 'مجموعة الطموح', 'مؤسسة الإتقان', 'شركة الأصالة',
    'متاجر الحداثة', 'مجموعة الكفاءة', 'شركة الصدارة', 'متجر الفرص', 'مؤسسة الشموخ',
    'شركة العطاء', 'متاجر المجد', 'مجموعة الإلهام', 'مؤسسة الرقي', 'شركة التفوق',
    'متجر الازدهار', 'مجموعة الرؤية', 'شركة الآفاق', 'متاجر الإشراق', 'مؤسسة الأمل',
    'شركة البناء', 'متجر الحضارة', 'مجموعة التقدم', 'مؤسسة السمو', 'شركة الإشراقة',
    'متاجر الرفعة', 'مجموعة النهضة', 'شركة الحكمة', 'متجر العلا', 'مؤسسة الهمة',
    'شركة النبراس', 'متاجر الأنوار', 'مجموعة الفجر', 'مؤسسة الضياء', 'شركة المنارة',
    'متجر الألماس', 'مجموعة اللؤلؤ', 'شركة الياقوت', 'متاجر الزمرد', 'مؤسسة الذهب',
    'شركة الفضة', 'متجر الجوهرة', 'مجموعة الدرة', 'مؤسسة الكنز', 'شركة الثروة',
    'متاجر الغنى', 'مجموعة اليسر', 'شركة الخير', 'متجر البركات', 'مؤسسة الفيض',
    'شركة الوفرة', 'متاجر الرغد', 'مجموعة السخاء', 'مؤسسة الكرم', 'شركة الجود',
    'متجر العز', 'مجموعة الفخر', 'شركة الشرف', 'متاجر المعالي', 'مؤسسة المكارم',
    'شركة النبل', 'متجر الشموخ', 'مجموعة الهيبة', 'مؤسسة الوقار', 'شركة الجلال',
    'متاجر العظمة', 'مجموعة الرفعة', 'شركة السيادة', 'متجر القمة', 'مؤسسة الذروة',
    'شركة الأوج', 'متاجر الأعلى', 'مجموعة الارتقاء', 'مؤسسة السمو', 'شركة التسامي',
    'متجر الرفيع', 'مجموعة العلو', 'شركة السامي', 'متاجر الشامخ', 'مؤسسة العالي',
    'شركة المتقدم', 'متجر السابق', 'مجموعة المتميز', 'مؤسسة الرائد', 'شركة القائد',
    'متاجر الزعيم', 'مجموعة الصدر', 'شركة الطليعة', 'متجر المقدمة', 'مؤسسة الأول',
    'شركة البادئ', 'متاجر المبتكر', 'مجموعة المجدد', 'مؤسسة المطور', 'شركة المحدث',
    'متجر العصري', 'مجموعة الحديث', 'شركة المعاصر', 'متاجر الجديد', 'مؤسسة المستحدث',
    'شركة الرائج', 'متجر الشائع', 'مجموعة المشهور', 'مؤسسة المعروف', 'شركة المتداول',
    'متاجر الذائع', 'مجموعة الطائر', 'شركة السائر', 'متجر الجاري', 'مؤسسة الدائر',
    'شركة القائم', 'متاجر الماضي', 'مجموعة النافذ', 'مؤسسة السائد', 'شركة الغالب',
    'متجر الأرجح', 'مجموعة الأقوى', 'شركة الأفضل', 'متاجر الأجود', 'مؤسسة الأحسن',
    'شركة الأمثل', 'متجر الأكمل', 'مجموعة الأتم', 'مؤسسة الأوفى', 'شركة الأصدق',
    'متاجر الأنقى', 'مجموعة الأصفى', 'شركة الأزكى', 'متجر الأطهر', 'مؤسسة الأبر',
    'شركة الأعف', 'متاجر الأتقى', 'مجموعة الأورع', 'مؤسسة الأنزه', 'شركة الأشرف',
    'متجر الأكرم', 'مجموعة الأجل', 'شركة الأعلم', 'متاجر الأحكم', 'مؤسسة الأرشد',
    'شركة الأهدى', 'متجر الأقوم', 'مجموعة الأسد', 'مؤسسة الأرجح', 'شركة الأصح',
    'متاجر الأسلم', 'مجموعة الأقرب', 'شركة الأدنى', 'متجر الألطف', 'مؤسسة الأرق',
    'شركة الأنعم', 'متاجر الأهنأ', 'مجموعة الأسعد', 'مؤسسة الأبهج', 'شركة الأفرح',
    'متجر الأمرح', 'مجموعة السرور', 'شركة الحبور', 'متاجر البشر', 'مؤسسة الابتهاج',
    'شركة البهجة', 'متجر الفرحة', 'مجموعة المسرة', 'مؤسسة الغبطة', 'شركة النعيم',
    'متاجر الهناء', 'مجموعة السعادة العليا', 'شركة الراحة', 'متجر الطمأنينة', 'مؤسسة السكينة',
  ];

  const merchants = [];
  for (let i = 0; i < count; i++) {
    const baseTransactions = Math.max(1000, Math.floor(20000 - i * 80 + Math.random() * 2000));
    const giftCardRatio = 0.6 + Math.random() * 0.2;
    const avgTransactionValue = 120 + Math.random() * 80;
    
    const totalTransactions = baseTransactions;
    const giftCardTransactions = Math.floor(totalTransactions * giftCardRatio);
    const couponTransactions = totalTransactions - giftCardTransactions;
    
    const totalRevenue = Math.floor(totalTransactions * avgTransactionValue);
    const giftCardRevenue = Math.floor(giftCardTransactions * (avgTransactionValue * 1.2));
    const couponRevenue = Math.floor(couponTransactions * (avgTransactionValue * 0.5));
    
    merchants.push({
      id: i + 1,
      name: i < merchantNames.length ? merchantNames[i] : `${merchantNames[i % merchantNames.length]} ${Math.floor(i / merchantNames.length) + 1}`,
      totalTransactions,
      totalRevenue,
      giftCardTransactions,
      giftCardRevenue,
      couponTransactions,
      couponRevenue,
    });
  }
  
  return merchants;
};

// Generate merchants with different performance based on time period
const generateMerchantsForPeriod = (count, timePeriod) => {
  const merchantNames = [
    'مجموعة الفيصل التجارية', 'متاجر النور', 'شركة الهدى التجارية', 'مؤسسة الرواد', 'متجر الأمانة',
    'مجموعة الراشد', 'شركة البركة', 'متاجر السعادة', 'مؤسسة النجاح', 'شركة الأفق',
    'متجر الإبداع', 'مجموعة الأمل', 'شركة التميز', 'متاجر الخير', 'مؤسسة الازدهار',
    'شركة السلام', 'متاجر الفخامة', 'مجموعة الوفاء', 'مؤسسة الإنجاز', 'شركة الريادة',
    'متجر الجودة', 'مجموعة الثقة', 'شركة الابتكار', 'متاجر الرخاء', 'مؤسسة التطور',
    'شركة الإخلاص', 'متجر النجوم', 'مجموعة الطموح', 'مؤسسة الإتقان', 'شركة الأصالة',
    'متاجر الحداثة', 'مجموعة الكفاءة', 'شركة الصدارة', 'متجر الفرص', 'مؤسسة الشموخ',
    'شركة العطاء', 'متاجر المجد', 'مجموعة الإلهام', 'مؤسسة الرقي', 'شركة التفوق',
    'متجر الازدهار', 'مجموعة الرؤية', 'شركة الآفاق', 'متاجر الإشراق', 'مؤسسة الأمل',
    'شركة البناء', 'متجر الحضارة', 'مجموعة التقدم', 'مؤسسة السمو', 'شركة الإشراقة',
    'متاجر الرفعة', 'مجموعة النهضة', 'شركة الحكمة', 'متجر العلا', 'مؤسسة الهمة',
    'شركة النبراس', 'متاجر الأنوار', 'مجموعة الفجر', 'مؤسسة الضياء', 'شركة المنارة',
    'متجر الألماس', 'مجموعة اللؤلؤ', 'شركة الياقوت', 'متاجر الزمرد', 'مؤسسة الذهب',
    'شركة الفضة', 'متجر الجوهرة', 'مجموعة الدرة', 'مؤسسة الكنز', 'شركة الثروة',
    'متاجر الغنى', 'مجموعة اليسر', 'شركة الخير', 'متجر البركات', 'مؤسسة الفيض',
    'شركة الوفرة', 'متاجر الرغد', 'مجموعة السخاء', 'مؤسسة الكرم', 'شركة الجود',
    'متجر العز', 'مجموعة الفخر', 'شركة الشرف', 'متاجر المعالي', 'مؤسسة المكارم',
    'شركة النبل', 'متجر الشموخ', 'مجموعة الهيبة', 'مؤسسة الوقار', 'شركة الجلال',
    'متاجر العظمة', 'مجموعة الرفعة', 'شركة السيادة', 'متجر القمة', 'مؤسسة الذروة',
    'شركة الأوج', 'متاجر الأعلى', 'مجموعة الارتقاء', 'مؤسسة السمو', 'شركة التسامي',
    'متجر الرفيع', 'مجموعة العلو', 'شركة السامي', 'متاجر الشامخ', 'مؤسسة العالي',
    'شركة المتقدم', 'متجر السابق', 'مجموعة المتميز', 'مؤسسة الرائد', 'شركة القائد',
    'متاجر الزعيم', 'مجموعة الصدر', 'شركة الطليعة', 'متجر المقدمة', 'مؤسسة الأول',
    'شركة البادئ', 'متاجر المبتكر', 'مجموعة المجدد', 'مؤسسة المطور', 'شركة المحدث',
    'متجر العصري', 'مجموعة الحديث', 'شركة المعاصر', 'متاجر الجديد', 'مؤسسة المستحدث',
    'شركة الرائج', 'متجر الشائع', 'مجموعة المشهور', 'مؤسسة المعروف', 'شركة المتداول',
    'متاجر الذائع', 'مجموعة الطائر', 'شركة السائر', 'متجر الجاري', 'مؤسسة الدائر',
    'شركة القائم', 'متاجر الماضي', 'مجموعة النافذ', 'مؤسسة السائد', 'شركة الغالب',
    'متجر الأرجح', 'مجموعة الأقوى', 'شركة الأفضل', 'متاجر الأجود', 'مؤسسة الأحسن',
    'شركة الأمثل', 'متجر الأكمل', 'مجموعة الأتم', 'مؤسسة الأوفى', 'شركة الأصدق',
    'متاجر الأنقى', 'مجموعة الأصفى', 'شركة الأزكى', 'متجر الأطهر', 'مؤسسة الأبر',
    'شركة الأعف', 'متاجر الأتقى', 'مجموعة الأورع', 'مؤسسة الأنزه', 'شركة الأشرف',
    'متجر الأكرم', 'مجموعة الأجل', 'شركة الأعلم', 'متاجر الأحكم', 'مؤسسة الأرشد',
    'شركة الأهدى', 'متجر الأقوم', 'مجموعة الأسد', 'مؤسسة الأرجح', 'شركة الأصح',
    'متاجر الأسلم', 'مجموعة الأقرب', 'شركة الأدنى', 'متجر الألطف', 'مؤسسة الأرق',
    'شركة الأنعم', 'متاجر الأهنأ', 'مجموعة الأسعد', 'مؤسسة الأبهج', 'شركة الأفرح',
    'متجر الأمرح', 'مجموعة السرور', 'شركة الحبور', 'متاجر البشر', 'مؤسسة الابتهاج',
    'شركة البهجة', 'متجر الفرحة', 'مجموعة المسرة', 'مؤسسة الغبطة', 'شركة النعيم',
    'متاجر الهناء', 'مجموعة السعادة العليا', 'شركة الراحة', 'متجر الطمأنينة', 'مؤسسة السكينة',
  ];

  // Different multipliers for different time periods
  const periodMultiplier = {
    month: 1,
    quarter: 3,
    year: 12
  };
  
  const multiplier = periodMultiplier[timePeriod] || 1;
  
  // Use time period as seed for randomization to get different rankings
  const seed = timePeriod === 'month' ? 1 : timePeriod === 'quarter' ? 2 : 3;
  
  const merchants = [];
  for (let i = 0; i < count; i++) {
    // Add variation based on time period to change rankings
    const performanceVariation = ((i + seed * 50) % count) / count;
    const baseTransactions = Math.max(1000, Math.floor((20000 - i * 80 + performanceVariation * 5000) * multiplier + Math.random() * 2000));
    const giftCardRatio = 0.6 + Math.random() * 0.2;
    const avgTransactionValue = 120 + Math.random() * 80;
    
    const totalTransactions = baseTransactions;
    const giftCardTransactions = Math.floor(totalTransactions * giftCardRatio);
    const couponTransactions = totalTransactions - giftCardTransactions;
    
    const totalRevenue = Math.floor(totalTransactions * avgTransactionValue);
    const giftCardRevenue = Math.floor(giftCardTransactions * (avgTransactionValue * 1.2));
    const couponRevenue = Math.floor(couponTransactions * (avgTransactionValue * 0.5));
    
    merchants.push({
      id: i + 1,
      name: i < merchantNames.length ? merchantNames[i] : `${merchantNames[i % merchantNames.length]} ${Math.floor(i / merchantNames.length) + 1}`,
      totalTransactions,
      totalRevenue,
      giftCardTransactions,
      giftCardRevenue,
      couponTransactions,
      couponRevenue,
    });
  }
  
  return merchants;
};

// Simulate network delay for realistic data fetching
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));