import Link from 'next/link';

export default function AdvertisementSlot({ advertisements = [], position }) {
  const slotAds = advertisements.filter((ad) => ad.position === position && ad.image);

  if (slotAds.length === 0) return null;

  const ad = slotAds[0];

  const content = (
    <div className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1">
      <div className="aspect-[3/1] md:aspect-[4/1] lg:aspect-[5/1]">
        <img
          src={ad.image}
          alt="Advertisement"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110 group-hover:brightness-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition-all duration-700 group-hover:animate-none group-hover:left-full group-hover:opacity-100" />
    </div>
  );

  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {!ad.link && <div key={ad._id}>{content}</div>}

        {ad.link && ad.link.startsWith('/') && (
          <Link key={ad._id} href={ad.link} className="block outline-none">
            {content}
          </Link>
        )}

        {ad.link && !ad.link.startsWith('/') && (
          <a key={ad._id} href={ad.link} target="_blank" rel="noreferrer" className="block">
            {content}
          </a>
        )}
      </div>
    </section>
  );
}
