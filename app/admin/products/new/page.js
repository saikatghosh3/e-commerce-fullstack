'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError } from '@/components/ToastUtils';
import {
  ArrowLeft,
  DollarSign,
  Image,
  Loader2,
  Package,
  PlusCircle,
  Settings,
  Upload,
  Tag,
  Box,
  Check,
} from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    stock: '',
    image: '',
    images: [],
    tags: '',
    featured: false,
    bestSelling: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        if (response.ok && data.success) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'ছবি আপলোড ব্যর্থ');
      }

      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      showError(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category ||
      !formData.stock ||
      !formData.image
    ) {
      showError('দয়া করে সব প্রয়োজনীয় ক্ষেত্র পূরণ করুন');
      return;
    }

    setLoading(true);

    try {
      const data = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        stock: parseInt(formData.stock),
        featured: Boolean(formData.featured),
        bestSelling: Boolean(formData.bestSelling),
        tags: formData.tags.split(',').filter((tag) => tag.trim()),
        sku: `PRD-${Date.now()}`,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showSuccess('পণ্য সফলভাবে তৈরি হয়েছে!');
        router.push('/admin/dashboard');
      } else {
        const errorText = await response.text();
        let errorMessage = 'পণ্য তৈরি করতে ব্যর্থ হয়েছে';

        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }

        showError(`ত্রুটি: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error creating product:', error);
      showError('পণ্য তৈরি করতে ত্রুটি হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 m" >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200"
          >
            <ArrowLeft size={22} />
          </button>
          <div >
            <h1 className=" text-3xl lg:text-4xl font-bold text-gray-900">নতুন পণ্য যোগ করুন</h1>
            <p className="text-gray-500 mt-1 text-sm">আপনার ইনভেন্টরিতে একটি নতুন পণ্য তৈরি করুন</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden  ">
            <div className="p-6 lg:p-8 space-y-8">
              
              <div>
                <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100 justify-center" >
                  <Package size={20} className="text-indigo-600" />
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">মৌলিক তথ্য</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      পণ্যের নাম <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="যেমন: অ্যাপল আইফোন ১৫ প্রো"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      বিবরণ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="পণ্যের বিস্তারিত বিবরণ লিখুন..."
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ক্যাটাগরি <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
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
                  </div>
                </div>
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
                  <DollarSign size={20} className="text-indigo-600" />
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">মূল্য ও স্টক</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      মূল্য (৳) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      placeholder="০.০০"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ছাড় (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      max="100"
                      placeholder="০"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      স্টক সংখ্যা <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      placeholder="০"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
                  <Image size={20} className="text-indigo-600" />
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">পণ্যের ছবি</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      প্রধান ছবি আপলোড করুন <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      <label className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-50 border-2 border-dashed border-indigo-300 rounded-xl cursor-pointer hover:bg-indigo-100 transition group">
                        {uploadingImage ? (
                          <Loader2 size={20} className="animate-spin text-indigo-600" />
                        ) : (
                          <Upload size={20} className="text-indigo-600 group-hover:scale-110 transition" />
                        )}
                        <span className="text-sm font-semibold text-indigo-700">
                          {uploadingImage ? 'আপলোড হচ্ছে...' : 'ছবি নির্বাচন করুন'}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          disabled={uploadingImage}
                        />
                      </label>
                      
                      {formData.image && (
                        <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2">
                          <img
                            src={formData.image}
                            alt="প্রিভিউ"
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                          />
                          <span className="text-sm text-gray-600">ছবি আপলোড হয়েছে</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">JPG, PNG বা WEBP ফরম্যাট সমর্থিত</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      অতিরিক্ত ছবি (ঐচ্ছিক)
                    </label>
                    <textarea
                      name="images"
                      value={Array.isArray(formData.images) ? formData.images.join(', ') : ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          images: e.target.value.split(',').filter((img) => img.trim()),
                        }))
                      }
                      rows={2}
                      placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                    <p className="text-xs text-gray-400 mt-1">একাধিক ছবির ইউআরএল কমা দিয়ে আলাদা করুন</p>
                  </div>
                </div>
              </div>

              
              <div>
                <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
                  <Settings size={20} className="text-indigo-600" />
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">অতিরিক্ত তথ্য</h2>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ট্যাগ (কমা দিয়ে আলাদা করুন)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="নতুন, ডিসকাউন্ট"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        featured: !prev.featured,
                      }))
                    }
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                      formData.featured
                        ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-100'
                        : 'bg-gradient-to-r from-indigo-50/50 to-purple-50/50 border-indigo-100'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        formData.featured
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {formData.featured && <Check size={14} />}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      ফিচারড পণ্য (হোমপেজে প্রদর্শন করুন)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        bestSelling: !prev.bestSelling,
                      }))
                    }
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                      formData.bestSelling
                        ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-100'
                        : 'bg-gradient-to-r from-amber-50/60 to-orange-50/60 border-amber-100'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        formData.bestSelling
                          ? 'bg-amber-600 border-amber-600 text-white'
                          : 'bg-white border-gray-300'
                      }`}
                    >
                      {formData.bestSelling && <Check size={14} />}
                    </span>
                    <span className="text-sm font-semibold text-gray-700">
                      Best Selling section-e dekhan (homepage trust section-er niche)
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 justify-end border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
              >
                বাতিল করুন
              </button>
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                <PlusCircle size={18} />
                {loading ? 'তৈরি হচ্ছে...' : 'পণ্য তৈরি করুন'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
