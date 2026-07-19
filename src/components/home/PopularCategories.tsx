import Link from 'next/link';
import { Mountain, Waves, Tent, Castle, Building2, ArrowRight } from 'lucide-react';

const CATEGORIES = [
  { name: 'Hill Tracks', icon: Mountain, type: 'Hill', color: 'bg-green-100 text-green-700' },
  { name: 'Coastal Beaches', icon: Waves, type: 'Beach', color: 'bg-blue-100 text-blue-700' },
  { name: 'Adventure', icon: Tent, type: 'Adventure', color: 'bg-orange-100 text-orange-700' },
  { name: 'Heritage Sites', icon: Castle, type: 'Heritage', color: 'bg-stone-100 text-stone-700' },
  { name: 'City Tours', icon: Building2, type: 'City', color: 'bg-purple-100 text-purple-700' }
];

export function PopularCategories() {
  return (
    <section className="py-24 bg-[var(--color-neutral-bg)]">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-text-main)] mb-12 text-center">
          Popular Travel Styles
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.type}
              href={`/explore?category=${cat.type}`}
              className="bg-white p-6 rounded-[var(--radius-card)] shadow-sm hover:shadow-md transition-all group flex flex-col items-center text-center hover:-translate-y-1"
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${cat.color}`}>
                <cat.icon className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[var(--color-text-main)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                {cat.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                Explore <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
