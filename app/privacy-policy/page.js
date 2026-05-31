// app/privacy-policy/page.js

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* হেডার সেকশন */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-8 md:px-10 border-b border-purple-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-purple-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-shield-alt text-purple-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">গোপনীয়তা নীতি</h1>
                <p className="text-purple-700 mt-1">আপনার তথ্য সুরক্ষা আমাদের অগ্রাধিকার</p>
              </div>
            </div>
            
            {/* হোমপেজে রিডাইরেক্ট বাটন */}
            <a 
              href="/" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 w-fit shadow-md hover:shadow-lg"
            >
              <i className="fas fa-home"></i>
              হোমপেজে যান
            </a>
          </div>
        </div>

        {/* মূল কন্টেন্ট */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* ভূমিকা কার্ড */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border-l-8 border-purple-500">
            <div className="flex items-start gap-3">
              <i className="fas fa-lock text-purple-600 text-2xl mt-1"></i>
              <div>
                <h2 className="font-bold text-xl text-slate-800">আমাদের প্রতিশ্রুতি</h2>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  আপনার ব্যক্তিগত তথ্যের গোপনীয়তা ও সুরক্ষা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। এই নীতিমালায় আমরা ব্যাখ্যা করব 
                  কীভাবে আমরা আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি। আমাদের প্ল্যাটফর্ম ব্যবহার করে আপনি এই নীতিতে সম্মতি জানাচ্ছেন।
                </p>
              </div>
            </div>
          </div>

          {/* তথ্য সংগ্রহ ও ব্যবহার */}
          <div className="space-y-5">
            
            {/* সেকশন ১ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-database text-purple-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">আমরা কী তথ্য সংগ্রহ করি?</h3>
                  <ul className="text-slate-600 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>নাম, ইমেইল ঠিকানা, ফোন নম্বর, ঠিকানা</li>
                    <li>পেমেন্ট সংক্রান্ত তথ্য (কার্ডের বিবরণ সংরক্ষণ করা হয় না)</li>
                    <li>ব্রাউজিং ইতিহাস, পণ্য ভিউ, কেনাকাটার ধরণ</li>
                    <li>ডিভাইসের তথ্য, আইপি ঠিকানা, লোকেশন ডেটা</li>
                    <li>কুকিজ ও অনুরূপ ট্র্যাকিং প্রযুক্তি</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* সেকশন ২ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-blue-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">কীভাবে তথ্য ব্যবহার করি?</h3>
                  <ul className="text-slate-600 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>আপনার অর্ডার প্রক্রিয়াকরণ ও ডেলিভারি নিশ্চিত করতে</li>
                    <li>অ্যাকাউন্ট পরিচালনা ও গ্রাহক সাপোর্ট প্রদানে</li>
                    <li>পণ্য ও পরিষেবা উন্নত করতে, ব্যক্তিগতকৃত সুপারিশ দিতে</li>
                    <li>প্রচারণা, অফার ও আপডেট সম্পর্কে জানাতে (আপনার অনুমতি সাপেক্ষে)</li>
                    <li>প্রতারণা ও জালিয়াতি প্রতিরোধ করতে</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* সেকশন ৩ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-share-alt text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">তথ্য শেয়ার ও সুরক্ষা</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    আমরা আপনার ব্যক্তিগত তথ্য তৃতীয় পক্ষের সাথে বিনা অনুমতিতে শেয়ার করি না। শুধুমাত্র আইনি প্রয়োজনে, আমাদের 
                    পরিষেবা প্রদানে (যেমন ডেলিভারি পার্টনার, পেমেন্ট গেটওয়ে), অথবা আপনার স্পষ্ট সম্মতিতে তথ্য শেয়ার করা হয়। 
                    আপনার ডেটা এনক্রিপ্টেড পদ্ধতিতে সংরক্ষিত হয় এবং SSL প্রযুক্তি ব্যবহার করে সুরক্ষিত রাখা হয়।
                  </p>
                </div>
              </div>
            </div>

            {/* সেকশন ৪ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-cookie-bite text-yellow-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">কুকিজ ও ট্র্যাকিং</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    আমাদের ওয়েবসাইট কুকিজ ব্যবহার করে আপনার অভিজ্ঞতা উন্নত করতে। কুকিজ ছোট টেক্সট ফাইল যা আপনার ব্রাউজারে সংরক্ষিত থাকে। 
                    আপনি চাইলে ব্রাউজার সেটিংস থেকে কুকিজ বন্ধ করতে পারেন, তবে কিছু ফিচার সঠিকভাবে কাজ নাও করতে পারে।
                  </p>
                </div>
              </div>
            </div>

            {/* সেকশন ৫ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-user-shield text-red-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">আপনার অধিকার</h3>
                  <ul className="text-slate-600 text-sm mt-2 space-y-1 list-disc list-inside">
                    <li>আপনার ব্যক্তিগত তথ্য অ্যাক্সেস ও সংশোধনের অধিকার</li>
                    <li>তথ্য মুছে ফেলার অনুরোধ করার অধিকার (GDPR মোতাবেক)</li>
                    <li>মার্কেটিং যোগাযোগ বন্ধ করার অধিকার</li>
                    <li>তথ্য প্রক্রিয়াকরণে আপত্তি জানানোর অধিকার</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* সেকশন ৬ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-indigo-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-child text-indigo-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">শিশুদের গোপনীয়তা</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    আমাদের পরিষেবা ১৮ বছরের নিচে শিশুদের জন্য নয়। আমরা জেনেশুনে শিশুদের ব্যক্তিগত তথ্য সংগ্রহ করি না। 
                    যদি আমরা জানতে পারি যে আমরা কোনো শিশুর তথ্য সংগ্রহ করেছি, আমরা সেটি মুছে দেব।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* গুরুত্বপূর্ণ তথ্য বক্স */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <div className="flex items-start gap-3">
              <i className="fas fa-exclamation-triangle text-amber-600 text-xl mt-0.5"></i>
              <div>
                <h4 className="font-bold text-slate-800">নীতির পরিবর্তন</h4>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  আমরা যেকোনো সময় এই গোপনীয়তা নীতি আপডেট বা পরিবর্তন করার অধিকার সংরক্ষণ করি। কোনো পরিবর্তন হলে আমরা 
                  এই পৃষ্ঠায় তা প্রকাশ করব এবং গুরুত্বপূর্ণ পরিবর্তনের ক্ষেত্রে ইমেইল বা ওয়েবসাইট নোটিফিকেশনের মাধ্যমে জানাবো।
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span><i className="far fa-calendar-alt"></i> সর্বশেষ আপডেট: ১৫ মে, ২০২৫</span>
                  <span><i className="fas fa-clock"></i> কার্যকর তারিখ: ১ জুন, ২০২৫</span>
                </div>
              </div>
            </div>
          </div>

          {/* যোগাযোগ সেকশন */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-headset text-purple-600 text-2xl"></i>
                <div>
                  <p className="text-sm text-slate-500">গোপনীয়তা সংক্রান্ত যেকোনো প্রশ্নে</p>
                  <p className="font-semibold text-slate-700">privacy@yourstore.com</p>
                  <p className="text-xs text-slate-400">সাপোর্ট হটলাইন: ০৯৬১২-৩৪৫৬৭৮</p>
                </div>
              </div>
              <a 
                href="/contact" 
                className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center gap-1 border border-purple-300 px-4 py-2 rounded-lg bg-white"
              >
                <i className="fas fa-envelope"></i>
                যোগাযোগ করুন
              </a>
            </div>
          </div>

          {/* হোমপেজে ফিরে যাওয়ার বাটন */}
          <div className="text-center pt-4 border-t border-gray-100">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-arrow-left"></i>
              হোমপেজে ফিরে যান
              <i className="fas fa-home ml-1"></i>
            </a>
            <p className="text-xs text-slate-400 mt-3">
              <i className="fas fa-lock mr-1"></i> 
              আপনার তথ্য নিরাপদ, আমরা প্রতিশ্রুতিবদ্ধ
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}