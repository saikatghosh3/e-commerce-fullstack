// 'use client';

// import { Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { CheckCircle, Package, Truck, Home } from 'lucide-react';

// function OrderSuccessPageContent() {
//   const searchParams = useSearchParams();
//   const orderNumber = searchParams.get('orderNumber');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Success Message */}
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
//           <div className="flex justify-center mb-6">
//             <CheckCircle className="text-green-500" size={64} />
//           </div>

//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Order Successful!
//           </h1>
//           <p className="text-lg text-gray-600 mb-4">
//             Thank you for your purchase
//           </p>

//           {orderNumber && (
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <p className="text-sm text-gray-600 mb-2">Order Number</p>
//               <p className="text-2xl font-bold text-blue-600 font-mono">
//                 {orderNumber}
//               </p>
//               <p className="text-xs text-gray-600 mt-4">
//                 Save this number for your records
//               </p>
//             </div>
//           )}

//           <p className="text-gray-600 mb-8">
//             We&apos;ve sent a confirmation email with your order details. You can track your order status below.
//           </p>
//         </div>

//         {/* Order Status Timeline */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Status</h2>

//           <div className="space-y-6">
//             {/* Order Confirmed */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//                   <CheckCircle className="text-green-600" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Order Confirmed</h3>
//                 <p className="text-gray-600 mt-1">Your order has been confirmed and received</p>
//               </div>
//             </div>

//             {/* Processing */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
//                   <Package className="text-blue-600" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
//                 <p className="text-gray-600 mt-1">
//                   We&apos;re preparing your items for shipment (1-2 business days)
//                 </p>
//               </div>
//             </div>

//             {/* Shipping */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
//                   <Truck className="text-gray-400" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Shipped</h3>
//                 <p className="text-gray-600 mt-1">
//                   Your package is on its way (3-5 business days)
//                 </p>
//               </div>
//             </div>

//             {/* Delivered */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
//                   <Home className="text-gray-400" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
//                 <p className="text-gray-600 mt-1">
//                   Your order has been delivered
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Next Steps */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Next?</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Check Your Email</h3>
//               <p className="text-gray-600 text-sm">
//                 We&apos;ve sent a confirmation email with your order details and tracking information.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Track Your Order</h3>
//               <p className="text-gray-600 text-sm">
//                 You can track your order using the order number above from your email.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
//               <p className="text-gray-600 text-sm">
//                 Contact our customer support team if you have any questions about your order.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Continue Shopping</h3>
//               <p className="text-gray-600 text-sm">
//                 Explore our catalog and discover more amazing products.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             href="/"
//             className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Back to Home
//           </Link>
//           <Link
//             href="/products"
//             className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
//           >
//             Continue Shopping
//           </Link>
//         </div>

//         {/* Support Info */}
//         <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
//           <p className="text-gray-600 mb-2">Have questions?</p>
//           <p className="text-gray-900 font-semibold mb-4">
//             support@elitestore.com
//           </p>
//           <p className="text-sm text-gray-600">
//             Available 24/7 to assist you
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function OrderSuccessPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
//         </div>
//       }
//     >
//       <OrderSuccessPageContent />
//     </Suspense>
//   );
// }

// 2nd code start
// 'use client';

// import { Suspense, useRef, useState, useEffect } from 'react';
// import { useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { CheckCircle, Package, Truck, Home, Printer, Download } from 'lucide-react';
// import { useReactToPrint } from 'react-to-print';

// function OrderSuccessPageContent() {
//   const searchParams = useSearchParams();
//   const orderNumber = searchParams.get('orderNumber');
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const invoiceRef = useRef();

//   useEffect(() => {
//     if (orderNumber) {
//       fetchOrderData();
//     } else {
//       setLoading(false);
//     }
//   }, [orderNumber]);

//   const fetchOrderData = async () => {
//     try {
//       const response = await fetch(`/api/orders/${orderNumber}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setOrderData(data.order);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching order:', error);
//       setLoading(false);
//     }
//   };

//   const handlePrint = useReactToPrint({
//     content: () => invoiceRef.current,
//     documentTitle: `Invoice-${orderNumber}`,
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 20mm;
//       }
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact;
//           print-color-adjust: exact;
//         }
//       }
//     `,
//   });

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Success Message */}
//         <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
//           <div className="flex justify-center mb-6">
//             <CheckCircle className="text-green-500" size={64} />
//           </div>

//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Order Successful!
//           </h1>
//           <p className="text-lg text-gray-600 mb-4">
//             Thank you for your purchase
//           </p>

//           {orderNumber && (
//             <div className="bg-gray-50 rounded-lg p-6 mb-8">
//               <p className="text-sm text-gray-600 mb-2">Order Number</p>
//               <p className="text-2xl font-bold text-blue-600 font-mono">
//                 {orderNumber}
//               </p>
//               <p className="text-xs text-gray-600 mt-4">
//                 Save this number for your records
//               </p>
//             </div>
//           )}

//           <p className="text-gray-600 mb-8">
//             We&apos;ve sent a confirmation email with your order details. You can track your order status below.
//           </p>

//           {/* Print Invoice Button */}
//           {orderData && (
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handlePrint}
//                 className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
//               >
//                 <Printer size={20} />
//                 Print Invoice
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Order Status Timeline */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Status</h2>

//           <div className="space-y-6">
//             {/* Order Confirmed */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
//                   <CheckCircle className="text-green-600" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Order Confirmed</h3>
//                 <p className="text-gray-600 mt-1">Your order has been confirmed and received</p>
//               </div>
//             </div>

//             {/* Processing */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
//                   <Package className="text-blue-600" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
//                 <p className="text-gray-600 mt-1">
//                   We&apos;re preparing your items for shipment (1-2 business days)
//                 </p>
//               </div>
//             </div>

//             {/* Shipping */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
//                   <Truck className="text-gray-400" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Shipped</h3>
//                 <p className="text-gray-600 mt-1">
//                   Your package is on its way (3-5 business days)
//                 </p>
//               </div>
//             </div>

//             {/* Delivered */}
//             <div className="flex items-start gap-4">
//               <div className="flex-shrink-0">
//                 <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
//                   <Home className="text-gray-400" size={24} />
//                 </div>
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold text-gray-900">Delivered</h3>
//                 <p className="text-gray-600 mt-1">
//                   Your order has been delivered
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Next Steps */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Next?</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Check Your Email</h3>
//               <p className="text-gray-600 text-sm">
//                 We&apos;ve sent a confirmation email with your order details and tracking information.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Track Your Order</h3>
//               <p className="text-gray-600 text-sm">
//                 You can track your order using the order number above from your email.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
//               <p className="text-gray-600 text-sm">
//                 Contact our customer support team if you have any questions about your order.
//               </p>
//             </div>

//             <div className="border-l-4 border-blue-600 pl-6">
//               <h3 className="font-semibold text-gray-900 mb-2">Continue Shopping</h3>
//               <p className="text-gray-600 text-sm">
//                 Explore our catalog and discover more amazing products.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link
//             href="/"
//             className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
//           >
//             Back to Home
//           </Link>
//           <Link
//             href="/products"
//             className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
//           >
//             Continue Shopping
//           </Link>
//         </div>

//         {/* Support Info */}
//         <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
//           <p className="text-gray-600 mb-2">Have questions?</p>
//           <p className="text-gray-900 font-semibold mb-4">
//             support@elitestore.com
//           </p>
//           <p className="text-sm text-gray-600">
//             Available 24/7 to assist you
//           </p>
//         </div>
//       </div>

//       {/* Hidden Invoice for Printing */}
//       {orderData && (
//         <div className="hidden">
//           <div ref={invoiceRef} className="bg-white p-12 max-w-4xl mx-auto">
//             {/* Invoice Header */}
//             <div className="border-b-2 border-gray-300 pb-6 mb-8">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h1 className="text-4xl font-bold text-gray-900 mb-2">INVOICE</h1>
//                   <p className="text-gray-700">Order #: <span className="font-bold">{orderNumber}</span></p>
//                   <p className="text-gray-700">Date: <span className="font-semibold">{new Date().toLocaleDateString()}</span></p>
//                 </div>
//                 <div className="text-right">
//                   <h2 className="text-2xl font-bold text-blue-600 mb-2">Elite Store</h2>
//                   <p className="text-sm text-gray-600">123 Business Street</p>
//                   <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
//                   <p className="text-sm text-gray-600">Phone: +880 1234-567890</p>
//                   <p className="text-sm text-gray-600">support@elitestore.com</p>
//                 </div>
//               </div>
//             </div>

//             {/* Customer Info */}
//             <div className="grid grid-cols-2 gap-8 mb-8">
//               <div>
//                 <h3 className="font-bold text-gray-900 mb-3 text-lg">Bill To:</h3>
//                 <div className="text-gray-700">
//                   <p className="font-semibold text-gray-900">{orderData.shippingAddress?.name}</p>
//                   <p>{orderData.shippingAddress?.address}</p>
//                   <p>Phone: {orderData.shippingAddress?.phone}</p>
//                   <p>Email: {orderData.shippingAddress?.email}</p>
//                 </div>
//               </div>

//               <div>
//                 <h3 className="font-bold text-gray-900 mb-3 text-lg">Payment Info:</h3>
//                 <div className="text-gray-700">
//                   <p>Method: <span className="font-semibold">
//                     {orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
//                   </span></p>
//                   <p>Status: <span className="font-semibold text-yellow-600">Pending</span></p>
//                   <p>Delivery: 2-3 Business Days</p>
//                 </div>
//               </div>
//             </div>

//             {/* Order Items Table */}
//             <div className="mb-8">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-100 border-b-2 border-gray-300">
//                     <th className="text-left py-3 px-4 font-bold text-gray-700">Item</th>
//                     <th className="text-center py-3 px-4 font-bold text-gray-700">Price</th>
//                     <th className="text-center py-3 px-4 font-bold text-gray-700">Qty</th>
//                     <th className="text-right py-3 px-4 font-bold text-gray-700">Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orderData.items?.map((item, index) => (
//                     <tr key={index} className="border-b border-gray-200">
//                       <td className="py-3 px-4 text-gray-800">{item.name}</td>
//                       <td className="py-3 px-4 text-center text-gray-700">৳{item.price.toFixed(2)}</td>
//                       <td className="py-3 px-4 text-center text-gray-700">{item.quantity}</td>
//                       <td className="py-3 px-4 text-right font-semibold text-gray-900">
//                         ৳{(item.price * item.quantity).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Totals */}
//             <div className="flex justify-end mb-8">
//               <div className="w-80">
//                 <div className="flex justify-between py-2 text-gray-700">
//                   <span>Subtotal:</span>
//                   <span className="font-semibold">৳{orderData.subtotal?.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between py-2 text-gray-700">
//                   <span>Shipping:</span>
//                   <span className="font-semibold">
//                     {orderData.shippingCost === 0 ? (
//                       <span className="text-green-600">Free</span>
//                     ) : (
//                       `৳${orderData.shippingCost?.toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//                 <div className="flex justify-between py-3 border-t-2 border-gray-300 mt-2">
//                   <span className="text-xl font-bold text-gray-900">Total:</span>
//                   <span className="text-xl font-bold text-blue-600">
//                     ৳{orderData.totalAmount?.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="border-t-2 border-gray-300 pt-6 text-center">
//               <p className="text-gray-600 mb-2">Thank you for your business!</p>
//               <p className="text-sm text-gray-500">
//                 For any questions, please contact us at support@elitestore.com
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default function OrderSuccessPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
//         </div>
//       }
//     >
//       <OrderSuccessPageContent />
//     </Suspense>
//   );
// }


// 2nd code end 


'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Home, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

function OrderSuccess() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const invoiceRef = useRef();

  // এপিআই বা ডাটাবেজ না থাকলে টেস্ট করার জন্য মক ডেটা
  const getMockOrderData = () => ({
    shippingAddress: {
      name: "জনাব রহমান",
      address: "বাড়ি #৪৫, রোড #১০, গুলশান, ঢাকা",
      phone: "+৮৮০ ১৭১২-৩৪৫৬৭৮",
      email: "customer@example.com"
    },
    paymentMethod: 'cod',
    items: [
      { name: "প্রিমিয়াম কোয়ালিটি টি-শার্ট", price: 520.00, quantity: 2 },
      { name: "লেদার ওয়ালেট (কালো)", price: 1250.00, quantity: 1 }
    ],
    subtotal: 2290.00,
    shippingCost: 60.00,
    totalAmount: 2350.00
  });

  useEffect(() => {
    if (orderNumber) {
      fetchOrderData();
    } else {
      // অর্ডার নম্বর না থাকলে টেস্টিংয়ের সুবিধার্থে মক ডেটা লোড হবে
      setOrderData(getMockOrderData());
      setLoading(false);
    }
  }, [orderNumber]);

  const fetchOrderData = async () => {
    try {
      // The Orders API expects a Mongo ObjectId when calling /api/orders/:id
      // The frontend often has an orderNumber (human-friendly). Use the search
      // endpoint to find the order by orderNumber so invoice shows correct data.
      const response = await fetch(`/api/orders?search=${encodeURIComponent(
        orderNumber,
      )}`);
      const data = await response.json();

      if (data && data.success && Array.isArray(data.orders) && data.orders.length > 0) {
        const found = data.orders.find((o) => o.orderNumber === orderNumber) || data.orders[0];
        setOrderData(found);
      } else {
        // If nothing found, fall back to mock data for offline/dev
        setOrderData(getMockOrderData());
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching order, loading fallback data:', error);
      setOrderData(getMockOrderData());
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef, // v3+ সংস্করণ সামঞ্জস্যপূর্ণ
    content: () => invoiceRef.current, // v2 সংস্করণ সামঞ্জস্যপূর্ণ
    documentTitle: `Invoice-${orderNumber || 'Test'}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500" size={64} />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            অর্ডারটি সফল হয়েছে!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            আমাদের থেকে কেনাকাটা করার জন্য আপনাকে ধন্যবাদ
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">অর্ডার নম্বর</p>
            <p className="text-2xl font-bold text-blue-600 font-mono">
              {orderNumber || "DEMO-123456"}
            </p>
            <p className="text-xs text-gray-600 mt-4">
              ভবিষ্যতের জন্য এই নম্বরটি সংরক্ষণ করুন
            </p>
          </div>

          <p className="text-gray-600 mb-8">
            আমরা আপনার অর্ডারের বিবরণ সহ একটি নিশ্চিতকরণ ইমেল পাঠিয়েছি। আপনি নিচে আপনার অর্ডারের অবস্থা ট্র্যাক করতে পারেন।
          </p>

          {/* Print Invoice Button - মক ডেটা থাকার কারণে এখন সবসময় দৃশ্যমান থাকবে */}
          {orderData && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handlePrint()}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                <Printer size={20} />
                ইনভয়েস প্রিন্ট করুন
              </button>
            </div>
          )}
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">অর্ডারের অবস্থা</h2>

          <div className="space-y-6">
            {/* Order Confirmed */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">অর্ডার নিশ্চিত করা হয়েছে</h3>
                <p className="text-gray-600 mt-1">আপনার অর্ডারটি সফলভাবে গ্রহণ এবং নিশ্চিত করা হয়েছে</p>
              </div>
            </div>

            {/* Processing */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <Package className="text-blue-600" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">প্রসেসিং চলছে</h3>
                <p className="text-gray-600 mt-1">
                  আমরা আপনার পণ্যগুলো শিপমেন্টের জন্য প্রস্তুত করছি (১-২ কার্যদিবস)
                </p>
              </div>
            </div>

            {/* Shipping */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Truck className="text-gray-400" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">শিপড হয়েছে</h3>
                <p className="text-gray-600 mt-1">
                  আপনার প্যাকেজটি পাঠানো হয়েছে (৩-৫ কার্যদিবস)
                </p>
              </div>
            </div>

            {/* Delivered */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
                  <Home className="text-gray-400" size={24} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">ডেলিভারি সম্পন্ন</h3>
                <p className="text-gray-600 mt-1">
                  Your order has been delivered
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">পরবর্তী ধাপসমূহ কী?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">আপনার ইমেল চেক করুন</h3>
              <p className="text-gray-600 text-sm">
                আমরা আপনার অর্ডারের বিবরণ এবং ট্র্যাকিং তথ্য সহ একটি নিশ্চিতকরণ ইমেল পাঠিয়েছি।
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">আপনার অর্ডার ট্র্যাক করুন</h3>
              <p className="text-gray-600 text-sm">
                আপনি ইমেল থেকে অথবা উপরে দেওয়া অর্ডার নম্বর ব্যবহার করে আপনার অর্ডার ট্র্যাক করতে পারেন।
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">সহায়তা প্রয়োজন?</h3>
              <p className="text-gray-600 text-sm">
                আপনার অর্ডার সম্পর্কে কোনো প্রশ্ন থাকলে আমাদের কাস্টমার সাপোর্ট টিমের সাথে যোগাযোগ করুন।
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6">
              <h3 className="font-semibold text-gray-900 mb-2">কেনাকাটা চালিয়ে যান</h3>
              <p className="text-gray-600 text-sm">
                আমাদের ক্যাটালগ ঘুরে দেখুন এবং আরও দারুণ সব পণ্য খুঁজে নিন।
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            হোম পেজে ফিরে যান
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            কেনাকাটা চালিয়ে যান
          </Link>
        </div>

        {/* Support Info */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-2">কোনো প্রশ্ন আছে?</p>
          <p className="text-gray-900 font-semibold mb-4">
            support@elitestore.com
          </p>
          <p className="text-sm text-gray-600">
            Available 24/7 to assist you
          </p>
        </div>
      </div>

      {/* Hidden Invoice for Printing - অফ-স্ক্রিন রেন্ডারিং মেথড ব্যবহার করে সংশোধন করা হয়েছে */}
      {orderData && (
        <div className="absolute top-[-9999px] left-[-9999px] print:static print:block">
          <div ref={invoiceRef} className="bg-white p-12 max-w-4xl mx-auto">
            {/* Invoice Header */}
            <div className="border-b-2 border-gray-300 pb-6 mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">ইনভয়েস</h1>
                  <p className="text-gray-700">অর্ডার নং: <span className="font-bold">{orderNumber || "DEMO-123456"}</span></p>
                  <p className="text-gray-700">তারিখ: <span className="font-semibold">{new Date().toLocaleDateString()}</span></p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-blue-600 mb-2">Elite Store</h2>
                  <p className="text-sm text-gray-600">123 Business Street</p>
                  <p className="text-sm text-gray-600">Dhaka, Bangladesh</p>
                  <p className="text-sm text-gray-600">Phone: +880 1234-567890</p>
                  <p className="text-sm text-gray-600">support@elitestore.com</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">বিলিং ঠিকানা:</h3>
                <div className="text-gray-700">
                  <p className="font-semibold text-gray-900">{orderData.shippingAddress?.name}</p>
                  <p>{orderData.shippingAddress?.address}</p>
                  <p>Phone: {orderData.shippingAddress?.phone}</p>
                  <p>Email: {orderData.shippingAddress?.email}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg">পেমেন্টের বিবরণ:</h3>
                <div className="text-gray-700">
                  <p>পদ্ধতি: <span className="font-semibold">
                    {orderData.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'অনলাইন পেমেন্ট'}
                  </span></p>
                  <p>অবস্থা: <span className="font-semibold text-yellow-600">পেন্ডিং</span></p>
                  <p>ডেলিভারি: ২-৩ কার্যদিবস</p>
                </div>
              </div>
            </div>

            {/* Order Items Table */}
            <div className="mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left py-3 px-4 font-bold text-gray-700">পণ্য</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-700">মূল্য</th>
                    <th className="text-center py-3 px-4 font-bold text-gray-700">পরিমাণ</th>
                    <th className="text-right py-3 px-4 font-bold text-gray-700">মোট</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.items?.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-3 px-4 text-gray-800">{item.name}</td>
                      <td className="py-3 px-4 text-center text-gray-700">৳{item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center text-gray-700">{item.quantity}</td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-900">
                        ৳{(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-80">
                <div className="flex justify-between py-2 text-gray-700">
                  <span>উপ-মোট:</span>
                  <span className="font-semibold">৳{orderData.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-gray-700">
                  <span>শিপিং চার্জ:</span>
                  <span className="font-semibold">
                    {orderData.shippingCost === 0 ? (
                      <span className="text-green-600">ফ্রি</span>
                    ) : (
                      `৳${orderData.shippingCost?.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-t-2 border-gray-300 mt-2">
                  <span className="text-xl font-bold text-gray-900">মোট:</span>
                  <span className="text-xl font-bold text-blue-600">
                    ৳{orderData.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-300 pt-6 text-center">
              <p className="text-gray-600 mb-2">আমাদের সাথে কেনাকাটা করার জন্য ধন্যবাদ!</p>
              <p className="text-sm text-gray-500">
                যেকোনো প্রশ্নের জন্য, অনুগ্রহ করে আমাদের সাথে support@elitestore.com ঠিকানায় যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      }
    >
      <OrderSuccess />
    </Suspense>
  );
}