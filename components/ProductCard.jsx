// 'use client';

// import { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { ShoppingCart, Eye, Heart } from 'lucide-react';

// // আপনার দেওয়া উইশলিস্ট এবং কার্ট লজিক ইম্পোর্ট করুন
// import { toggleWishlist, isWishlisted, WISHLIST_UPDATED_EVENT } from '@/lib/wishlist';
// import { addToCart } from '@/lib/cart'; // আপনার দেওয়া কার্ট লজিক
// import { showSuccess } from '@/components/ToastUtils';

// export default function ProductCard({ product }) {
//   const [favorite, setFavorite] = useState(false);

//   // ১. প্রাইস এবং ডিসকাউন্ট ক্যালকুলেশন
//   const price = Number(product?.price) || 0;
//   const discount = Number(product?.discount) || 0;
//   const discountedPrice = price - (price * (discount / 100));

//   // ২. উইশলিস্ট স্ট্যাটাস চেক
//   useEffect(() => {
//     setFavorite(isWishlisted(product?._id));

//     const handleUpdate = () => {
//       setFavorite(isWishlisted(product?._id));
//     };

//     window.addEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
//     return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
//   }, [product?._id]);

//   // ৩. উইশলিস্ট বাটন ক্লিক হ্যান্ডলার
//   const handleWishlistToggle = (e) => {
//     e.preventDefault();
//     toggleWishlist(product?._id);
//   };

//   // ৪. কার্ট বাটন ক্লিক হ্যান্ডলার (আপনার দেওয়া addToCart ফাংশন ব্যবহার করে)
//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     if (product?._id) {
//       // আপনার লজিক অনুযায়ী: addToCart(productId, quantity, stock)
//       addToCart(product._id, 1, product.stock); 
//       showSuccess(`${product.name} কার্টে যোগ করা হয়েছে!`);
//     }
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col h-full relative">
//       {/* ইমেজ সেকশন */}
//       <div className="relative aspect-square overflow-hidden bg-gray-50">
//         <Image
//           src={product?.images?.[0] || product?.image || '/placeholder.png'}
//           alt={product?.name || 'Product'}
//           fill
//           className="object-cover group-hover:scale-110 transition-transform duration-500"
//           sizes="(max-width: 768px) 100vw, 33vw"
//         />
        
//         {/* উইশলিস্ট বাটন */}
//         <button 
//           onClick={handleWishlistToggle}
//           className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm z-10 transition-transform active:scale-90"
//         >
//           <Heart 
//             size={20} 
//             className={favorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
//           />
//         </button>

//         {discount > 0 && (
//           <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
//             {discount}% ছাড়
//           </div>
//         )}
//       </div>

//       {/* কন্টেন্ট সেকশন */}
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
//           {product?.name || "নামহীন পণ্য"}
//         </h3>
        
//         <div className="flex items-baseline gap-2 mb-4">
//           <span className="text-lg font-semibold text-gray-900">
//             ৳{discountedPrice.toFixed(2)}
//           </span>
//           {discount > 0 && (
//             <span className="text-sm text-gray-400 line-through">
//               ৳{price.toFixed(2)}
//             </span>
//           )}
//         </div>

//         {/* অ্যাকশন বাটন */}
//         <div className="flex gap-2 mt-auto">
//           <Link
//             href={`/products/${product?._id}`}
//             className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-2.5 rounded-md font-semibold hover:bg-gray-200 transition-colors"
//           >
//             <Eye size={18} /> বিস্তারিত
//           </Link>
          
//           <button 
//             onClick={handleAddToCart}
//             className="bg-orange-600 text-white p-3 rounded-md hover:bg-orange-700 transition-colors active:scale-95"
//           >
//             <ShoppingCart size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// 2nd card design with better UI and UX start

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Eye, Heart, Flame } from 'lucide-react';

// আপনার দেওয়া উইশলিস্ট এবং কার্ট লজিক ইম্পোর্ট করুন
import { toggleWishlist, isWishlisted, WISHLIST_UPDATED_EVENT } from '@/lib/wishlist';
import { addToCart } from '@/lib/cart'; // আপনার দেওয়া কার্ট লজিক
import { showSuccess } from '@/components/ToastUtils';

// 10x10 neutral placeholder shown while the real image decodes
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjFmMmY1Ii8+PC9zdmc+';

export default function ProductCard({ product, priority = false, variant = 'default' }) {
  const isHorizontal = variant === 'horizontal';
  const router = useRouter();
  const [favorite, setFavorite] = useState(false);

  // ১. প্রাইস এবং ডিসকাউন্ট ক্যালকুলেশন
  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  const discountedPrice = price - (price * (discount / 100));

  // ২. উইশলিস্ট স্ট্যাটাস চেক
  useEffect(() => {
    setFavorite(isWishlisted(product?._id));

    const handleUpdate = () => {
      setFavorite(isWishlisted(product?._id));
    };

    window.addEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(WISHLIST_UPDATED_EVENT, handleUpdate);
  }, [product?._id]);

  // ৩. উইশলিস্ট বাটন ক্লিক হ্যান্ডলার
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    toggleWishlist(product?._id);
  };

  // ৪. কার্ট বাটন ক্লিক হ্যান্ডলার (আপনার দেওয়া addToCart ফাংশন ব্যবহার করে)
  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product?._id) {
      // আপনার লজিক অনুযায়ী: addToCart(productId, quantity, stock)
      addToCart(product._id, 1, product.stock); 
      showSuccess(`${product.name} কার্টে যোগ করা হয়েছে!`);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    if (product?._id) {
      addToCart(product._id, 1, product.stock);
      showSuccess(`${product.name} কার্টে যোগ করা হয়েছে!`);
      router.push('/checkout');
    }
  };

  return (
    <div className={`group relative flex h-full overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md ${
      isHorizontal
        ? 'flex-row border-slate-100 hover:border-orange-200'
        : 'flex-col border-slate-200/80 hover:border-slate-300'
    }`}>
      {/* ইমেজ সেকশন */}
      <div className={`relative overflow-hidden bg-slate-50/50 ${
        isHorizontal ? 'min-h-[150px] w-[38%] shrink-0 bg-white sm:min-h-[180px] sm:w-[40%] lg:min-h-[220px]' : 'aspect-square w-full'
      }`}>
        <Image
          src={product?.images?.[0] || product?.image || '/placeholder.jpg'}
          alt={product?.name || 'Product'}
          fill
          className={`${isHorizontal ? 'object-contain p-2.5 sm:p-4' : 'object-cover object-center'} transition-transform duration-500 ease-out ${isHorizontal ? 'group-hover:scale-[1.03]' : 'group-hover:scale-105'}`}
          sizes={isHorizontal
            ? '(max-width: 1023px) 40vw, 20vw'
            : '(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw'}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          priority={priority}
        />

        {/* উইশলিস্ট বাটন */}
        <button 
          onClick={handleWishlistToggle}
          className={`absolute top-2 z-10 rounded-full border border-slate-200/50 bg-white/90 p-1.5 shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white active:scale-95 group/heart sm:top-3 ${
            isHorizontal ? 'left-2 sm:left-3' : 'right-2 sm:right-3'
          }`}
          aria-label={favorite ? 'উইশলিস্ট থেকে সরান' : 'উইশলিস্টে যোগ করুন'}
        >
          <Heart 
            size={isHorizontal ? 16 : 18}
            className={`transition-colors duration-300 ${favorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover/heart:text-rose-500"}`} 
          />
        </button>

        {/* ডিসকাউন্ট ব্যাজ */}
        {discount > 0 && !isHorizontal && (
          <div className="absolute left-2 top-2 rounded-md border border-rose-400/20 bg-rose-500/90 px-2 py-1 text-[10px] font-semibold tracking-wide text-white shadow-sm backdrop-blur-sm sm:left-3 sm:top-3 sm:px-3 sm:text-xs">
            {discount}% ছাড়
          </div>
        )}
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className={`flex flex-grow flex-col ${
        isHorizontal ? 'justify-center p-3 sm:p-4 lg:p-5' : 'p-2.5 sm:p-3'
      }`}>
        {/* প্রোডাক্ট নাম */}
        <h3 className={`mb-1.5 line-clamp-2 font-medium text-slate-800 transition-colors duration-300 group-hover:text-slate-900 ${
          isHorizontal ? 'pr-2 text-sm sm:text-base lg:text-lg' : 'min-h-[2rem] text-[13px] sm:min-h-[2.25rem] sm:text-sm'
        }`}>
          {isHorizontal ? (
            <Link href={`/products/${product?._id}`} className="hover:text-orange-700">
              {product?.name || 'নামহীন পণ্য'}
            </Link>
          ) : (
            product?.name || 'নামহীন পণ্য'
          )}
        </h3>
        
        {/* প্রাইস সেকশন */}
        <div className={`mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 ${isHorizontal ? 'sm:mb-3' : ''}`}>
          <span className={`font-semibold tracking-tight ${isHorizontal ? 'text-base text-orange-600 sm:text-lg' : 'text-base text-slate-900 sm:text-lg'}`}>
            ৳{discountedPrice.toLocaleString('bn-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </span>
          {discount > 0 && (
            <span className="text-xs font-medium text-slate-400 line-through decoration-slate-300 sm:text-sm">
              ৳{price.toLocaleString('bn-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {isHorizontal && discount > 0 && (
          <span className="mb-3 w-fit rounded-full bg-lime-400 px-2 py-0.5 text-[10px] font-medium text-slate-800 sm:text-xs">
            Save ৳{(price - discountedPrice).toLocaleString('bn-BD', { maximumFractionDigits: 2 })}
          </span>
        )}

        {/* অ্যাকশন বাটন গ্রুপ */}
        <div className={`mt-auto flex gap-1.5 ${isHorizontal ? 'flex-row gap-2' : ''}`}>
          {isHorizontal ? (
            <>
              <button
                onClick={handleAddToCart}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md border border-orange-500 px-2 py-2 text-[10px] font-medium text-orange-600 transition-colors hover:bg-orange-50 sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                <ShoppingCart size={14} className="shrink-0" />
                <span className="whitespace-nowrap">Add To Cart</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-md bg-orange-500 px-2 py-2 text-[10px] font-semibold text-white transition-colors hover:bg-orange-600 sm:gap-2 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                <ShoppingCart size={14} className="shrink-0" />
                <span className="whitespace-nowrap">Buy now</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/products/${product?._id}`}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200/60 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-700 transition-all duration-300 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 sm:px-3 sm:py-2.5 sm:text-sm"
              >
                <Eye size={16} className="shrink-0 opacity-80" />
                <span>বিস্তারিত</span>
              </Link>
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-1.5 rounded-md bg-orange-600 p-1.5 px-3.5 font-medium text-white shadow-md shadow-orange-600/10 transition-all duration-300 hover:bg-orange-700 hover:shadow-orange-600/20 active:scale-95"
                title="কার্টে যোগ করুন"
              >
                <ShoppingCart size={18} className="shrink-0" />
              </button>
            </>
          )}
        </div>

        {isHorizontal && product?.bestSelling && (
          <div className="absolute right-0 top-0 inline-flex items-center gap-1 rounded-bl-md bg-rose-500 px-2 py-1 text-[10px] font-semibold text-white sm:text-xs">
            <Flame size={12} />
            সর্বাধিক বিক্রিত
          </div>
        )}
      </div>
    </div>
  );
}


// 2nd card design with better UI and UX end 