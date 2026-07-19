import Link from 'next/link';
import { Star, MapPin, Clock } from 'lucide-react';
import { Package } from '@/lib/schemas';

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border border-gray-100">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img 
          src={pkg.images[0]} 
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-[var(--radius-button)] text-sm font-bold flex items-center gap-1 shadow-sm">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          {pkg.rating.toFixed(1)}
        </div>
      </div>

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
          href={`/packages/${pkg._id}`}
          className="mt-4 block w-full text-center py-2.5 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[var(--radius-button)] hover:bg-[var(--color-primary)] hover:text-white transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="bg-white rounded-[var(--radius-card)] overflow-hidden shadow-sm flex flex-col h-full border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-5 flex flex-col flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-4"></div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        
        <div className="mt-4 h-11 bg-gray-200 rounded-[var(--radius-button)] w-full"></div>
      </div>
    </div>
  );
}
