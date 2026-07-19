'use client';

export function Newsletter() {
  return (
    <section className="py-24 bg-[var(--color-primary)] text-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-accent)]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Get Travel Inspiration Delivered
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl">
            Subscribe to our newsletter for exclusive deals, early access to new AI features, and the best travel tips for Bangladesh.
          </p>
          
          <form 
            className="w-full flex flex-col sm:flex-row gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-[var(--radius-button)] text-[var(--color-text-main)] outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-shadow"
              required
            />
            <button 
              type="submit"
              className="bg-[var(--color-accent)] text-white px-8 py-4 rounded-[var(--radius-button)] font-bold hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
