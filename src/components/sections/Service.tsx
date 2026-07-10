"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShoppingBasket, HeartPulse, RefreshCw, Sparkles, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  tag: string;
  gradient: string;
}

export default function Services(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  const services: ServiceItem[] = [
    {
      id: 1,
      icon: ShoppingBasket,
      title: "Customized Organic Baskets",
      description: "Build a bespoke weekly subscription box tailored perfectly to your family's dynamic nutritional goals and recipes.",
      tag: "Bespoke Curation",
      gradient: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: 2,
      icon: HeartPulse,
      title: "Nutritionist Consultations",
      description: "Connect with certified plant-based dietary specialists to optimize your meal plans using seasonal raw ingredients.",
      tag: "Wellness Guide",
      gradient: "from-green-500/20 to-lime-500/20",
    },
    {
      id: 3,
      icon: RefreshCw,
      title: "Smart Eco-Replenishment",
      description: "Never run out of pure staples. Our intelligent auto-ship engine replenishes kitchen essentials based on consumption.",
      tag: "Automation",
      gradient: "from-teal-500/20 to-cyan-500/20",
    },
    {
      id: 4,
      icon: Sparkles,
      title: "Wholesale Hospitality Supply",
      description: "Premium culinary sourcing solutions for high-end organic restaurants, juice venues, and local artisanal bakeries.",
      tag: "Enterprise B2B",
      gradient: "from-emerald-600/20 to-green-600/20",
    },
  ];

  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Premium cascading entrance reveal on scroll
      gsap.fromTo(
        cardsContainerRef.current!.children,
        { 
          y: 60, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full"
            >
              Our Offerings
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 leading-[1.15] text-neutral-900 dark:text-neutral-50"
            >
              Premium services crafted for <br />
              the mindful consumer.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm text-neutral-600 dark:text-neutral-400 font-medium text-sm sm:text-base leading-relaxed"
          >
            Beyond delivering fresh ingredients, we build comprehensive wellness systems that enrich your healthy lifestyle journey.
          </motion.p>
        </div>

        {/* Services High-End Glassmorphic Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service) => {
            const IconElement = service.icon;
            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-[32px] border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] hover:bg-white/80 dark:hover:bg-[#161a16]/70 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Back-layer Ambient Dynamic Glass Glow Color */}
                <div className={`absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-gradient-to-tr ${service.gradient} opacity-40 blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none`} />

                <div>
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-2xl bg-emerald-700/10 dark:bg-emerald-400/10 flex items-center justify-center group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-all duration-500 shadow-sm">
                      <IconElement className="w-6 h-6 text-emerald-700 dark:text-emerald-400 group-hover:text-white dark:group-hover:text-[#0e100e] group-hover:rotate-6 transition-all duration-500" />
                    </div>
                    
                    {/* Tiny visual callout anchor */}
                    <div className="w-10 h-10 rounded-full border border-neutral-300/60 dark:border-neutral-800/60 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-500">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Core Copy Content */}
                  <h3 className="text-2xl font-bold tracking-tight mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-xl group-hover:text-neutral-800 dark:group-hover:text-neutral-200 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Card Structural Footer Tag */}
                <div className="mt-8 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40 flex items-center">
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-neutral-400 dark:text-neutral-500 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                    {service.tag}
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