import { RotateCcw, Shield, Star, Truck } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Truck className="text-blue-600" size={32} />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              ফ্রি ডেলিভারি
            </h3>

            <p className="text-gray-600 text-sm">
              ৫০ টাকার বেশি অর্ডারে ফ্রি শিপিং
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Shield className="text-blue-600" size={32} />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              নিরাপদ পেমেন্ট
            </h3>

            <p className="text-gray-600 text-sm">
              সম্পূর্ণ SSL সুরক্ষিত লেনদেন
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <RotateCcw className="text-blue-600" size={32} />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              সহজ রিটার্ন
            </h3>

            <p className="text-gray-600 text-sm">
              ৩০ দিনের সহজ রিটার্ন সুবিধা
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Star className="text-blue-600" size={32} />
            </div>

            <h3 className="font-bold text-gray-900 mb-2">
              প্রিমিয়াম মান
            </h3>

            <p className="text-gray-600 text-sm">
              যাচাইকৃত আসল ও মানসম্মত পণ্য
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}