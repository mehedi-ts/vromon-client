'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    question: "How does the AI Trip Planner work?",
    answer: "Our AI assistant uses natural language processing to understand your preferences, budget, and travel style. It then queries our verified database of Bangladesh destinations to instantly create a customized itinerary just for you."
  },
  {
    question: "Are the packages customizable?",
    answer: "Absolutely! Once the AI generates a base itinerary, you can chat with it to add or remove specific activities, change hotels, or adjust the duration of your stay."
  },
  {
    question: "How do you guarantee the best prices?",
    answer: "We partner directly with local tour operators and hotels across Bangladesh, cutting out middlemen. This allows us to offer you exclusive rates that you won't find anywhere else."
  },
  {
    question: "Is it safe to book through Vromon AI?",
    answer: "Yes, security is our top priority. All our listed operators undergo a strict verification process, and your payments are processed through secure, encrypted gateways."
  },
  {
    question: "Can I get a refund if I need to cancel?",
    answer: "Cancellation policies vary by package, but most offer full refunds if cancelled at least 7 days before the trip. You can view the specific cancellation policy on each package details page."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[var(--color-neutral-bg)]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-text-main)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about booking with Vromon AI.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={cn(
                  "bg-white rounded-[var(--radius-card)] shadow-sm overflow-hidden transition-colors border",
                  isOpen ? "border-[var(--color-primary)]" : "border-transparent"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={cn(
                    "font-bold font-heading text-lg transition-colors",
                    isOpen ? "text-[var(--color-primary)]" : "text-[var(--color-text-main)]"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-gray-400 transition-transform duration-300 shrink-0",
                      isOpen && "rotate-180 text-[var(--color-primary)]"
                    )} 
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
