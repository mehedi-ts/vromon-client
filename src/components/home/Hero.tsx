'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DESTINATIONS = [
  {
    id: 1,
    name: "Cox's Bazar",
    image: "https://images.unsplash.com/photo-1600984534125-9626359f5b24?q=80&w=2000&auto=format&fit=crop",
    subtitle: "The Longest Sea Beach in the World"
  },
  {
    id: 2,
    name: "Sajek Valley",
    image: "https://images.unsplash.com/photo-1627838561849-041793796fc7?q=80&w=2000&auto=format&fit=crop",
    subtitle: "Above the Clouds in the Hill Tracts"
  },
  {
    id: 3,
    name: "Sylhet Tea Gardens",
    image: "https://images.unsplash.com/photo-1594921966205-02102e3b2e35?q=80&w=2000&auto=format&fit=crop",
    subtitle: "Lush Greenery & Serene Landscapes"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % DESTINATIONS.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + DESTINATIONS.length) % DESTINATIONS.length);

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${DESTINATIONS[currentIndex].image}')` }}
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 text-center">
        <motion.h1 
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg"
        >
          {DESTINATIONS[currentIndex].name}
        </motion.h1>
        <motion.p 
          key={`subtitle-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-200 mb-12 drop-shadow-md max-w-2xl"
        >
          {DESTINATIONS[currentIndex].subtitle}
        </motion.p>

        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white p-2 rounded-[var(--radius-card)] shadow-lg flex flex-col sm:flex-row gap-2 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex items-center bg-[var(--color-neutral-bg)] rounded-[var(--radius-button)] px-4">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Where do you want to go in Bangladesh?"
              className="w-full bg-transparent border-none outline-none py-4 px-3 text-[var(--color-text-main)] placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button 
            onClick={handleSearch}
            className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>

        {/* AI CTA */}
        <button 
          onClick={() => router.push('/chat')}
          className="flex items-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 rounded-[var(--radius-button)] font-medium hover:scale-105 transition-transform shadow-md"
        >
          <Sparkles className="w-5 h-5" />
          Plan My Trip with AI
        </button>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors z-20 hidden md:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-sm transition-colors z-20 hidden md:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {DESTINATIONS.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${idx === currentIndex ? 'bg-[var(--color-accent)]' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
