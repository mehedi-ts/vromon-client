import { Hero } from "@/components/home/Hero";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { WhyVromonAI } from "@/components/home/WhyVromonAI";
import { PopularCategories } from "@/components/home/PopularCategories";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQ } from "@/components/home/FAQ";

import { getPackages } from "@/lib/api/packages";

export default async function Home() {
  const [statsRes, featuredRes] = await Promise.all([
    getPackages({ limit: 1 }).catch(() => null),
    getPackages({ limit: 4, sort: 'rating' }).catch(() => null)
  ]);
  const totalPackages = statsRes?.total || 450;
  const featuredPackages = featuredRes?.data || [];

  return (
    <>
      <Hero />
      <FeaturedDestinations packages={featuredPackages} />
      <WhyVromonAI />
      <PopularCategories />
      <StatsBand totalPackages={totalPackages} />
      <Testimonials />
      <Newsletter />
      <FAQ />
    </>
  );
}
