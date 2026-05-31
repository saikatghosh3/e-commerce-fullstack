// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
// import ProductCard from '@/components/ProductCard';
// import { addToCart } from '@/lib/cart';

// export default function ProductDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const [product, setProduct] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   useEffect(() => {
//     fetchProduct();
//   }, [params.id]);

//   const fetchProduct = async () => {
//     try {
//       const response = await fetch(`/api/products/${params.id}`);
//       const data = await response.json();

//       if (data.success) {
//         setProduct(data.product);
//         fetchRelatedProducts(data.product.category);
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRelatedProducts = async (category) => {
//     try {
//       const response = await fetch(`/api/products?category=${category}&limit=4`);
//       const data = await response.json();
//       setRelatedProducts(data.products?.filter((p) => p._id !== params.id) || []);
//     } catch (error) {
//       console.error('Error fetching related products:', error);
//     }
//   };

//   const handleAddToCart = () => {
//     addToCart(product._id, quantity, product.stock);
//     alert('Product added to cart!');
//     router.push('/cart');
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="text-center py-12">
//         <p className="text-gray-600 text-lg">Product not found</p>
//       </div>
//     );
//   }

//   const discountedPrice = product.discount
//     ? product.price - (product.price * product.discount) / 100
//     : product.price;

//   const images = [product.image, ...(product.images || [])];

//   return (
//     <div>
//       {/* Breadcrumb */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
//         >
//           <ChevronLeft size={20} />
//           Back
//         </button>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
//           {/* Image Gallery */}
//           <div>
//             <div className="bg-gray-100 rounded-xl overflow-hidden mb-4 aspect-square flex items-center justify-center">
//               <img
//                 src={images[selectedImage] || 'https://via.placeholder.com/500x500?text=Product'}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>

//             {/* Thumbnail Gallery */}
//             {images.length > 1 && (
//               <div className="flex gap-4 overflow-x-auto pb-2">
//                 {images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
//                       selectedImage === index
//                         ? 'border-blue-600'
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`Product ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-6">
//               <span className="text-blue-600 font-semibold uppercase text-sm">
//                 {product.category}
//               </span>
//               <h1 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
//                 {product.name}
//               </h1>

//               {/* Rating */}
//               <div className="flex items-center gap-4 mb-6">
//                 <div className="flex text-yellow-400">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={20}
//                       className={
//                         i < Math.floor(product.rating || 0)
//                           ? 'fill-yellow-400'
//                           : 'text-gray-300'
//                       }
//                     />
//                   ))}
//                 </div>
//                 <span className="text-gray-600">
//                   {product.reviews?.length || 0} reviews
//                 </span>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="mb-8 pb-8 border-b border-gray-200">
//               <div className="flex items-baseline gap-4">
//                 <span className="text-4xl font-bold text-gray-900">
//                   ${discountedPrice.toFixed(2)}
//                 </span>
//                 {product.discount > 0 && (
//                   <>
//                     <span className="text-2xl text-gray-400 line-through">
//                       ${product.price.toFixed(2)}
//                     </span>
//                     <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
//                       Save {product.discount}%
//                     </span>
//                   </>
//                 )}
//               </div>

//               {/* Stock Status */}
//               <div className="mt-4">
//                 {product.stock > 0 ? (
//                   <p className="text-green-600 font-semibold">
//                     In Stock ({product.stock} available)
//                   </p>
//                 ) : (
//                   <p className="text-red-600 font-semibold">Out of Stock</p>
//                 )}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-8">
//               <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
//               <p className="text-gray-600 leading-relaxed">{product.description}</p>
//             </div>

//             {/* SKU */}
//             <div className="mb-8 pb-8 border-b border-gray-200">
//               <p className="text-gray-600">
//                 <span className="font-semibold">SKU:</span> {product.sku}
//               </p>
//             </div>

//             {/* Quantity & Actions */}
//             {product.stock > 0 && (
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <label className="font-semibold text-gray-900">Quantity:</label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <button
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="px-4 py-2 text-gray-600 hover:bg-gray-100"
//                     >
//                       <ChevronLeft size={20} />
//                     </button>
//                     <input
//                       type="number"
//                       value={quantity}
//                       onChange={(e) =>
//                         setQuantity(
//                           Math.min(product.stock, Math.max(1, parseInt(e.target.value)))
//                         )
//                       }
//                       className="w-16 text-center border-0 focus:outline-none"
//                     />
//                     <button
//                       onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                       className="px-4 py-2 text-gray-600 hover:bg-gray-100"
//                     >
//                       <ChevronRight size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={handleAddToCart}
//                     className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition text-lg"
//                   >
//                     <ShoppingCart size={24} />
//                     Add to Cart
//                   </button>
//                   <button
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                     className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-red-500 transition"
//                   >
//                     <Heart
//                       size={24}
//                       className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
//                     />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Related Products */}
//         {relatedProducts.length > 0 && (
//           <div className="border-t border-gray-200 pt-16">
//             <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {relatedProducts.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Star, ShoppingCart, Heart, ChevronLeft, ChevronRight, Minus, Plus, Truck, Shield, RotateCcw, ZoomIn, X, Share2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { addToCart } from '@/lib/cart';
import { showSuccess } from '@/components/ToastUtils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('description');
  const imageRef = useRef(null);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.product);
        fetchRelatedProducts(data.product.category);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await fetch(`/api/products?category=${category}&limit=4`);
      const data = await response.json();
      setRelatedProducts(data.products?.filter((p) => p._id !== params.id) || []);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/30 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 rounded-full" />
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-slate-600 font-medium text-lg">পণ্য লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50/30 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={32} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">পণ্য পাওয়া যায়নি</h2>
          <p className="text-slate-500 mb-6">এই পণ্যটি বর্তমানে unavailable</p>
          <button
            onClick={() => router.push('/products')}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all"
          >
            সকল পণ্য দেখুন
          </button>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const images = [product.image, ...(product.images || [])];

  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <button
              onClick={() => router.push('/products')}
              className="text-slate-500 hover:text-slate-800 transition-colors"
            >
              পণ্য
            </button>
            <ChevronRight size={16} className="text-slate-400" />
            <button
              onClick={() => router.push(`/products?category=${product.category}`)}
              className="text-slate-500 hover:text-slate-800 transition-colors"
            >
              {product.category}
            </button>
            <ChevronRight size={16} className="text-slate-400" />
            <span className="text-slate-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Product Main Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery Section */}
            <div className="bg-slate-50/50 p-6 lg:p-8">
              {/* Main Image with Zoom */}
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
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    isZoomed
                      ? {
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : undefined
                  }
                />
                
                {/* Zoom Indicator */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn size={20} className="text-slate-700" />
                </div>

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-xl font-bold text-sm shadow-lg">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === index
                          ? 'border-indigo-600 shadow-lg shadow-indigo-600/20 scale-105'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div className="p-6 lg:p-8 flex flex-col">
              {/* Category & Share */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium">
                  {product.category}
                </span>
                <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                  <Share2 size={20} className="text-slate-600" />
                </button>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating || 0)
                          ? 'fill-amber-400'
                          : 'text-slate-200'
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-500 text-sm font-medium">
                  {product.rating || 0} ({product.reviews?.length || 0} রিভিউ)
                </span>
              </div>

              {/* Price Section */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-6 border border-slate-200/60">
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl lg:text-5xl font-bold text-slate-900">
                    ৳{discountedPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-slate-400 line-through">
                        ৳{product.price.toFixed(2)}
                      </span>
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-xl font-semibold text-sm border border-red-200">
                        {product.discount}% ছাড়
                      </span>
                    </>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-emerald-700 font-medium text-sm">
                        স্টকে আছে ({product.stock} টি available)
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="text-red-600 font-medium text-sm">
                        স্টক শেষ
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity & Actions */}
              {product.stock > 0 && (
                <div className="space-y-4 mt-auto">
                 <div className="flex flex-col items-center w-full">
  <label className="block text-sm font-semibold text-slate-700 mb-3 text-center">
    পরিমাণ
  </label>
  <div className="flex items-center gap-0 bg-slate-100 rounded-2xl p-1 w-fit">
    <button
      onClick={() => setQuantity(Math.max(1, quantity - 1))}
      className="p-3 text-slate-600 hover:bg-white hover:text-slate-900 rounded-xl transition-all"
    >
      <Minus size={18} />
    </button>
    <input
      type="number"
      value={quantity}
      onChange={(e) =>
        setQuantity(
          Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1))
        )
      }
      className="w-16 text-center bg-transparent font-bold text-slate-900 text-lg focus:outline-none"
    />
    <button
      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
      className="p-3 text-slate-600 hover:bg-white hover:text-slate-900 rounded-xl transition-all"
    >
      <Plus size={18} />
    </button>
  </div>
</div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all text-lg shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98]"
                    >
                      <ShoppingCart size={22} />
                      কার্টে যোগ করুন
                    </button>
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`px-5 py-4 rounded-2xl border-2 transition-all font-medium ${
                        isWishlisted
                          ? 'border-red-500 bg-red-50 text-red-600'
                          : 'border-slate-200 hover:border-red-300 text-slate-600 hover:bg-red-50'
                      }`}
                    >
                      <Heart
                        size={22}
                        className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
                      />
                    </button>
                  </div>
                </div>
              )}

              {/* Features */}
            
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden mb-8">
          <div className="border-b border-slate-100">
            <div className="flex">
              {[
                { id: 'description', label: 'বিবরণ' },
                { id: 'details', label: 'বিস্তারিত' },
                { id: 'reviews', label: 'রিভিউ' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium text-sm transition-all border-b-2 -mb-[1px] ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 lg:p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-slate-600 leading-relaxed text-lg">
                  {product.description}
                </p>
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
                {product.reviews?.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="rounded-3xl bg-slate-50 border border-slate-200 p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div>
                          <p className="font-semibold text-slate-900">{review.user || 'Anonymous'}</p>
                          <p className="text-sm text-slate-500">{new Date(review.date).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}</p>
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 border border-slate-200">
                          {[...Array(5)].map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              size={16}
                              className={
                                starIndex < Math.floor(review.rating || 0)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300'
                              }
                            />
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
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">একই ধরনের পণ্য</h2>
                <p className="text-slate-500 mt-2">আপনার পছন্দ হতে পারে এমন আরও কিছু পণ্য</p>
              </div>
              <button
                onClick={() => router.push(`/products?category=${product.category}`)}
                className="hidden sm:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                সবগুলো দেখুন
                <ChevronRight size={18} />
              </button>
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