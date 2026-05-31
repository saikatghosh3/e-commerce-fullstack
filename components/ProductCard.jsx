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
//     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 group flex flex-col h-full relative">
//       {/* ইমেজ সেকশন */}
//       <div className="relative h-64 overflow-hidden bg-gray-50">
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
//       <div className="p-5 flex flex-col flex-grow">
//         <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
//           {product?.name || "নামহীন পণ্য"}
//         </h3>
        
//         <div className="flex items-baseline gap-2 mb-4">
//           <span className="text-xl font-bold text-gray-900">
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
//             className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900 py-2.5 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
//           >
//             <Eye size={18} /> বিস্তারিত
//           </Link>
          
//           <button 
//             onClick={handleAddToCart}
//             className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors active:scale-95"
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
import { ShoppingCart, Eye, Heart } from 'lucide-react';

// আপনার দেওয়া উইশলিস্ট এবং কার্ট লজিক ইম্পোর্ট করুন
import { toggleWishlist, isWishlisted, WISHLIST_UPDATED_EVENT } from '@/lib/wishlist';
import { addToCart } from '@/lib/cart'; // আপনার দেওয়া কার্ট লজিক
import { showSuccess } from '@/components/ToastUtils';

export default function ProductCard({ product }) {
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

  return (
    <div className="group flex flex-col h-full relative bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-5px_rgba(79,70,229,0.15)] hover:border-indigo-100 transition-all duration-500 overflow-hidden">
      
      {/* ইমেজ সেকশন */}
      <div className="relative h-64 w-full overflow-hidden bg-slate-50/50">
        <Image
          src={product?.images?.[0] || product?.image || '/placeholder.png'}
          alt={product?.name || 'Product'}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        
        {/* উইশলিস্ট বাটন */}
        <button 
          onClick={handleWishlistToggle}
          className="absolute top-3.5 right-3.5 bg-white/80 backdrop-blur-md border border-slate-200/50 p-2.5 rounded-full shadow-sm z-10 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 group/heart"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${favorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover/heart:text-rose-500"}`} 
          />
        </button>

        {/* ডিসকাউন্ট ব্যাজ */}
        {discount > 0 && (
          <div className="absolute top-3.5 left-3.5 bg-rose-500/90 backdrop-blur-sm border border-rose-400/20 text-white px-3 py-1 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
            {discount}% ছাড়
          </div>
        )}
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-5 flex flex-col flex-grow">
        {/* প্রোডাক্ট নাম */}
        <h3 className="text-base font-semibold text-slate-800 line-clamp-2 min-h-[3rem] mb-2 group-hover:text-indigo-600 transition-colors duration-300">
          {product?.name || "নামহীন পণ্য"}
        </h3>
        
        {/* প্রাইস সেকশন */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            ৳{discountedPrice.toLocaleString('bn-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </span>
          {discount > 0 && (
            <span className="text-sm font-medium text-slate-400 line-through decoration-slate-300">
              ৳{price.toLocaleString('bn-BD', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {/* অ্যাকশন বাটন গ্রুপ */}
        <div className="flex gap-2.5 mt-auto">
          <Link
            href={`/products/${product?._id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-50 border border-slate-200/60 text-slate-700 py-2.5 px-4 rounded-xl text-sm font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all duration-300"
          >
            <Eye size={16} className="opacity-80" /> 
            <span>বিস্তারিত</span>
          </Link>
          
          <button 
            onClick={handleAddToCart}
            className="bg-indigo-600 text-white p-2.5 px-3.5 rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-300 active:scale-95"
            title="কার্টে যোগ করুন"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}


// 2nd card design with better UI and UX end 