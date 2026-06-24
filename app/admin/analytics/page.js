'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  AreaChart, Area, PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  DollarSign, ShoppingCart, Package, Users,
  TrendingUp, Clock, RefreshCw, ChevronLeft, ChevronRight,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';

const statusBadge = (status) => {
  const colors = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const formatCurrency = (value) => {
  return `৳${value.toLocaleString('en-IN')}`;
};

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-4">
      <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-gray-500">{entry.name === 'Revenue' ? 'রাজস্ব' : entry.name === 'Orders' ? 'অর্ডার' : entry.name}:</span>
          <span className="font-semibold text-gray-900">
            {currency ? formatCurrency(entry.value) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.payload.color }} />
        <span className="text-sm font-medium text-gray-900">{data.name}</span>
      </div>
      <p className="text-sm text-gray-500">
        <span className="font-semibold text-gray-900">{data.value}</span>টি অর্ডার
      </p>
    </div>
  );
};

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [period, setPeriod] = useState('all');
  const [ordersPage, setOrdersPage] = useState(1);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const params = new URLSearchParams({
        period,
        ordersPage: String(ordersPage),
        ordersLimit: '5',
      });
      const res = await fetch(`/api/analytics?${params}`);
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [period, ordersPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchData(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [fetchData]);

  const handlePeriodChange = (p) => {
    setPeriod(p);
    setOrdersPage(1);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin h-10 w-10 border-2 border-blue-600 rounded-full border-t-transparent" />
            <p className="text-sm text-gray-500">অ্যানালিটিক্স লোড হচ্ছে...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!data) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[80vh]">
          <p className="text-gray-500">অ্যানালিটিক্স ডেটা লোড করতে ব্যর্থ</p>
        </div>
      </AdminLayout>
    );
  }

  const { overview, monthlyRevenue, orderDistribution, categoryDistribution, recentOrders } = data;
  const recentOrdersList = recentOrders?.orders || [];
  const pagination = recentOrders?.pagination || { page: 1, pages: 1, total: 0 };

  const totalPaidOrders = orderDistribution.find(o => o.name === 'Delivered' || o.name === 'ডেলিভারড')?.value || 0;
  const completionRate = overview.totalOrders > 0
    ? Math.round((totalPaidOrders / overview.totalOrders) * 100)
    : 0;

  const stats = [
    {
      label: 'মোট রাজস্ব',
      value: formatCurrency(overview.totalRevenue),
      sublabel: `${overview.pendingOrders}টি পেন্ডিং পেমেন্ট`,
      icon: DollarSign,
      gradient: 'from-blue-600 to-blue-400',
      shadow: 'shadow-blue-500/25',
    },
    {
      label: 'মোট অর্ডার',
      value: overview.totalOrders.toLocaleString(),
      sublabel: `${completionRate}% সম্পন্ন`,
      icon: ShoppingCart,
      gradient: 'from-violet-600 to-violet-400',
      shadow: 'shadow-violet-500/25',
    },
    {
      label: 'মোট পণ্য',
      value: overview.totalProducts.toLocaleString(),
      sublabel: `${overview.totalCategories}টি ক্যাটাগরি`,
      icon: Package,
      gradient: 'from-emerald-600 to-emerald-400',
      shadow: 'shadow-emerald-500/25',
    },
    {
      label: 'মোট ব্যবহারকারী',
      value: overview.totalUsers.toLocaleString(),
      sublabel: 'নিবন্ধিত গ্রাহক',
      icon: Users,
      gradient: 'from-rose-600 to-rose-400',
      shadow: 'shadow-rose-500/25',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">অ্যানালিটিক্স ড্যাশবোর্ড</h1>
            <p className="text-sm text-gray-500 mt-0.5">আপনার ব্যবসার রিয়েল-টাইম ওভারভিউ</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
              {['7d', '30d', 'all'].map((p) => (
                <button
                  key={p}
                  onClick={() => handlePeriodChange(p)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    period === p
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {p === '7d' ? '৭ দিন' : p === '30d' ? '৩০ দিন' : 'সব সময়'}
                </button>
              ))}
            </div>
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              className="p-2 bg-white rounded-lg border border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
              title="রিফ্রেশ"
            >
              <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.gradient} p-5 ${stat.shadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 translate-x-8 -translate-y-8">
                  <div className="w-full h-full rounded-full bg-white/10" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/80 text-xs font-medium uppercase tracking-wider">
                      {stat.label}
                    </span>
                    <Icon size={20} className="text-white/70" />
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-white/70 text-xs">{stat.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-semibold text-gray-900">সময় অনুযায়ী রাজস্ব</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {period === '7d' ? 'গত ৭ দিন' : period === '30d' ? 'গত ৩০ দিন' : 'সব সময়'} পরিশোধিত/ডেলিভারড অর্ডার
                </p>
              </div>
              {monthlyRevenue.length > 1 && (
                <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                  <TrendingUp size={14} />
                  {(() => {
                    const last = monthlyRevenue[monthlyRevenue.length - 1]?.revenue || 0;
                    const prev = monthlyRevenue[monthlyRevenue.length - 2]?.revenue || 1;
                    return `+${((last / prev) * 100 - 100).toFixed(1)}%`;
                  })()}
                </div>
              )}
            </div>
            {monthlyRevenue.length > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: '#9CA3AF' }}
                      axisLine={{ stroke: '#F3F4F6' }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#9CA3AF' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip currency />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#3B82F6"
                      strokeWidth={2.5}
                      fill="url(#revenueGradient)"
                      dot={{ r: 3, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                      activeDot={{ r: 5, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="orders"
                      name="Orders"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      fill="url(#ordersGradient)"
                      dot={{ r: 2, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 1.5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                এই সময়ের জন্য কোন রাজস্ব ডেটা নেই
              </div>
            )}
          </div>

          {/* Order Status Pie Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">অর্ডার স্ট্যাটাস</h3>
                <p className="text-xs text-gray-500 mt-0.5">স্ট্যাটাস অনুযায়ী বন্টন</p>
            </div>
            {orderDistribution.length > 0 ? (
              <div className="h-72 flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={orderDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {orderDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.color} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip content={<PieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-1">
                  {orderDistribution.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-gray-500">
                        {item.name} <span className="font-medium text-gray-700">({item.value})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                এই সময়ের জন্য কোন অর্ডার নেই
              </div>
            )}
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Category Bar Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900">ক্যাটাগরি অনুযায়ী পণ্য</h3>
                <p className="text-xs text-gray-500 mt-0.5">ক্যাটাগরি অনুযায়ী ইনভেন্টরি বন্টন</p>
            </div>
            {categoryDistribution.length > 0 ? (
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryDistribution} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                      axisLine={{ stroke: '#F3F4F6' }}
                      tickLine={false}
                      interval={0}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#9CA3AF' }}
                      axisLine={false}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip currency={false} />} />
                    <Bar dataKey="products" name="Products" radius={[4, 4, 0, 0]} maxBarSize={45}>
                      {categoryDistribution.map((entry, i) => (
                        <Cell key={i} fill={entry.fill || '#6366F1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-72 flex items-center justify-center text-gray-400 text-sm">
                কোন পণ্য নেই
              </div>
            )}
          </div>

          {/* Recent Orders with Pagination */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-semibold text-gray-900">সাম্প্রতিক অর্ডার</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  পৃষ্ঠা {pagination.page} / {pagination.pages} (মোট {pagination.total})
                </p>
              </div>
              <Clock size={16} className="text-gray-400" />
            </div>
            {recentOrdersList.length > 0 ? (
              <div className="flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  {recentOrdersList.map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.orderNumber}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{order.customerName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatCurrency(order.totalAmount)}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full capitalize ${statusBadge(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setOrdersPage((p) => Math.max(1, p - 1))}
                      disabled={ordersPage <= 1}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={14} />
                      আগে
                    </button>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                        let pageNum;
                        if (pagination.pages <= 5) {
                          pageNum = i + 1;
                        } else if (ordersPage <= 3) {
                          pageNum = i + 1;
                        } else if (ordersPage >= pagination.pages - 2) {
                          pageNum = pagination.pages - 4 + i;
                        } else {
                          pageNum = ordersPage - 2 + i;
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setOrdersPage(pageNum)}
                            className={`w-7 h-7 text-xs font-medium rounded-lg transition ${
                              ordersPage === pageNum
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setOrdersPage((p) => Math.min(pagination.pages, p + 1))}
                      disabled={ordersPage >= pagination.pages}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      পরবর্তী
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                কোন অর্ডার নেই
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
