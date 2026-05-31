'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Search, Filter, Package, Tag, DollarSign, Layers } from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError, confirmAction } from '@/components/ToastUtils';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/api/products?page=${currentPage}&limit=10`);
      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = await confirmAction('আপনি কি এই পণ্যটি ডিলিট করতে চান?');
    if (!ok) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        showSuccess('পণ্য সফলভাবে ডিলিট হয়েছে');
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showError('পণ্য ডিলিট করতে ত্রুটি হয়েছে');
    }
  };



const filteredProducts = products.filter((product) => {
  const productName = (product?.name || "").toLowerCase();
  
  
  const productCategory = (product?.category || "").toLowerCase();
  const search = searchTerm.toLowerCase();

  
  const matchesSearch = productName.includes(search) || productCategory.includes(search);

  return matchesSearch;
});



  const getStockBadge = (stock) => {
    const stockCount = Number(stock) || 0;
    if (stockCount > 50) return <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-700">স্টকে আছে</span>;
    if (stockCount > 0) return <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">স্বল্প স্টক</span>;
    return <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700">স্টক আউট</span>;
  };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">পণ্য তালিকা</h1>
            <p className="text-sm text-gray-500 mt-0.5">আপনার ইনভেন্টরির সব পণ্য এখানে দেখুন</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={16} />
            নতুন পণ্য
          </Link>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="নাম বা ক্যাটাগরি দিয়ে খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition text-gray-600">
              <Filter size={14} />
              ফিল্টার
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">পণ্য</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ক্যাটাগরি</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">মূল্য</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">স্টক</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => {

                      const price = Number(product?.price) || 0;
                      const discount = Number(product?.discount) || 0;
                      const originalPrice = price + (price * discount / 100);

                      return (
                        <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product?.images?.[0] || product?.image || 'https://via.placeholder.com/40x40?text=Img'}
                                alt={product?.name || "Product"}
                                className="w-9 h-9 rounded-lg object-cover bg-gray-100"
                              />
                              <div>
                                <p className="font-medium text-gray-800 text-sm line-clamp-1 max-w-[200px]">
                                  {product?.name || "নামহীন পণ্য"}
                                </p>
                                <p className="text-xs text-gray-400">SKU: {product?.sku || 'N/A'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center gap-1 text-xs text-gray-600">
                              <Tag size={12} />
                              {product?.category || "অন্যান্য"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div>
                              <span className="font-semibold text-gray-900">৳{price.toFixed(2)}</span>
                              {discount > 0 && (
                                <span className="text-xs text-red-500 ml-1 line-through"> 
                                  ৳{originalPrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                            {discount > 0 && (
                              <span className="text-xs text-green-600">-{discount}% ছাড়</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-1">
                              <span className="font-medium text-gray-800 text-sm">{product?.stock || 0} টি</span>
                              {getStockBadge(product?.stock)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <Link
                                href={`/admin/products/${product._id}/edit`}
                                className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded transition"
                                title="এডিট"
                              >
                                <Edit2 size={15} />
                              </Link>
                              <button
                                onClick={() => handleDelete(product._id)}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded transition"
                                title="ডিলিট"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="border-t border-gray-100 px-4 py-3 flex justify-between items-center bg-gray-50/30">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition bg-white"
                >
                  আগের পৃষ্ঠা
                </button>
                <span className="text-xs text-gray-500">
                  পৃষ্ঠা {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition bg-white"
                >
                  পরের পৃষ্ঠা
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">কোন পণ্য পাওয়া যায়নি</p>
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-1 mt-3 text-indigo-600 text-sm hover:text-indigo-700"
              >
                <Plus size={14} />
                প্রথম পণ্য যোগ করুন
              </Link>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

