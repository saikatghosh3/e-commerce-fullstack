'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { readWishlist, removeFromWishlist, WISHLIST_UPDATED_EVENT } from '@/lib/wishlist';

export default function WishlistPage() {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistProducts();

    const handleWishlistUpdate = () => {
      fetchWishlistProducts();
    };

    window.addEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);

    return () => {
      window.removeEventListener(WISHLIST_UPDATED_EVENT, handleWishlistUpdate);
    };
  }, []);

  const fetchWishlistProducts = async () => {
    const ids = readWishlist();
    setWishlistIds(ids);

    if (ids.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const results = await Promise.all(
        ids.map((id) => fetch(`/api/products/${id}`).then((response) => response.json()))
      );

      const nextProducts = results
        .filter((result) => result.success && result.product)
        .map((result) => result.product);

      setProducts(nextProducts);
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (productId) => {
    const nextWishlist = removeFromWishlist(productId);
    setWishlistIds(nextWishlist);
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500" size={32} />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">Wishlist</h1>
          </div>
          <p className="text-gray-600 mt-2">Products you saved for later</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : wishlistIds.length === 0 || products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 mb-5">
              <Heart className="text-red-400" size={36} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save products you like and find them here later.</p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="relative">
                  <ProductCard product={product} />
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="absolute left-3 top-3 bg-white/90 backdrop-blur-sm text-red-600 rounded-full p-2 shadow-md hover:bg-red-50 transition"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
