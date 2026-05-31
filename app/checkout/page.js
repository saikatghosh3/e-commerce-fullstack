// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { ArrowLeft, Loader2, Truck, CreditCard, Package, Clock } from 'lucide-react';
// import { clearCart, readCart, saveCart } from '@/lib/cart';

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [cartItems, setCartItems] = useState([]);
//   const [products, setProducts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [processing, setProcessing] = useState(false);
//   const [removedItemsCount, setRemovedItemsCount] = useState(0);

//   // শুধু প্রয়োজনীয় ফিল্ড
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//   });

//   const [paymentMethod, setPaymentMethod] = useState('cod');

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   const fetchCartData = async () => {
//     try {
//       const cart = readCart();
//       setCartItems(cart);

//       if (cart.length > 0) {
//         const productPromises = cart.map((item) =>
//           fetch(`/api/products/${item.productId}`).then((res) => res.json())
//         );

//         const results = await Promise.all(productPromises);
//         const productsMap = {};

//         results.forEach((result) => {
//           if (result.success) {
//             productsMap[result.product._id] = result.product;
//           }
//         });

//         setProducts(productsMap);

//         const availableCart = cart.filter((item) => productsMap[item.productId]);

//         if (availableCart.length !== cart.length) {
//           setRemovedItemsCount(cart.length - availableCart.length);
//           setCartItems(availableCart);
//           saveCart(availableCart);
//         }
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const calculateTotals = () => {
//     const subtotal = cartItems.reduce((total, item) => {
//       const product = products[item.productId];
//       if (!product) return total;

//       const price = product.discount
//         ? product.price - (product.price * product.discount) / 100
//         : product.price;

//       return total + price * item.quantity;
//     }, 0);

//     // বাংলাদেশী শিপিং (৫০০০+ টাকায় ফ্রি)
//     const shippingCost = subtotal > 5000 ? 0 : 150;
//     const total = subtotal + shippingCost;

//     return { subtotal, shippingCost, total };
//   };

//   const { subtotal, shippingCost, total } = calculateTotals();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.name || !formData.email || !formData.phone || !formData.address) {
//       alert('দয়া করে সব তথ্য পূরণ করুন');
//       return;
//     }

//     setProcessing(true);

//     try {
//       const orderNumber = `ORD-${Date.now()}`;

//       const orderItems = cartItems.reduce((items, item) => {
//         const product = products[item.productId];
//         if (!product) return items;

//         const price = product.discount
//           ? product.price - (product.price * product.discount) / 100
//           : product.price;

//         items.push({
//           productId: item.productId,
//           name: product.name,
//           price,
//           quantity: item.quantity,
//           image: product.image,
//         });

//         return items;
//       }, []);

//       if (orderItems.length !== cartItems.length || orderItems.length === 0) {
//         alert('আপনার কার্টের কিছু পণ্য আর উপলব্ধ নেই। দয়া করে কার্টটি রিভিউ করুন।');
//         setProcessing(false);
//         router.push('/cart');
//         return;
//       }

//       const response = await fetch('/api/payment/initiate', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           orderNumber,
//           items: orderItems,
//           subtotal,
//           shippingCost,
//           totalAmount: total,
//           shippingAddress: formData,
//           paymentMethod,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (paymentMethod === 'ssl-commerz' && data.paymentUrl) {
//           window.location.href = data.paymentUrl;
//         } else {
//           alert(`অর্ডার সফল হয়েছে! অর্ডার নম্বর: ${orderNumber}`);
//           clearCart();
//           router.push(`/order-success?orderNumber=${orderNumber}`);
//         }
//       } else {
//         alert('অর্ডার প্রক্রিয়াকরণে ত্রুটি: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error processing order:', error);
//       alert('অর্ডার প্রক্রিয়াকরণে ত্রুটি। দয়া করে আবার চেষ্টা করুন।');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96 bg-gradient-to-b from-gray-50 to-white">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <button
//             onClick={() => router.back()}
//             className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-8 group"
//           >
//             <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
//             ফিরে যান
//           </button>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
//             <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-6">
//               <Package size={40} className="text-indigo-600" />
//             </div>
//             <p className="text-gray-600 text-lg mb-8">আপনার কার্ট খালি</p>
//             <Link
//               href="/products"
//               className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md"
//             >
//               কেনাকাটা শুরু করুন
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
//         {/* হেডার */}
//         <button
//           onClick={() => router.back()}
//           className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 group"
//         >
//           <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
//           কার্টে ফিরুন
//         </button>

//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-12">
//           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">চেকআউট</h1>
//           <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
//             <Clock size={16} />
//             <span>সাধারণত ২-৩ কর্মদিবসে ডেলিভারি</span>
//           </div>
//         </div>

//         {removedItemsCount > 0 && (
//           <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-amber-800 flex items-center gap-2">
//             <span className="text-lg">⚠️</span>
//             {removedItemsCount} টি পণ্য আর উপলব্ধ নেই এবং কার্ট থেকে সরানো হয়েছে।
//           </div>
//         )}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
//           {/* চেকআউট ফর্ম */}
//           <div className="lg:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               {/* ডেলিভারি তথ্য */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-7 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
//                   <Truck size={24} className="text-indigo-600" />
//                   <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
//                     ডেলিভারি তথ্য
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 gap-5">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       পূর্ণ নাম *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="আপনার পূর্ণ নাম লিখুন"
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       ইমেইল *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="আপনার ইমেইল ঠিকানা"
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       ফোন নম্বর *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="০১XXXXXXXXX"
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
//                       required
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-900 mb-2">
//                       সম্পূর্ণ ঠিকানা *
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       placeholder="বাড়ির ঠিকানা, রোড, এরিয়া, জেলা"
//                       rows={3}
//                       className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
//                       required
//                     />
//                     <p className="text-xs text-gray-400 mt-1">
//                       উদাহরণ: ১২৩, মিরপুর রোড, ধানমন্ডি, ঢাকা
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* পেমেন্ট মেথড */}
//               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-7 hover:shadow-md transition-shadow">
//                 <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
//                   <CreditCard size={24} className="text-indigo-600" />
//                   <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
//                     পেমেন্ট পদ্ধতি
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
//                     paymentMethod === 'cod' 
//                       ? 'border-indigo-500 bg-indigo-50' 
//                       : 'border-gray-200 hover:border-indigo-200'
//                   }`}>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="cod"
//                       checked={paymentMethod === 'cod'}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="w-4 h-4 mt-0.5 text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <div className="ml-3 flex-1">
//                       <span className="block font-semibold text-gray-900">
//                         ক্যাশ অন ডেলিভারি (COD)
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         অর্ডার পাওয়ার সময় টাকা প্রদান করুন
//                       </span>
//                     </div>
//                   </label>

//                   <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
//                     paymentMethod === 'ssl-commerz' 
//                       ? 'border-indigo-500 bg-indigo-50' 
//                       : 'border-gray-200 hover:border-indigo-200'
//                   }`}>
//                     <input
//                       type="radio"
//                       name="paymentMethod"
//                       value="ssl-commerz"
//                       checked={paymentMethod === 'ssl-commerz'}
//                       onChange={(e) => setPaymentMethod(e.target.value)}
//                       className="w-4 h-4 mt-0.5 text-indigo-600 focus:ring-indigo-500"
//                     />
//                     <div className="ml-3 flex-1">
//                       <span className="block font-semibold text-gray-900">
//                         অনলাইন পেমেন্ট (SSL কমার্জ)
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         কার্ড, মোবাইল ব্যাংকিং, নেট ব্যাংকিং
//                       </span>
//                     </div>
//                   </label>
//                 </div>
//               </div>

//               {/* সাবমিট বাটন */}
//               <button
//                 type="submit"
//                 disabled={processing}
//                 className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
//               >
//                 {processing && <Loader2 size={20} className="animate-spin" />}
//                 {processing ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'অর্ডার সম্পন্ন করুন'}
//               </button>
//             </form>
//           </div>

//           {/* অর্ডার সামারি সাইডবার */}
//           <div>
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 sticky top-24">
//               <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
//                 অর্ডার সামারি
//               </h3>

//               <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 max-h-80 overflow-y-auto">
//                 {cartItems.map((item) => {
//                   const product = products[item.productId];
//                   if (!product) return null;

//                   const price = product.discount
//                     ? product.price - (product.price * product.discount) / 100
//                     : product.price;

//                   return (
//                     <div key={item.productId} className="flex justify-between items-start text-sm">
//                       <div className="flex-1">
//                         <span className="text-gray-700 font-medium">
//                           {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
//                         </span>
//                         <span className="text-gray-400 text-xs block">× {item.quantity}</span>
//                       </div>
//                       <span className="font-semibold text-gray-900 ml-3">
//                         ৳{(price * item.quantity).toFixed(2)}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
//                 <div className="flex justify-between text-gray-600">
//                   <span>সাবটোটাল</span>
//                   <span className="font-medium">৳{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <div className="flex flex-col">
//                     <span>ডেলিভারি চার্জ</span>
//                     {shippingCost === 0 && (
//                       <span className="text-xs text-green-600">(৫০০০+ টাকায় ফ্রি)</span>
//                     )}
//                   </div>
//                   <span className="font-medium">
//                     {shippingCost === 0 ? (
//                       <span className="text-green-600">ফ্রি</span>
//                     ) : (
//                       `৳${shippingCost.toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <div className="flex justify-between items-center mb-4">
//                 <span className="text-lg font-bold text-gray-900">মোট পরিশোধ্য</span>
//                 <span className="text-2xl lg:text-3xl font-bold text-indigo-600">
//                   ৳{total.toFixed(2)}
//                 </span>
//               </div>

//               {/* ডেলিভারি ইনফো */}
//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <div className="flex items-center gap-2 text-xs text-gray-500">
//                   <Truck size={14} />
//                   <span>ফ্রি ডেলিভারি: ৫০০০+ টাকা অর্ডারে</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Truck, CreditCard, Package, Clock } from 'lucide-react';
import { clearCart, readCart, saveCart } from '@/lib/cart';
import toast, { Toaster } from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [removedItemsCount, setRemovedItemsCount] = useState(0);

  // শুধু প্রয়োজনীয় ফিল্ড
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const cart = readCart();
      setCartItems(cart);

      if (cart.length > 0) {
        const productPromises = cart.map((item) =>
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

        const availableCart = cart.filter((item) => productsMap[item.productId]);

        if (availableCart.length !== cart.length) {
          setRemovedItemsCount(cart.length - availableCart.length);
          setCartItems(availableCart);
          saveCart(availableCart);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      toast.error('কার্ট ডেটা লোড করতে সমস্যা হয়েছে');
      setLoading(false);
    }
  };

  // ফর্ম ভ্যালিডেশন ফাংশন
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    // নাম ভ্যালিডেশন (কমপক্ষে ৩টি অক্ষর)
    if (!formData.name.trim()) {
      errors.name = 'নাম আবশ্যক';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      errors.name = 'নাম কমপক্ষে ৩টি অক্ষর হতে হবে';
      isValid = false;
    }

    // ইমেইল ভ্যালিডেশন
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'ইমেইল আবশ্যক';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'সঠিক ইমেইল ঠিকানা দিন';
      isValid = false;
    }

    // ফোন ভ্যালিডেশন (বাংলাদেশী ফোন নম্বর: ১১ ডিজিট, 01 দিয়ে শুরু)
    const phoneRegex = /^01[0-9]{9}$/;
    const cleanPhone = formData.phone.replace(/\s+/g, '');
    if (!formData.phone.trim()) {
      errors.phone = 'ফোন নম্বর আবশ্যক';
      isValid = false;
    } else if (!phoneRegex.test(cleanPhone)) {
      errors.phone = 'সঠিক বাংলাদেশী ফোন নম্বর দিন (01XXXXXXXXX)';
      isValid = false;
    }

    // ঠিকানা ভ্যালিডেশন (কমপক্ষে ১০টি অক্ষর)
    if (!formData.address.trim()) {
      errors.address = 'ঠিকানা আবশ্যক';
      isValid = false;
    } else if (formData.address.trim().length < 10) {
      errors.address = 'সম্পূর্ণ ঠিকানা দিন (কমপক্ষে ১০টি অক্ষর)';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // রিয়েল-টাইম ভ্যালিডেশন ক্লিয়ার
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const product = products[item.productId];
      if (!product) return total;

      const price = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

      return total + price * item.quantity;
    }, 0);

    // বাংলাদেশী শিপিং (৫০০০+ টাকায় ফ্রি)
    const shippingCost = subtotal > 5000 ? 0 : 150;
    const total = subtotal + shippingCost;

    return { subtotal, shippingCost, total };
  };

  const { subtotal, shippingCost, total } = calculateTotals();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ফর্ম ভ্যালিডেশন চেক
    if (!validateForm()) {
      toast.error('দয়া করে সব তথ্য সঠিকভাবে পূরণ করুন');
      return;
    }

    setProcessing(true);

    try {
      const orderNumber = `ORD-${Date.now()}`;

      const orderItems = cartItems.reduce((items, item) => {
        const product = products[item.productId];
        if (!product) return items;

        const price = product.discount
          ? product.price - (product.price * product.discount) / 100
          : product.price;

        items.push({
          productId: item.productId,
          name: product.name,
          price,
          quantity: item.quantity,
          image: product.image,
        });

        return items;
      }, []);

      if (orderItems.length !== cartItems.length || orderItems.length === 0) {
        toast.error('আপনার কার্টের কিছু পণ্য আর উপলব্ধ নেই। দয়া করে কার্টটি রিভিউ করুন।');
        setProcessing(false);
        router.push('/cart');
        return;
      }

      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderNumber,
          items: orderItems,
          subtotal,
          shippingCost,
          totalAmount: total,
          shippingAddress: formData,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (data.success) {
        if (paymentMethod === 'ssl-commerz' && data.paymentUrl) {
          toast.success('পেমেন্ট পেজে পাঠানো হচ্ছে...');
          setTimeout(() => {
            window.location.href = data.paymentUrl;
          }, 1000);
        } else {
          toast.success(`অর্ডার সফল হয়েছে! অর্ডার নম্বর: ${orderNumber}`);
          clearCart();
          router.push(`/order-success?orderNumber=${orderNumber}`);
        }
      } else {
        toast.error(data.message || 'অর্ডার প্রক্রিয়াকরণে ত্রুটি হয়েছে');
      }
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('অর্ডার প্রক্রিয়াকরণে ত্রুটি। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
            ফিরে যান
          </button>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-6">
              <Package size={40} className="text-indigo-600" />
            </div>
            <p className="text-gray-600 text-lg mb-8">আপনার কার্ট খালি</p>
            <Link
              href="/products"
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md"
            >
              কেনাকাটা শুরু করুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Toast Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* হেডার */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" />
          কার্টে ফিরুন
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">চেকআউট</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
            <Clock size={16} />
            <span>সাধারণত ২-৩ কর্মদিবসে ডেলিভারি</span>
          </div>
        </div>

        {removedItemsCount > 0 && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-amber-800 flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            {removedItemsCount} টি পণ্য আর উপলব্ধ নেই এবং কার্ট থেকে সরানো হয়েছে।
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* চেকআউট ফর্ম */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* ডেলিভারি তথ্য */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-7 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                  <Truck size={24} className="text-indigo-600" />
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    ডেলিভারি তথ্য
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      পূর্ণ নাম *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        formErrors.name
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-indigo-500 focus:border-transparent'
                      }`}
                      required
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      ইমেইল *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="আপনার ইমেইল ঠিকানা"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        formErrors.email
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-indigo-500 focus:border-transparent'
                      }`}
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      ফোন নম্বর *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="০১XXXXXXXXX"
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                        formErrors.phone
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-indigo-500 focus:border-transparent'
                      }`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      সম্পূর্ণ ঠিকানা *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="বাড়ির ঠিকানা, রোড, এরিয়া, জেলা"
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all resize-none ${
                        formErrors.address
                          ? 'border-red-300 focus:ring-red-500'
                          : 'border-gray-200 focus:ring-indigo-500 focus:border-transparent'
                      }`}
                      required
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      উদাহরণ: ১২৩, মিরপুর রোড, ধানমন্ডি, ঢাকা
                    </p>
                  </div>
                </div>
              </div>

              {/* পেমেন্ট মেথড */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-7 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                  <CreditCard size={24} className="text-indigo-600" />
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    পেমেন্ট পদ্ধতি
                  </h2>
                </div>

                <div className="space-y-4">
                  <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    paymentMethod === 'cod' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 mt-0.5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block font-semibold text-gray-900">
                        ক্যাশ অন ডেলিভারি (COD)
                      </span>
                      <span className="text-sm text-gray-500">
                        অর্ডার পাওয়ার সময় টাকা প্রদান করুন
                      </span>
                    </div>
                  </label>

                  <label className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    paymentMethod === 'ssl-commerz' 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-indigo-200'
                  }`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ssl-commerz"
                      checked={paymentMethod === 'ssl-commerz'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 mt-0.5 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div className="ml-3 flex-1">
                      <span className="block font-semibold text-gray-900">
                        অনলাইন পেমেন্ট (SSL কমার্জ)
                      </span>
                      <span className="text-sm text-gray-500">
                        কার্ড, মোবাইল ব্যাংকিং, নেট ব্যাংকিং
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* সাবমিট বাটন */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
              >
                {processing && <Loader2 size={20} className="animate-spin" />}
                {processing ? 'প্রক্রিয়াকরণ হচ্ছে...' : 'অর্ডার সম্পন্ন করুন'}
              </button>
            </form>
          </div>

          {/* অর্ডার সামারি সাইডবার */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 sticky top-24">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                অর্ডার সামারি
              </h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-100 max-h-80 overflow-y-auto">
                {cartItems.map((item) => {
                  const product = products[item.productId];
                  if (!product) return null;

                  const price = product.discount
                    ? product.price - (product.price * product.discount) / 100
                    : product.price;

                  return (
                    <div key={item.productId} className="flex justify-between items-start text-sm">
                      <div className="flex-1">
                        <span className="text-gray-700 font-medium">
                          {product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}
                        </span>
                        <span className="text-gray-400 text-xs block">× {item.quantity}</span>
                      </div>
                      <span className="font-semibold text-gray-900 ml-3">
                        ৳{(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>সাবটোটাল</span>
                  <span className="font-medium">৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <div className="flex flex-col">
                    <span>ডেলিভারি চার্জ</span>
                    {shippingCost === 0 && (
                      <span className="text-xs text-green-600">(৫০০০+ টাকায় ফ্রি)</span>
                    )}
                  </div>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">ফ্রি</span>
                    ) : (
                      `৳${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-gray-900">মোট পরিশোধ্য</span>
                <span className="text-2xl lg:text-3xl font-bold text-indigo-600">
                  ৳{total.toFixed(2)}
                </span>
              </div>

              {/* ডেলিভারি ইনফো */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck size={14} />
                  <span>ফ্রি ডেলিভারি: ৫০০০+ টাকা অর্ডারে</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}