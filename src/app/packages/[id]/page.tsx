'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Star, MapPin, Clock, Users, Calendar, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPackageById } from '@/lib/api/packages';
import { getReviews } from '@/lib/api/reviews';
import { addReview } from '@/lib/action/reviews';
import { PackageCard } from '@/components/packages/PackageCard';
import { getCurrentUser } from '@/lib/auth-client';

export default function PackageDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Review Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const { user } = getCurrentUser();
  const isLoggedIn = !!user;

  const { data: packageData, isLoading: isPackageLoading } = useQuery({
    queryKey: ['package', id],
    queryFn: () => getPackageById(id),
  });

  const { data: reviewsData } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getReviews(id),
  });

  const reviewMutation = useMutation({
    mutationFn: addReview,
    onSuccess: () => {
      setComment('');
      queryClient.invalidateQueries({ queryKey: ['reviews', id] });
      queryClient.invalidateQueries({ queryKey: ['package', id] });
    }
  });

  if (isPackageLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const pkg = packageData?.data;
  const related = (packageData as any)?.related || [];
  const reviews = reviewsData?.data || [];

  if (!pkg) {
    return <div className="min-h-screen flex items-center justify-center">Package not found.</div>;
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    reviewMutation.mutate({ packageId: id, rating, comment });
  };

  const handleChatShortcut = () => {
    router.push(`/chat?packageId=${id}&title=${encodeURIComponent(pkg.title)}`);
  };

  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen pb-24">
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
          <button 
            className="absolute top-6 right-6 text-white p-2 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="w-8 h-8" />
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setLightboxIndex((prev) => prev! > 0 ? prev! - 1 : pkg.images.length - 1)}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <img 
            src={pkg.images[lightboxIndex]} 
            alt="Gallery" 
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
          />
          
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/20 rounded-full transition-colors"
            onClick={() => setLightboxIndex((prev) => prev! < pkg.images.length - 1 ? prev! + 1 : 0)}
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}

      {/* Gallery Hero */}
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[500px]">
          <div 
            className="md:col-span-3 bg-gray-200 rounded-[var(--radius-card)] overflow-hidden cursor-pointer relative group"
            onClick={() => setLightboxIndex(0)}
          >
            <img src={pkg.images[0]} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="hidden md:flex flex-col gap-4">
            {pkg.images.slice(1, 3).map((img, idx) => (
              <div 
                key={idx} 
                className="flex-1 bg-gray-200 rounded-[var(--radius-card)] overflow-hidden cursor-pointer relative group"
                onClick={() => setLightboxIndex(idx + 1)}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
            {pkg.images.length > 3 && (
              <div 
                className="flex-1 bg-gray-800 rounded-[var(--radius-card)] overflow-hidden cursor-pointer relative flex items-center justify-center group"
                onClick={() => setLightboxIndex(3)}
              >
                <img src={pkg.images[3]} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-500" />
                <span className="relative text-white font-bold text-xl">+{pkg.images.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-8 flex flex-col lg:flex-row gap-8 relative">
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8">
            <div className="flex items-center gap-4 text-gray-500 mb-3">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[var(--color-accent)]" /> {pkg.location}</span>
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {pkg.rating.toFixed(1)}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[var(--color-text-main)] mb-4">{pkg.title}</h1>
            <p className="text-lg text-gray-600">{pkg.shortDescription}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-4 rounded-[var(--radius-card)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-[var(--color-primary)] mb-2" />
              <span className="text-sm text-gray-500">Duration</span>
              <span className="font-bold text-[var(--color-text-main)]">{pkg.durationDays} Days</span>
            </div>
            <div className="bg-white p-4 rounded-[var(--radius-card)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <Users className="w-6 h-6 text-[var(--color-primary)] mb-2" />
              <span className="text-sm text-gray-500">Group Size</span>
              <span className="font-bold text-[var(--color-text-main)]">Max 12</span>
            </div>
            <div className="bg-white p-4 rounded-[var(--radius-card)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-[var(--color-primary)] mb-2" />
              <span className="text-sm text-gray-500">Best Season</span>
              <span className="font-bold text-[var(--color-text-main)]">Oct - Mar</span>
            </div>
            <div className="bg-white p-4 rounded-[var(--radius-card)] border border-gray-100 flex flex-col items-center justify-center text-center">
              <MapPin className="w-6 h-6 text-[var(--color-primary)] mb-2" />
              <span className="text-sm text-gray-500">Category</span>
              <span className="font-bold text-[var(--color-text-main)]">{pkg.category}</span>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text-main)] mb-4">Overview</h2>
            <div className="prose max-w-none text-gray-600 leading-relaxed">
              {pkg.fullDescription}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text-main)] mb-6">Itinerary</h2>
            <div className="space-y-6">
              {pkg.itinerary.map((day: any) => (
                <div key={day.day} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold font-heading shrink-0 z-10">
                      {day.day}
                    </div>
                    <div className="w-0.5 h-full bg-gray-200 mt-2 -mb-6 last:hidden"></div>
                  </div>
                  <div className="bg-white p-6 rounded-[var(--radius-card)] shadow-sm border border-gray-100 flex-1">
                    <h3 className="font-bold text-[var(--color-text-main)] text-lg mb-2">{day.title}</h3>
                    <p className="text-gray-600">{day.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-[var(--color-text-main)] mb-6">Reviews ({reviews.length})</h2>
            
            {/* Review Form */}
            {isLoggedIn ? (
              <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-[var(--radius-card)] shadow-sm border border-gray-100 mb-8">
                <h4 className="font-bold text-gray-700 mb-4">Leave a Review</h4>
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star} 
                      type="button" 
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
                <textarea 
                  className="w-full border border-gray-200 rounded-[var(--radius-button)] p-4 outline-none focus:ring-2 focus:ring-[var(--color-primary)] mb-4"
                  rows={4}
                  placeholder="Share your experience..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  disabled={reviewMutation.isPending}
                  className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-button)] font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <div className="bg-[var(--color-primary)]/10 p-6 rounded-[var(--radius-card)] mb-8 flex items-center justify-between border border-[var(--color-primary)]/20">
                <span className="text-[var(--color-primary)] font-medium">Please log in to share your experience.</span>
                <button className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-[var(--radius-button)] font-medium">Log In</button>
              </div>
            )}

            <div className="space-y-4">
              {reviews.map((review: any) => (
                <div key={review._id} className="bg-white p-6 rounded-[var(--radius-card)] border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500 uppercase">
                      {review.userId.substring(0, 2)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--color-text-main)]">User {review.userId.substring(0, 5)}...</div>
                      <div className="flex text-yellow-500">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}
            </div>
          </div>
        </div>

        {/* Sticky Booking Card */}
        <div className="w-full lg:w-96 shrink-0 relative">
          <div className="sticky top-24 bg-white p-8 rounded-[var(--radius-card)] shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-500 mb-2 uppercase tracking-wide text-sm">Total Price</h3>
            <div className="text-4xl font-heading font-bold text-[var(--color-primary)] mb-6">
              ৳{pkg.price.toLocaleString()}
            </div>
            
            <button 
              onClick={handleChatShortcut}
              className="w-full bg-[var(--color-accent)] text-white py-4 rounded-[var(--radius-button)] font-bold hover:scale-[1.02] transition-transform shadow-md flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="w-5 h-5" />
              Ask AI about this trip
            </button>
            <button className="w-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] py-4 rounded-[var(--radius-button)] font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
              Book Now
            </button>
            
            <div className="mt-6 pt-6 border-t border-gray-100 text-sm text-gray-500 flex flex-col gap-2">
              <div className="flex justify-between"><span>Base Price</span> <span>৳{pkg.price.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Service Fee</span> <span>৳500</span></div>
              <div className="flex justify-between font-bold text-[var(--color-text-main)] pt-2 border-t border-gray-100">
                <span>Total</span> <span>৳{(pkg.price + 500).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Destinations */}
      {related.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-3xl font-heading font-bold text-[var(--color-text-main)] mb-8">Similar Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((rel: any) => (
              <PackageCard key={rel._id} pkg={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
