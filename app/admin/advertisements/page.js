// 'use client';

// import { useEffect, useState } from 'react';
// import AdminLayout from '@/components/AdminLayout';
// import { Edit2, Image, Loader2, Megaphone, Plus, Trash2, Upload, X } from 'lucide-react';

// const emptyForm = {
//   title: '',
//   subtitle: '',
//   image: '',
//   link: '',
//   position: 'after-hero',
//   displayOrder: 0,
//   active: true,
// };

// const positions = [
//   { value: 'after-hero', label: 'Home: Hero section er niche' },
//   { value: 'after-trust', label: 'Home: Trust section er niche' },
//   { value: 'after-products', label: 'Home: Products section er niche' },
// ];

// export default function AdvertisementsPage() {
//   const [advertisements, setAdvertisements] = useState([]);
//   const [formData, setFormData] = useState(emptyForm);
//   const [editingId, setEditingId] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     fetchAdvertisements();
//   }, []);

//   const fetchAdvertisements = async () => {
//     try {
//       const response = await fetch('/api/advertisements');
//       const data = await response.json();

//       if (response.ok && data.success) {
//         setAdvertisements(data.advertisements || []);
//       }
//     } catch (error) {
//       console.error('Error fetching advertisements:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (event) => {
//     const { name, value, type, checked } = event.target;
//     setFormData((current) => ({
//       ...current,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleUpload = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     setUploading(true);

//     try {
//       const uploadData = new FormData();
//       uploadData.append('image', file);

//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: uploadData,
//       });
//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Image upload failed');
//       }

//       setFormData((current) => ({
//         ...current,
//         image: data.url,
//       }));
//     } catch (error) {
//       console.error('Error uploading advertisement:', error);
//       alert(error.message);
//     } finally {
//       setUploading(false);
//       event.target.value = '';
//     }
//   };

//   const handleEdit = (advertisement) => {
//     setEditingId(advertisement._id);
//     setFormData({
//       title: advertisement.title || '',
//       subtitle: advertisement.subtitle || '',
//       image: advertisement.image || '',
//       link: advertisement.link || '',
//       position: advertisement.position || 'after-hero',
//       displayOrder: advertisement.displayOrder || 0,
//       active: advertisement.active !== false,
//     });
//   };

//   const resetForm = () => {
//     setEditingId('');
//     setFormData(emptyForm);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!formData.image) {
//       alert('Advertisement image upload korun');
//       return;
//     }

//     setSaving(true);

//     try {
//       const response = await fetch(
//         editingId ? `/api/advertisements/${editingId}` : '/api/advertisements',
//         {
//           method: editingId ? 'PUT' : 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Advertisement save failed');
//       }

//       resetForm();
//       fetchAdvertisements();
//       alert(editingId ? 'Advertisement update hoyeche' : 'Advertisement add hoyeche');
//     } catch (error) {
//       console.error('Error saving advertisement:', error);
//       alert(error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm('Ei advertisement delete korte chan?')) return;

//     try {
//       const response = await fetch(`/api/advertisements/${id}`, {
//         method: 'DELETE',
//       });
//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.message || 'Delete failed');
//       }

//       if (editingId === id) {
//         resetForm();
//       }
//       fetchAdvertisements();
//     } catch (error) {
//       console.error('Error deleting advertisement:', error);
//       alert(error.message);
//     }
//   };

//   const getPositionLabel = (value) =>
//     positions.find((position) => position.value === value)?.label || value;

//   return (
//     <AdminLayout>
//       <div className="space-y-6">
//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Advertisements</h1>
//             <p className="mt-1 text-sm text-gray-500">
//               Homepage er 3 ta place e advertisement manage korun.
//             </p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
//           <form
//             onSubmit={handleSubmit}
//             className="self-start rounded-lg border border-gray-100 bg-white p-5 shadow-sm"
//           >
//             <div className="mb-5 flex items-center justify-between gap-3">
//               <div className="flex items-center gap-2">
//                 <Megaphone size={20} className="text-indigo-600" />
//                 <h2 className="text-lg font-bold text-gray-900">
//                   {editingId ? 'Edit Advertisement' : 'New Advertisement'}
//                 </h2>
//               </div>
//               {editingId && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
//                   title="Cancel edit"
//                 >
//                   <X size={17} />
//                 </button>
//               )}
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Offer title"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                   Subtitle
//                 </label>
//                 <textarea
//                   name="subtitle"
//                   value={formData.subtitle}
//                   onChange={handleChange}
//                   rows={3}
//                   className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Small offer details"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                   Position
//                 </label>
//                 <select
//                   name="position"
//                   value={formData.position}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//                 >
//                   {positions.map((position) => (
//                     <option key={position.value} value={position.value}>
//                       {position.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                     Order
//                   </label>
//                   <input
//                     type="number"
//                     name="displayOrder"
//                     value={formData.displayOrder}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                 </div>
//                 <label className="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700">
//                   <input
//                     type="checkbox"
//                     name="active"
//                     checked={formData.active}
//                     onChange={handleChange}
//                     className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                   />
//                   Active
//                 </label>
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                   Link
//                 </label>
//                 <input
//                   type="text"
//                   name="link"
//                   value={formData.link}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="/products or https://example.com"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1.5 block text-sm font-semibold text-gray-700">
//                   Image
//                 </label>
//                 <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">
//                   {uploading ? (
//                     <Loader2 size={18} className="animate-spin" />
//                   ) : (
//                     <Upload size={18} />
//                   )}
//                   {uploading ? 'Uploading...' : 'Upload image'}
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleUpload}
//                     disabled={uploading}
//                     className="hidden"
//                   />
//                 </label>

//                 {formData.image && (
//                   <div className="mt-3 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
//                     <img
//                       src={formData.image}
//                       alt="Advertisement preview"
//                       className="h-36 w-full object-cover"
//                     />
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={saving || uploading}
//                 className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 {saving ? <Loader2 size={17} className="animate-spin" /> : <Plus size={17} />}
//                 {editingId ? 'Update Advertisement' : 'Add Advertisement'}
//               </button>
//             </div>
//           </form>

//           <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
//             {loading ? (
//               <div className="flex h-64 items-center justify-center">
//                 <Loader2 className="animate-spin text-indigo-600" size={30} />
//               </div>
//             ) : advertisements.length === 0 ? (
//               <div className="flex h-64 flex-col items-center justify-center text-center">
//                 <Image className="mb-3 text-gray-300" size={44} />
//                 <p className="text-sm text-gray-500">No advertisements added yet.</p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full text-sm">
//                   <thead className="border-b border-gray-100 bg-gray-50">
//                     <tr>
//                       <th className="px-4 py-3 text-left font-semibold text-gray-600">Ad</th>
//                       <th className="px-4 py-3 text-left font-semibold text-gray-600">Position</th>
//                       <th className="px-4 py-3 text-left font-semibold text-gray-600">Status</th>
//                       <th className="px-4 py-3 text-left font-semibold text-gray-600">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {advertisements.map((advertisement) => (
//                       <tr
//                         key={advertisement._id}
//                         className="border-b border-gray-100 hover:bg-gray-50/60"
//                       >
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-3">
//                             <img
//                               src={advertisement.image}
//                               alt={advertisement.title || 'Advertisement'}
//                               className="h-12 w-16 rounded-md object-cover bg-gray-100"
//                             />
//                             <div>
//                               <p className="font-semibold text-gray-900">
//                                 {advertisement.title || 'Untitled ad'}
//                               </p>
//                               <p className="max-w-[220px] truncate text-xs text-gray-500">
//                                 {advertisement.link || 'No link'}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-4 py-3 text-gray-600">
//                           {getPositionLabel(advertisement.position)}
//                         </td>
//                         <td className="px-4 py-3">
//                           <span
//                             className={`rounded-full px-2 py-1 text-xs font-semibold ${
//                               advertisement.active
//                                 ? 'bg-green-100 text-green-700'
//                                 : 'bg-gray-100 text-gray-500'
//                             }`}
//                           >
//                             {advertisement.active ? 'Active' : 'Hidden'}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3">
//                           <div className="flex items-center gap-1">
//                             <button
//                               type="button"
//                               onClick={() => handleEdit(advertisement)}
//                               className="rounded-md p-1.5 text-indigo-600 hover:bg-indigo-50"
//                               title="Edit"
//                             >
//                               <Edit2 size={15} />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => handleDelete(advertisement._id)}
//                               className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
//                               title="Delete"
//                             >
//                               <Trash2 size={15} />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Edit2, Image, Loader2, Megaphone, Plus, Trash2, Upload, X } from 'lucide-react';

const emptyForm = {
  title: '',
  subtitle: '',
  image: '',
  link: '',
  position: 'after-hero',
  displayOrder: 0,
  active: true,
};

const positions = [
  { value: 'after-hero', label: 'হোমপেজ: হিরো সেকশনের নিচে' },
  { value: 'after-trust', label: 'হোমপেজ: ট্রাস্ট সেকশনের নিচে' },
  { value: 'after-products', label: 'হোমপেজ: প্রোডাক্টস সেকশনের নিচে' },
];

export default function AdvertisementsPage() {
  const [advertisements, setAdvertisements] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch('/api/advertisements');
      const data = await response.json();

      if (response.ok && data.success) {
        setAdvertisements(data.advertisements || []);
      }
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'ইমেজ আপলোড ব্যর্থ হয়েছে');
      }

      setFormData((current) => ({
        ...current,
        image: data.url,
      }));
    } catch (error) {
      console.error('Error uploading advertisement:', error);
      const { showError } = await import('@/components/ToastUtils');
      showError(error.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleEdit = (advertisement) => {
    setEditingId(advertisement._id);
    setFormData({
      title: advertisement.title || '',
      subtitle: advertisement.subtitle || '',
      image: advertisement.image || '',
      link: advertisement.link || '',
      position: advertisement.position || 'after-hero',
      displayOrder: advertisement.displayOrder || 0,
      active: advertisement.active !== false,
    });
  };

  const resetForm = () => {
    setEditingId('');
    setFormData(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.image) {
      const { showError } = await import('@/components/ToastUtils');
      showError('অনুগ্রহ করে একটি বিজ্ঞাপন ইমেজ আপলোড করুন');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        editingId ? `/api/advertisements/${editingId}` : '/api/advertisements',
        {
          method: editingId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          }  ,
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'বিজ্ঞাপনটি সংরক্ষণ করা যায়নি');
      }

      resetForm();
      fetchAdvertisements();
      const { showSuccess } = await import('@/components/ToastUtils');
      showSuccess(editingId ? 'বিজ্ঞাপনটি সফলভাবে আপডেট করা হয়েছে' : 'বিজ্ঞাপনটি সফলভাবে যুক্ত করা হয়েছে');
    } catch (error) {
      console.error('Error saving advertisement:', error);
      const { showError } = await import('@/components/ToastUtils');
      showError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const { confirmAction } = await import('@/components/ToastUtils');
    const ok = await confirmAction('আপনি কি নিশ্চিতভাবেই এই বিজ্ঞাপনটি ডিলিট করতে চান?');
    if (!ok) return;

    try {
      const response = await fetch(`/api/advertisements/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'ডিলিট করা সম্ভব হয়নি');
      }

      if (editingId === id) {
        resetForm();
      }
      fetchAdvertisements();
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      const { showError } = await import('@/components/ToastUtils');
      showError(error.message);
    }
  };

  const getPositionLabel = (value) =>
    positions.find((position) => position.value === value)?.label || value;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">বিজ্ঞাপনসমূহ</h1>
            <p className="mt-1 text-sm text-gray-500">
              হোমপেজের ৩টি নির্দিষ্ট স্থানে বিজ্ঞাপনগুলো পরিচালনা করুন।
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="self-start rounded-lg border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Megaphone size={20} className="text-indigo-600" />
                <h2 className="text-lg font-bold text-gray-900">
                  {editingId ? 'বিজ্ঞাপন সংশোধন করুন' : 'নতুন বিজ্ঞাপন'}
                </h2>
              </div>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
                  title="সংশোধন বাতিল করুন"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  শিরোনাম (Title)
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="অফারের মূল শিরোনাম লিখুন"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  উপ-শিরোনাম (Subtitle)
                </label>
                <textarea
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  rows={3}
                  className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="অফারের সংক্ষিপ্ত বিবরণ এখানে লিখুন"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  বিজ্ঞাপনের স্থান (Position)
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {positions.map((position) => (
                    <option key={position.value} value={position.value}>
                      {position.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    ক্রমিক নম্বর (Order)
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <label className="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  সক্রিয় (Active)
                </label>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  লিঙ্ক (Link)
                </label>
                <input
                  type="text"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="/products অথবা https://example.com"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                  বিজ্ঞাপন ইমেজ (Image)
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-100 transition">
                  {uploading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Upload size={18} />
                  )}
                  {uploading ? 'আপলোড হচ্ছে...' : 'ইমেজ আপলোড করুন'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                {formData.image && (
                  <div className="mt-3 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
                    <img
                      src={formData.image}
                      alt="Advertisement preview"
                      className="h-36 w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={saving || uploading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? <Loader2 size={17} className="animate-spin" /> : <Plus size={17} />}
                {editingId ? 'বিজ্ঞাপন আপডেট করুন' : 'বিজ্ঞাপন যুক্ত করুন'}
              </button>
            </div>
          </form>

          <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={30} />
              </div>
            ) : advertisements.length === 0 ? (
              <div className="flex h-64 flex-col items-center justify-center text-center p-5">
                <Image className="mb-3 text-gray-300" size={44} />
                <p className="text-sm text-gray-500">এখনো কোনো বিজ্ঞাপন যুক্ত করা হয়নি।</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-100 bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">বিজ্ঞাপন</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">অবস্থান</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">স্ট্যাটাস</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-600">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody>
                    {advertisements.map((advertisement) => (
                      <tr
                        key={advertisement._id}
                        className="border-b border-gray-100 hover:bg-gray-50/60 transition"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={advertisement.image}
                              alt={advertisement.title || 'Advertisement'}
                              className="h-12 w-16 rounded-md object-cover bg-gray-100"
                            />
                            <div>
                              <p className="font-semibold text-gray-900">
                                {advertisement.title || 'শিরোনামহীন বিজ্ঞাপন'}
                              </p>
                              <p className="max-w-[220px] truncate text-xs text-gray-500">
                                {advertisement.link || 'কোনো লিঙ্ক নেই'}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {getPositionLabel(advertisement.position)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              advertisement.active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {advertisement.active ? 'সক্রিয়' : 'লুকানো'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleEdit(advertisement)}
                              className="rounded-md p-1.5 text-indigo-600 hover:bg-indigo-50 transition"
                              title="সম্পাদনা করুন"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(advertisement._id)}
                              className="rounded-md p-1.5 text-red-600 hover:bg-red-50 transition"
                              title="ডিলিট করুন"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}