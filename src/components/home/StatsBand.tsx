'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

function Counter({ value, isFloat = false }: { value: number, isFloat?: boolean }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : Math.floor(count).toLocaleString()}
    </span>
  );
}

export function StatsBand({ totalPackages = 450 }: { totalPackages?: number }) {

  const STATS = useMemo(() => [
    { label: "Destinations Listed", value: totalPackages, suffix: "+" },
    { label: "Happy Travelers", value: 12000, suffix: "+" },
    { label: "Average Rating", value: 4.8, suffix: "/5", isFloat: true },
    { label: "AI Chats Answered", value: 50000, suffix: "+" }
  ], [totalPackages]);

  return (
    <section className="py-20 bg-[var(--color-primary)] text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-white/20">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={`${stat.label}-${stat.value}`} // Force re-render if value changes
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl md:text-5xl font-heading font-bold text-[var(--color-accent)] mb-2">
                <Counter value={stat.value} isFloat={stat.isFloat} />
                {stat.suffix}
              </div>
              <div className="text-gray-300 font-medium tracking-wide text-sm md:text-base uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
