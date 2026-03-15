import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { DateRangeProvider, useDateRange } from './components/utils/dateRangeContext';
import {
  LayoutDashboard,
  DollarSign,
  TrendingUp,
  Users,
  Gift,
  Activity,
  Bot,
  ChevronDown,
  LogOut,
  Calendar,
  Package,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const pages = [
  { name: 'ExecutiveOverview', label: 'Executive Overview', icon: LayoutDashboard, roles: ['admin', 'manager'] },
  { name: 'Financial', label: 'Financial', icon: DollarSign, roles: ['admin', 'manager'] },
  { name: 'Sales', label: 'Sales', icon: TrendingUp, roles: ['admin', 'manager', 'sales_rep'] },
  { name: 'Marketing', label: 'Marketing', icon: TrendingUp, roles: ['admin', 'manager'] },
  { name: 'Pickup', label: 'Pickup', icon: Package, roles: ['admin', 'manager'] },
  { name: 'Marketplace', label: 'Marketplace', icon: Gift, roles: ['admin', 'manager'] },
  { name: 'Merchants', label: 'Merchants', icon: Users, roles: ['admin', 'manager'] },
  { name: 'LoyaltyCampaigns', label: 'Loyalty Performance', icon: Gift, roles: ['admin', 'manager'] },
  { name: 'AppUsage', label: 'App Usage', icon: Activity, roles: ['admin', 'manager'] },
  { name: 'AIChat', label: 'AI Chat', icon: Bot, roles: ['admin', 'manager', 'sales_rep'] },
];

function LayoutContent({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { dateRange, setDateRange } = useDateRange();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
        
        // Redirect sales reps to Sales page if they're on a restricted page
        if (currentUser?.role === 'sales_rep' && currentPageName !== 'Sales' && currentPageName !== 'AIChat') {
          navigate(createPageUrl('Sales'));
        }
      } catch (error) {
        navigate(createPageUrl('Login'));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [currentPageName, navigate]);

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1729] flex items-center justify-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  const allowedPages = pages.filter(page => page.roles.includes(user.role));
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-[#0f1729] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1B2A4A] border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">Bonat 360</h1>
          <p className="text-xs text-white/60 mt-1">Internal Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {allowedPages.map((page) => {
            const isActive = currentPageName === page.name;
            const Icon = page.icon;
            return (
              <Link
                key={page.name}
                to={createPageUrl(page.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/10 text-white shadow-lg shadow-white/5'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{page.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1B2A4A] border-b border-white/10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                {pages.find(p => p.name === currentPageName)?.label || 'Dashboard'}
              </h2>
              <p className="text-xs text-white/60 mt-0.5">{currentDate}</p>
            </div>

            <div className="flex items-center gap-6">
              {/* Date Range Filter */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <Select value={dateRange} onValueChange={(value) => setDateRange(value)}>
                  <SelectTrigger className="w-44 bg-white/5 border-white/10 text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                    <SelectItem value="last_12_months">Last 12 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user.full_name}</p>
                  <p className="text-xs text-white/60 capitalize">{user.role?.replace('_', ' ')}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <DateRangeProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </DateRangeProvider>
  );
}