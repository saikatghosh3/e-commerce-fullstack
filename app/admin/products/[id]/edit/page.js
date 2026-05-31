'use client';

import { useState, useEffect, React } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError } from '@/components/ToastUtils';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); // URL থেকে [id] নেওয়ার জন্য
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // ফর্ম ডাটা স্টেট
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    discount: '',
    description: '',
    image: '',
    sku: '',
    featured: false,
    bestSelling: false,
    reviews: [],
  });

  const handleReviewChange = (index, field, value) => {
    setFormData((prev) => {
      const reviews = [...(prev.reviews || [])];
      reviews[index] = { ...reviews[index], [field]: value };
      return { ...prev, reviews };
    });
  };

  const handleAddReview = () => {
    setFormData((prev) => ({
      ...prev,
      reviews: [
        ...(prev.reviews || []),
        {
          user: '',
          rating: 5,
          comment: '',
          date: new Date().toISOString(),
        },
      ],
    }));
  };

  const handleRemoveReview = (index) => {
    setFormData((prev) => {
      const reviews = [...(prev.reviews || [])];
      reviews.splice(index, 1);
      return { ...prev, reviews };
    });
  };

  // ১. পেজ লোড হওয়ার সময় আগের ডাটাগুলো ডাটাবেস থেকে নিয়ে আসা
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [productResponse, categoriesResponse] = await Promise.all([
          fetch(`/api/products/${id}`),
          fetch('/api/categories'),
        ]);
        const data = await productResponse.json();
        const categoriesData = await categoriesResponse.json();

        if (categoriesResponse.ok && categoriesData.success) {
          setCategories(categoriesData.categories || []);
        }
        
        if (data.success) {
          setFormData(data.product);
        } else {
          showError('পণ্য পাওয়া যায়নি');
          router.push('/admin/dashboard');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, router]);

  // ইনপুট চেঞ্জ হ্যান্ডলার
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  // ২. আপডেট সাবমিট করার ফাংশন (এটিই আপনার API-এর PUT মেথড কল করবে)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT', // আপনার API ফাইলে PUT লজিক আছে, তাই এখানে PUT হবে
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        showSuccess('পণ্য সফলভাবে আপডেট হয়েছে!');
        router.push('/admin/dashboard'); // ড্যাশবোর্ডে ফিরে যাওয়া
        router.refresh(); // নতুন ডাটা দেখানোর জন্য রিফ্রেশ
      } else {
        showError('আপডেট ব্যর্থ: ' + data.message);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      showError('একটি ত্রুটি হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-10 text-center font-bold">লোড হচ্ছে...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">পণ্য এডিট করুন</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* নাম */}
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">পণ্যের নাম</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* মূল্য */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">মূল্য (৳)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* স্টক */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">স্টক পরিমাণ</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            {/* ক্যাটাগরি */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ক্যাটাগরি</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              >
                <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                {categories.map((cat) => (
                  <option key={cat._id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ডিসকাউন্ট */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ডিসকাউন্ট (%)</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-indigo-100 bg-indigo-50/60">
                <input
                  type="checkbox"
                  name="featured"
                  checked={Boolean(formData.featured)}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-semibold text-gray-700">Featured product</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border border-amber-100 bg-amber-50/60">
                <input
                  type="checkbox"
                  name="bestSelling"
                  checked={Boolean(formData.bestSelling)}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm font-semibold text-gray-700">Best Selling section-e dekhan</span>
              </label>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">রিভিউ ম্যানেজমেন্ট</h2>
                <p className="text-sm text-slate-500">এই প্রোডাক্টের জন্য অ্যাডমিন রিভিউ তৈরি, সম্পাদনা এবং মোছা যাবে।</p>
              </div>
              <button
                type="button"
                onClick={handleAddReview}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
              >
                + নতুন রিভিউ
              </button>
            </div>

            {(formData.reviews || []).length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
                কোন রিভিউ নেই
              </div>
            ) : (
              <div className="space-y-4">
                {(formData.reviews || []).map((review, index) => (
                  <div key={index} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <p className="text-sm text-slate-500 mb-1">রিভিউয়ার</p>
                        <input
                          type="text"
                          value={review.user || ''}
                          onChange={(e) => handleReviewChange(index, 'user', e.target.value)}
                          placeholder="নাম লিখুন"
                          className="w-full md:w-80 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 mb-1">রেটিং</p>
                        <select
                          value={review.rating || 5}
                          onChange={(e) => handleReviewChange(index, 'rating', Number(e.target.value))}
                          className="w-full md:w-32 px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {[5, 4, 3, 2, 1].map((value) => (
                            <option key={value} value={value}>{value} স্টার</option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveReview(index)}
                        className="self-start px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition"
                      >
                        মোছুন
                      </button>
                    </div>

                    <div>
                      <p className="text-sm text-slate-500 mb-1">মন্তব্য</p>
                      <textarea
                        value={review.comment || ''}
                        onChange={(e) => handleReviewChange(index, 'comment', e.target.value)}
                        rows={3}
                        placeholder="রিভিউয়ের মন্তব্য লিখুন..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              বাতিল করুন
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {submitting ? 'আপডেট হচ্ছে...' : 'আপডেট সেভ করুন'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
