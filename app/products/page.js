
// 'use client';

// import { Suspense, useEffect, useState } from 'react';
// // ১. useRouter ইম্পোর্ট করা হয়েছে
// import { useSearchParams, useRouter } from 'next/navigation'; 
// import ProductCard from '@/components/ProductCard';
// import { Filter, SlidersHorizontal, Tag, X } from 'lucide-react';

// const categories = [
//   { id: 'all', name: 'সব পণ্য' },
//   { id: 'Electronics', name: 'ইলেকট্রনিক্স' },
//   { id: 'Fashion', name: 'ফ্যাশন' },
//   { id: 'Home & Garden', name: 'হোম ও গার্ডেন' },
//   { id: 'Sports', name: 'স্পোর্টস' },
//   { id: 'Books', name: 'বই' },
//   { id: 'Other', name: 'অন্যান্য' },
// ];

// function ProductsPageContent() {
//   const searchParams = useSearchParams();
//   // ২. router ডিফাইন করা হয়েছে
//   const router = useRouter(); 

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [category, setCategory] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [priceRange, setPriceRange] = useState([0, '']);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   // ইউআরএল পরিবর্তন হলে ডাটা লোড হবে
//   useEffect(() => {
//     const search = searchParams.get('search') || '';
//     const initialCategory = searchParams.get('category') || 'all';
//     const initialMinPrice = Number(searchParams.get('minPrice') || 0);
//     const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '';
    
//     setSearchTerm(search);
//     setCategory(initialCategory);
//     setPriceRange([initialMinPrice, initialMaxPrice]);
    
//     fetchProducts(initialCategory, search, 1, [initialMinPrice, initialMaxPrice]);
//   }, [searchParams]);

//   const fetchProducts = async (
//     selectedCategory = category,
//     search = searchTerm,
//     page = 1,
//     range = priceRange
//   ) => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       // ৩. ক্যাটাগরি ফিল্টার পাঠানোর লজিক
//       if (selectedCategory && selectedCategory !== 'all') {
//         params.append('category', selectedCategory);
//       }
//       if (search) params.append('search', search);
//       if (Number(range[0]) > 0) params.append('minPrice', range[0]);
//       if (range[1] !== '' && Number(range[1]) > 0) params.append('maxPrice', range[1]);
//       params.append('page', page);
//       params.append('limit', 12);

//       const response = await fetch(`/api/products?${params.toString()}`);
//       const data = await response.json();

//       if (response.ok && data.success) {
//         const cleanProducts = (data.products || []).filter(p => p && p.price != null);
//         setProducts(cleanProducts);
//         setTotalPages(data.pagination?.pages || 1);
//         setCurrentPage(page);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCategoryChange = (newCategory) => {
//     setCategory(newCategory);
//     setCurrentPage(1);
    
//     // ইউআরএল আপডেট লজিক
//     const params = new URLSearchParams(searchParams.toString());
//     if (newCategory === 'all') {
//       params.delete('category');
//     } else {
//       params.set('category', newCategory);
//     }
    
//     router.push(`/products?${params.toString()}`);
//     setShowMobileFilters(false);
//   };

//   const handlePriceFilter = () => {
//     setCurrentPage(1);
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('minPrice', priceRange[0]);
//     if (priceRange[1]) params.set('maxPrice', priceRange[1]);
//     else params.delete('maxPrice');
    
//     router.push(`/products?${params.toString()}`);
//     setShowMobileFilters(false);
//   };

//   const goToPage = (page) => {
//     const nextPage = Math.min(Math.max(1, page), totalPages);
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', nextPage);
//     router.push(`/products?${params.toString()}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         <div className="mb-8 lg:mb-12 text-center lg:text-left">
//           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
//             {category === 'all' ? 'সকল পণ্য' : categories.find(c => c.id === category)?.name}
//             {console.log(category)}
//           </h1>
//           <p className="text-gray-600 text-base lg:text-lg">
//             আমাদের প্রিমিয়াম কালেকশন থেকে আপনার পছন্দের পণ্য বেছে নিন
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//           {/* Sidebar / Filters */}
//           <aside className={`${showMobileFilters ? 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm' : 'hidden'} lg:relative lg:block lg:bg-transparent`}>
//             <div className={`${showMobileFilters ? 'absolute right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto' : 'relative'} lg:relative lg:w-72 lg:shadow-none lg:bg-transparent lg:overflow-visible`}>
//               {showMobileFilters && (
//                 <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center lg:hidden">
//                   <div className="flex items-center gap-2">
//                     <Filter size={20} className="text-indigo-600" />
//                     <h3 className="font-bold text-lg text-gray-900">ফিল্টার</h3>
//                   </div>
//                   <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
//                 </div>
//               )}

//               <div className="p-5 lg:p-0 lg:sticky lg:top-24 space-y-6">
//                 {/* Category Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                   <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
//                     <Tag size={18} className="text-indigo-600" />
//                     <h3 className="font-bold text-gray-900">ক্যাটাগরি</h3>
//                   </div>
//                   <div className="space-y-2">
//                     {categories.map((cat) => (
//                       <button
//                         key={cat.id}
//                         onClick={() => handleCategoryChange(cat.id)}
//                         className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 ${
//                           category === cat.id ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
//                         }`}
//                       >
//                         <span className="font-medium">{cat.name}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Filter */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
//                   <div className="flex items-center gap-2 mb-5 pb-2 border-b border-gray-100">
//                     <SlidersHorizontal size={18} className="text-indigo-600" />
//                     <h3 className="font-bold text-gray-900">মূল্য পরিসীমা</h3>
//                   </div>
//                   <div className="space-y-5">
//                  <input
//   type="number"
//   value={priceRange[0] === 0 ? '' : priceRange[0]}
//   onChange={(e) => setPriceRange([e.target.value === '' ? 0 : Number(e.target.value), priceRange[1]])}
//   className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
//   placeholder="সর্বনিম্ন"
// />
//                     <input
//                       type="number"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], e.target.value === '' ? '' : Number(e.target.value)])}
//                       className="w-full px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
//                       placeholder="সর্বোচ্চ"
//                     />
//                     <button onClick={handlePriceFilter} className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all">
//                       ফিল্টার প্রয়োগ করুন
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Product Grid */}
//           <div className="flex-1">
//             <div className="lg:hidden mb-5">
//               <button onClick={() => setShowMobileFilters(true)} className="w-full flex items-center justify-center gap-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200 text-gray-700 font-medium">
//                 <Filter size={18} className="text-indigo-600" /> ফিল্টার
//               </button>
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div>
//             ) : products.length > 0 ? (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//                   {products.map((product) => <ProductCard key={product._id} product={product} />)}
//                 </div>

//                 {/* Pagination */}
//                 <div className="flex justify-center gap-2 mt-10">
//                   <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border rounded-xl disabled:opacity-40">আগে</button>
//                   <span className="px-4 py-2 font-bold text-indigo-600">পৃষ্ঠা {currentPage}</span>
//                   <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-xl disabled:opacity-40">পরে</button>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center py-20 bg-white rounded-2xl border">
//                 <p className="text-gray-500">কোন পণ্য পাওয়া যায়নি</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold">লোড হচ্ছে...</div>}>
//       <ProductsPageContent />
//     </Suspense>
//   );
// }




'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Filter, SlidersHorizontal, Tag, X, Search, ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';

const defaultCategories = [
  { id: 'all', name: 'সব পণ্য' },
  { id: 'Electronics', name: 'ইলেকট্রনিক্স' },
  { id: 'Fashion', name: 'ফ্যাশন' },
  { id: 'Home & Garden', name: 'হোম ও গার্ডেন' },
  { id: 'Sports', name: 'স্পোর্টস' },
  { id: 'Books', name: 'বই' },
  { id: 'Other', name: 'অন্যান্য' },
];

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(defaultCategories);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, '']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();

        if (response.ok && data.success) {
          setCategories([
            defaultCategories[0],
            ...(data.categories || []).map((category) => ({
              id: category.name,
              name: category.name,
            })),
          ]);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const search = searchParams.get('search') || '';
    const initialCategory = searchParams.get('category') || 'all';
    const initialMinPrice = Number(searchParams.get('minPrice') || 0);
    const initialMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '';
    
    setSearchTerm(search);
    setCategory(initialCategory);
    setPriceRange([initialMinPrice, initialMaxPrice]);
    
    fetchProducts(initialCategory, search, 1, [initialMinPrice, initialMaxPrice]);
  }, [searchParams]);

  const fetchProducts = async (
    selectedCategory = category,
    search = searchTerm,
    page = 1,
    range = priceRange
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (search) params.append('search', search);
      if (Number(range[0]) > 0) params.append('minPrice', range[0]);
      if (range[1] !== '' && Number(range[1]) > 0) params.append('maxPrice', range[1]);
      params.append('page', page);
      params.append('limit', 12);

      const response = await fetch(`/api/products?${params.toString()}`);
      const data = await response.json();

      if (response.ok && data.success) {
        const cleanProducts = (data.products || []).filter(p => p && p.price != null);
        setProducts(cleanProducts);
        setTotalPages(data.pagination?.pages || 1);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
    
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }
    
    router.push(`/products?${params.toString()}`);
    setShowMobileFilters(false);
  };

  const handlePriceFilter = () => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('minPrice', priceRange[0]);
    if (priceRange[1]) params.set('maxPrice', priceRange[1]);
    else params.delete('maxPrice');
    
    router.push(`/products?${params.toString()}`);
    setShowMobileFilters(false);
  };

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', nextPage);
    router.push(`/products?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setCategory('all');
    setPriceRange([0, '']);
    setCurrentPage(1);
    router.push('/products');
  };

  const hasActiveFilters = category !== 'all' || priceRange[0] > 0 || priceRange[1] !== '';

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white mb-6">
              {category === 'all' ? 'আমাদের কালেকশন' : categories.find(c => c.id === category)?.name || category}
            </h1>
            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              প্রিমিয়াম কোয়ালিটির পণ্যের বিশাল সংগ্রহ থেকে আপনার পছন্দের পণ্যটি খুঁজে নিন
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Stats Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white rounded-2xl shadow-sm border border-slate-200/60">
          <div className="flex items-center gap-3 text-slate-600">
            <Grid3X3 size={20} className="text-slate-400" />
            <span className="font-medium">
              {loading ? 'লোড হচ্ছে...' : `${products.length} টি পণ্য পাওয়া গেছে`}
            </span>
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2">
              {category !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                  {categories.find(c => c.id === category)?.name || category}
                  <button onClick={() => handleCategoryChange('all')}>
                    <X size={14} className="hover:text-indigo-900" />
                  </button>
                </span>
              )}
              {(priceRange[0] > 0 || priceRange[1] !== '') && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
                  ৳{priceRange[0]} - {priceRange[1] ? `৳${priceRange[1]}` : '∞'}
                  <button onClick={() => { setPriceRange([0, '']); router.push('/products'); }}>
                    <X size={14} className="hover:text-indigo-900" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside 
            className={`
              ${showMobileFilters ? 'fixed inset-0 z-50 lg:relative' : 'hidden lg:block'}
              lg:relative lg:w-80 lg:flex-shrink-0
            `}
          >
            {/* Mobile Overlay */}
            {showMobileFilters && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden" onClick={() => setShowMobileFilters(false)} />
            )}
            
            {/* Filter Panel */}
            <div className={`
              ${showMobileFilters ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto z-50' : 'relative'}
              lg:relative lg:w-full lg:shadow-none lg:bg-transparent lg:overflow-visible
              transition-transform duration-300 ease-in-out
            `}>
              {showMobileFilters && (
                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-5 flex justify-between items-center lg:hidden">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 rounded-xl">
                      <Filter size={20} className="text-indigo-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">ফিল্টার</h3>
                  </div>
                  <button 
                    onClick={() => setShowMobileFilters(false)} 
                    className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <X size={20} className="text-slate-600" />
                  </button>
                </div>
              )}

              <div className="p-5 lg:p-0 space-y-6">
                {/* Category Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                  <div className="p-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-xl">
                        <Tag size={18} className="text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900">ক্যাটাগরি</h3>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`
                          w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group
                          ${category === cat.id 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                            : 'text-slate-700 hover:bg-slate-50'
                          }
                        `}
                      >
                        <span className="font-medium">{cat.name}</span>
                        {category === cat.id && (
                          <div className="w-2 h-2 bg-white rounded-full shadow-inner" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                  <div className="p-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 rounded-xl">
                        <SlidersHorizontal size={18} className="text-indigo-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900">মূল্য পরিসীমা</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-600">সর্বনিম্ন মূল্য</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">৳</span>
                        <input
                          type="number"
                          value={priceRange[0] === 0 ? '' : priceRange[0]}
                          onChange={(e) => setPriceRange([e.target.value === '' ? 0 : Number(e.target.value), priceRange[1]])}
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 focus:bg-white"
                          placeholder="০"
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-600">সর্বোচ্চ মূল্য</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">৳</span>
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) => setPriceRange([priceRange[0], e.target.value === '' ? '' : Number(e.target.value)])}
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-slate-50/50 focus:bg-white"
                          placeholder="সর্বোচ্চ"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handlePriceFilter} 
                      className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98]"
                    >
                      ফিল্টার প্রয়োগ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button 
                onClick={() => setShowMobileFilters(true)} 
                className="w-full flex items-center justify-center gap-2 bg-white px-5 py-3.5 rounded-2xl shadow-sm border border-slate-200/60 text-slate-700 font-medium hover:bg-slate-50 transition-all active:scale-[0.98]"
              >
                <Filter size={18} className="text-indigo-600" />
                ফিল্টার ও সার্চ
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                )}
              </button>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center h-96 gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-200 rounded-full" />
                  <div className="absolute top-0 left-0 w-16 h-16 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">পণ্য লোড হচ্ছে...</p>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button 
                      onClick={() => goToPage(currentPage - 1)} 
                      disabled={currentPage === 1} 
                      className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
                    >
                      <ChevronLeft size={18} className="text-slate-700" />
                    </button>
                    
                    <div className="flex items-center gap-1 px-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => 
                          page === 1 || 
                          page === totalPages || 
                          Math.abs(page - currentPage) <= 1
                        )
                        .map((page, index, array) => (
                          <span key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="px-2 text-slate-400">...</span>
                            )}
                            <button
                              onClick={() => goToPage(page)}
                              className={`
                                min-w-[40px] h-10 rounded-xl font-medium transition-all
                                ${currentPage === page 
                                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                                  : 'text-slate-600 hover:bg-slate-100'
                                }
                              `}
                            >
                              {page}
                            </button>
                          </span>
                        ))}
                    </div>

                    <button 
                      onClick={() => goToPage(currentPage + 1)} 
                      disabled={currentPage === totalPages} 
                      className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm"
                    >
                      <ChevronRight size={18} className="text-slate-700" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200/60 shadow-sm">
                <div className="max-w-md mx-auto">
                  <Search size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">কোন পণ্য পাওয়া যায়নি</h3>
                  <p className="text-slate-500 mb-6">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                  >
                    সব ফিল্টার ক্লিয়ার করুন
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-slate-200 rounded-full" />
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin" />
        </div>
        <p className="text-slate-600 font-medium text-lg">লোড হচ্ছে...</p>
      </div>
    }>
      <ProductsPageContent />
    </Suspense>
  );
}
