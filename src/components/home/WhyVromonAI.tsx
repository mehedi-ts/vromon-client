import { Sparkles, ShieldCheck, Tag } from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI-Powered Trip Planning",
    description: "Tell our smart assistant what you like, and we'll craft the perfect itinerary instantly. No more endless searching.",
    color: "text-purple-500",
    bgColor: "bg-purple-100"
  },
  {
    icon: ShieldCheck,
    title: "Verified Packages",
    description: "Every tour and package is verified by our team. Travel with confidence knowing you're in safe hands.",
    color: "text-[var(--color-primary)]",
    bgColor: "bg-blue-100"
  },
  {
    icon: Tag,
    title: "Best Price Guarantee",
    description: "We work directly with local operators to ensure you get the most authentic experiences at the best possible prices.",
    color: "text-[var(--color-accent)]",
    bgColor: "bg-orange-100"
  }
];

export function WhyVromonAI() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-text-main)] mb-4">
          Why Choose Vromon AI?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          We combine the latest AI technology with local expertise to make planning your trip to Bangladesh effortless and memorable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${feature.bgColor}`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="font-heading font-bold text-xl text-[var(--color-text-main)] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
