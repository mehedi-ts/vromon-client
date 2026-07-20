'use client';

import { useState, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { PackageFilters, PackagesResponse } from '@/lib/api/packages';
import { apiClient } from '@/lib/apiClient';
import { useDebounce } from '@/hooks/use-debounce';
import { PackageCard, PackageCardSkeleton } from '@/components/packages/PackageCard';

const CATEGORIES = ['Hill', 'Beach', 'Adventure', 'Heritage', 'City'];
const SORTS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Highest Rated', value: 'rating' }
];

async function getPackagesClient(filters: PackageFilters = {}): Promise<PackagesResponse> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '') params.append(key, String(value));
  });
  const queryString = params.toString() ? `?${params.toString()}` : '';
  return apiClient<PackagesResponse>(`/api/packages${queryString}`);
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  
  const [filters, setFilters] = useState<PackageFilters>({
    sort: 'newest',
    category: '',
    minPrice: '',
    maxPrice: '',
    minDuration: '',
    maxDuration: '',
    minRating: ''
  });

  const [packages, setPackages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const { ref, inView } = useInView();

  const loadPackages = async (pageNum: number, isReset: boolean) => {
    if (pageNum === 1) setIsLoading(true);
    else setIsFetchingNextPage(true);

    try {
      const res = await getPackagesClient({ ...filters, search: debouncedSearch, page: pageNum, limit: 12 });
      if (res.success) {
        setPackages(prev => isReset ? res.data : [...prev, ...res.data]);
        setTotalCount(res.total);
        
        const maxPages = Math.ceil(res.total / res.limit);
        setHasNextPage(pageNum < maxPages);
        setPage(pageNum);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsFetchingNextPage(false);
    }
  };

  useEffect(() => {
    loadPackages(1, true);
  }, [filters, debouncedSearch]);

  useEffect(() => {
    if (inView && hasNextPage && !isLoading && !isFetchingNextPage) {
      loadPackages(page + 1, false);
    }
  }, [inView, hasNextPage, isLoading, isFetchingNextPage, page]);

  const handleFilterChange = (key: keyof PackageFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilters({ sort: 'newest', category: '', minPrice: '', maxPrice: '', minDuration: '', maxDuration: '', minRating: '' });
  };



  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-[var(--radius-card)] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-bold flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </h3>
              <button onClick={clearFilters} className="text-xs text-[var(--color-accent)] hover:underline">Clear All</button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Category</h4>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" name="category" 
                    checked={filters.category === ''}
                    onChange={() => handleFilterChange('category', '')}
                    className="accent-[var(--color-primary)]"
                  />
                  <span className="text-sm text-gray-600">All Categories</span>
                </label>
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" name="category" 
                      checked={filters.category === cat}
                      onChange={() => handleFilterChange('category', cat)}
                      className="accent-[var(--color-primary)]"
                    />
                    <span className="text-sm text-gray-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Price Range (৳)</h4>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="w-full p-2 text-sm border rounded"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="w-full p-2 text-sm border rounded"
                />
              </div>
            </div>

            {/* Duration Filter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Duration (Days)</h4>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  placeholder="Min" 
                  value={filters.minDuration}
                  onChange={(e) => handleFilterChange('minDuration', e.target.value)}
                  className="w-full p-2 text-sm border rounded"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  value={filters.maxDuration}
                  onChange={(e) => handleFilterChange('maxDuration', e.target.value)}
                  className="w-full p-2 text-sm border rounded"
                />
              </div>
            </div>
            
            {/* Rating Filter */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Minimum Rating</h4>
              <select 
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
                className="w-full p-2 text-sm border rounded outline-none"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5 & up</option>
                <option value="4.0">4.0 & up</option>
                <option value="3.5">3.5 & up</option>
              </select>
            </div>

          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Bar: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Search destinations or packages..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-button)] border-none shadow-sm focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
              />
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-sm text-gray-500 font-medium">
                {totalCount} Packages Found
              </div>
              <div className="relative">
                <select 
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-[var(--radius-button)] pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
                >
                  {SORTS.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <PackageCardSkeleton key={i} />)
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))
            ) : null}
            
            {isFetchingNextPage && (
              Array.from({ length: 4 }).map((_, i) => <PackageCardSkeleton key={`loading-${i}`} />)
            )}
          </div>
          
          {/* Empty State */}
          {!isLoading && packages.length === 0 && (
            <div className="bg-white rounded-[var(--radius-card)] p-12 text-center shadow-sm">
              <h3 className="text-xl font-bold text-gray-700 mb-2">No packages found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                className="mt-6 px-6 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-button)] hover:opacity-90"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Infinite Scroll Trigger */}
          <div ref={ref} className="h-10 w-full mt-8" />
        </div>
      </div>
    </div>
  );
}
