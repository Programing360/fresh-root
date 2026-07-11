"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Leaf, ShieldCheck, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatItem {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  title: string;
  description: string;
}

export default function Statistics(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statsGridRef = useRef<HTMLDivElement | null>(null);
  const countTargetsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const statsData: StatItem[] = [
    {
      id: 1,
      icon: Users,
      value: 15,
      suffix: "K+",
      title: "Active Conscious Families",
      description: "Discerning households who rely strictly on our daily natural kitchen provisions.",
    },
    {
      id: 2,
      icon: Leaf,
      value: 120,
      suffix: "+",
      title: "Certified Bio-Farms",
      description: "Direct micro-partners adhering to strict, multi-generational soil-enrichment protocols.",
    },
    {
      id: 3,
      icon: ShieldCheck,
      value: 100,
      suffix: "%",
      title: "Traceable Integrity",
      description: "Every single harvest batch undergoes complete structural biological lab verification.",
    },
    {
      id: 4,
      icon: Globe,
      value: 45,
      suffix: "K",
      title: "Carbon-Neutral Miles",
      description: "Eco-express distribution routes completed exclusively with zero-tailpipe emission freight.",
    },
  ];

  useEffect(() => {
    if (!statsGridRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Staggered grid entrance cascade
      gsap.fromTo(
        statsGridRef.current!.children,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.97
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: statsGridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Hardware-accelerated incremental value counter logic
      countTargetsRef.current.forEach((target, index) => {
        if (!target) return;
        const endValue = statsData[index].value;

        gsap.fromTo(
          target,
          { textContent: "0" },
          {
            textContent: String(endValue),
            duration: 2.5,
            ease: "power3.out",
            snap: { textContent: 1 }, // Guarantees smooth integer snapping increments
            scrollTrigger: {
              trigger: target,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Premium Ambient Background Mesh Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/3 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[150px] dark:bg-teal-500/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-block"
          >
            Our Impact Metrics
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 text-neutral-900 dark:text-neutral-50"
          >
            Quantifiable Purity. Solid Trust.
          </motion.h2>
        </div>

        {/* Statistics Glassmorphic Grid */}
        <div
          ref={statsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {statsData.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="group relative flex flex-col p-8 rounded-[32px] border border-neutral-300/40 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_22px_45px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_22px_45px_rgba(0,0,0,0.3)] hover:bg-white/80 dark:hover:bg-[#161a16]/70 transition-all duration-500 cursor-pointer overflow-hidden text-center md:text-left"
              >
                {/* Micro Icon Box Wrapper */}
                <div className="w-12 h-12 rounded-xl bg-emerald-700/10 dark:bg-emerald-400/10 flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-colors duration-500 shadow-sm">
                  <IconComponent className="w-5 h-5 text-emerald-700 dark:text-emerald-400 group-hover:text-white dark:group-hover:text-[#0e100e] transition-colors duration-500" />
                </div>

                {/* Animated Metric Counter Display */}
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-neutral-50 font-sans flex items-center justify-center md:justify-start">
                  <span
                    ref={(el) => {
                      countTargetsRef.current[idx] = el;
                    }}
                    className="tabular-nums"
                  >
                    0
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 ml-0.5 select-none">
                    {stat.suffix}
                  </span>
                </div>

                {/* Descriptive Copy Text Block */}
                <h3 className="text-base font-bold tracking-tight mt-3 mb-2 text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  {stat.title}
                </h3>
                
                <p className="text-[13px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                  {stat.description}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}