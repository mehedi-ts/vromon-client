'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircleQuestion } from 'lucide-react';

const faqs = [
  {
    question: "How does Vromon AI recommend travel packages?",
    answer: "Our intelligent Chat Assistant analyzes your requests using advanced natural language processing. It cross-references your preferences with our database of curated travel packages to suggest the perfect match based on destination, budget, duration, and activities."
  },
  {
    question: "Are the travel packages verified?",
    answer: "Yes, every package listed on Vromon AI undergoes a thorough vetting process. We ensure that our partners and hosts meet our high standards for safety, quality, and accuracy before their packages are made public."
  },
  {
    question: "Can I list my own travel package on the platform?",
    answer: "Absolutely! Once you create an account, you can use the 'Add Package' feature to submit your own curated travel experiences. You'll be able to manage them directly from your dashboard."
  },
  {
    question: "Is there a fee for using the Chat Assistant?",
    answer: "No, the Vromon AI Chat Assistant is completely free for all registered users. You can chat as much as you need to find the perfect itinerary."
  },
  {
    question: "How do I contact customer support if I have an issue?",
    answer: "You can reach out to our support team via the Contact page. We aim to respond to all inquiries within 24 hours to ensure your travel plans go smoothly."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-bg)] py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--color-primary)]">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold font-heading text-[var(--color-text-main)] mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-[var(--color-text-light)]">
            Everything you need to know about Vromon AI and how to use our platform.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`bg-white border ${isOpen ? 'border-[var(--color-primary)] shadow-md' : 'border-gray-200 shadow-sm'} rounded-xl overflow-hidden transition-all duration-200`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-main)]'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 p-1 rounded-full ${isOpen ? 'bg-blue-50 text-[var(--color-primary)]' : 'text-gray-400'}`}>
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[var(--color-text-light)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-2">Still have questions?</h3>
          <p className="text-[var(--color-text-light)] mb-6">We're here to help you build the perfect trip.</p>
          <a href="/contact" className="inline-block bg-[var(--color-primary)] hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-[var(--radius-button)] transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
