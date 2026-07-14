"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Newsletter(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // useEffect(() => {
  //   if (!cardRef.current) return;

  //   const ctx = gsap.context(() => {
  //     // Elegant pop, fade, and slight rotation entrance upon scroll entry
  //     gsap.fromTo(
  //       cardRef.current,
  //       { 
  //         y: 60, 
  //         scale: 0.95, 
  //         opacity: 0 
  //       },
  //       {
  //         y: 0,
  //         scale: 1,
  //         opacity: 1,
  //         duration: 1.4,
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: cardRef.current,
  //           start: "top 88%",
  //           toggleActions: "play none none none",
  //         },
  //       }
  //     );
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate premium API pipeline latency transition
    setTimeout(() => {
      setIsSubmitted(true);
      setEmail("");
    }, 400);
  };

  return (
    <section
      ref={containerRef}
      
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Premium Multi-Layer Ambient Background Mesh Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-emerald-500/10 blur-[130px] dark:bg-emerald-500/5 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full bg-teal-500/10 blur-[110px] dark:bg-teal-500/3 pointer-events-none" />

      <div data-aos="zoom-in-up" className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Core Glassmorphic Subscription Card Panel Container */}
        <div
          ref={cardRef}
          className="relative w-full p-8 sm:p-14 md:p-16 rounded-[40px] border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)] hover:bg-white/70 dark:hover:bg-[#151915]/60 transition-all duration-700 overflow-hidden text-center"
        >
          {/* Subtle Decorative Structural Grid Rings inside glass frame */}
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-neutral-400/10 dark:border-neutral-600/10 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full border border-neutral-400/10 dark:border-neutral-600/10 pointer-events-none" />

          {!isSubmitted ? (
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              {/* Top Badge Icon */}
              <motion.span
                whileHover={{ rotate: 15 }}
                className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-6"
              >
                <Sparkles className="w-3 h-3" /> Stay Nourished
              </motion.span>

              {/* Core Headings */}
              <h2 className="text-3xl sm:text-4xl md:text-[2.6rem] font-black tracking-tight leading-[1.15] text-neutral-900 dark:text-neutral-50 mb-4">
                Join the Circle of Conscious Eaters.
              </h2>
              
              <p className="text-[14px] sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed mb-10 max-w-lg">
                Subscribe to unlock early access to seasonal harvests, pure lab traceability reports, and curated holistic wellness recipes.
              </p>

              {/* Interactive High-Contrast Input Form */}
              <form onSubmit={handleSubmit} className="w-full max-w-md relative flex flex-col sm:flex-row items-center gap-3">
                <div className="relative w-full flex items-center">
                  <Mail className="absolute left-4 text-neutral-400 dark:text-neutral-500 w-5 h-5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your personal email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/80 dark:bg-black/40 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0e100e] font-bold px-7 py-4 rounded-2xl shadow-md transition-colors duration-300 flex items-center justify-center gap-2 flex-shrink-0 text-sm group"
                >
                  Subscribe
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              {/* Strict No-Spam Trust Disclaimer */}
              <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 mt-5 block tracking-wide select-none">
                Zero spam. Unsubscribe with a single click whenever you wish.
              </span>
            </div>
          ) : (
            /* Success Response State Layer */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="py-8 flex flex-col items-center max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-700/10 dark:bg-emerald-400/10 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
                You Are on the List!
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                Welcome to the freshRoot collective journey. We have dispatched a verification welcome bundle right to your inbox.
              </p>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}