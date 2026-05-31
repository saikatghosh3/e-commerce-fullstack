// import Link from 'next/link';
// import { ArrowRight, Flame } from 'lucide-react';
// import ProductCard from '@/components/ProductCard';

// export default function BestSellingProductsSection({ products, loading }) {
//   if (!loading && (!products || products.length === 0)) {
//     return null;
//   }

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
//           <div>
//             <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 mb-3">
//               <Flame size={16} />
//               Best Selling
//             </div>
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
//               Customer Favorites
//             </h2>
//           </div>

//           <Link
//             href="/products"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
//           >
//             View all products
//             <ArrowRight size={16} />
//           </Link>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-72">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {products.slice(0, 8).map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }




import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function BestSellingProductsSection({ products, loading }) {
  if (!loading && (!products || products.length === 0)) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
          
         
          <div className="flex-1 text-center sm:text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-full px-3 py-1 mb-3">
              <Flame size={16} />
               সেরা বিক্রি হওয়া পণ্য
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
             গ্রাহকদের পছন্দ
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition shrink-0"
          >
            সব দেখুন
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-72">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}