'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, ShoppingCart, Heart, ChevronRight, Minus, Plus, ZoomIn, X, Share2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import { showSuccess } from '@/components/ToastUtils';

export default function ProductDetailClient({ product, relatedProducts }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('description');
  const imageRef = useRef(null);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50/30 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">পণ্য পাওয়া যায়নি</h2>
          <p className="text-slate-500 mb-6">এই পণ্যটি বর্তমানে unavailable</p>
          <button onClick={() => router.push('/products')} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all">
            সকল পণ্য দেখুন
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product._id, quantity, product.stock);
    showSuccess('পণ্যটি কার্টে যোগ করা হয়েছে!');
    router.push('/cart');
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const images = [product.image, ...(product.images || [])];

  return (
    <div className="min-h-screen bg-slate-50/30">
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/products" className="text-slate-500 hover:text-slate-800 transition-colors">পণ্য</Link>
            <ChevronRight size={16} className="text-slate-400" />
            <Link href={`/products?category=${product.category}`} className="text-slate-500 hover:text-slate-800 transition-colors">{product.category}</Link>
            <ChevronRight size={16} className="text-slate-400" />
            <span className="text-slate-900 font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="bg-slate-50/50 p-6 lg:p-8">
              <div
                className="relative bg-white rounded-2xl overflow-hidden mb-4 aspect-square cursor-crosshair group shadow-sm border border-slate-200/60"
                ref={imageRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={images[selectedImage] || 'https://via.placeholder.com/600x600?text=Product'}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                  style={isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : undefined}
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={20} className="text-slate-700" />
                </div>
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg">
                    -{product.discount}%
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${selectedImage === index ? 'border-indigo-600 shadow-lg shadow-indigo-600/20 scale-105' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 lg:p-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium">{product.category}</span>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <Share2 size={20} className="text-slate-600" />
                </button>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < Math.floor(product.rating || 0) ? 'fill-amber-400' : 'text-slate-200'} />
                  ))}
                </div>
                <span className="text-slate-500 text-sm font-medium">
                  {product.rating || 0} ({product.reviews?.length || 0} রিভিউ)
                </span>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-200/60">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl lg:text-5xl font-bold text-slate-900">৳{discountedPrice.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-slate-400 line-through">৳{product.price.toFixed(2)}</span>
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-xl font-semibold text-sm border border-red-200">{product.discount}% ছাড়</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-700 font-medium text-sm">স্টকে আছে ({product.stock} টি available)</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-red-600 font-medium text-sm">স্টক শেষ</span>
                    </>
                  )}
                </div>
              </div>

              {product.stock > 0 && (
                <div className="space-y-4 mt-auto">
                  <div className="flex flex-col items-center w-full">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">পরিমাণ</label>
                    <div className="flex items-center gap-0 bg-slate-100 rounded-2xl p-1 w-fit">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-slate-600 hover:bg-white hover:text-slate-900 rounded-xl transition-all">
                        <Minus size={18} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-16 text-center bg-transparent font-bold text-slate-900 text-lg focus:outline-none"
                      />
                      <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3 text-slate-600 hover:bg-white hover:text-slate-900 rounded-xl transition-all">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={handleAddToCart} className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all text-lg shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98]">
                      <ShoppingCart size={22} />
                      কার্টে যোগ করুন
                    </button>
                    <button onClick={() => setIsWishlisted(!isWishlisted)} className={`px-5 py-4 rounded-2xl border-2 transition-all font-medium ${isWishlisted ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-200 hover:border-red-300 text-slate-600 hover:bg-red-50'}`}>
                      <Heart size={22} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-8">
          <div className="border-b border-slate-100">
            <div className="flex">
              {[{ id: 'description', label: 'বিবরণ' }, { id: 'details', label: 'বিস্তারিত' }, { id: 'reviews', label: 'রিভিউ' }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-6 py-4 font-medium text-sm transition-all border-b-2 -mb-[1px] ${activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 lg:p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-500 mb-1">ক্যাটাগরি</p>
                    <p className="font-semibold text-slate-900">{product.category}</p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-sm text-slate-500 mb-1">স্টক</p>
                    <p className="font-semibold text-slate-900">{product.stock} টি</p>
                  </div>
                  {product.discount > 0 && (
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-sm text-slate-500 mb-1">ছাড়</p>
                      <p className="font-semibold text-red-600">{product.discount}%</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {(() => {
                  const approvedReviews = (product.reviews || []).filter((r) => r.approved !== false);
                  return approvedReviews.length > 0 ? (
                    approvedReviews.map((review, index) => (
                      <div key={index} className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div>
                            <p className="font-semibold text-slate-900">{review.user || 'Anonymous'}</p>
                            <p className="text-sm text-slate-500">{new Date(review.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                          </div>
                          <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-slate-200">
                            {[...Array(5)].map((_, starIndex) => (
                              <Star key={starIndex} size={16} className={starIndex < Math.floor(review.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />
                            ))}
                            <span className="text-sm text-slate-600 ml-2">{review.rating || 0}.0</span>
                          </div>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{review.comment || 'কোন মন্তব্য নেই।'}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Star size={48} className="mx-auto text-slate-200 mb-4" />
                      <p className="text-slate-500 text-lg">এখনো কোনো রিভিউ নেই</p>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">একই ধরনের পণ্য</h2>
                <p className="text-slate-500 mt-2">আপনার পছন্দ হতে পারে এমন আরও কিছু পণ্য</p>
              </div>
              <Link href={`/products?category=${product.category}`} className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
                সবগুলো দেখুন <ChevronRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
