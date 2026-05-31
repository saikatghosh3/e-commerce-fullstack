// for three different advertisement  start

// import Link from 'next/link';

// export default function AdvertisementSlot({ advertisements = [], position }) {
//   const slotAds = advertisements.filter((ad) => ad.position === position && ad.image);

//   if (slotAds.length === 0) {
//     return null;
//   }

//   return (
//     <section className="bg-white py-8 sm:py-10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {slotAds.slice(0, 3).map((ad) => {
//             const content = (
//               <div className="group relative overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
//                 <div className="aspect-[16/7] md:aspect-[4/3]">
//                 {/* <div className="aspect-[16/5] md:aspect-[21/6]"> */}
//                   <img
//                     src={ad.image}
//                     alt={ad.title || 'Advertisement'}
//                     className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                   />
//                 </div>
//                 {(ad.title || ad.subtitle) && (
//                   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
//                     {ad.title && (
//                       <h3 className="text-base font-bold leading-tight">{ad.title}</h3>
//                     )}
//                     {ad.subtitle && (
//                       <p className="mt-1 text-sm text-white/85 line-clamp-2">{ad.subtitle}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );

//             if (!ad.link) {
//               return <div key={ad._id}>{content}</div>;
//             }

//             if (ad.link.startsWith('/')) {
//               return (
//                 <Link key={ad._id} href={ad.link} className="block">
//                   {content}
//                 </Link>
//               );
//             }

//             return (
//               <a
//                 key={ad._id}
//                 href={ad.link}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="block"
//               >
//                 {content}
//               </a>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// for three different advertisement end 



// for single advertisement start 
import Link from 'next/link';

export default function AdvertisementSlot({ advertisements = [], position }) {
  const slotAds = advertisements.filter((ad) => ad.position === position && ad.image);

  if (slotAds.length === 0) {
    return null;
  }

  // ৩টির বদলে শুধু প্রথম অ্যাডটি (১টি) নেওয়া হলো
  const ad = slotAds[0];

  const content = (
    <div className="group relative overflow-hidden rounded-lg border border-gray-100 bg-gray-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* চওড়া অ্যাডের জন্য এখানে aspect ratio পরিবর্তন করে aspect-[16/5] বা aspect-[21/6] করা হয়েছে */}
      <div className="aspect-[16/6] md:aspect-[21/6]">
        <img
          src={ad.image}
          alt={ad.title || 'Advertisement'}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      {(ad.title || ad.subtitle) && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white">
          {ad.title && (
            <h3 className="text-base font-bold leading-tight">{ad.title}</h3>
          )}
          {ad.subtitle && (
            <p className="mt-1 text-sm text-white/85 line-clamp-2">{ad.subtitle}</p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section className="bg-white py-8 sm:py-10">
      {/* এখানে max-w-5xl দিয়ে উইডথ প্রায় ৮০% করা হয়েছে এবং mx-auto দিয়ে মাঝে আনা হয়েছে */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div>
          {/* লিঙ্ক চেক করার আগের লজিকগুলো হুবহু ঠিক রাখা হয়েছে */}
          {!ad.link && <div key={ad._id}>{content}</div>}

          {ad.link && ad.link.startsWith('/') && (
            <Link key={ad._id} href={ad.link} className="block">
              {content}
            </Link>
          )}

          {ad.link && !ad.link.startsWith('/') && (
            <a
              key={ad._id}
              href={ad.link}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              {content}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

// for single advertisement end