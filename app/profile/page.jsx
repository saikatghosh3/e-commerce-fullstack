'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, Mail, Phone, MapPin, Camera, Package, RefreshCw,
  X, Check, ChevronRight, Loader2, LogOut, ShoppingBag, Clock, Trash2, EyeOff
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '@/lib/redux/slices/authSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((s) => s.auth);

  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '', phone: '', street: '', city: '', state: '', zipCode: '', country: '',
  });

  const [hiddenOrders, setHiddenOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('hiddenOrders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const visibleOrders = orders.filter((o) => !hiddenOrders.includes(o._id));

  useEffect(() => {
    localStorage.setItem('hiddenOrders', JSON.stringify(hiddenOrders));
  }, [hiddenOrders]);

  useEffect(() => {
    if (!isAuthenticated && !token) {
      const t = localStorage.getItem('token');
      const u = localStorage.getItem('user');
      if (!t || !u) {
        router.push('/auth/login');
        return;
      }
    }
    fetchProfile();
    fetchOrders();
  }, [isAuthenticated]);

  const fetchProfile = async () => {
    try {
      const t = token || localStorage.getItem('token');
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        setForm({
          name: data.user.name || '',
          phone: data.user.phone || '',
          street: data.user.address?.street || '',
          city: data.user.address?.city || '',
          state: data.user.address?.state || '',
          zipCode: data.user.address?.zipCode || '',
          country: data.user.address?.country || '',
        });
      }
    } catch { }
    finally { setLoading(false); }
  };

  const fetchOrders = async () => {
    try {
      const t = token || localStorage.getItem('token');
      const res = await fetch('/api/orders/my-orders', {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch { }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const t = token || localStorage.getItem('token');
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            zipCode: form.zipCode,
            country: form.country,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProfile(data.user);
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...storedUser, name: data.user.name };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        dispatch(updateUser(updatedUser));
        toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে');
      } else {
        toast.error(data.message);
      }
    } catch { toast.error('প্রোফাইল আপডেট করতে ব্যর্থ'); }
    finally { setSaving(false); }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const t = token || localStorage.getItem('token');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        await fetch('/api/auth/update-profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${t}`,
          },
          body: JSON.stringify({ avatar: data.url }),
        });
        fetchProfile();
        toast.success('আভাটার আপডেট হয়েছে');
      }
    } catch { toast.error('আপলোড ব্যর্থ'); }
  };

  const handleRequestCancel = async (orderId) => {
    const reason = prompt('কেন আপনি এই অর্ডার ক্যান্সেল করতে চান?');
    if (!reason) return;
    try {
      const t = token || localStorage.getItem('token');
      const res = await fetch('/api/orders/request-cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({ orderId, reason }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('অর্ডার ক্যান্সেল করা হয়েছে');
        fetchOrders();
      } else toast.error(data.message);
    } catch { toast.error('অর্ডার ক্যান্সেল করতে ব্যর্থ'); }
  };

  const handleRequestRefund = async (orderId) => {
    const reason = prompt('কেন আপনি রিফান্ড চান?');
    if (!reason) return;
    try {
      const t = token || localStorage.getItem('token');
      const res = await fetch('/api/orders/request-refund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${t}`,
        },
        body: JSON.stringify({ orderId, reason }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('রিফান্ড রিকোয়েস্ট করা হয়েছে');
        fetchOrders();
      } else toast.error(data.message);
    } catch { toast.error('রিফান্ড রিকোয়েস্ট করতে ব্যর্থ'); }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    router.push('/auth/login');
  };

  const handleHideOrder = (orderId) => {
    setHiddenOrders((prev) => [...prev, orderId]);
    toast.success('অর্ডার ভিউ থেকে সরানো হয়েছে');
  };

  const handleRestoreOrders = () => {
    setHiddenOrders([]);
    toast.success('সব অর্ডার পুনরুদ্ধার করা হয়েছে');
  };

  const getStatusColor = (s) => ({
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }[s] || 'bg-gray-100 text-gray-700');

  const canCancel = (order) =>
    !order.cancelRequested &&
    (order.orderStatus === 'pending' || order.orderStatus === 'processing');

  const canRefund = (order) =>
    order.orderStatus === 'delivered' &&
    order.paymentStatus === 'completed' &&
    order.refundStatus === 'none';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'প্রোফাইল', icon: User },
    { id: 'orders', label: 'অর্ডার', icon: ShoppingBag },
  ];

  const getStatusLabel = (s) => ({
    pending: 'পেন্ডিং',
    processing: 'প্রসেসিং',
    shipped: 'শিপড',
    delivered: 'ডেলিভারড',
    cancelled: 'ক্যান্সেলড',
  }[s] || s);

  const p = profile || {};

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">আমার অ্যাকাউন্ট</h1>
            <p className="text-gray-500 mt-1">আপনার প্রোফাইল ও অর্ডার ব্যবস্থাপনা</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <LogOut size={16} />
            লগআউট
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-72 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border p-6 text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-indigo-100 mx-auto">
                  {p.avatar ? (
                    <img src={p.avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={40} className="text-indigo-500" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 shadow-md">
                  <Camera size={14} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
              </div>
              <h2 className="font-bold text-lg text-gray-900">{p.name || 'ইউজার'}</h2>
              <p className="text-sm text-gray-500">{p.email}</p>
            </div>

            <div className="mt-4 bg-white rounded-2xl shadow-sm border p-2 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                    <ChevronRight size={16} className="ml-auto" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-sm border p-6 lg:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">প্রোফাইল তথ্য</h2>
                <form onSubmit={handleSaveProfile} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <User size={14} className="inline mr-1" />
                      পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Mail size={14} className="inline mr-1" />
                      ইমেইল
                    </label>
                    <input
                      type="email"
                      value={p.email || ''}
                      disabled
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      <Phone size={14} className="inline mr-1" />
                      ফোন
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin size={18} className="text-indigo-600" />
                      ঠিকানা
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">রাস্তা</label>
                        <input
                          type="text"
                          value={form.street}
                          onChange={(e) => setForm({ ...form, street: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">শহর</label>
                        <input
                          type="text"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">স্টেট</label>
                        <input
                          type="text"
                          value={form.state}
                          onChange={(e) => setForm({ ...form, state: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">জিপ কোড</label>
                        <input
                          type="text"
                          value={form.zipCode}
                          onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">দেশ</label>
                        <input
                          type="text"
                          value={form.country}
                          onChange={(e) => setForm({ ...form, country: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-indigo-800 transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                  >
                    {saving && <Loader2 size={18} className="animate-spin" />}
                    {saving ? 'সেভ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    মোট {visibleOrders.length} টি অর্ডার
                    {hiddenOrders.length > 0 && (
                      <span className="text-gray-400 ml-1">
                        ({hiddenOrders.length} টি লুকানো)
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    {hiddenOrders.length > 0 && (
                      <button
                        onClick={handleRestoreOrders}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                      >
                        <EyeOff size={14} />
                        সব দেখান
                      </button>
                    )}
                    <button
                      onClick={fetchOrders}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition"
                    >
                      <RefreshCw size={14} />
                      রিফ্রেশ
                    </button>
                  </div>
                </div>
                {visibleOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
                    <Package size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-lg mb-4">এখনো কোনো অর্ডার নেই</p>
                    <Link
                      href="/products"
                      className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition shadow-md"
                    >
                      কেনাকাটা শুরু করুন
                    </Link>
                  </div>
                ) : (
                  visibleOrders.map((order) => (
                    <div key={order._id} className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition relative group">
                      <button
                        onClick={() => handleHideOrder(order._id)}
                        className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        title="ভিউ থেকে সরান"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-bold text-gray-900">{order.orderNumber}</p>
                            <span className={`px-2.5 py-0.5 text-xs rounded font-medium ${getStatusColor(order.orderStatus)}`}>
                              {getStatusLabel(order.orderStatus)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-indigo-600">৳{Number(order.totalAmount || 0).toFixed(2)}</p>
                          <p className="text-xs text-gray-400">{order.items?.length || 0} টি পণ্য</p>
                        </div>
                      </div>

                      {order.items && order.items.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3 border-t pt-4">
                          {order.items.slice(0, 4).map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              {item.image && (
                                <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover border" />
                              )}
                              <div className="hidden sm:block">
                                <p className="text-gray-700 font-medium truncate max-w-[150px]">{item.name}</p>
                                <p className="text-xs text-gray-400">x{item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                        {canCancel(order) && (
                          <button
                            onClick={() => handleRequestCancel(order._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                          >
                            <X size={14} />
                            অর্ডার ক্যান্সেল
                          </button>
                        )}
                        {canRefund(order) && (
                          <button
                            onClick={() => handleRequestRefund(order._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition"
                          >
                            <RefreshCw size={14} />
                            রিফান্ড রিকোয়েস্ট
                          </button>
                        )}
                        {order.refundStatus === 'requested' && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 rounded-lg">
                            <Clock size={14} />
                            রিফান্ড পেন্ডিং
                          </span>
                        )}
                        {order.refundStatus === 'approved' && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg">
                            <Check size={14} />
                            রিফান্ড অনুমোদিত
                          </span>
                        )}
                        {order.refundStatus === 'rejected' && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg">
                            <X size={14} />
                            রিফান্ড প্রত্যাখ্যাত
                          </span>
                        )}
                        {order.cancelRequested && (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg">
                            <X size={14} />
                            ক্যান্সেলড
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
