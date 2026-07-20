import { Metadata } from 'next';
import { Compass, Users, Globe, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Vromon AI',
  description: 'Learn more about Vromon AI, your intelligent travel companion.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-neutral-bg)]">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary)] text-white py-20 px-4 md:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">Redefining the Way You Travel</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Vromon AI combines artificial intelligence with human curation to deliver the most personalized, seamless, and unforgettable travel experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-8 py-16 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-main)] mb-6 font-heading">Our Mission</h2>
            <p className="text-[var(--color-text-light)] text-lg leading-relaxed mb-4">
              At Vromon AI, we believe that traveling should be about discovery and joy, not endless planning and logistics. We built this platform to simplify the complex world of travel booking by leveraging next-generation AI.
            </p>
            <p className="text-[var(--color-text-light)] text-lg leading-relaxed">
              Whether you are looking for a weekend getaway or a month-long expedition, our intelligent assistant helps you find exactly what you are looking for, curated by experts and tailored to your preferences.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl relative aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
              alt="Travelers looking at a map" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Features Grid */}
        <h2 className="text-3xl font-bold text-center text-[var(--color-text-main)] mb-12 font-heading">Why Choose Us?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Compass className="w-8 h-8 text-[var(--color-accent)]" />,
              title: "AI-Powered",
              desc: "Smart recommendations tailored to your exact travel style."
            },
            {
              icon: <Globe className="w-8 h-8 text-[var(--color-accent)]" />,
              title: "Global Reach",
              desc: "Thousands of verified packages across hundreds of destinations."
            },
            {
              icon: <Users className="w-8 h-8 text-[var(--color-accent)]" />,
              title: "Community Driven",
              desc: "Honest reviews and ratings from real travelers worldwide."
            },
            {
              icon: <Shield className="w-8 h-8 text-[var(--color-accent)]" />,
              title: "Secure Booking",
              desc: "Your data and transactions are protected by industry-leading security."
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-main)] mb-3">{feature.title}</h3>
              <p className="text-[var(--color-text-light)] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
