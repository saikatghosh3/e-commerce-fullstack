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
        <div className="text-center bg-white rounded-lg shadow-xl p-12 max-w-md">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">পণ্য পাওয়া যায়নি</h2>
          <p className="text-slate-500 mb-6">এই পণ্যটি বর্তমানে unavailable</p>
          <button onClick={() => router.push('/products')} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-800 transition-all">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 overflow-hidden mb-6 lg:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="bg-slate-50/50 p-3 sm:p-4 lg:p-5">
              <div
                className="relative bg-white rounded-lg overflow-hidden mb-3 sm:mb-4 aspect-square cursor-crosshair group shadow-sm border border-slate-200/60"
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
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity sm:top-4 sm:right-4 sm:p-2.5">
                  <ZoomIn size={18} className="text-slate-700 sm:h-5 sm:w-5" />
                </div>
                {product.discount > 0 && (
                  <div className="absolute top-2.5 left-2.5 bg-red-500 text-white px-2 py-1 rounded-lg font-bold text-xs shadow-lg sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-sm">
                    -{product.discount}%
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:gap-3">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 sm:w-14 sm:h-14 ${selectedImage === index ? 'border-orange-600 shadow-md border-orange-600/60' : 'border-slate-200 hover:border-slate-300 hover:shadow-md'}`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-3.5 sm:p-4 lg:p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="inline-flex items-center px-2.5 py-1 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium sm:px-3 sm:py-1.5 sm:text-sm">{product.category}</span>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors sm:p-2">
                  <Share2 size={18} className="text-slate-600 sm:h-5 sm:w-5" />
                </button>
              </div>

              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-slate-900 mb-3 leading-snug sm:mb-4 lg:mb-6">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4 sm:gap-3 sm:mb-5 lg:mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className={`sm:h-4 sm:w-4 ${i < Math.floor(product.rating || 0) ? 'fill-amber-400' : 'text-slate-200'}`} />
                  ))}
                </div>
                <span className="text-slate-500 text-xs font-medium sm:text-sm">
                  {product.rating || 0} ({product.reviews?.length || 0} রিভিউ)
                </span>
              </div>

              <div className="bg-slate-50 rounded-lg p-3.5 mb-4 border border-slate-200/60 sm:p-4 sm:mb-5 lg:p-6 lg:mb-6">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-2.5 sm:gap-x-3 sm:mb-3 lg:mb-4">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-slate-900">৳{discountedPrice.toFixed(2)}</span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-sm text-slate-400 line-through sm:text-lg lg:text-xl">৳{product.price.toFixed(2)}</span>
                      <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-lg font-semibold text-xs border border-red-200 sm:px-3 sm:py-1 sm:text-sm">{product.discount}% ছাড়</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-700 font-medium text-xs sm:text-sm">স্টকে আছে ({product.stock} টি available)</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-red-600 font-medium text-xs sm:text-sm">স্টক শেষ</span>
                    </>
                  )}
                </div>
              </div>

              {product.stock > 0 && (
                <div className="space-y-3 mt-auto sm:space-y-4">
                  <div className="flex flex-col items-center w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-2 text-center sm:text-sm sm:mb-3">পরিমাণ</label>
                    <div className="flex items-center gap-0 bg-slate-100 rounded-lg p-1 w-fit">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-slate-600 hover:bg-white hover:text-slate-900 rounded-lg transition-all sm:p-2.5 lg:p-3">
                        <Minus size={16} className="sm:h-[18px] sm:w-[18px]" />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-12 text-center bg-transparent font-bold text-slate-900 text-base focus:outline-none sm:w-14 sm:text-lg"
                      />
                      <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2 text-slate-600 hover:bg-white hover:text-slate-900 rounded-lg transition-all sm:p-2.5 lg:p-3">
                        <Plus size={16} className="sm:h-[18px] sm:w-[18px]" />
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <button onClick={handleAddToCart} className="flex-1 bg-orange-600 text-white py-3 sm:py-3.5 lg:py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-all text-sm sm:text-base lg:text-lg shadow-lg shadow-orange-600/20 hover:shadow-orange-600/30 active:scale-[0.98]">
                      <ShoppingCart size={19} className="sm:h-5 sm:w-5 lg:h-[22px] lg:w-[22px]" />
                      কার্টে যোগ করুন
                    </button>
                    <button onClick={() => setIsWishlisted(!isWishlisted)} className={`px-3.5 py-3 rounded-lg border-2 transition-all font-medium sm:px-4 sm:py-3.5 lg:py-4 ${isWishlisted ? 'border-red-500 bg-red-50 text-red-600' : 'border-slate-200 hover:border-red-300 text-slate-600 hover:bg-red-50'}`}>
                      <Heart size={20} className={`sm:h-[22px] sm:w-[22px] ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 overflow-hidden mb-6 lg:mb-8">
          <div className="border-b border-slate-100">
            <div className="flex">
              {[{ id: 'description', label: 'বিবরণ' }, { id: 'details', label: 'বিস্তারিত' }, { id: 'reviews', label: 'রিভিউ' }].map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-3 py-2.5 font-medium text-xs transition-all border-b-2 -mb-[1px] sm:px-4 sm:py-3 sm:text-sm ${activeTab === tab.id ? 'border-orange-600 text-orange-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-3.5 sm:p-4 lg:p-5">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{product.description}</p>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-md p-3">
                    <p className="text-sm text-slate-500 mb-1">ক্যাটাগরি</p>
                    <p className="font-semibold text-slate-900">{product.category}</p>
                  </div>
                  <div className="bg-slate-50 rounded-md p-3">
                    <p className="text-sm text-slate-500 mb-1">স্টক</p>
                    <p className="font-semibold text-slate-900">{product.stock} টি</p>
                  </div>
                  {product.discount > 0 && (
                    <div className="bg-slate-50 rounded-md p-3">
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
                      <div key={index} className="rounded-lg bg-slate-50 border border-slate-200 p-4 shadow-sm sm:p-5 lg:p-6">
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
            <div className="flex items-center justify-between mb-5 sm:mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl lg:text-3xl">একই ধরনের পণ্য</h2>
                <p className="text-sm text-slate-500 mt-1.5 sm:mt-2 sm:text-base">আপনার পছন্দ হতে পারে এমন আরও কিছু পণ্য</p>
              </div>
              <Link href={`/products?category=${product.category}`} className="hidden sm:flex items-center gap-2 text-slate-900 hover:text-slate-700 font-medium">
                সবগুলো দেখুন <ChevronRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
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
