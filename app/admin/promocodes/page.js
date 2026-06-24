'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Plus, Edit2, Trash2, Search, Gift, Loader2, X, Check, Copy } from 'lucide-react';
import { showSuccess, showError, confirmAction } from '@/components/ToastUtils';

const emptyForm = {
  code: '',
  type: 'percentage',
  value: '',
  minOrderAmount: '',
  maxDiscount: '',
  usageLimit: '',
  expiresAt: '',
  isActive: true,
};

export default function AdminPromoCodesPage() {
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchPromoCodes();
  }, []);

  const fetchPromoCodes = async (search) => {
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (search?.trim()) params.set('search', search.trim());
      const res = await fetch(`/api/promocodes?${params}`);
      const data = await res.json();
      if (data.success) setPromoCodes(data.promoCodes || []);
    } catch (err) {
      console.error('Error fetching promo codes:', err);
      showError('প্রোমো কোড লোড করতে ত্রুটি');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPromoCodes(searchTerm);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const openEdit = (promo) => {
    setEditingId(promo._id);
    setFormData({
      code: promo.code,
      type: promo.type,
      value: String(promo.value),
      minOrderAmount: promo.minOrderAmount ? String(promo.minOrderAmount) : '',
      maxDiscount: promo.maxDiscount ? String(promo.maxDiscount) : '',
      usageLimit: promo.usageLimit ? String(promo.usageLimit) : '',
      expiresAt: promo.expiresAt ? promo.expiresAt.slice(0, 10) : '',
      isActive: promo.isActive,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      showError('কোড আবশ্যক');
      return;
    }
    if (!formData.value || Number(formData.value) <= 0) {
      showError('ভ্যালু আবশ্যক এবং ০-এর বেশি হতে হবে');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        code: formData.code.trim(),
        type: formData.type,
        value: Number(formData.value),
        minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : 0,
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
        expiresAt: formData.expiresAt || null,
        isActive: formData.isActive,
      };

      const res = await fetch(
        editingId ? `/api/promocodes/${editingId}` : '/api/promocodes',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();

      if (!data.success) throw new Error(data.message);

      showSuccess(editingId ? 'প্রোমো কোড আপডেট হয়েছে' : 'প্রোমো কোড তৈরি হয়েছে');
      setShowModal(false);
      fetchPromoCodes(searchTerm);
    } catch (err) {
      showError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (promo) => {
    const ok = await confirmAction(`আপনি কি "${promo.code}" কোডটি ডিলিট করতে চান?`);
    if (!ok) return;

    try {
      const res = await fetch(`/api/promocodes/${promo._id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      showSuccess('প্রোমো কোড ডিলিট হয়েছে');
      fetchPromoCodes(searchTerm);
    } catch (err) {
      showError(err.message);
    }
  };

  const toggleActive = async (promo) => {
    try {
      const res = await fetch(`/api/promocodes/${promo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !promo.isActive }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      showSuccess(promo.isActive ? 'কোড নিষ্ক্রিয় করা হয়েছে' : 'কোড সক্রিয় করা হয়েছে');
      fetchPromoCodes(searchTerm);
    } catch (err) {
      showError(err.message);
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    showSuccess('কোড কপি হয়েছে');
  };

  const isExpired = (expiresAt) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">প্রোমো কোড ব্যবস্থাপনা</h1>
            <p className="text-sm text-gray-500 mt-0.5">প্রোমো কোড তৈরি, সম্পাদনা ও ব্যবস্থাপনা</p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={16} />
            নতুন প্রোমো কোড
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="bg-white rounded-lg border border-gray-100 p-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="কোড দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg font-medium hover:bg-indigo-700 transition">
              খুঁজুন
            </button>
          </div>
        </form>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
            </div>
          ) : promoCodes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">কোড</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ধরন</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ভ্যালু</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ব্যবহার</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">মেয়াদ</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {promoCodes.map((promo) => (
                    <tr key={promo._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 text-sm font-mono">{promo.code}</span>
                          <button onClick={() => copyCode(promo.code)} className="p-1 text-gray-400 hover:text-indigo-600 transition" title="কপি">
                            <Copy size={13} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${promo.type === 'percentage' ? 'text-blue-600' : 'text-purple-600'}`}>
                          {promo.type === 'percentage' ? 'শতাংশ' : 'নির্দিষ্ট'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {promo.type === 'percentage' ? `${promo.value}%` : `৳${promo.value}`}
                        {promo.type === 'percentage' && promo.maxDiscount && (
                          <span className="text-xs text-gray-400 ml-1">(max ৳{promo.maxDiscount})</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-gray-700">
                          {promo.usedCount || 0}
                          {promo.usageLimit ? <span className="text-gray-400"> / {promo.usageLimit}</span> : ''}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {promo.expiresAt ? (
                          <span className={`text-xs ${isExpired(promo.expiresAt) ? 'text-red-500' : 'text-gray-600'}`}>
                            {new Date(promo.expiresAt).toLocaleDateString('bn-BD')}
                            {isExpired(promo.expiresAt) && <span className="ml-1">(মেয়াদোত্তীর্ণ)</span>}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">না</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => toggleActive(promo)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full transition ${
                            promo.isActive
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          {promo.isActive ? <Check size={11} /> : <X size={11} />}
                          {promo.isActive ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => openEdit(promo)} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition" title="এডিট">
                            <Edit2 size={15} />
                          </button>
                          <button onClick={() => handleDelete(promo)} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition" title="ডিলিট">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Gift size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">কোন প্রোমো কোড পাওয়া যায়নি</p>
              <button onClick={openCreate} className="inline-flex items-center gap-1 mt-3 text-indigo-600 text-sm hover:text-indigo-700">
                <Plus size={14} />
                প্রথম প্রোমো কোড তৈরি করুন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-lg">
                {editingId ? 'প্রোমো কোড সম্পাদনা' : 'নতুন প্রোমো কোড'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-100 rounded transition">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">কোড *</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  placeholder="যেমন: SUMMER20"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">ধরন *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="percentage">শতাংশ (%)</option>
                    <option value="fixed">নির্দিষ্ট (৳)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                    {formData.type === 'percentage' ? 'শতাংশ *' : 'পরিমাণ (৳) *'}
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                    placeholder={formData.type === 'percentage' ? 'যেমন: 10' : 'যেমন: 500'}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">ন্যূনতম অর্ডার পরিমাণ</label>
                  <input
                    type="number"
                    name="minOrderAmount"
                    value={formData.minOrderAmount}
                    onChange={handleChange}
                    placeholder="০ (ঐচ্ছিক)"
                    min="0"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {formData.type === 'percentage' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1.5">সর্বোচ্চ ছাড় (৳)</label>
                    <input
                      type="number"
                      name="maxDiscount"
                      value={formData.maxDiscount}
                      onChange={handleChange}
                      placeholder="ঐচ্ছিক"
                      min="0"
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">ব্যবহার সীমা</label>
                  <input
                    type="number"
                    name="usageLimit"
                    value={formData.usageLimit}
                    onChange={handleChange}
                    placeholder="সীমাহীন"
                    min="1"
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1.5">মেয়াদোত্তীর্ণের তারিখ</label>
                  <input
                    type="date"
                    name="expiresAt"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-900">সক্রিয়</span>
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  {editingId ? 'আপডেট' : 'তৈরি করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
