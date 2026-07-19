import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';

const FEATURED_PACKAGES = [
  {
    id: "p1",
    title: "Saint Martin's Coral Island Escape",
    image: "https://images.unsplash.com/photo-1596895111956-bf570531846c?q=80&w=800&auto=format&fit=crop",
    price: 12500,
    durationDays: 4,
    location: "Saint Martin's Island",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "p2",
    title: "Sundarbans Wildlife Safari",
    image: "https://images.unsplash.com/photo-1582650517303-b42616d56f8a?q=80&w=800&auto=format&fit=crop",
    price: 18000,
    durationDays: 3,
    location: "Sundarbans",
    rating: 4.9,
    reviews: 89
  },
  {
    id: "p3",
    title: "Bandarban Cloud Camp",
    image: "https://images.unsplash.com/photo-1598970923062-8e7d23a6c5cc?q=80&w=800&auto=format&fit=crop",
    price: 9500,
    durationDays: 3,
    location: "Bandarban",
    rating: 4.7,
    reviews: 215
  },
  {
    id: "p4",
    title: "Sylhet Waterfall & Tea Tour",
    image: "https://images.unsplash.com/photo-1594921966205-02102e3b2e35?q=80&w=800&auto=format&fit=crop",
    price: 8500,
    durationDays: 2,
    location: "Sylhet",
    rating: 4.6,
    reviews: 156
  }
];

export function FeaturedDestinations() {
  return (
    <section className="py-24 bg-[var(--color-neutral-bg)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-text-main)] mb-4">
              Featured Packages
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover our handpicked tours designed to give you the best experience of Bangladesh's natural beauty and rich heritage.
            </p>
          </div>
          <Link 
            href="/explore"
            className="text-[var(--color-primary)] font-medium hover:text-[var(--color-accent)] transition-colors shrink-0"
          >
            View All Packages &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PACKAGES.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-[var(--radius-card)] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={pkg.image} 
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-[var(--radius-button)] text-sm font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {pkg.rating} <span className="text-gray-500 font-normal text-xs">({pkg.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                  {pkg.location}
                </div>
                <h3 className="font-heading font-bold text-lg text-[var(--color-text-main)] mb-3 line-clamp-2">
                  {pkg.title}
                </h3>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 block">Starting from</span>
                    <span className="font-bold text-[var(--color-primary)] text-lg">
                      ৳{pkg.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                      <Clock className="w-4 h-4" />
                      {pkg.durationDays} Days
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/packages/${pkg.id}`}
                  className="mt-4 block w-full text-center py-2.5 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[var(--radius-button)] hover:bg-[var(--color-primary)] hover:text-white transition-colors font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
