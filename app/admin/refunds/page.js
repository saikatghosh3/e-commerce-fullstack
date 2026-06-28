'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Search, Check, X, Eye, RefreshCw } from 'lucide-react';
import { showSuccess, showError, confirmAction } from '@/components/ToastUtils';

export default function AdminRefundsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/refunds', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      showError('Failed to load refunds');
    } finally {
      setLoading(false);
    }
  };

  const handleRefundAction = async (orderId, action) => {
    const msg = action === 'approve' ? 'Approve this refund?' : 'Reject this refund?';
    const ok = await confirmAction(msg);
    if (!ok) return;

    setActionLoading(orderId);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/refunds/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success) {
        showSuccess(`Refund ${action === 'approve' ? 'approved' : 'rejected'}`);
        fetchRefunds();
      } else {
        showError(data.message);
      }
    } catch (err) {
      showError('Action failed');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      requested: 'bg-amber-100 text-amber-700',
      approved: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status) => {
    const labels = {
      requested: 'Requested',
      approved: 'Approved',
      rejected: 'Rejected',
    };
    return labels[status] || status;
  };

  const filteredOrders = orders.filter((o) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      o.orderNumber?.toLowerCase().includes(term) ||
      o.shippingAddress?.name?.toLowerCase().includes(term) ||
      o.shippingAddress?.email?.toLowerCase().includes(term)
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Refund Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage refund and cancellation requests</p>
          </div>
          <button
            onClick={fetchRefunds}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by order number, customer name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Order</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Reason</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50/50">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900 text-xs">{order.orderNumber}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-800 text-sm">
                          {order.shippingAddress?.name || '-'}
                        </p>
                        <p className="text-xs text-gray-400">{order.shippingAddress?.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium">
                          {order.refundRequested ? 'Refund' : order.cancelRequested ? 'Cancel' : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {order.refundStatus && order.refundStatus !== 'none' ? (
                          <span className={`inline-block px-2 py-1 text-xs rounded ${getStatusColor(order.refundStatus)}`}>
                            {getStatusLabel(order.refundStatus)}
                          </span>
                        ) : order.cancelRequested ? (
                          <span className="inline-block px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                            Cancelled
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="text-xs text-gray-600 truncate">
                          {order.refundReason || order.cancelReason || '-'}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {order.refundStatus === 'requested' && (
                            <>
                              <button
                                onClick={() => handleRefundAction(order._id, 'approve')}
                                disabled={actionLoading === order._id}
                                className="p-1.5 text-green-600 hover:bg-green-50 rounded transition disabled:opacity-50"
                                title="Approve refund"
                              >
                                {actionLoading === order._id ? (
                                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-green-600 border-t-transparent"></div>
                                ) : (
                                  <Check size={16} />
                                )}
                              </button>
                              <button
                                onClick={() => handleRefundAction(order._id, 'reject')}
                                disabled={actionLoading === order._id}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition disabled:opacity-50"
                                title="Reject refund"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => { setSelectedOrder(order); setShowDetail(true); }}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition"
                            title="View details"
                          >
                            <Eye size={16} />
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
              <p className="text-gray-500">No refund or cancellation requests found</p>
            </div>
          )}
        </div>
      </div>

      {showDetail && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Order Details</h3>
              <button onClick={() => setShowDetail(false)} className="p-1 hover:bg-gray-100 rounded">
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-gray-500">Order Number</p>
                <p className="font-semibold text-gray-900">{selectedOrder.orderNumber}</p>
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="text-gray-800">{selectedOrder.shippingAddress?.name}</p>
                <p className="text-sm text-gray-500">{selectedOrder.shippingAddress?.email}</p>
                <p className="text-sm text-gray-500">{selectedOrder.shippingAddress?.phone}</p>
              </div>
              <div className="h-px bg-gray-100" />
              <div>
                <p className="text-xs text-gray-500">Request Type</p>
                <p className="text-gray-800 font-medium">
                  {selectedOrder.refundRequested ? 'Refund Request' : selectedOrder.cancelRequested ? 'Cancellation' : '-'}
                </p>
              </div>
              {selectedOrder.refundReason && (
                <div>
                  <p className="text-xs text-gray-500">Refund Reason</p>
                  <p className="text-gray-800">{selectedOrder.refundReason}</p>
                </div>
              )}
              {selectedOrder.cancelReason && (
                <div>
                  <p className="text-xs text-gray-500">Cancel Reason</p>
                  <p className="text-gray-800">{selectedOrder.cancelReason}</p>
                </div>
              )}
              <div className="h-px bg-gray-100" />
              <div>
                <p className="text-xs text-gray-500">Order Status</p>
                <p className="text-gray-800">{selectedOrder.orderStatus}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Status</p>
                <p className="text-gray-800">{selectedOrder.paymentStatus}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Amount</p>
                <p className="text-gray-800 font-bold">৳{Number(selectedOrder.totalAmount || 0).toFixed(2)}</p>
              </div>
              {selectedOrder.refundNote && (
                <>
                  <div className="h-px bg-gray-100" />
                  <div>
                    <p className="text-xs text-gray-500">Admin Note</p>
                    <p className="text-gray-800">{selectedOrder.refundNote}</p>
                  </div>
                </>
              )}
              <div className="h-px bg-gray-100" />
              <div>
                <p className="text-xs text-gray-500">Items</p>
                <div className="space-y-2 mt-1">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      {item.image && (
                        <img src={item.image} alt="" className="w-10 h-10 rounded object-cover" />
                      )}
                      <div className="flex-1">
                        <p className="text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400">x{item.quantity} @ ৳{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t px-5 py-3">
              <button
                onClick={() => setShowDetail(false)}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
