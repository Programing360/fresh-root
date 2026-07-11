"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, ShieldCheck, Zap } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CallToAction(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glassCardRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonGroupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!glassCardRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Massive card scale and reveal entrance sequence
      gsap.fromTo(
        glassCardRef.current,
        { 
          y: 80, 
          scale: 0.94, 
          opacity: 0 
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: glassCardRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Text micro-stagger paths inside the card
      if (titleRef.current && buttonGroupRef.current) {
        gsap.fromTo(
          [titleRef.current, titleRef.current.nextElementSibling, buttonGroupRef.current],
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: glassCardRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Premium Multi-Layer Ambient Background Mesh Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/3 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[120px] dark:bg-teal-500/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Core Glassmorphic CTA Wrapper Panel */}
        <div
          ref={glassCardRef}
          className="relative w-full p-8 sm:p-14 md:p-20 rounded-[48px] border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)] hover:bg-white/70 dark:hover:bg-[#151915]/60 transition-all duration-700 overflow-hidden"
        >
          {/* Asymmetrical Absolute Background Math Accents */}
          <div className="absolute -right-16 -bottom-16 w-72 h-72 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            
            {/* LEFT SIDE: Heading Copy Cluster */}
            <div className="lg:col-span-7 text-left">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6">
                <Sparkles className="w-3 h-3" /> Elevate Your Lifestyle
              </span>
              
              <h2
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-[2.8rem] font-black tracking-tight leading-[1.1] text-neutral-900 dark:text-neutral-50"
              >
                Ready to Experience <br />
                <span className="text-emerald-700 dark:text-emerald-400">Absolute Food Purity?</span>
              </h2>
              
              <p className="mt-6 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-xl">
                Switching to certified, lab-traceable chemical-free nutrition shouldn't be a gamble. Join thousands of health-focused households sourcing directly from verified biomorphic farms today.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-5 mt-8 border-t border-neutral-200/40 dark:border-neutral-800/40 pt-6">
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  <ShieldCheck size={16} className="text-emerald-600 dark:text-emerald-400" />
                  100% Traceable Batches
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                  <Zap size={16} className="text-emerald-600 dark:text-emerald-400" />
                  Zero Emission Delivery
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Dynamic High-Contrast Action Buttons */}
            <div
              ref={buttonGroupRef}
              className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center lg:items-stretch xl:items-center gap-4 w-full"
            >
              {/* Primary Premium Magnet Action Button */}
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link
                  href="/shop"
                  className="w-full bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0e100e] font-bold px-8 py-5 rounded-2xl shadow-md transition-colors duration-300 flex items-center justify-center gap-2 group text-sm md:text-base"
                >
                  Explore Organic Shop
                  <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>

              {/* Secondary Translucent Supporting Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Link
                  href="/traceability"
                  className="w-full rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/80 dark:bg-black/40 text-neutral-900 dark:text-white hover:bg-white dark:hover:bg-black font-bold px-8 py-5 transition-all text-center text-sm md:text-base block shadow-sm"
                >
                  View Lab Reports
                </Link>
              </motion.div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}