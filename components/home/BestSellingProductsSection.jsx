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
//               সর্বাধিক বিক্রিত
//             </div>
//             <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//               Customer Favorites
//             </h2>
//           </div>

//           <Link
//             href="/products"
//             className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-800 transition"
//           >
//             সব দেখুন
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
    <section className="bg-[#fbf9f5] py-5 sm:py-7">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="relative mb-6 text-center sm:mb-8">
          <h2 className="text-2xl font-medium text-slate-900 sm:text-3xl">
            সর্বাধিক বিক্রিত পণ্য
          </h2>
          <Link
            href="/products"
            className="absolute right-0 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-sm font-medium text-orange-600 underline transition hover:text-orange-700 sm:inline-flex"
          >
            সব দেখুন
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/products"
            className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-orange-600 underline transition hover:text-orange-700 sm:hidden"
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}