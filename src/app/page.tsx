import { Hero } from "@/components/home/Hero";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { WhyVromonAI } from "@/components/home/WhyVromonAI";
import { PopularCategories } from "@/components/home/PopularCategories";
import { StatsBand } from "@/components/home/StatsBand";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <WhyVromonAI />
      <PopularCategories />
      <StatsBand />
      <Testimonials />
      <Newsletter />
      <FAQ />
    </>
  );
}
