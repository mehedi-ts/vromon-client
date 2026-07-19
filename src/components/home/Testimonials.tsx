import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: "Anika Rahman",
    role: "Solo Traveler",
    text: "Vromon AI made my trip to Sajek Valley completely stress-free. The AI assistant suggested the perfect 3-day itinerary and the local guides were amazing.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    name: "Hasan Mahmud",
    role: "Family Vacation",
    text: "Booking our family trip to Cox's Bazar was a breeze. We got the best ocean-view resort at a price lower than any other platform. Highly recommended!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    name: "Sarah Jenkins",
    role: "Adventure Enthusiast",
    text: "The Sundarbans wildlife tour exceeded all expectations. Everything was perfectly organized from Dhaka to the deep forest. The AI recommendations were spot on.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="font-heading text-3xl md:text-4xl text-[var(--color-text-main)] mb-12 text-center">
          What Our Travelers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-[var(--color-neutral-bg)] p-8 rounded-[var(--radius-card)] relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-200" />
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic relative z-10">
                "{review.text}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-[var(--color-text-main)]">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
