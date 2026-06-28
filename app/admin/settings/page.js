'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Save, Upload, Loader2 } from 'lucide-react';
import { showSuccess, showError } from '@/components/ToastUtils';

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    siteName: '',
    siteNameEnglish: '',
    logo: '',
    logoLetter: '',
    logoLetterEnglish: '',
    tagline: '',
    description: '',
    email: '',
    phone: '',
    phoneEnglish: '',
    address: '',
    addressEnglish: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    whatsapp: '',
    copyright: '',
    footerTagline: '',
    favicon: '',
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.settings) {
        const s = data.settings;
        setForm({
          siteName: s.siteName || '',
          siteNameEnglish: s.siteNameEnglish || '',
          logo: s.logo || '',
          logoLetter: s.logoLetter || '',
          logoLetterEnglish: s.logoLetterEnglish || '',
          tagline: s.tagline || '',
          description: s.description || '',
          email: s.email || '',
          phone: s.phone || '',
          phoneEnglish: s.phoneEnglish || '',
          address: s.address || '',
          addressEnglish: s.addressEnglish || '',
          facebook: s.facebook || '',
          twitter: s.twitter || '',
          instagram: s.instagram || '',
          linkedin: s.linkedin || '',
          youtube: s.youtube || '',
          whatsapp: s.whatsapp || '',
          copyright: s.copyright || '',
          footerTagline: s.footerTagline || '',
          favicon: s.favicon || '',
        });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
      showError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, logo: data.url }));
        showSuccess('Logo uploaded');
      } else {
        showError(data.message || 'Upload failed');
      }
    } catch (err) {
      showError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleFaviconUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setForm((prev) => ({ ...prev, favicon: data.url }));
        showSuccess('Favicon uploaded');
      } else {
        showError(data.message || 'Upload failed');
      }
    } catch (err) {
      showError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        showSuccess('Settings saved successfully');
      } else {
        showError(data.message || 'Failed to save');
      }
    } catch (err) {
      showError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin" size={32} /></div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
          <p className="text-gray-500 mt-1">Manage site name, logo, footer information and more</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brand Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Brand</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name (Bengali)</label>
                <input name="siteName" value={form.siteName} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name (English)</label>
                <input name="siteNameEnglish" value={form.siteNameEnglish} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Letter (Bengali)</label>
                <input name="logoLetter" value={form.logoLetter} onChange={handleChange} maxLength={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Logo Letter (English)</label>
                <input name="logoLetterEnglish" value={form.logoLetterEnglish} onChange={handleChange} maxLength={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center shadow-md overflow-hidden">
                  {form.logo ? (
                    <img src={form.logo} alt="Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-2xl">{form.logoLetter || 'ই'}</span>
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                    {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {uploading ? 'Uploading...' : 'Upload Logo'}
                    <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={uploading} className="hidden" />
                  </label>
                  {form.logo && (
                    <button type="button" onClick={() => setForm((p) => ({ ...p, logo: '' }))} className="ml-2 text-sm text-red-600 hover:text-red-700">Remove</button>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Leave empty to use text-based logo</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Favicon</label>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                  {form.favicon ? (
                    <img src={form.favicon} alt="Favicon" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-1v8m0 0l-3-3m3 3l3-3" /></svg>
                  )}
                </div>
                <div className="flex-1">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition text-sm font-medium text-gray-700">
                    <Upload size={16} />
                    Upload Favicon
                    <input type="file" accept="image/png,image/x-icon,image/svg+xml,image/jpeg,image/webp" onChange={handleFaviconUpload} className="hidden" />
                  </label>
                  {form.favicon && (
                    <button type="button" onClick={() => setForm((p) => ({ ...p, favicon: '' }))} className="ml-2 text-sm text-red-600 hover:text-red-700">Remove</button>
                  )}
                  <p className="text-xs text-gray-400 mt-1">Recommended: PNG 32x32 or ICO format</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline (Bengali)</label>
              <textarea name="tagline" value={form.tagline} onChange={handleChange} rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description / Meta Description (English)</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={2} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none" />
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Bengali)</label>
                <input name="phone" value={form.phone} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (English)</label>
                <input name="phoneEnglish" value={form.phoneEnglish} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (Bengali)</label>
                <input name="address" value={form.address} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address (English)</label>
                <input name="addressEnglish" value={form.addressEnglish} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Social Media Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: 'facebook', label: 'Facebook URL' },
                { key: 'twitter', label: 'Twitter URL' },
                { key: 'instagram', label: 'Instagram URL' },
                { key: 'linkedin', label: 'LinkedIn URL' },
                { key: 'youtube', label: 'YouTube URL' },
                { key: 'whatsapp', label: 'WhatsApp URL' },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input name={key} value={form[key]} onChange={handleChange} placeholder={`https://${key}.com/...`} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Footer</h2>
            <div className="grid grid-cols-1 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
                <input name="copyright" value={form.copyright} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Footer Tagline (e.g. "Powered by...")</label>
                <input name="footerTagline" value={form.footerTagline} onChange={handleChange} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
