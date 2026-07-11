"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  tag: string;
}

export default function Testimonials(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const leftSideRef = useRef<HTMLDivElement | null>(null);
  const rightSideRef = useRef<HTMLDivElement | null>(null);

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Wellness Consultant & Mother",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "The difference in taste is mind-blowing. Their raw honey and organic vegetables feel like they were harvested from my own backyard just minutes ago. Absolutely indispensable for my household.",
      tag: "Verified Family",
    },
    {
      id: 2,
      name: "Chef Marcus Vance",
      role: "Michelin-Starred Culinary Director",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "In premium dining, ingredient integrity is everything. freshRoot's wood-pressed Bilona ghee brings an authentic depth of flavor and clean aroma that completely elevates our signature menus.",
      tag: "Culinary Expert",
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Holistic Health Educator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      comment: "Finding pure, unadulterated jaggery without sulfur compounds used to be nearly impossible. Their strict biological lab testing gives me ultimate peace of mind recommending them to clients.",
      tag: "Bio-Hacker",
    },
  ];

  useEffect(() => {
    if (!containerRef.current || !leftSideRef.current || !rightSideRef.current) return;

    const ctx = gsap.context(() => {
      // Elegant sticky pinning behavior for desktop screens
      ScrollTrigger.create({
        trigger: leftSideRef.current,
        start: "top 15%",
        endTrigger: containerRef.current,
        end: "bottom 85%",
        pin: true,
        pinSpacing: false,
        scrub: true,
      });

      // Direct sequential entry animations for individual testimonial cards
      gsap.fromTo(
        rightSideRef.current!.children,
        { 
          y: 60, 
          opacity: 0,
          scale: 0.96
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rightSideRef.current,
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
      {/* Decorative Premium Mesh Lighting Effects */}
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[140px] dark:bg-emerald-500/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative">
          
          {/* LEFT COLUMN: Fixed Pin Control Branding Panel */}
          <div ref={leftSideRef} className="lg:col-span-4 flex flex-col items-start z-20 self-start">
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" /> Voice of Purity
            </motion.span>
            
            <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 leading-[1.15] text-neutral-900 dark:text-neutral-50">
              Trusted by Devoted Believers.
            </h2>
            
            <p className="mt-6 text-neutral-600 dark:text-neutral-400 font-medium text-sm sm:text-base leading-relaxed max-w-sm">
              Discover how our absolute commitment to chemical-free organic farming alters kitchen tables and culinary lifestyles daily.
            </p>
          </div>

          {/* RIGHT COLUMN: Stacked Glassmorphic Testimonial Cards */}
          <div ref={rightSideRef} className="lg:col-span-8 flex flex-col gap-6 w-full">
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5, scale: 1.005 }}
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="group relative w-full p-8 sm:p-10 rounded-[32px] border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:bg-white/80 dark:hover:bg-[#161a16]/70 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col gap-6"
              >
                {/* Clean Floating Absolute Quote Background Accent */}
                <Quote className="absolute right-8 top-8 w-20 h-20 text-neutral-300/20 dark:text-neutral-800/20 pointer-events-none group-hover:scale-110 transition-transform duration-500" />

                {/* Star Row Rating Setup */}
                <div className="flex items-center gap-1">
                  {[...Array(item.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current text-amber-500 dark:text-amber-400" />
                  ))}
                </div>

                {/* Core Testimonial Comment text */}
                <p className="text-base sm:text-lg text-neutral-800 dark:text-green-600 font-medium leading-relaxed italic z-10">
                  “{item.comment}”
                </p>

                {/* Card Footer Profile Block */}
                <div className="flex items-center justify-between gap-4 pt-6 border-t border-neutral-200/40 dark:border-neutral-800/40 z-10">
                  <div className="flex items-center gap-3.5">
                    {/* User Avatar Circle */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-600/20 dark:border-emerald-400/20 shadow-sm">
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    {/* Bio metadata */}
                    <div className="text-left">
                      <h4 className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-300">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 font-semibold mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* Verification Badges */}
                  <span className="text-[10px] font-extrabold tracking-widest uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-700/5 dark:bg-emerald-400/5 px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}