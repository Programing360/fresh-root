import Blogs from "@/components/sections/Blogs";
import CallToAction from "@/components/sections/CallToAction";
import Categories from "@/components/sections/Categories";
import FAQ from "@/components/sections/FAQ";
import FeaturesGrid from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import Newsletter from "@/components/sections/Newsletter";
import Services from "@/components/sections/Service";
import Statistics from "@/components/sections/Statistics";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {

  

  return (
    <div className="">
      <Hero></Hero>
      <FeaturesGrid></FeaturesGrid>
      <Blogs />
      <Services />
      <Categories />
      <Highlights />
      <Statistics />
      <Testimonials />
      <Newsletter />
      <FAQ />
      <CallToAction />
      
    </div>
  );
}
