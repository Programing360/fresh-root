"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, ShieldCheck, Award, Leaf, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HighlightItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: string;
}

export default function Highlights(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftPinRef = useRef<HTMLDivElement | null>(null);
  const rightCardsRef = useRef<HTMLDivElement | null>(null);

  const highlights: HighlightItem[] = [
    {
      id: 1,
      icon: Award,
      title: "Award-Winning Pure Honey",
      subtitle: "100% Raw & Unfiltered Sundarbans Harvest",
      description: "Recognized nationally for its dense purity, missing all forms of added corn syrups or thermal pasteurization processing techniques.",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=80",
      rating: "4.9/5 (1,200+ Reviews)",
    },
    {
      id: 2,
      icon: Leaf,
      title: "Wood-Pressed Organic Ghee",
      subtitle: "Traditional Vedic Bilona Crafting method",
      description: "Churned slowly from grass-fed cow curd rather than direct cream, preserving core butyric acids and natural aroma texturing.",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=500&q=80",
      rating: "5.0/5 (850+ Reviews)",
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: "Chemical-Free Organic Jaggery",
      subtitle: "Hand-Crafted Pure Sugarcane Concentrate",
      description: "Completely clear of chemical clarifying agents, sulfur, or coloring powders. Rich in essential iron compounds.",
      image: "https://images.unsplash.com/photo-1608471553400-02d9c02506b3?auto=format&fit=crop&w=500&q=80",
      rating: "4.8/5 (940+ Reviews)",
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !leftPinRef.current || !rightCardsRef.current) return;

    const ctx = gsap.context(() => {
      // Create modern desktop layout pinning rule matching user scrolling speeds
      ScrollTrigger.create({
        trigger: leftPinRef.current,
        start: "top 12%",
        endTrigger: containerRef.current,
        end: "bottom 85%",
        pin: true,
        pinSpacing: false,
        scrub: true,
        id: "left-pin",
      });

      // Individual sequential cascading pop-up reveal for glass layers
      gsap.fromTo(
        rightCardsRef.current!.children,
        { 
          y: 80, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rightCardsRef.current,
            start: "top 80%",
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
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-visible relative"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* LEFT PANEL: Sticky Controlled Branding Anchor */}
          <div ref={leftPinRef} className="lg:col-span-4 flex flex-col items-start z-20 self-start ">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" /> Gold Standards
            </motion.span>
            
            <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 leading-[1.15] text-neutral-900 dark:text-neutral-50">
              The Crown Jewels of Freshness.
            </h2>
            
            <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium text-sm sm:text-base leading-relaxed max-w-sm">
              Our signature collection showcases our finest, award-winning items—each single batch fully traceable right back to its biological source origin point.
            </p>
          </div>

          {/* RIGHT PANEL: Stacked Luxury Glass Highlights */}
          <div ref={rightCardsRef} className="lg:col-span-8 flex flex-col gap-8 w-full">
            {highlights.map((item) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -4, scale: 1.005 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group relative w-full p-6 sm:p-8 rounded-[32px] border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:bg-white/80 dark:hover:bg-[#161a16]/70 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col md:flex-row gap-6 items-center"
                >
                  {/* Embedded Visual Product Thumbnail Section */}
                  <div className="relative w-full md:w-[200px] h-[160px] rounded-2xl overflow-hidden flex-shrink-0 border border-neutral-200/50 dark:border-neutral-800/40">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-w-768px) 100vw, 200px"
                    />
                    {/* Tiny Absolute Trust Shield Icon Badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-neutral-900/80 dark:bg-white/90 text-white dark:text-black flex items-center justify-center backdrop-blur-sm">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                    </div>
                  </div>

                  {/* High Contrast Core Details Area */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-700/10 dark:bg-emerald-400/10 flex items-center justify-center mx-auto md:mx-0">
                        <IconComp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block tracking-wide mb-3">
                      {item.subtitle}
                    </span>

                    <p className="text-[13px] sm:text-[14px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed mb-4 max-w-xl">
                      {item.description}
                    </p>

                    {/* Meta Rating Footer Bar */}
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      <span>RATING:</span>
                      <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                        {item.rating}
                      </span>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}