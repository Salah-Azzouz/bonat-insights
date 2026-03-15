import React, { useState, useEffect } from 'react';
import { useDateRange } from '../components/utils/dateRangeContext';
import { getLoyaltyData } from '../components/utils/dataService';
import KPICard from '../components/dashboard/KPICard';
import ChartCard from '../components/dashboard/ChartCard';
import LoadingCard from '../components/dashboard/LoadingCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function GaugeChart({ value, label }) {
  const circumference = 2 * Math.PI * 90;
  const progress = (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <svg width="200" height="120" viewBox="0 0 200 120">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
          strokeDasharray={`${circumference / 2} ${circumference}`}
          transform="rotate(-180 100 100)"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#10b981"
          strokeWidth="12"
          strokeDasharray={`${progress / 2} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-180 100 100)"
        />
        <text x="100" y="95" textAnchor="middle" className="text-4xl font-bold fill-white">
          {value.toFixed(1)}%
        </text>
        <text x="100" y="115" textAnchor="middle" className="text-sm fill-white/60">
          {label}
        </text>
      </svg>
    </div>
  );
}

export default function LoyaltyCampaigns() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useDateRange();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getLoyaltyData(dateRange);
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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-6">
        <KPICard title="Active Programs" value={data.loyalty.programs} change={5.8} sparkline={[]} />
        <KPICard title="Total Members" value={data.loyalty.members} change={8.2} sparkline={[]} />
        <KPICard title="Points Issued" value={data.loyalty.pointsIssued} change={12.5} sparkline={[]} />
        <KPICard title="Points Redeemed" value={data.loyalty.pointsRedeemed} change={15.3} sparkline={[]} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <KPICard title="Points Liability" value={data.loyalty.pointsLiability} prefix="SAR" change={-2.1} sparkline={[]} />
        <KPICard title="Adoption Rate" value={data.loyalty.adoptionRate} suffix="%" change={3.5} sparkline={[]} />
        <ChartCard title="Redemption Rate">
          <GaugeChart value={data.loyalty.redemptionRate} label="Redemption Rate" />
        </ChartCard>
      </div>
    </div>
  );
}