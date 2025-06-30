import Hero from "@/components/landing-page/hero";
import React from "react";
import Features from "../../components/landing-page/features";
import AboutUs from "@/components/landing-page/about";
import Reviews from "@/components/landing-page/reviews";
import CallToAction from "@/components/landing-page/cta";

const page = () => {
  return (
    <main className="w-full px-8 md:px-36 xl:px-48">
      <Hero />
      <Features />
      <AboutUs />
      <CallToAction />
      <Reviews />
    </main>
  );
};

export default page;
