"use client";

import { useEffect, useRef } from "react";
import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { CheckCircle2, Leaf, ShieldCheck, Award, Users } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

// স্ট্যাটস ডেটা
const STATS = [
  { id: 1, value: "100%", label: "Organic & Pure" },
  { id: 2, value: "15K+", label: "Happy Customers" },
  { id: 3, value: "25+", label: "Local Eco-Farms" },
  { id: 4, value: "0%", label: "Chemicals Used" },
];

// কোর ভ্যালুজ ডেটা
const VALUES = [
  {
    id: 1,
    icon: <Leaf className="text-emerald-500" size={24} />,
    title: "100% Organic Farmed",
    desc: "We collect fruits, honey, ghee, and veggies directly from certified eco-farms under strict quality control.",
  },
  {
    id: 2,
    icon: <ShieldCheck className="text-emerald-500" size={24} />,
    title: "Absolute Purity Guaranteed",
    desc: "Zero preservatives, zero synthetic colors. Every single bottle is 100% genuine and bio-certified.",
  },
  {
    id: 3,
    icon: <Award className="text-emerald-500" size={24} />,
    title: "Award Winning Care",
    desc: "Recognized nationally for sustainable packaging and delivering fresh, health-centric premium foods.",
  },
];

export default function AboutPage() {
  const leafRef1 = useRef<HTMLDivElement>(null);
  const leafRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // GSAP Background floating leaves animation
    if (leafRef1.current && leafRef2.current) {
      gsap.to(leafRef1.current, {
        y: 15,
        rotation: 12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(leafRef2.current, {
        y: -20,
        rotation: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <main className="w-full min-h-screen pt-30 bg-[#f8f9fa] dark:bg-[#0b0f19] text-slate-950 dark:text-white transition-colors duration-300 py-16 px-6 relative overflow-hidden">
      
      {/* GSAP Decorative Shapes */}
      <div ref={leafRef1} className="absolute top-24 left-10 w-4 h-4 rounded-full bg-emerald-400/60 pointer-events-none" />
      <div ref={leafRef2} className="absolute bottom-1/3 right-12 w-3 h-3 rounded-full bg-orange-400/60 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        
        {/* SECTION 1: HERO TITLE (Framer Motion) */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold uppercase tracking-wider"
          >
            Our Story
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            Serving Health & <span className="text-[#ff7a45] dark:text-[#ff9266]">Purity</span> Every Day
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed"
          >
            We believe that healthy food should not be a luxury. Organio bridges the gap between traditional organic eco-farms and your modern lifestyle.
          </motion.p>
        </section>

        {/* SECTION 2: GRID CONTENT (AOS & Custom Oval Bottom Shadow) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Premium Showcase Image with custom Oval Shadow */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative" data-aos="fade-right">
            <div data-aos="fade-right" className="relative w-full aspect-square max-w-[400px] ">
              <Image
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80"
                alt="Fresh Eco Farm Harvest"
                fill
                priority
                className="object-cover rounded-3xl"
              />
            </div>
            {/* Custom Oval Drop Shadow matching the banner style */}
            <div className="w-[75%] h-4 bg-black/10 dark:bg-black/40 blur-md rounded-full mt-4 pointer-events-none" />
          </div>

          {/* Right Side: Detailed Story & Checklist */}
          <div data-aos="fade-left" className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Why We Started Organio?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              In a world full of artificial flavors and toxic chemical additions, finding 100% pure groceries, genuine raw honey, or traditional grass-fed cow ghee has become an endless challenge. 
            </p>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Organio was founded to secure your daily nutrition. We closely monitor the extraction, processing, and premium packaging stages to preserve the authentic nature of every ingredient.
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "Direct sourcing from fields",
                "Strict bio-chemical tests",
                "Eco-friendly hygiene packaging",
                "Supporting local eco-farmers"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2.5 font-semibold text-sm">
                  <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: COUNTER / STATS (AOS Component) */}
        <section className="w-full bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/60 rounded-3xl p-8 md:p-12 shadow-sm" data-aos="zoom-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {STATS.map((stat) => (
              <div key={stat.id} className="space-y-1">
                <div className="text-3xl md:text-5xl font-black text-[#ff7a45] dark:text-[#ff9266]">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CORE VALUES (Hero UI Card + AOS Hover Effects) */}
        <section className="space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Our Core Values</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">The foundational pillars that guide our workflow and premium services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value) => (
              <Card 
                key={value.id} 
                className="bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/40 shadow-none rounded-2xl p-3"
                data-aos="fade-up"
                data-aos-delay={value.id * 100}
              >
                <div className="space-y-4 items-start">
                  <div className="p-3 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold">{value.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    {value.desc}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* SECTION 5: CALL TO ACTION */}
        <section className="text-center py-8" data-aos="fade-up">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to Taste Real Pure Nutrition?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Explore our exclusive product gallery and make a healthy switch today.
            </p>
            <Link href={'/shop'}>
                <Button
              size="lg"
              className="bg-[#ff7a45] hover:bg-[#ff662b] text-white font-bold rounded-xl px-8 py-6 shadow-md shadow-orange-500/10 dark:shadow-none transition-all duration-300 text-base"
            >
              Explore Products
            </Button>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}