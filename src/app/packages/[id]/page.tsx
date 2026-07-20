import { getPackageById } from '@/lib/api/packages';
import { getReviews } from '@/lib/api/reviews';
import PackageDetailsClient from './PackageDetailsClient';
import { getServerUser } from '@/lib/auth';

export default async function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // We can fetch data in parallel
  const [packageRes, reviewsRes, user] = await Promise.all([
    getPackageById(id).catch(() => null),
    getReviews(id).catch(() => null),
    getServerUser()
  ]);

  const pkg = packageRes?.data;
  const related = (packageRes as any)?.related || [];
  const reviews = reviewsRes?.data || [];

  if (!pkg) {
    return <div className="min-h-screen flex items-center justify-center">Package not found.</div>;
  }

  return (
    <PackageDetailsClient 
      pkg={pkg} 
      related={related} 
      initialReviews={reviews} 
      isLoggedIn={!!user} 
    />
  );
}
