'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Users, Search, Loader2, X, Check, Shield, Eye } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: '20' });
      if (search) params.set('search', search);
      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      }
    } catch {
      toast.error('ইউজার লোড করতে ব্যর্থ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchUsers();
  };

  const handleUpdateUser = async (userId, updates) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        toast.success('ইউজার সফলভাবে আপডেট হয়েছে');
        fetchUsers();
        setSelectedUser(null);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('ইউজার আপডেট করতে ব্যর্থ');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('আপনি কি এই ইউজার ডিলিট করতে চান?')) return;
    try {
      const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('ইউজার ডিলিট হয়েছে');
        fetchUsers();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error('ইউজার ডিলিট করতে ব্যর্থ');
    }
  };

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
          <Shield size={12} />
          অ্যাডমিন
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
        ইউজার
      </span>
    );
  };

  return (
    <AdminLayout>
    <div>
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Users size={24} className="text-blue-600" />
            ইউজার ব্যবস্থাপনা
          </h1>
          <p className="text-sm text-gray-500 mt-1">নিবন্ধিত ইউজার দেখুন ও ব্যবস্থাপনা করুন</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-4 border-b">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ফোন দিয়ে খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              খুঁজুন
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-semibold text-gray-600">নাম</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ইমেইল</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ফোন</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ভূমিকা</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">স্ট্যাটাস</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">জয়েন</th>
                <th className="text-right px-4 py-3 font-semibold text-gray-600">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Loader2 size={24} className="animate-spin mx-auto text-gray-400" />
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    কোন ইউজার পাওয়া যায়নি
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <span className="font-medium text-gray-900">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-600">{user.phone || '-'}</td>
                    <td className="px-4 py-3">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-3">
                      {user.isActive !== false ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                          <Check size={12} />
                          সক্রিয়
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                          <X size={12} />
                          নিষ্ক্রিয়
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="বিস্তারিত দেখুন"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            const newStatus = user.isActive === false ? true : false;
                            handleUpdateUser(user._id, { isActive: newStatus });
                          }}
                          className={`p-1.5 rounded-lg transition ${
                            user.isActive !== false
                              ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                              : 'text-green-500 hover:text-green-600 hover:bg-green-50'
                          }`}
                          title={user.isActive !== false ? 'নিষ্ক্রিয় করুন' : 'সক্রিয় করুন'}
                        >
                          {user.isActive !== false ? <X size={16} /> : <Check size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <span className="text-sm text-gray-500">
              পৃষ্ঠা {page} / {totalPages}
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                পূর্ববর্তী
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                পরবর্তী
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">ইউজার বিস্তারিত</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {selectedUser.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-gray-500 mb-1">ফোন</label>
                  <p className="font-medium text-gray-900">{selectedUser.phone || '-'}</p>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">ভূমিকা</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => {
                      setSelectedUser({ ...selectedUser, role: e.target.value });
                    }}
                    className="w-full px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="user">ইউজার</option>
                    <option value="admin">অ্যাডমিন</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">স্ট্যাটাস</label>
                  <select
                    value={selectedUser.isActive !== false ? 'active' : 'inactive'}
                    onChange={(e) => {
                      setSelectedUser({ ...selectedUser, isActive: e.target.value === 'active' });
                    }}
                    className="w-full px-2 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">সক্রিয়</option>
                    <option value="inactive">নিষ্ক্রিয়</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1">জয়েন</label>
                  <p className="font-medium text-gray-900">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {selectedUser.address && (
                <div className="border-t pt-4">
                  <label className="block text-sm text-gray-500 mb-2">ঠিকানা</label>
                  <p className="text-sm text-gray-900">
                    {[
                      selectedUser.address.street,
                      selectedUser.address.city,
                      selectedUser.address.state,
                      selectedUser.address.zipCode,
                      selectedUser.address.country,
                    ]
                      .filter(Boolean)
                      .join(', ') || '-'}
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-sm text-gray-700 border rounded-lg hover:bg-gray-50 transition"
              >
                বাতিল
              </button>
              <button
                onClick={() =>
                  handleUpdateUser(selectedUser._id, {
                    role: selectedUser.role,
                    isActive: selectedUser.isActive,
                  })
                }
                disabled={saving}
                className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? 'সেভ হচ্ছে...' : 'পরিবর্তন সংরক্ষণ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </AdminLayout>
  );
}
