"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CategoryItem {
  id: number;
  title: string;
  itemCount: number;
  image: string;
  link: string;
  sizeClass: string; // Dynamic sizes for a modern grid layout
}

export default function Categories(): React.JSX.Element {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const categories: CategoryItem[] = [
    {
      id: 1,
      title: "Fresh Vegetables",
      itemCount: 48,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      link: "/shop/vegetables",
      sizeClass: "md:col-span-2 md:row-span-2 h-[420px] md:h-[500px]",
    },
    {
      id: 2,
      title: "Organic Fruits",
      itemCount: 32,
      image: "https://images.unsplash.com/photo-1610832958506-ee5633619144?auto=format&fit=crop&w=600&q=80",
      link: "/shop/fruits",
      sizeClass: "md:col-span-1 md:row-span-1 h-[238px]",
    },
    {
      id: 3,
      title: "Fresh Ghee & Dairy",
      itemCount: 14,
      image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
      link: "/shop/dairy",
      sizeClass: "md:col-span-1 md:row-span-1 h-[238px]",
    },
    {
      id: 4,
      title: "Pure Honey & Jaggery",
      itemCount: 19,
      image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      link: "/shop/sweeteners",
      sizeClass: "md:col-span-2 md:row-span-1 h-[238px]",
    },
  ];

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      // Elegant pop-and-fade stagger on scroll
      gsap.fromTo(
        gridRef.current!.children,
        { 
          y: 50, 
          scale: 0.96, 
          opacity: 0 
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: gridRef.current,
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
      className="w-full py-24 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full"
            >
              Categories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-[2.6rem] font-black tracking-tight mt-5 text-neutral-900 dark:text-neutral-50"
            >
              Browse by Category
            </motion.h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1 group"
          >
            View All Shop Items 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Categories Asymmetric Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-max"
        >
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.link}
              className={`group relative rounded-[32px] overflow-hidden border border-neutral-300/40 dark:border-neutral-800/50 shadow-sm cursor-pointer block ${cat.sizeClass}`}
            >
              {/* Background Image Layer with smooth scaling transformation */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                  sizes="(max-w-768px) 100vw, 50vw"
                />
                {/* Image Gradient Shade Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/70" />
              </div>

              {/* Float Glassmorphic Content Label Panel */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="w-full p-5 rounded-[24px] border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/30 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:bg-white/60 dark:hover:bg-black/40 transition-all duration-500 flex items-center justify-between gap-4">
                  
                  <div className="text-left">
                    <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
                      {cat.title}
                    </h3>
                    <p className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 mt-1">
                      {cat.itemCount} Premium Items
                    </p>
                  </div>

                  {/* Circle Action Arrow Button inside glass badge */}
                  <div className="w-11 h-11 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-neutral-950 flex items-center justify-center shadow-md shadow-emerald-900/10 group-hover:rotate-45 transition-transform duration-500 ease-out flex-shrink-0">
                    <ArrowUpRight size={18} />
                  </div>
                  
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}