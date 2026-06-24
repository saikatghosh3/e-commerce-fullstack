export default function DeliveryInfoPage() {
  const shippingRates = [
    { area: 'ঢাকা শহর', inside: '৬০ টাকা', outside: '—', free: '২০০০+ টাকা' },
    { area: 'ঢাকার বাইরে জেলা', inside: '—', outside: '১২০ টাকা', free: '২০০০+ টাকা' },
    { area: 'বিভাগীয় শহর', inside: '—', outside: '১৫০ টাকা', free: '৩০০০+ টাকা' },
    { area: 'দূরবর্তী অঞ্চল', inside: '—', outside: '২০০ টাকা', free: '৫০০০+ টাকা' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-100 to-blue-100 px-6 py-8 md:px-10 border-b border-sky-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-sky-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-truck text-sky-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">ডেলিভারির তথ্য</h1>
                <p className="text-sky-700 mt-1">দ্রুত ও নিরাপদ ডেলিভারি সেবা</p>
              </div>
            </div>
            <a href="/" className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 w-fit shadow-md hover:shadow-lg">
              <i className="fas fa-home"></i>
              হোমপেজে যান
            </a>
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-8">
          {/* Intro */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-5 rounded-xl border-l-8 border-sky-500">
            <div className="flex items-start gap-3">
              <i className="fas fa-info-circle text-sky-600 text-2xl mt-1"></i>
              <div>
                <h2 className="font-bold text-xl text-slate-800">ডেলিভারি সার্ভিস</h2>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  আমরা পুরো বাংলাদেশে হোম ডেলিভারি সেবা প্রদান করি। আমাদের লক্ষ্য আপনার অর্ডার দ্রুত, নিরাপদে ও সঠিকভাবে 
                  পৌঁছে দেওয়া। নিচে ডেলিভারি সংক্রান্ত বিস্তারিত তথ্য দেওয়া হলো।
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div className="space-y-5">
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-sky-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clock text-sky-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">ডেলিভারি সময়সীমা</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-3 bg-sky-50 p-3 rounded-lg">
                      <span className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-city text-sky-700"></i>
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">ঢাকা শহর ও নিকটবর্তী এলাকা</p>
                        <p className="text-sm text-slate-600">২-৩ কার্যদিবস</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                      <span className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-location-dot text-blue-700"></i>
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">ঢাকার বাইরে জেলা ও বিভাগীয় শহর</p>
                        <p className="text-sm text-slate-600">৩-৫ কার্যদিবস</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-sky-50 p-3 rounded-lg">
                      <span className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-mountain text-sky-700"></i>
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">দূরবর্তী/পাহাড়ি অঞ্চল</p>
                        <p className="text-sm text-slate-600">৫-৭ কার্যদিবস</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
                      <span className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                        <i className="fas fa-bolt text-blue-700"></i>
                      </span>
                      <div>
                        <p className="font-semibold text-slate-800">এক্সপ্রেস ডেলিভারি (নির্বাচিত এলাকায়)</p>
                        <p className="text-sm text-slate-600">২৪-৪৮ ঘন্টা</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Charge Table */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-hand-holding-dollar text-blue-600"></i>
                </div>
                <div className="w-full">
                  <h3 className="font-bold text-lg text-slate-800">ডেলিভারি চার্জ</h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-sky-50">
                          <th className="text-left px-4 py-3 font-semibold text-slate-700 rounded-l-lg">এলাকা</th>
                          <th className="text-center px-4 py-3 font-semibold text-slate-700">ঢাকার ভিতরে</th>
                          <th className="text-center px-4 py-3 font-semibold text-slate-700">ঢাকার বাইরে</th>
                          <th className="text-center px-4 py-3 font-semibold text-slate-700 rounded-r-lg">ফ্রি ডেলিভারি</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingRates.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="px-4 py-3 font-medium text-slate-700">{row.area}</td>
                            <td className="text-center px-4 py-3 text-slate-600">{row.inside}</td>
                            <td className="text-center px-4 py-3 text-slate-600">{row.outside}</td>
                            <td className="text-center px-4 py-3">
                              <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-xs font-semibold">{row.free}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    <i className="fas fa-info-circle"></i> নির্দিষ্ট কিছু পণ্যের জন্য আলাদা ডেলিভারি চার্জ প্রযোজ্য হতে পারে।
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-search-location text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">অর্ডার ট্র্যাকিং</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    অর্ডার কনফার্ম করার পর আমরা একটি ট্র্যাকিং নম্বর এসএমএস ও ইমেইলের মাধ্যমে পাঠিয়ে দেব। আপনি আমাদের 
                    ওয়েবসাইটের ট্র্যাক অপশনে গিয়ে সেই নম্বর দিয়ে আপনার অর্ডারের বর্তমান অবস্থান জানতে পারবেন।
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                    <div className="bg-sky-50 rounded-lg p-3">
                      <i className="fas fa-box text-sky-600 text-xl"></i>
                      <p className="text-xs text-slate-600 mt-1">অর্ডার প্রক্রিয়াধীন</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <i className="fas fa-shipping-fast text-blue-600 text-xl"></i>
                      <p className="text-xs text-slate-600 mt-1">ডেলিভারির পথে</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <i className="fas fa-circle-check text-green-600 text-xl"></i>
                      <p className="text-xs text-slate-600 mt-1">ডেলিভারি সম্পন্ন</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-clipboard-check text-amber-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">গুরুত্বপূর্ণ তথ্য</h3>
                  <ul className="text-slate-600 text-sm mt-2 space-y-2">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>অর্ডার কনফার্মেশনের পর ঠিকানা পরিবর্তন সম্ভব নয়। সঠিক ঠিকানা প্রদান করুন।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>ডেলিভারির আগে কুরিয়ার সার্ভিস ফোন দিয়ে আপনার সাথে যোগাযোগ করবে।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>পণ্য হাতে নেওয়ার সময় খুলে চেক করে নিন। ড্যামেজ বা ভুল পণ্য পেলে রিসিভ করবেন না।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>বাদপড়া, দূরবর্তী বা পাহাড়ি অঞ্চলে ডেলিভারি সময় বেশি লাগতে পারে।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-green-500 mt-0.5"></i>
                      <span>প্রাকৃতিক দুর্যোগ বা সরকারি ছুটির কারণে ডেলিভারি বিলম্বিত হতে পারে।</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* COD */}
            <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className="bg-teal-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-hand-holding-usd text-teal-600"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">ক্যাশ অন ডেলিভারি (COD)</h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    আমরা পণ্য হাতে পেয়ে টাকা দেওয়ার (ক্যাশ অন ডেলিভারি) সুবিধা প্রদান করি। ডেলিভারি কর্মীর কাছে 
                    নির্দিষ্ট পরিমাণ টাকা পরিশোধ করে পণ্য নিতে হবে। অনলাইন পেমেন্টেও সুবিধা রয়েছে (বিকাশ, নগদ, কার্ড)।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-headset text-sky-600 text-2xl"></i>
                <div>
                  <p className="text-sm text-slate-500">ডেলিভারি সংক্রান্ত যেকোনো তথ্য</p>
                  <p className="font-semibold text-slate-700">০৯৬১২-৩৪৫৬৭৮</p>
                  <p className="text-xs text-slate-400">সকাল ৯টা - রাত ১০টা (শুক্রবার ছাড়া)</p>
                </div>
              </div>
              <a href="/contact" className="text-sky-600 hover:text-sky-700 font-medium text-sm flex items-center gap-1 border border-sky-300 px-4 py-2 rounded-lg bg-white">
                <i className="fas fa-envelope"></i>
                যোগাযোগ করুন
              </a>
            </div>
          </div>

          {/* Home */}
          <div className="text-center pt-4 border-t border-gray-100">
            <a href="/" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
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
