'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ChevronDown, Heart, Menu, Search, ShoppingCart, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CART_UPDATED_EVENT, getCartCount, readCart } from '@/lib/cart';
import { getWishlistCount, readWishlist, WISHLIST_UPDATED_EVENT } from '@/lib/wishlist';

const defaultCategories = [
  { id: 'all', name: 'সব পণ্য' },
  { id: 'Electronics', name: 'ইলেকট্রনিক্স' },
  { id: 'Fashion', name: 'ফ্যাশন' },
  { id: 'Home & Garden', name: 'হোম ও গার্ডেন' },
  { id: 'Sports', name: 'স্পোর্টস' },
  { id: 'Books', name: 'বই' },
  { id: 'Other', name: 'অন্যান্য' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState(defaultCategories);
  const router = useRouter();

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount(readCart()));
    const updateWishlistCount = () => setWishlistCount(getWishlistCount(readWishlist()));

    updateCartCount();
    updateWishlistCount();
    window.addEventListener(CART_UPDATED_EVENT, updateCartCount);
    window.addEventListener(WISHLIST_UPDATED_EVENT, updateWishlistCount);
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('storage', updateWishlistCount);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCartCount);
      window.removeEventListener(WISHLIST_UPDATED_EVENT, updateWishlistCount);
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('storage', updateWishlistCount);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50'
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">ই</span>
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ইলিট স্টোর
            </span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-8">
            <div className="relative w-full max-w-md mx-auto">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50/50 backdrop-blur-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              কেনাকাটা
            </Link>

            {/* Category Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                ক্যাটাগরি
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute right-0 top-full pt-3 transition-all duration-200 z-50">
                <div className="w-56 bg-white border border-gray-200 rounded-xl shadow-xl p-2">
                  {categories.map((cat,index) => (
                   // Debug log
                    <Link
                     key={`${cat.id}-${index}`}
                     // Fixed: unique string key
                      href={`/products?category=${encodeURIComponent(cat.id)}`} // Fixed: directly using cat.id
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                    >
                      {cat.name} {/* Fixed: rendering string name */}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/wishlist" className="relative text-gray-700 hover:text-indigo-600 transition-colors">
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative flex items-center space-x-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 transition-all shadow-md">
              <ShoppingCart size={20} />
              <span className="font-medium">কার্ট</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2 px-1">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none"
              />
              <button type="submit" className="p-2 bg-indigo-600 text-white rounded-full">
                <Search size={18} />
              </button>
            </form>

            <nav className="flex flex-col space-y-1">
              <Link href="/products" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-xl font-medium">কেনাকাটা</Link>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">ক্যাটাগরি সমূহ</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id} // Fixed
                      href={`/products?category=${encodeURIComponent(cat.id)}`} // Fixed
                      onClick={() => setIsOpen(false)}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-all"
                    >
                      {cat.name} {/* Fixed */}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link href="/wishlist" onClick={() => setIsOpen(false)} className="px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-xl font-medium flex justify-between items-center">
                উইশলিস্ট <span>{wishlistCount > 0 ? `(${wishlistCount})` : ''}</span>
              </Link>
              <Link href="/cart" onClick={() => setIsOpen(false)} className="mx-4 mt-2 py-3 bg-indigo-600 text-white rounded-xl font-bold text-center">
                কার্ট {cartCount > 0 ? `(${cartCount})` : ''}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
