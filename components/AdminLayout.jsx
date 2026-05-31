// 'use client';

// import Link from 'next/link';
// import { useState } from 'react';
// import { Menu, X, LogOut, Package, ShoppingCart, Users, BarChart3, Tags, Megaphone } from 'lucide-react';

// export default function AdminLayout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const menuItems = [
//     {
//       name: 'Dashboard',
//       href: '/admin/dashboard',
//       icon: BarChart3,
//     },
//     {
//       name: 'Products',
//       href: '/admin/products/new',
//       icon: Package,
//     },
//     {
//       name: 'Categories',
//       href: '/admin/categories',
//       icon: Tags,
//     },
//     {
//       name: 'Advertisements',
//       href: '/admin/advertisements',
//       icon: Megaphone,
//     },
//     {
//       name: 'Orders',
//       href: '/admin/orders',
//       icon: ShoppingCart,
//     },
//     {
//       name: 'Customers',
//       href: '/admin/customers',
//       icon: Users,
//     },
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//     <div
//   className={`${
//     isSidebarOpen ? 'w-64' : 'w-20'
//   } bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 text-white transition-all duration-300 flex flex-col shadow-2xl relative overflow-hidden`}
// >
//   {/* Glowing Effect */}
//   <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
//   <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
  
//   {/* Logo */}
//   <div className="h-16 flex items-center justify-center border-b border-white/10 relative">
//     <Link href="/admin/dashboard" className="flex items-center gap-2 group">
//       <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/50 transition-all duration-300">
//         <span className="font-bold text-sm">A</span>
//       </div>
//       {isSidebarOpen && <span className="font-bold">Admin</span>}
//     </Link>
//   </div>

//   {/* Menu Items */}
//   <nav className="flex-1 overflow-y-auto py-6 relative">
//     <ul className="space-y-2 px-3">
//       {menuItems.map((item) => {
//         const Icon = item.icon;
//         return (
//           <li key={item.href}>
//             <Link
//               href={item.href}
//               className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 group"
//             >
//               <Icon size={20} className="flex-shrink-0 group-hover:scale-110 transition" />
//               {isSidebarOpen && <span>{item.name}</span>}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   </nav>

//   {/* Logout */}
//   <div className="border-t border-white/10 p-4 relative">
//     <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">
//       <LogOut size={20} className="flex-shrink-0" />
//       {isSidebarOpen && <span>Logout</span>}
//     </button>
//   </div>
// </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Top Bar */}
//         <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
//           <button
//             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//             className="p-2 hover:bg-gray-100 rounded-lg transition"
//           >
//             {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 overflow-auto">
//           <div className="p-8">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, X, LogOut, Package, ShoppingCart, Users, BarChart3, Tags, Megaphone } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is authenticated
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-slate-100">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
  //     </div>
  //   );
  // }
if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="animate-spin h-10 w-10 border-2 border-blue-600 rounded-full border-t-transparent"></div>
    </div>
  );
}
  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    {
      name: 'ড্যাশবোর্ড',
      href: '/admin/dashboard',
      icon: BarChart3,
    },
    {
      name: 'পণ্যসমূহ',
      href: '/admin/products/new',
      icon: Package,
    },
    {
      name: 'ক্যাটাগরি',
      href: '/admin/categories',
      icon: Tags,
    },
    {
      name: 'বিজ্ঞাপন',
      href: '/admin/advertisements',
      icon: Megaphone,
    },
    {
      name: 'অর্ডার',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
  
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white  flex flex-col`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center border-b border-gray-200 px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-base text-white">A</span>
            </div>
            {isSidebarOpen && (
              <span className="font-semibold text-gray-900 text-sm truncate">Admin</span>
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                  >
                    <Icon size={18} className="shrink-0 text-gray-600" />
                    {isSidebarOpen && <span className="truncate">{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="border-t border-gray-200 p-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          >
            <LogOut size={18} className="shrink-0 text-gray-600" />
            {isSidebarOpen && <span className="truncate">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Toaster position="top-right" />
        {/* Top Navigation Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
