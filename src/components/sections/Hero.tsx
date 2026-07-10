"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Sparkles, ArrowRight } from "lucide-react";
import bannerImage from '../../../public/assets/foodImage.png'

export default function FreshRootHero(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const textGroupRef = useRef<HTMLDivElement | null>(null);
  const basketRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Clean staggered presentation entry
      tl.fromTo(
        sectionRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1 }
      )
      .fromTo(
        textGroupRef.current ? textGroupRef.current.children : [],
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, stagger: 0.15 },
        "-=0.5"
      )
      .fromTo(
        basketRef.current,
        { scale: 0.85, x: 80, opacity: 0 },
        { scale: 1, x: 0, opacity: 1, duration: 1.4, ease: "elastic.out(1, 0.75)" },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[65vh] min-h-[520px] max-h-[680px] overflow-hidden bg-[#ebebeb] dark:bg-[#121412] select-none"
    >
      {/* 1. Canvas Layer: Realistic Split Background Design */}
      <div className="absolute inset-0 w-full h-full flex">
        {/* Deep luxurious forest green with realistic underlying texture overlay */}
        <div className="relative w-[55%] h-full bg-[#03301c] bg-gradient-to-br from-[#022415] to-[#054227]">
          <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
          {/* Subtle natural organic root/vein mask pattern effect */}
          <div className="absolute inset-0 opacity-5 mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/tree-bark.png')] scale-150 transform origin-top-left" />
        </div>

        {/* Clean, high-contrast light satin gray texturing */}
        <div className="relative w-[45%] h-full bg-[#f4f4f2] dark:bg-[#1b1d1b]">
          <div className="absolute inset-0 opacity-20 mix-blend-multiply dark:mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/fabric-of-the-nation.png')]" />
        </div>

        {/* High-fidelity torn brush edge layout divider border */}
        <div 
          className="absolute left-[54.5%] top-0 bottom-0 w-12 bg-gradient-to-b from-[#022415] to-[#054227] z-10 hidden md:block" 
          style={{ clipPath: "polygon(100% 0, 40% 34%, 85% 66%, 0% 100%, 0 0)", filter: "blur(0.5px)" }}
        />
      </div>

      {/* 2. Structured Layout Layer */}
      <div className="absolute inset-0 mx-auto max-w-7xl w-full h-full px-6 sm:px-8 flex items-center z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 w-full items-center gap-6">
          
          {/* Left Typography Branding Profile */}
          <div ref={textGroupRef} className="col-span-1 md:col-span-7 flex flex-col items-start z-20">
            
            {/* Core Brand Badge Layout */}
            <div className="flex items-center gap-2 mb-4 opacity-90 scale-95 origin-left">
              <span className="text-xl">🌿</span>
              <span className="text-sm font-bold tracking-widest text-emerald-400 font-sans">FRESHROOT</span>
            </div>

            {/* Elegant Flowing Cursive Script Accent */}
            <span className="text-2xl sm:text-4xl font-medium text-[#ffd700] italic tracking-wide font-serif mb-1 drop-shadow-sm block">
              Fresh and Healthy
            </span>

            {/* Distressed Styled Clean Heavyweight Title Header */}
            <h1 
              className="text-[3.2rem] sm:text-[5.8rem] font-black tracking-tighter leading-[0.9] text-white select-none relative font-sans"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
            >
              VEGETABLE
            </h1>

            {/* Sub-contextual Details with left highlight line anchor */}
            <div className="mt-5 flex flex-col gap-1 border-l-2 border-[#ffd700] pl-4">
              <span className="text-xl sm:text-2xl font-black tracking-wider text-neutral-100">
                UP TO 50% OFF
              </span>
              <span className="text-xs sm:text-sm font-medium text-neutral-300 opacity-80 tracking-wide">
                We Are Open: 10.00a.m - 20.00 p.m
              </span>
            </div>

            {/* Highly Interactive Glow Action CTA Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button
                radius="full"
                endContent={<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                className="mt-8 bg-[#ffdf1b] hover:bg-[#ffe53b] text-[#03301c] font-black px-8 py-6 shadow-[0_10px_30px_rgba(255,223,27,0.25)] group transition-all duration-300"
              >
                ORDER NOW
              </Button>
            </motion.div>
          </div>

          {/* Right Product Composite Container */}
          <div className="col-span-1 md:col-span-5 relative w-full h-full hidden md:flex items-center justify-center">
            
            {/* Decorative Glint / Sparkle Flares */}
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-1/4 right-10 text-white/40 pointer-events-none z-30"
            >
              {/* <Sparkles size={24} className="text-[#ffd700]" /> */}
            </motion.div>

            {/* Fluid Floating Hover Basket Object */}
            <motion.div
              ref={basketRef}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-[120%] h-full drop-shadow-[0_30px_45px_rgba(0,0,0,0.38)]"
            >
              <Image
                src={bannerImage}
                alt="Wicker basket with organic tomatoes, greens, eggplant, and carrots"
                fill
                priority
                className="object-contain w-[380px]"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}