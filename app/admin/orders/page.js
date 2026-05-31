'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Save, Eye, X, Package, Trash2 } from 'lucide-react';
import { showSuccess, showError, confirmAction } from '@/components/ToastUtils';

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const paymentStatuses = ['pending', 'completed', 'failed', 'refunded'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState('');
  const [deletingId, setDeletingId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [drafts, setDrafts] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (search = searchTerm) => {
    setLoading(true);

    try {
      const query = new URLSearchParams({ limit: '50' });

      if (search.trim()) {
        query.set('search', search.trim());
      }

      const response = await fetch(`/api/orders?${query.toString()}`);
      const data = await response.json();
      const nextOrders = data.orders || [];

      setOrders(nextOrders);
      setDrafts(
        nextOrders.reduce((acc, order) => {
          acc[order._id] = {
            orderStatus: order.orderStatus,
            paymentStatus: order.paymentStatus,
            shippingAddress: {
              name: order.shippingAddress?.name || '',
              email: order.shippingAddress?.email || '',
              phone: order.shippingAddress?.phone || '',
              street: order.shippingAddress?.street || '',
              city: order.shippingAddress?.city || '',
              state: order.shippingAddress?.state || '',
              zipCode: order.shippingAddress?.zipCode || '',
              country: order.shippingAddress?.country || '',
            },
            notes: order.notes || '',
          };
          return acc;
        }, {})
      );
    } catch (error) {
      console.error('Error fetching orders:', error);
      showError('অর্ডার লোড করতে ত্রুটি হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const updateDraft = (orderId, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const updateAddressDraft = (orderId, field, value) => {
    setDrafts((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        shippingAddress: {
          ...prev[orderId]?.shippingAddress,
          [field]: value,
        },
      },
    }));
  };

  const saveOrder = async (orderId) => {
    setSavingId(orderId);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(drafts[orderId]),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'অর্ডার আপডেট করতে ব্যর্থ');
      }

      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? data.order : order))
      );
      showSuccess('অর্ডার সফলভাবে আপডেট হয়েছে');
    } catch (error) {
      console.error('Error saving order:', error);
      showError(error.message);
    } finally {
      setSavingId('');
    }
  };

  const deleteOrder = async (order) => {
    const ok = await confirmAction(`আপনি কি অর্ডার ${order.orderNumber} ডিলিট করতে চান?`);
    if (!ok) return;

    setDeletingId(order._id);

    try {
      const response = await fetch(`/api/orders/${order._id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'অর্ডার ডিলিট করতে ব্যর্থ');
      }

      setOrders((prev) => prev.filter((item) => item._id !== order._id));
      setDrafts((prev) => {
        const nextDrafts = { ...prev };
        delete nextDrafts[order._id];
        return nextDrafts;
      });
      showSuccess('অর্ডার সফলভাবে ডিলিট হয়েছে');
    } catch (error) {
      console.error('Error deleting order:', error);
      showError(error.message);
    } finally {
      setDeletingId('');
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchOrders(searchTerm);
  };

  const viewCustomerDetails = (order) => {
    setSelectedOrder(order);
    setShowCustomerModal(true);
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-amber-100 text-amber-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-green-100 text-green-700',
      failed: 'bg-red-100 text-red-700',
      refunded: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'পেন্ডিং',
      processing: 'প্রসেসিং',
      shipped: 'শিপ্পড',
      delivered: 'ডেলিভারেড',
      cancelled: 'ক্যান্সেলড',
      completed: 'সম্পন্ন',
      failed: 'ব্যর্থ',
      refunded: 'রিফান্ডেড',
    };
    return labels[status] || status;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">অর্ডার ব্যবস্থাপনা</h1>
            <p className="text-sm text-gray-500 mt-0.5">সকল অর্ডার দেখুন ও আপডেট করুন</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">মোট অর্ডার</p>
              <p className="text-xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">পেন্ডিং</p>
              <p className="text-xl font-bold text-amber-600">{orders.filter(o => o.orderStatus === 'pending').length}</p>
            </div>
            <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-500">ডেলিভারেড</p>
              <p className="text-xl font-bold text-green-600">{orders.filter(o => o.orderStatus === 'delivered').length}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="অর্ডার নম্বর, নাম বা ফোন দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg font-medium hover:bg-indigo-700 transition">
              খুঁজুন
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">অর্ডার নং</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">গ্রাহক</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">পণ্য</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">মোট</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">স্ট্যাটাস</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">পেমেন্ট</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-xs">{order.orderNumber}</p>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('bn-BD')}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800 text-sm">{order.shippingAddress?.name || '-'}</p>
                        <p className="text-xs text-gray-400">{order.shippingAddress?.phone || '-'}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs text-gray-600">{order.items?.length || 0} টি পণ্য</p>
                        <p className="text-xs text-gray-400">{order.items?.[0]?.name?.substring(0, 25)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">৳{Number(order.totalAmount || 0).toFixed(2)}</p>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={drafts[order._id]?.orderStatus || order.orderStatus}
                          onChange={(event) => updateDraft(order._id, 'orderStatus', event.target.value)}
                          className={`px-2 py-1 text-xs rounded border border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${getStatusColor(drafts[order._id]?.orderStatus || order.orderStatus)}`}
                        >
                          {orderStatuses.map((status) => (
                            <option key={status} value={status} className="text-gray-700">
                              {getStatusLabel(status)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(order.paymentStatus)}`}>
                          {getStatusLabel(order.paymentStatus)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewCustomerDetails(order)}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition"
                            title="গ্রাহকের তথ্য দেখুন"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            onClick={() => saveOrder(order._id)}
                            disabled={savingId === order._id}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded transition disabled:opacity-50"
                            title="সেভ করুন"
                          >
                            {savingId === order._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                            ) : (
                              <Save size={16} />
                            )}
                          </button>
                          <button
                            onClick={() => deleteOrder(order)}
                            disabled={deletingId === order._id}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                            title="অর্ডার ডিলিট করুন"
                          >
                            {deletingId === order._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent"></div>
                            ) : (
                              <Trash2 size={16} />
                            )}
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
              <Package size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">কোন অর্ডার পাওয়া যায়নি</p>
            </div>
          )}
        </div>
      </div>

      {/* কাস্টমার ইনফরমেশন মডেল */}
      {showCustomerModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowCustomerModal(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">গ্রাহকের তথ্য</h3>
              <button onClick={() => setShowCustomerModal(false)} className="p-1 hover:bg-gray-100 rounded transition">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-gray-500">অর্ডার নম্বর</p>
                <p className="font-semibold text-gray-900">{selectedOrder.orderNumber}</p>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div>
                <p className="text-xs text-gray-500">নাম</p>
                <p className="text-gray-800">{selectedOrder.shippingAddress?.name || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ইমেইল</p>
                <p className="text-gray-800">{selectedOrder.shippingAddress?.email || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ফোন</p>
                <p className="text-gray-800">{selectedOrder.shippingAddress?.phone || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">ঠিকানা</p>
                <p className="text-gray-800">
                  {selectedOrder.shippingAddress?.street}<br/>
                  {selectedOrder.shippingAddress?.city && `${selectedOrder.shippingAddress?.city}, `}
                  {selectedOrder.shippingAddress?.state && `${selectedOrder.shippingAddress?.state} - `}
                  {selectedOrder.shippingAddress?.zipCode}<br/>
                  {selectedOrder.shippingAddress?.country}
                </p>
              </div>
              {selectedOrder.notes && (
                <>
                  <div className="h-px bg-gray-100"></div>
                  <div>
                    <p className="text-xs text-gray-500">নোটস</p>
                    <p className="text-gray-800">{selectedOrder.notes}</p>
                  </div>
                </>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-5 py-3">
              <button
                onClick={() => setShowCustomerModal(false)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
