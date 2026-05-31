import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 pt-16 pb-8 relative overflow-hidden">
      {/* প্রফেশনাল ডেকোরেটিভ এলিমেন্ট */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* ব্র্যান্ড সেকশন */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">ই</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ইলিট স্টোর
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              প্রিমিয়াম মানের পণ্য এবং অসাধারণ শপিং অভিজ্ঞতার গন্তব্য।
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-all duration-300 hover:-translate-y-1"
                aria-label="Linkedin"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* দ্রুত লিংক */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative inline-block">
              দ্রুত লিংক
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 mt-1"></div>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-indigo-400 transition-colors duration-200 inline-block">
                  কেনাকাটা করুন
                </Link>
              </li>
              
            </ul>
          </div>

          {/* সহায়তা */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative inline-block">
              সহায়তা
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 mt-1"></div>
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-indigo-400 transition-colors duration-200 inline-block">
                  সাধারণ জিজ্ঞাসা
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-indigo-400 transition-colors duration-200 inline-block">
                  রিটার্ন নীতি
                </Link>
              </li>
              <li>
                <Link href="/delivery-info" className="hover:text-indigo-400 transition-colors duration-200 inline-block">
                  ডেলিভারির তথ্য
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors duration-200 inline-block">
                  যোগাযোগ করুন
                </Link>
              </li>
            </ul>
          </div>

          {/* যোগাযোগ */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative inline-block">
              যোগাযোগ
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-indigo-500 mt-1"></div>
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-3 group">
                <Mail size={18} className="text-indigo-400 group-hover:scale-110 transition" />
                <a href="mailto:support@elitestore.com" className="hover:text-indigo-400 transition-colors duration-200">
                  support@elitestore.com
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone size={18} className="text-indigo-400 group-hover:scale-110 transition" />
                <a href="tel:+8801234567890" className="hover:text-indigo-400 transition-colors duration-200">
                  +৮৮০ ১২৩৪ ৫৬৭৮৯০
                </a>
              </li>
              <li className="flex items-start space-x-3 group">
                <MapPin size={18} className="text-indigo-400 mt-0.5 group-hover:scale-110 transition" />
                <span className="leading-relaxed">১২৩ কমার্স স্ট্রিট, ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ডিভাইডার ও কপিরাইট */}
        <div className="border-t border-gray-800 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              &copy; ২০২৬ ইলিট স্টোর। সকল অধিকার সংরক্ষিত।
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors duration-200">
                গোপনীয়তা নীতি
              </Link>
              <Link href="/terms-of-service" className="hover:text-indigo-400 transition-colors duration-200">
                পরিষেবার শর্তাবলী
              </Link>
            </div>
            <p className="text-gray-500 text-sm md:text-right">
              ইলিট কমার্স দ্বারা পরিচালিত
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}