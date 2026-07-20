import { Hero } from "@/components/home/Hero";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { WhyVromonAI } from "@/components/home/WhyVromonAI";
import { PopularCategories } from "@/components/home/PopularCategories";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQ } from "@/components/home/FAQ";
import { CategoryChart } from "@/components/home/CategoryChart";

import { getPackages } from "@/lib/api/packages";

export default async function Home() {
  const [statsRes, featuredRes, hillRes, beachRes, advRes, herRes, cityRes] = await Promise.all([
    getPackages({ limit: 1 }).catch(() => null),
    getPackages({ limit: 4, sort: 'rating' }).catch(() => null),
    getPackages({ limit: 1, category: 'Hill' }).catch(() => null),
    getPackages({ limit: 1, category: 'Beach' }).catch(() => null),
    getPackages({ limit: 1, category: 'Adventure' }).catch(() => null),
    getPackages({ limit: 1, category: 'Heritage' }).catch(() => null),
    getPackages({ limit: 1, category: 'City' }).catch(() => null),
  ]);
  
  const totalPackages = statsRes?.total || 450;
  const featuredPackages = featuredRes?.data || [];

  const categoryData = [
    { name: 'Hill Tracks', count: hillRes?.total || 0, color: '#15803d' },
    { name: 'Coastal Beaches', count: beachRes?.total || 0, color: '#1d4ed8' },
    { name: 'Adventure', count: advRes?.total || 0, color: '#c2410c' },
    { name: 'Heritage Sites', count: herRes?.total || 0, color: '#44403c' },
    { name: 'City Tours', count: cityRes?.total || 0, color: '#7e22ce' }
  ];

  return (
    <>
      <Hero />
      <FeaturedDestinations packages={featuredPackages} />
      <WhyVromonAI />
      <PopularCategories />
      <CategoryChart data={categoryData} />
      <StatsBand totalPackages={totalPackages} />
      <Testimonials />
      {/* <Newsletter /> */}
      <FAQ />
    </>
  );
}
