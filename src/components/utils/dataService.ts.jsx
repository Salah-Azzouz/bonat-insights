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
  loyaltyMembers: 9023450,
  nps: 67,
};

// Executive Overview Data
export const getExecutiveOverview = async (dateRange) => {
  await simulateDelay();
  
  return {
    kpis: {
      mrr: { value: CORE_METRICS.mrr, change: 8.3, sparkline: [285000, 287000, 291000, 294000, 298500] },
      arr: { value: CORE_METRICS.arr, change: 8.3, sparkline: [3420000, 3444000, 3492000, 3528000, 3582000] },
      cashRunway: { value: 18.5, change: -2.1, sparkline: [22, 21, 20, 19, 18.5] },
      pipelineValue: { value: 1850000, change: 12.5, sparkline: [1550000, 1620000, 1720000, 1780000, 1850000] },
      activeMerchants: { value: CORE_METRICS.activeMerchants, change: 4.2, sparkline: [2098, 2125, 2151, 2168, 2187] },
      churnRate: { value: 2.3, change: -0.5, sparkline: [2.8, 2.7, 2.5, 2.4, 2.3] },
      nps: { value: CORE_METRICS.nps, change: 3.0, sparkline: [64, 65, 65, 66, 67] },
      mau: { value: 142500, change: 6.8, sparkline: [133000, 136000, 138000, 141000, 142500] },
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
      gross: 315000,
      net: CORE_METRICS.mrr,
      arpm: 136.5,
      cac: 4200,
      clv: 24500,
      clvCacRatio: 5.83,
      grossMargin: 78.5,
      netMargin: 65.2,
      burnRate: 185000,
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
      { name: 'Loyalty Programs', value: 125000, percentage: 41.9 },
      { name: 'Gift Cards', value: 82000, percentage: 27.5 },
      { name: 'Feedback Solutions', value: 45000, percentage: 15.1 },
      { name: 'Promotions', value: 28500, percentage: 9.5 },
      { name: 'Marketing Campaigns', value: 18000, percentage: 6.0 },
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
    leadSources: [
      { source: 'Inbound Marketing', value: 42 },
      { source: 'Referrals', value: 28 },
      { source: 'Outbound Sales', value: 18 },
      { source: 'Partnerships', value: 8 },
      { source: 'Events', value: 4 },
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
  
  return {
    metrics: {
      dau: 48250,
      mau: 142500,
      dauMauRatio: 33.9,
      uptime: 99.8,
      supportTickets: 285,
      avgResolutionTime: 4.2,
    },
    engagementTrend: [
      { date: 'Feb 9', dau: 46800, mau: 141000 },
      { date: 'Feb 10', dau: 47200, mau: 141200 },
      { date: 'Feb 11', dau: 47500, mau: 141500 },
      { date: 'Feb 12', dau: 47800, mau: 141800 },
      { date: 'Feb 13', dau: 48000, mau: 142000 },
      { date: 'Feb 14', dau: 48100, mau: 142200 },
      { date: 'Feb 15', dau: 48250, mau: 142500 },
    ],
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

// Simulate network delay for realistic data fetching
const simulateDelay = () => new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));