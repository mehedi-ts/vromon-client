'use client';

import Link from 'next/link';
import { PackageCard } from '@/components/packages/PackageCard';

export function FeaturedDestinations({ packages = [] }: { packages?: any[] }) {

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
          {packages.length === 0 ? (
            <div className="col-span-4 text-center py-12 text-gray-500">
              Check back soon for amazing featured packages.
            </div>
          ) : (
            packages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
