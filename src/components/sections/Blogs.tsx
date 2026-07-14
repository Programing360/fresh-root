"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, User, ArrowUpRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

export default function Blogs(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "The Bilona Method: Why Wood-Pressed Ghee Matters",
      excerpt: "Delve into the traditional Vedic curd-churning secrets that preserve vital butyric acids and unparalleled nutritional aroma values.",
      category: "Heritage Foods",
      author: "MD Limon",
      date: "Oct 12, 2026",
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
      slug: "bilona-method-wood-pressed-ghee",
    },
    {
      id: 2,
      title: "Unadulterated Truths: Spotting Real Raw Honey",
      excerpt: "Learn simple, biological laboratory-backed test steps to identify pure chemical-free honey concentrations right inside your home.",
      category: "Bio-Hacking",
      author: "MD Limon",
      date: "Oct 08, 2026",
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
      slug: "spotting-real-raw-honey",
    },
    {
      id: 3,
      title: "The Ultimate Guide to Chemical-Free Seasonal Eating",
      excerpt: "Discover how establishing direct crop tracking lines back to pristine farms alters overall digestive wellness and immunity cycles.",
      category: "Organic Living",
      author: "MD Limon",
      date: "Sep 29, 2026",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
      slug: "chemical-free-seasonal-eating",
    },
  ];

  // useEffect(() => {
  //   if (!gridRef.current) return;

  //   const ctx = gsap.context(() => {
  //     // Elegant staggered entry layout cascade on scroll
  //     gsap.fromTo(
  //       gridRef.current!.children,
  //       { 
  //         y: 50, 
  //         opacity: 0,
  //         scale: 0.97
  //       },
  //       {
  //         y: 0,
  //         opacity: 1,
  //         scale: 1,
  //         duration: 1,
         
  //         ease: "power4.out",
  //         scrollTrigger: {
  //           trigger: gridRef.current,
  //           start: "top 85%",
  //           toggleActions: "play none none none",
  //         },
  //       }
  //     );
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-28 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3" /> Organic Journals
            </motion.span>
            
            <h2 className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 text-neutral-900 dark:text-neutral-50">
              Insights on Holistic Nutrition.
            </h2>
          </div>
          
          <Link
            href="/blog"
            className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 group"
          >
            Explore Full Library 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Blogs Responsive Grid Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <article
              key={post.id}
              data-aos="zoom-in"
              className="group relative flex flex-col justify-between rounded-[32px] border border-neutral-300/40 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.01)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] hover:bg-white/80 dark:hover:bg-[#161a16]/70 transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div>
                {/* Visual Thumbnail Framing Container */}
                <div className="relative w-full h-[230px] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-w-768px) 100vw, 33vw"
                  />
                  {/* Floating Translucent Glass Category Badge Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-900 bg-white/60 dark:text-white dark:bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Core Context Content Padding Box */}
                <div className="p-6 sm:p-8">
                  {/* Meta Details Row */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-4">
                    <span className="flex items-center gap-1">
                      <User size={13} className="text-emerald-700 dark:text-emerald-400" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} className="text-emerald-700 dark:text-emerald-400" />
                      {post.date}
                    </span>
                  </div>

                  {/* Title & Copy Text block */}
                  <h3 className="text-xl font-bold tracking-tight mb-3 text-neutral-900 dark:text-neutral-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-[13px] sm:text-[14px] text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer Read More Link Setup */}
              <div className="mx-6 sm:mx-8 mb-6 sm:mb-8 pt-4 border-t border-neutral-200/40 dark:border-neutral-800/40 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  Read Journal Entry
                </span>
                <div className="w-8 h-8 rounded-full border border-neutral-300/60 dark:border-neutral-800/60 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-500">
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}