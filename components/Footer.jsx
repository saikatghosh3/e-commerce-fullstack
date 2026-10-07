'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useSiteData } from '@/lib/SiteDataContext';

const socialIcons = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  linkedin: Linkedin,
};

export default function Footer() {
  const { settings } = useSiteData();
  const s = settings || {};

  return (
    <footer className="bg-slate-950 text-slate-100 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-400/ rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-600/ rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {s.logo && s.logo.trim() ? (
                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                  <img src={s.logo} alt="Logo" className="w-full h-full object-cover object-center" onError={(e)=>{e.currentTarget.onerror=null;e.currentTarget.style.display="none";const el=e.currentTarget.parentElement;el.classList.add("bg-slate-800","flex","items-center","justify-center");el.innerHTML="<span class=\"text-white font-bold text-base\">"+(s.logoLetter||"E")+"</span>";}}/>
                </div>
              ) : (
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">{s.logoLetter || 'ই'}</span>
                </div>
              )}
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {s.siteName || s.siteNameEnglish || ""}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              {s.tagline || 'প্রিমিয়াম মানের পণ্য এবং অসাধারণ শপিং অভিজ্ঞতার গন্তব্য।'}
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => {
                const url = s[platform];
                const Icon = socialIcons[platform];
                if (!url) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white transition-all duration-300 hover:-translate-y-1"
                    aria-label={platform}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative inline-block">
              দ্রুত লিংক
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 mt-1"></div>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/products" className="hover:text-white transition-colors duration-200 inline-block">
                  কেনাকাটা করুন
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative inline-block">
              সহায়তা
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 mt-1"></div>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors duration-200 inline-block">সাধারণ জিজ্ঞাসা</Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-white transition-colors duration-200 inline-block">রিটার্ন নীতি</Link>
              </li>
              <li>
                <Link href="/delivery-info" className="hover:text-white transition-colors duration-200 inline-block">ডেলিভারির তথ্য</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors duration-200 inline-block">যোগাযোগ করুন</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-lg relative inline-block">
              যোগাযোগ
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-orange-500 mt-1"></div>
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              {s.email && (
                <li className="flex items-center space-x-3 group">
                  <Mail size={18} className="text-slate-300 group-hover:scale-110 transition" />
                  <a href={`mailto:${s.email}`} className="hover:text-white transition-colors duration-200">
                    {s.email}
                  </a>
                </li>
              )}
              {s.phone && (
                <li className="flex items-center space-x-3 group">
                  <Phone size={18} className="text-slate-300 group-hover:scale-110 transition" />
                  <a href={`tel:${s.phoneEnglish || s.phone}`} className="hover:text-white transition-colors duration-200">
                    {s.phone}
                  </a>
                </li>
              )}
              {s.address && (
                <li className="flex items-start space-x-3 group">
                  <MapPin size={18} className="text-slate-300 mt-0.5 group-hover:scale-110 transition" />
                  <span className="leading-relaxed">{s.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <p className="text-slate-500 text-sm">
              {s.copyright || '© ২০২৬ ইলিট স্টোর। সকল অধিকার সংরক্ষিত।'}
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">গোপনীয়তা নীতি</Link>
              <Link href="/terms-of-service" className="hover:text-white transition-colors duration-200">পরিষেবার শর্তাবলী</Link>
            </div>
            <p className="text-slate-500 text-sm md:text-right">
              {s.footerTagline || 'ইলিট কমার্স দ্বারা পরিচালিত'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
