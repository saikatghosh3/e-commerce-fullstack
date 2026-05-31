// // import Link from 'next/link';
// // import { ArrowRight } from 'lucide-react';
// // import ProductCard from '@/components/ProductCard';

// // export default function FeaturedProductsSection({ featuredProducts, loading }) {
// //   return (
// //     <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
// //       {/* প্রফেশনাল ডেকোরেটিভ এলিমেন্ট - কার্টুনিশ না */}
// //       <div className="absolute inset-0 opacity-30">
// //         <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl"></div>
// //         <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl"></div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //         <div className="text-center mb-16">
// //           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
// //             বৈশিষ্ট্যযুক্ত পণ্য
// //           </h2>
// //           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
// //             আমাদের সবচেয়ে বেশি বিক্রি ও জনপ্রিয় আইটেমগুলো আবিষ্কার করুন
// //           </p>
// //           {/* আন্ডারলাইন ডেকোরেশন */}
// //           <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
// //         </div>

// //         {loading ? (
// //           <div className="flex justify-center items-center h-96">
// //             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
// //           </div>
// //         ) : (
// //           <>
// //             {featuredProducts?.length === 0 ? (
// //               <div className="text-center py-20 bg-gray-50 rounded-2xl">
// //                 <p className="text-gray-500 text-lg">কোন পণ্য পাওয়া যায়নি</p>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                 {featuredProducts.map((product) => (
// //                   <ProductCard key={product._id} product={product} />
// //                 ))}
// //               </div>
// //             )}
// //           </>
// //         )}

// //         <div className="text-center mt-12">
// //           <Link
// //             href="/products"
// //             className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 hover:shadow-lg group"
// //           >
// //             সব পণ্য দেখুন
// //             <ArrowRight className="ml-2 group-hover:translate-x-1 transition" size={20} />
// //           </Link>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }



// import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';
// import ProductCard from '@/components/ProductCard';

// export default function FeaturedProductsSection({ featuredProducts, loading }) {
//   // ১. প্রোডাক্টগুলোকে ক্যাটাগরি অনুযায়ী ভাগ (Group) করার লজিক
//   const groupedProducts = featuredProducts?.reduce((acc, product) => {
//     const category = product.category || 'অন্যান্য';
//     if (!acc[category]) {
//       acc[category] = [];
//     }
//     acc[category].push(product);
//     return acc;
//   }, {}) || {};

//   return (
//     <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
//       {/* প্রফেশনাল ডেকোরেটিভ এলিমেন্ট */}
//       <div className="absolute inset-0 opacity-30 pointer-events-none">
//         <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
//             আমাদের কালেকশন
//           </h2>
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             আপনার পছন্দের ক্যাটাগরি থেকে সেরা পণ্যগুলো বেছে নিন
//           </p>
//           <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-96">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//           </div>
//         ) : (
//           <>
//             {Object.keys(groupedProducts).length === 0 ? (
//               <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
//                 <p className="text-gray-500 text-lg">কোন পণ্য পাওয়া যায়নি</p>
//               </div>
//             ) : (
//               <div className="space-y-20">
//                 {/* ২. ক্যাটাগরি অনুযায়ী লুপ চালানো হচ্ছে */}
//                 {Object.entries(groupedProducts).map(([category, products]) => (
//                   <div key={category} className="bg-white/50 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    
//                     {/* সেকশনের টাইটেল এবং সব দেখার বাটন */}
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//                       <div>
//                         <h3 className="text-2xl font-bold text-gray-900 capitalize">{category}</h3>
//                         <div className="w-12 h-1 bg-indigo-500 mt-2 rounded-full"></div>
//                       </div>
//                       <Link
//                         href={`/products?category=${encodeURIComponent(category)}`}
//                         className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition group"
//                       >
//                         সব দেখুন
//                         <ArrowRight className="ml-1.5 group-hover:translate-x-1 transition" size={16} />
//                       </Link>
//                     </div>

//                     {/* ৩. প্রোডাক্ট গ্রিড (সর্বোচ্চ ৪টি প্রোডাক্ট দেখাবে slice এর মাধ্যমে) */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                       {products.slice(0, 4).map((product) => (
//                         <ProductCard key={product._id} product={product} />
//                       ))}
//                     </div>

//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </section>
//   );
// }



import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

export default function FeaturedProductsSection({ featuredProducts, loading }) {
  const groupedProducts = featuredProducts?.reduce((acc, product) => {
    const rawCategory = product.category ? product.category.trim() : 'অন্যান্য';
    const categoryDisplay = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();

    if (!acc[categoryDisplay]) {
      acc[categoryDisplay] = {
        category: rawCategory,
        products: [],
      };
    }
    acc[categoryDisplay].products.push(product);
    return acc;
  }, {}) || {};

  if (!loading && Object.keys(groupedProducts).length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-100 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            আমাদের কালেকশন
          </h2>
          {/* <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            আপনার পছন্দের ক্যাটাগরি থেকে সেরা পণ্যগুলো বেছে নিন
          </p>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div> */}
             <div className="w-full text-center overflow-hidden">
  <p className="text-gray-600 text-lg md:text-xl whitespace-nowrap min-w-full">
    আপনার পছন্দের ক্যাটাগরি থেকে সেরা পণ্যগুলো বেছে নিন
  </p>
  <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
</div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            {Object.keys(groupedProducts).length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">কোন পণ্য পাওয়া যায়নি</p>
              </div>
            ) : (
              <div className="space-y-20">
                {Object.entries(groupedProducts).map(([category, group]) => (
                  <div key={category} className="bg-white/50 rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                    
                    <div className="flex items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                        <div className="w-12 h-1 bg-indigo-500 mt-2 rounded-full"></div>
                      </div>
                      <Link
                        href={`/products?category=${encodeURIComponent(group.category)}`}
                        className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition group"
                      >
                        সব দেখুন
                        <ArrowRight className="ml-1.5 group-hover:translate-x-1 transition" size={16} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {group.products.slice(0, 4).map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
