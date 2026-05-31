'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowLeft, ChevronRight, ShoppingBag, CreditCard, Gift } from 'lucide-react';
import { showError } from '@/components/ToastUtils';
import { readCart, saveCart } from '@/lib/cart';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const cart = readCart();
      setCartItems(cart);

      if (cart.length > 0) {
        await fetchProductDetails(cart);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      setLoading(false);
    }
  };

  const fetchProductDetails = async (cartItems) => {
    try {
      const productPromises = cartItems.map((item) =>
        fetch(`/api/products/${item.productId}`).then((res) => res.json())
      );

      const results = await Promise.all(productPromises);
      const productsMap = {};

      results.forEach((result) => {
        if (result.success) {
          productsMap[result.product._id] = result.product;
        }
      });

      setProducts(productsMap);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(newQuantity, products[productId]?.stock || newQuantity) }
        : item
    );

    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    saveCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products[item.productId];
      if (!product) return total;

      const price = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

      return total + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal > 5000 ? 0 : 150; // ৫০০০+ টাকায় ফ্রি শিপিং
  const total = subtotal + shippingCost - discount;

  const handleApplyPromo = () => {
    // প্রোমো কোড লজিক (উদাহরণ)
    if (promoCode === 'WELCOME10') {
      setDiscount(subtotal * 0.1);
    } else if (promoCode === 'FREESHIP') {
      // ফ্রি শিপিং ইতিমধ্যে কন্ডিশনে আছে
      setDiscount(0);
    } else {
      showError('ভুল প্রোমো কোড');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* হেডার */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
            কেনাকাটা চালিয়ে যান
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">আমার কার্ট</h1>
          <p className="text-gray-600 mt-1">{cartItems.length} টি পণ্য</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-indigo-50 rounded-full mb-6">
              <ShoppingBag size={48} className="text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">আপনার কার্ট খালি</h2>
            <p className="text-gray-600 mb-8">পণ্য যোগ করতে এখনই কেনাকাটা শুরু করুন</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              কেনাকাটা শুরু করুন
              <ChevronRight size={20} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* কার্ট আইটেম */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {cartItems.map((item, index) => {
                  const product = products[item.productId];
                  if (!product) return null;

                  const originalPrice = product.price;
                  const discountPrice = product.discount
                    ? originalPrice - (originalPrice * product.discount) / 100
                    : originalPrice;

                  return (
                    <div
                      key={item.productId}
                      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 ${
                        index !== cartItems.length - 1 ? 'border-b border-gray-100' : ''
                      } hover:bg-gray-50/50 transition-all duration-200`}
                    >
                      {/* পণ্যের ছবি */}
                      <div className="flex-shrink-0 w-28 h-28 bg-gray-100 rounded-xl overflow-hidden shadow-sm">
                        <img
                          src={product.image || 'https://via.placeholder.com/120x120?text=পণ্য'}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition duration-300"
                        />
                      </div>

                      {/* পণ্যের বিবরণ */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${product._id}`}
                          className="block font-semibold text-gray-900 hover:text-indigo-600 transition-colors text-lg mb-1"
                        >
                          {product.name}
                        </Link>
                        {product.discount > 0 && (
                          <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full mb-2">
                            {product.discount}% ছাড়
                          </span>
                        )}

                        {/* কোয়ান্টিটি কন্ট্রোল */}
                        <div className="flex items-center gap-3 mt-3">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.productId,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-14 text-center border border-gray-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            min="1"
                            max={product.stock}
                          />
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= product.stock}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      {/* দাম ও রিমুভ */}
                      <div className="flex-shrink-0 text-right">
                        <p className="text-xl font-bold text-gray-900">
                          ৳{(discountPrice * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ৳{discountPrice.toFixed(2)} × {item.quantity}
                        </p>
                        {product.discount > 0 && (
                          <p className="text-xs text-gray-400 line-through">
                            ৳{(originalPrice * item.quantity).toFixed(2)}
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="mt-3 p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 inline-flex items-center gap-1"
                        >
                          <Trash2 size={18} />
                          <span className="text-sm">সরান</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* অর্ডার সামারি */}
            <div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                  অর্ডার সামারি
                </h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex justify-between text-gray-700">
                    <span>সাবটোটাল</span>
                    <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <div className="flex flex-col">
                      <span>ডেলিভারি চার্জ</span>
                      {shippingCost === 0 && (
                        <span className="text-xs text-green-600">(ফ্রি ডেলিভারি)</span>
                      )}
                    </div>
                    <span className="font-semibold">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">ফ্রি</span>
                      ) : (
                        `৳${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <span>ছাড় (প্রোমো)</span>
                      <span className="font-semibold">- ৳{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">মোট</span>
                  <span className="text-3xl font-bold text-indigo-600">
                    ৳{total.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3.5 rounded-xl font-bold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <CreditCard className="inline mr-2" size={18} />
                  চেকআউটে যান
                </button>

                <button
                  onClick={() => router.push('/products')}
                  className="w-full mt-3 border-2 border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 hover:border-indigo-200 transition-all duration-200"
                >
                  আরও কেনাকাটা করুন
                </button>

                {/* প্রোমো কোড */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Gift size={16} className="text-indigo-600" />
                    প্রোমো কোড
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="কোড লিখুন"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200 font-semibold"
                    >
                      প্রযোজ্য
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    WELCOME10 (১০% ছাড়)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}