'use client';

import { Suspense, useEffect, useState, useTransition } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { useSiteData } from '@/lib/SiteDataContext';
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

function ProductsPageContent({ initialProducts, initialPagination, serverCategories }) {
  const searchParams = useSearchParams();
  const router = useRouter();

const { settings } = useSiteData();
  const [isPending, startTransition] = useTransition();

  const [categories] = useState(() => [
    defaultCategories[0],
    ...(serverCategories || []).map((c) => ({ id: c.name, name: c.name })),
  ]);

  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, '']);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialPagination?.pages || 1);
  const [products, setProducts] = useState(initialProducts || []);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // The server component already queried Mongo for exactly this result set, so
  // mirror its props instead of re-fetching the same rows from the browser.
  useEffect(() => {
    setProducts(initialProducts || []);
    setTotalPages(initialPagination?.pages || 1);
  }, [initialProducts, initialPagination]);

  useEffect(() => {
    setCategory(searchParams.get('category') || 'all');
    const min = Number(searchParams.get('minPrice') || 0);
    const max = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : '';
    setPriceRange([min, max]);
    setCurrentPage(Number(searchParams.get('page')) || 1);
  }, [searchParams]);

  const loading = isPending;

  const shopName = settings?.siteName?.trim() || 'রাধুনী মশলা';
  const activeCategoryName =
    category === 'all' ? null : categories.find((c) => c.id === category)?.name || category;
  const title = activeCategoryName || shopName;
  const subtitle = activeCategoryName
    ? 'এই ক্যাটাগরির সব পণ্য এক জায়গায় দেখুন এবং পছন্দমতো বেছে নিন।'
    : 'প্রিমিয়াম কোয়ালিটির পণ্যের বিশাল সংগ্রহ থেকে আপনার পছন্দের পণ্যটি খুঁজে নিন';
  const total = initialPagination?.total ?? products.length;


  const handleCategoryChange = (newCategory) => {
    if (newCategory === category) return;
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }
    params.delete('page');
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
    setShowMobileFilters(false);
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0]);
    else params.delete('minPrice');
    if (priceRange[1] !== '') params.set('maxPrice', priceRange[1]);
    else params.delete('maxPrice');
    params.delete('page');
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
    setShowMobileFilters(false);
  };

  const goToPage = (page) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    if (nextPage === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', nextPage);
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  };

  const clearAllFilters = () => {
    startTransition(() => {
      router.push('/products');
    });
    setShowMobileFilters(false);
  };

  const hasActiveFilters = category !== 'all' || priceRange[0] > 0 || priceRange[1] !== '';

  return (
    <div className="min-h-screen bg-slate-50/50">
<div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600">
                {activeCategoryName ? 'ক্যাটাগরি' : 'সব পণ্য'}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
                {title}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                {subtitle}
              </p>
            </div>
            <dl className="flex shrink-0 items-center gap-6 self-start rounded-xl border border-slate-200/80 bg-slate-50/70 px-5 py-4 lg:self-auto">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-500">পণ্য</dt>
                <dd className="mt-0.5 text-xl font-bold tabular-nums text-slate-900">{total}</dd>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-wider text-slate-500">পাতা</dt>
                <dd className="mt-0.5 text-xl font-bold tabular-nums text-slate-900">
                  {currentPage}
                  <span className="text-slate-400">/{Math.max(totalPages, 1)}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={
                  'shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ' +
                  (category === cat.id
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900')
                }
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
{hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700">
                {categories.find((c) => c.id === category)?.name || category}
                <button onClick={() => handleCategoryChange('all')} aria-label="ক্যাটাগরি ফিল্টার সরান">
                  <X size={14} />
                </button>
              </span>
            )}
            {(priceRange[0] > 0 || priceRange[1] !== '') && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700">
                {`৳${priceRange[0]} - ${priceRange[1] ? `৳${priceRange[1]}` : '∞'}`}
                <button onClick={() => handlePriceFilter()} aria-label="মূল্য ফিল্টার সরান">
                  <X size={14} />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500 underline-offset-4 hover:text-slate-900 hover:underline"
            >
              সব ফিল্টার ক্লিয়ার করুন
            </button>
          </div>
        )}
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`${showMobileFilters ? 'fixed inset-0 z-50 lg:relative' : 'hidden lg:block'} lg:relative lg:w-80 lg:flex-shrink-0`}>
            {showMobileFilters && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm lg:hidden" onClick={() => setShowMobileFilters(false)} />
            )}
            <div className={`${showMobileFilters ? 'fixed right-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto z-50' : 'relative'} lg:relative lg:w-full lg:shadow-none lg:bg-transparent lg:overflow-visible transition-transform duration-300 ease-in-out`}>
              {showMobileFilters && (
                <div className="sticky top-0 z-10 bg-white border-b border-slate-200 p-5 flex justify-between items-center lg:hidden">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-xl">
                      <Filter size={20} className="text-orange-600" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900">ফিল্টার</h3>
                  </div>
                  <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
                    <X size={20} className="text-slate-600" />
                  </button>
                </div>
              )}
              <div className="p-5 lg:p-0 space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 overflow-hidden">
                  <div className="p-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-xl">
                        <Tag size={18} className="text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900">ক্যাটাগরি</h3>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center justify-between group ${category === cat.id ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-slate-700 hover:bg-slate-50'}`}
                      >
                        <span className="font-medium">{cat.name}</span>
                        {category === cat.id && <div className="w-2 h-2 bg-white rounded-full shadow-inner" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-slate-200/60 overflow-hidden">
                  <div className="p-5 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-50 rounded-xl">
                        <SlidersHorizontal size={18} className="text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900">মূল্য পরিসীমা</h3>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-600">সর্বনিম্ন মূল্য</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">৳</span>
                        <input type="number" value={priceRange[0] === 0 ? '' : priceRange[0]} onChange={(e) => setPriceRange([e.target.value === '' ? 0 : Number(e.target.value), priceRange[1]])} className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-slate-900/20 focus:border-orange-500 bg-slate-50/50 focus:bg-white" placeholder="০" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-600">সর্বোচ্চ মূল্য</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">৳</span>
                        <input type="number" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], e.target.value === '' ? '' : Number(e.target.value)])} className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl outline-none transition-all focus:ring-2 focus:ring-slate-900/20 focus:border-orange-500 bg-slate-50/50 focus:bg-white" placeholder="সর্বোচ্চ" />
                      </div>
                    </div>
                    <button onClick={handlePriceFilter} className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98]">
                      ফিল্টার প্রয়োগ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="lg:hidden mb-6">
              <button onClick={() => setShowMobileFilters(true)} className="w-full flex items-center justify-center gap-2 bg-white px-5 py-3.5 rounded-lg shadow-sm border border-slate-200/60 text-slate-700 font-medium hover:bg-slate-50 transition-all active:scale-[0.98]">
                <Filter size={18} className="text-orange-600" />
                ফিল্টার ও সার্চ
                {hasActiveFilters && <span className="w-2 h-2 bg-orange-600 rounded-full" />}
              </button>
            </div>

            {products.length > 0 ? (
              <>
                <div
                  className={`grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3 ${
                    loading ? 'pointer-events-none opacity-50 transition-opacity duration-200' : 'transition-opacity duration-200'
                  } mb-10`}
                >
                  {products.map((product, index) => (
                    <ProductCard key={product._id} product={product} priority={index < 3} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm">
                      <ChevronLeft size={18} className="text-slate-700" />
                    </button>
                    <div className="flex items-center gap-1 px-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).filter(page => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1).map((page, index, array) => (
                        <span key={page}>
                          {index > 0 && array[index - 1] !== page - 1 && <span className="px-2 text-slate-400">...</span>}
                          <button onClick={() => goToPage(page)} className={`min-w-[40px] h-10 rounded-xl font-medium transition-all ${currentPage === page ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-600 hover:bg-slate-100'}`}>
                            {page}
                          </button>
                        </span>
                      ))}
                    </div>
                    <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all bg-white shadow-sm">
                      <ChevronRight size={18} className="text-slate-700" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-slate-200/60 shadow-sm">
                <div className="max-w-md mx-auto">
                  <Search size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">কোন পণ্য পাওয়া যায়নি</h3>
                  <p className="text-slate-500 mb-6">আপনার ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
                  <button onClick={clearAllFilters} className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
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

export default function ProductsClient({ initialProducts, initialPagination, serverCategories }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50/50">
          <div className="h-[104px] border-b border-slate-200/80 bg-white sm:h-[124px]" />
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-sm"
                >
                  <div className="aspect-square w-full animate-shimmer bg-slate-100" />
                  <div className="space-y-2.5 p-4">
                    <div className="h-3.5 w-4/5 animate-shimmer rounded bg-slate-100" />
                    <div className="h-3.5 w-1/3 animate-shimmer rounded bg-slate-100" />
                    <div className="h-8 w-full animate-shimmer rounded-lg bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProductsPageContent
        initialProducts={initialProducts}
        initialPagination={initialPagination}
        serverCategories={serverCategories}
      />
    </Suspense>
  );
}
