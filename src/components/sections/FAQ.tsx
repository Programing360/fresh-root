"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const accordionGroupRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What makes your 'Bilona' ghee different from commercial ghee?",
      answer: "Commercial ghee is produced rapidly by melting direct milk cream. Our wood-pressed Bilona ghee follows strict Vedic protocols: fresh organic milk is turned into curd, churned slowly with wooden billos to separate the butter, and then clarify-cooked over low flame. This preserves vital butyric acids, vitamins, and an authentic granular texture.",
    },
    {
      id: 2,
      question: "How do you verify your honey and jaggery are chemical-free?",
      answer: "We ensure total batch traceability. Every single yield from our partner organic farms undergoes rigorous multi-tier biological laboratory testing. We completely verify the absence of added corn syrups, heavy metals, artificial coloring agents, or sulfur compounds before sealing our jars.",
    },
    {
      id: 3,
      question: "Where do your fresh vegetables and fruits come from?",
      answer: "All fruits and vegetables are sourced directly from certified organic micro-farms that prioritize natural composting and bio-diverse soil health. We eliminate traditional supply-chain distribution middlemen to cut down transit latency significantly.",
    },
    {
      id: 4,
      question: "How does your farm-to-table delivery logistics cycle operate?",
      answer: "We operate a strict zero-emission, cold-chain eco-express pipeline. Fresh produce is carefully hand-harvested at dawn, packaged with custom insulated materials, and dispatched directly to your doorstep in less than 24 hours to preserve its optimal cellular crispness.",
    },
  ];

  useEffect(() => {
    if (!accordionGroupRef.current) return;

    const ctx = gsap.context(() => {
      // Premium staggered entry cascade on scroll
      gsap.fromTo(
        accordionGroupRef.current!.children,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.98
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: accordionGroupRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative"
    >
      {/* Ambient Radial Background Mesh Glows */}
      <div className="absolute top-1/4 left-1/10 w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[130px] dark:bg-emerald-500/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] rounded-full bg-teal-500/5 blur-[130px] dark:bg-teal-500/2 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3" /> Information Hub
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 text-neutral-900 dark:text-neutral-50"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        {/* Accordion Group Container */}
        <div ref={accordionGroupRef} className="flex flex-col gap-4 w-full">
          {faqData.map((faq, idx) => {
            const isOpen = activeIndex === idx;

            return (
              <div
                key={faq.id}
                className="rounded-[24px] border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:bg-white/70 dark:hover:bg-[#161a16]/60 transition-all duration-500 overflow-hidden"
              >
                {/* Trigger Button Header */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left outline-none focus:outline-none select-none group"
                >
                  <div className="flex items-center gap-4 pr-4">
                    {/* Decorative Help Circle Mini Badge */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      isOpen 
                        ? "bg-emerald-700 text-white dark:bg-emerald-500 dark:text-[#0e100e]" 
                        : "bg-emerald-700/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400 group-hover:bg-emerald-700 group-hover:text-white dark:group-hover:bg-emerald-500 dark:group-hover:text-[#0e100e]"
                    }`}>
                      <HelpCircle size={18} />
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-emerald-800 dark:text-emerald-400" : "text-neutral-900 dark:text-neutral-50"
                    }`}>
                      {faq.question}
                    </h3>
                  </div>

                  {/* Rotatable Chevron Vector Indicator */}
                  <div className={`w-8 h-8 rounded-full border border-neutral-300/60 dark:border-neutral-800/60 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                    isOpen ? "rotate-180 bg-neutral-950 text-white dark:bg-white dark:text-black border-transparent" : "text-neutral-400"
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                {/* Animated Expandable Content Layer via Framer Motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    >
                      <div className="px-6 pb-7 sm:px-7 sm:pb-8 pl-16 sm:pl-20 border-t border-neutral-200/40 dark:border-neutral-800/40 pt-4">
                        <p className="text-sm sm:text-[15px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-3xl">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}