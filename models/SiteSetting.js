import mongoose from 'mongoose';

const siteSettingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'ইলিট স্টোর' },
    siteNameEnglish: { type: String, default: 'Elite Store' },
    logo: { type: String, default: '' },
    logoLetter: { type: String, default: 'ই' },
    logoLetterEnglish: { type: String, default: 'E' },
    tagline: { type: String, default: 'প্রিমিয়াম মানের পণ্য এবং অসাধারণ শপিং অভিজ্ঞতার গন্তব্য।' },
    description: { type: String, default: 'Shop the finest collection of premium products' },
    email: { type: String, default: 'support@elitestore.com' },
    phone: { type: String, default: '+৮৮০ ১২৩৪ ৫৬৭৮৯০' },
    phoneEnglish: { type: String, default: '+880 1234-567890' },
    address: { type: String, default: '১২৩ কমার্স স্ট্রিট, ঢাকা, বাংলাদেশ' },
    addressEnglish: { type: String, default: '123 Business Street, Dhaka, Bangladesh' },
    facebook: { type: String, default: '' },
    twitter: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    youtube: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    copyright: { type: String, default: '© ২০২৬ ইলিট স্টোর। সকল অধিকার সংরক্ষিত।' },
    footerTagline: { type: String, default: 'ইলিট কমার্স দ্বারা পরিচালিত' },
    favicon: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSetting || mongoose.model('SiteSetting', siteSettingSchema);
