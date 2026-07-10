"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, ShieldCheck, Truck, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeatureItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge: string;
}

export default function FeaturesGrid(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const features: FeatureItem[] = [
    {
      id: 1,
      icon: Leaf,
      title: "100% Organic Certified",
      description: "Directly sourced from pristine local farms that prioritize sustainability and nutrient-rich soil health.",
      badge: "Pure Nature",
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: "Premium Quality Control",
      description: "Every item undergoes multi-tier freshness inspections before being hand-packed into eco-friendly parcels.",
      badge: "Guaranteed",
    },
    {
      id: 3,
      icon: Truck,
      title: "Zero-Emission Delivery",
      description: "Fast, chilled logistics that preserve the crisp integrity of your items while maintaining a neutral carbon footprint.",
      badge: "Eco-Express",
    },
    {
      id: 4,
      icon: Zap,
      title: "Instant Farm-to-Table",
      description: "Harvested at dawn, packaged with precision, and dispatched directly to your doorstep in less than 24 hours.",
      badge: "Ultra Fresh",
    },
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current!.children,
        { 
          y: 40, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-24 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <motion.span
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full"
          >
            Why freshRoot
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 leading-[1.15] text-neutral-900 dark:text-neutral-50"
          >
            We set the standard for premium, <br className="hidden sm:inline" />
            uncompromised organic grocery.
          </motion.h2>
        </div>

        {/* Features Interactive Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="group relative flex flex-col justify-between p-8 rounded-[28px] border border-neutral-300/60 dark:border-neutral-800/60 bg-white/40 dark:bg-[#141614]/30 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_22px_45px_rgba(0,0,0,0.4)] hover:bg-white/90 dark:hover:bg-[#161916]/80 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Decorative Premium Glow Back-layer behind the glass */}
                <div className="absolute -right-12 -top-12 w-24 h-24 rounded-full bg-emerald-500/5 blur-xl group-hover:bg-emerald-500/10 transition-colors duration-500 pointer-events-none" />

                <div>
                  {/* Icon Wrapper with explicit hover states */}
                  <div className="w-14 h-14 rounded-2xl bg-emerald-700/10 dark:bg-emerald-400/10 flex items-center justify-center mb-8 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-500 ease-out shadow-sm">
                    <IconComponent className="w-6 h-6 text-emerald-700 dark:text-emerald-400 group-hover:text-white dark:group-hover:text-[#0e100e] group-hover:scale-110 transition-all duration-500 ease-out" />
                  </div>

                  {/* Core Typography - Fixed High Contrast in Light Mode */}
                  <h3 className="text-xl font-bold tracking-tight mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-[14px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed mb-6 group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Tag Element */}
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-200/40 dark:border-neutral-800/40">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 transition-colors duration-300">
                    {feature.badge}
                  </span>
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-emerald-600 dark:text-emerald-400 font-bold transition-all duration-500 text-base">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}