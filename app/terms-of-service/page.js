// app/terms-of-service/page.js

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* হেডার সেকশন */}
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-8 md:px-10 border-b border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-file-contract text-blue-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">পরিষেবার শর্তাবলী</h1>
                <p className="text-blue-700 mt-1">আমাদের প্ল্যাটফর্ম ব্যবহারের নিয়ম ও শর্ত</p>
              </div>
            </div>
            

          </div>
        </div>

        {/* মূল কন্টেন্ট */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* ভূমিকা */}
          <div className="bg-blue-50/70 p-5 rounded-xl border-l-8 border-blue-500">
            <h2 className="font-bold text-xl text-slate-800 flex items-center gap-2">
              <i className="fas fa-info-circle text-blue-600"></i>
              ভূমিকা
            </h2>
            <p className="text-slate-600 mt-2 leading-relaxed">
              আমাদের ওয়েবসাইট ও মোবাইল অ্যাপ্লিকেশন ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলীতে সম্পূর্ণ সম্মতি প্রদান করছেন। 
              যদি কোনো শর্তে আপনি একমত না হন, তাহলে অনুগ্রহ করে আমাদের সাইট ব্যবহার করবেন না।
            </p>
          </div>

          {/* শর্তাবলী গ্রিড */}
          <div className="space-y-5">
            
            {/* শর্ত ১ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-700 font-bold">১</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">অ্যাকাউন্ট নিবন্ধন</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    আমাদের সাইটে অ্যাকাউন্ট তৈরি করতে হলে আপনাকে সঠিক ও সম্পূর্ণ তথ্য প্রদান করতে হবে। আপনার অ্যাকাউন্টের তথ্যের 
                    নিরাপত্তা ও গোপনীয়তা নিশ্চিত করা আপনার নিজের দায়িত্ব।
                  </p>
                </div>
              </div>
            </div>

            {/* শর্ত ২ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-700 font-bold">২</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">পণ্য ক্রয় ও মূল্য</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    সমস্ত পণ্যের মূল্য ভ্যাট ও অন্যান্য করসহ প্রদর্শিত হয়। আমরা যেকোনো সময় মূল্য পরিবর্তনের অধিকার সংরক্ষণ করি। 
                    পণ্যের প্রাপ্যতা ও চাহিদা অনুযায়ী স্টক পরিবর্তন হতে পারে।
                  </p>
                </div>
              </div>
            </div>

            {/* শর্ত ৩ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-700 font-bold">৩</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">ডেলিভারি ও শিপিং</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    অর্ডার কনফার্মেশনের ২-৫ কার্যদিবসের মধ্যে পণ্য ডেলিভারি দেওয়া হয়। ঢাকার ভিতরে ডেলিভারি চার্জ ৬০ টাকা 
                    এবং ঢাকার বাইরে ১২০ টাকা। নির্দিষ্ট কিছু জায়গায় হোম ডেলিভারি সংক্রান্ত সমস্যা দেখা দিতে পারে।
                  </p>
                </div>
              </div>
            </div>

            {/* শর্ত ৪ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-700 font-bold">৪</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">পেমেন্ট পদ্ধতি</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    আমরা বিকাশ, নগদ, রকেট, ব্যাংক কার্ড ও ক্যাশ অন ডেলিভারি সুবিধা প্রদান করি। সকল অনলাইন লেনদেন ১০০% সুরক্ষিত 
                    এবং এনক্রিপ্টেড। আপনার দেওয়া পেমেন্ট তথ্য তৃতীয় কারো সাথে শেয়ার করা হয় না।
                  </p>
                </div>
              </div>
            </div>

            {/* শর্ত ৫ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-700 font-bold">৫</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">ব্যবহারকারীর আচরণবিধি</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    আমাদের প্ল্যাটফর্ম ব্যবহার করার সময় আপনি কোনো ধরনের অসদাচরণ, প্রতারণা, হ্যাকিং বা ক্ষতিকর কার্যকলাপে 
                    লিপ্ত হতে পারবেন না। আইন লঙ্ঘন করলে আপনার অ্যাকাউন্ট বন্ধ করে দেওয়া হবে এবং আইনি ব্যবস্থা নেওয়া হবে।
                  </p>
                </div>
              </div>
            </div>

            {/* শর্ত ৬ */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-700 font-bold">৬</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">কপিরাইট ও কন্টেন্ট</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    এই সাইটের সকল কন্টেন্ট (লোগো, ছবি, টেক্সট, ডিজাইন) আমাদের একচেটিয়া সম্পত্তি। অনুমতি ছাড়া কন্টেন্ট কপি, 
                    পুনঃপ্রকাশ বা ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* গুরুত্বপূর্ণ তথ্য */}
          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <div className="flex items-start gap-3">
              <i className="fas fa-gavel text-amber-600 text-xl mt-0.5"></i>
              <div>
                <h4 className="font-bold text-slate-800">গুরুত্বপূর্ণ দ্রষ্টব্য</h4>
                <p className="text-slate-600 text-sm mt-1">
                  আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন বা আপডেট করার অধিকার সংরক্ষণ করি। পরিবর্তন হলে তা ওয়েবসাইটে 
                  প্রকাশ করা হবে। নিয়মিত শর্তাবলী পর্যালোচনা করা আপনার দায়িত্ব।
                </p>
                <p className="text-xs text-slate-400 mt-2">
                  সর্বশেষ আপডেট: ১৫ মে, ২০২৫
                </p>
              </div>
            </div>
          </div>

          {/* যোগাযোগ সেকশন */}
          <div className="bg-indigo-50 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <i className="fas fa-envelope text-indigo-600 text-xl"></i>
              <div>
                <p className="text-sm text-slate-500">প্রশ্ন বা অভিযোগ জানাতে</p>
                <p className="font-semibold text-slate-700">legal@yourstore.com</p>
              </div>
            </div>
            <a 
              href="/contact" 
              className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
            >
              কন্টাক্ট পেজে যান
              <i className="fas fa-arrow-right text-xs"></i>
            </a>
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
          </div>
        </div>
      </div>
    </main>
  );
}