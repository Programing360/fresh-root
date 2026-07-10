import FeaturesGrid from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Service";


export default function Home() {
  return (
    <div className="">
     <Hero></Hero>
     <FeaturesGrid></FeaturesGrid>
     <Services/>
    </div>
  );
}
