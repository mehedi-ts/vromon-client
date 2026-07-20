'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Search, Sparkles, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const DESTINATIONS = [
  {
    id: 1,
    name: "Cox's Bazar",
    image: "https://i.ibb.co.com/7xk0PCbK/coxs-bazar-sunset-1024x461.jpg",
    subtitle: "The Longest Sea Beach in the World"
  },
  {
    id: 2,
    name: "Sajek Valley",
    image: "https://i.ibb.co.com/XrjZWBbz/582124497-1354066173077620-7258115305832709717-n.jpg",
    subtitle: "Above the Clouds in the Hill Tracts"
  },
  {
    id: 3,
    name: "Sylhet Tea Gardens",
    image: "https://i.ibb.co.com/fYxPMq5N/Qw-RY54-Li1-HMw-D7o-Nfof-ULc-MANs6-KOsk-Zvswqg-Fsn-YP.webp",
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
    }, 10000);
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={DESTINATIONS[currentIndex].image}
                alt={DESTINATIONS[currentIndex].name}
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </div>
          {/* Dark overlay for text readability (50%) */}
          <div className="absolute inset-0 bg-black/50" />
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-2 w-full max-w-2xl justify-center">
          <button 
            onClick={() => router.push('/explore')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-[var(--radius-button)] font-medium hover:bg-opacity-90 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] transition-all shadow-lg"
          >
            <Map className="w-5 h-5" />
            Explore Destinations
          </button>
          
          <button 
            onClick={() => router.push('/chat')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-[var(--radius-button)] font-medium hover:bg-white/20 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
            Plan Trip with AI
          </button>
        </div>
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
