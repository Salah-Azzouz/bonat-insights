import React, { useState } from 'react';
import { Search, Store, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import KPICard from '../dashboard/KPICard';
import ChartCard from '../dashboard/ChartCard';

// Simulate merchant lookup with deterministic mock data based on name
const lookupMerchant = (name) => {
  // Use name length as a seed for variation
  const seed = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const rand = (min, max) => min + (seed % (max - min + 1));

  const branches = rand(3, 48);
  const customers = rand(8000, 250000);
  const returningCustomers = Math.floor(customers * (rand(40, 75) / 100));
  const collectedPoints = rand(500000, 15000000);
  const redeemedPoints = Math.floor(collectedPoints * (rand(45, 85) / 100));
  const totalSales = rand(500000, 25000000);
  const appSales = Math.floor(totalSales * (rand(30, 65) / 100));
  const giftCardSales = Math.floor(appSales * (rand(40, 60) / 100));
  const couponSales = Math.floor(appSales * (rand(20, 35) / 100));
  const pickupSales = appSales - giftCardSales - couponSales;

  const customersWithApp = Math.floor(customers * (rand(25, 60) / 100));
  const registrationRate = parseFloat((customersWithApp / customers * 100).toFixed(1));

  return {
    name,
    branches,
    totalSales,
    appSales,
    giftCardSales,
    pickupSales: Math.max(0, pickupSales),
    couponSales,
    redemptionRate: parseFloat((redeemedPoints / collectedPoints * 100).toFixed(1)),
    redeemedPoints,
    collectedPoints,
    customers,
    customersWithApp,
    registrationRate,
    monthlyVisits: rand(20000, 800000),
    dailyVisits: rand(500, 25000),
    retentionRate: parseFloat((returningCustomers / customers * 100).toFixed(1)),
    returningCustomers,
  };
};

// Suggested merchant names for autocomplete
const MERCHANT_SUGGESTIONS = [
  'مجموعة الفيصل التجارية', 'متاجر النور', 'شركة الهدى التجارية', 'مؤسسة الرواد',
  'متجر الأمانة', 'مجموعة الراشد', 'شركة البركة', 'متاجر السعادة',
  'مؤسسة النجاح', 'شركة الأفق', 'متجر الإبداع', 'مجموعة الأمل',
  'شركة التميز', 'متاجر الخير', 'مؤسسة الازدهار',
];

export default function MerchantLookup() {
  const [query, setQuery] = useState('');
  const [merchantData, setMerchantData] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setMerchantData(lookupMerchant(query.trim()));
    setSearched(true);
  };

  const handleClear = () => {
    setQuery('');
    setMerchantData(null);
    setSearched(false);
  };

  const fmt = (n) => n.toLocaleString('en-US');

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card className="bg-[#1B2A4A] border-white/10">
        <CardContent className="p-6">
          <p className="text-white/60 text-sm mb-3">Enter a merchant name to view their performance data</p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search merchant name..."
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11"
              />
            </div>
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 h-11 px-6">
              Search
            </Button>
            {merchantData && (
              <Button variant="ghost" onClick={handleClear} className="text-white/60 hover:text-white h-11">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Suggestions */}
          {!merchantData && (
            <div className="mt-4">
              <p className="text-white/40 text-xs mb-2">Suggested merchants:</p>
              <div className="flex flex-wrap gap-2">
                {MERCHANT_SUGGESTIONS.slice(0, 8).map((name) => (
                  <button
                    key={name}
                    onClick={() => { setQuery(name); setMerchantData(lookupMerchant(name)); setSearched(true); }}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all border border-white/10"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {merchantData && (
        <>
          {/* Merchant Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Store className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{merchantData.name}</h2>
              <p className="text-white/50 text-sm">{merchantData.branches} Branches</p>
            </div>
          </div>

          {/* Sales KPIs */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Sales</p>
            <div className="grid grid-cols-5 gap-4">
              <KPICard title="Total Sales" value={merchantData.totalSales} prefix="SAR" change={8.2} />
              <KPICard title="Total App Sales" value={merchantData.appSales} prefix="SAR" change={12.5} />
              <KPICard title="Gift Card Sales" value={merchantData.giftCardSales} prefix="SAR" change={15.3} />
              <KPICard title="Pickup Sales" value={merchantData.pickupSales} prefix="SAR" change={9.1} />
              <KPICard title="Coupon Sales" value={merchantData.couponSales} prefix="SAR" change={6.8} />
            </div>
          </div>

          {/* Loyalty KPIs */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Loyalty & Points</p>
            <div className="grid grid-cols-3 gap-4">
              <KPICard title="Collected Points" value={merchantData.collectedPoints} change={10.2} />
              <KPICard title="Redeemed Points" value={merchantData.redeemedPoints} change={8.5} />
              <KPICard title="Redemption Rate" value={merchantData.redemptionRate} suffix="%" change={1.3} />
            </div>
          </div>

          {/* Customer KPIs */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Customers & Visits</p>
            <div className="grid grid-cols-4 gap-4">
              <KPICard title="Total Customers" value={merchantData.customers} change={14.8} />
              <KPICard title="Returning Customers" value={merchantData.returningCustomers} change={7.6} />
              <KPICard title="Retention Rate" value={merchantData.retentionRate} suffix="%" change={2.1} />
              <KPICard title="Monthly Visits" value={merchantData.monthlyVisits} change={11.4} />
            </div>
          </div>

          {/* App Registration */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">App Registration</p>
            <div className="grid grid-cols-2 gap-4">
              <KPICard title="Registration Rate" value={merchantData.registrationRate} suffix="%" change={3.2} />
              <KPICard title="Customers with App" value={merchantData.customersWithApp} change={18.5} />
            </div>
          </div>
        </>
      )}

      {searched && !merchantData && (
        <div className="text-center py-16 text-white/40">
          <Store className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No merchant found</p>
        </div>
      )}
    </div>
  );
}