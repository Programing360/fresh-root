"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

// ৬ সেকেন্ড পর পর টেক্সট ও ইমেজ একসাথে সিঙ্ক করার জন্য ৪টি প্রিমিয়াম ডেটা স্লাইড
// সব ইমেজ Unsplash-এর ভেরিফায়েড হাই-রেজোলিউশন লিংক দিয়ে আপডেট করা হয়েছে
const BANNER_SLIDES = [
  {
    badge: "Organio 100% Genuine Product Served",
    title: "Fresh & Healthy Organic Vegetables",
    highlightWord: "Healthy",
    desc: "A value you can't pass up, we simplify the fee into two areas inspection and annual certification.",
    img: "https://i.ibb.co.com/Mx50nKj8/h6-slider-layer4.png" // Pineapple & green juice composition matching image_b44609.png
  },
  {
    badge: "100% Natural Pure Energy Boost",
    title: "Pure & Organic Fresh Bio Juices",
    highlightWord: "Organic",
    desc: "Experience the ultimate hydration with our vitamins enriched cold-pressed juices directly from the farm.",
    img: "https://i.ibb.co.com/h1mdnx4X/h4-banner4.png" // Fresh juice glass bottle composition
  },
  {
    badge: "Freshly Picked Premium Selection",
    title: "Rich Taste Delicious Natural Greens",
    highlightWord: "Delicious",
    desc: "Fresh, crispy, and organically harvested green vegetables packed with absolute care and nutrition.",
    img: "https://i.ibb.co.com/1tHBgSNn/h3-layer3.png" // Organic fresh vegetables composition
  },
  {
    badge: "Straight from the local Eco-Farms",
    title: "Premium Quality Fresh Garden Harvest",
    highlightWord: "Premium",
    desc: "A beautiful handpicked selection of fresh vegetables directly from eco-friendly local organic farms.",
    img: "https://i.ibb.co.com/JWk6BNt9/h4-banner1.png" // Farm fresh garden harvest
  }
];

// বটম ইনফিনিট মার্কি স্লাইডারের ডেটা (ম্যাক্স ৪)
const SLIDER_ITEMS = [
  { id: 1, name: "Organic Honey", tag: "100% Pure", price: "$12.99", img: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=150&auto=format&fit=crop&q=60" },
  { id: 2, name: "Fresh Strawberry", tag: "Premium Quality", price: "$24.50", img: "https://i.ibb.co.com/MyqBKkxY/h3-product13-600x530.png" },
  { id: 3, name: "Natural Jaggery", tag: "Chemical Free", price: "$8.99", img: "https://i.ibb.co.com/h1mdnx4X/h4-banner4.png" },
  { id: 4, name: "Organic Juice", tag: "Bio Extract", price: "$15.00", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=60" },
];

export default function BannerSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const leafTopRef = useRef<HTMLDivElement>(null);
  const leafBottomRef = useRef<HTMLDivElement>(null);

  // অটো-প্লে ব্যানার স্লাইডার (প্রতি ৬ সেকেন্ড পর পর চেঞ্জ হবে)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // GSAP floating background animation
    if (leafTopRef.current && leafBottomRef.current) {
      gsap.to(leafTopRef.current, {
        y: 12,
        rotation: 6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(leafBottomRef.current, {
        y: -15,
        rotation: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  // টেক্সট স্প্লিট হাইলাইট মেকার
  const renderTitle = (title: string, highlight: string) => {
    const parts = title.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="text-[#ff7a45] dark:text-[#ff9266]">{part}</span>
      ) : part
    );
  };

  return (
    <section className="relative w-full min-h-[85vh] flex flex-col justify-between overflow-hidden bg-[#f8f9fa] dark:bg-[#0b0f19] text-slate-950 dark:text-white transition-colors duration-300 py-12 px-6">
      
      {/* Background Leaves (GSAP Animated) */}
      <div ref={leafTopRef} className="absolute top-10 right-10 w-12 h-12 pointer-events-none opacity-40">
        <div className="w-4 h-4 rounded-full bg-emerald-400/80" />
      </div>
      <div ref={leafBottomRef} className="absolute bottom-40 left-8 w-14 h-14 pointer-events-none opacity-40">
        <div className="w-3 h-3 rounded-full bg-orange-400/80" />
      </div>

      {/* Main Grid Wrapper with max-w-7xl mx-auto */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto relative z-10">
        
        {/* Left Content Column (Bottom to Top Text Animation) */}
        <div className="lg:col-span-7 h-[380px] flex flex-col justify-center text-left relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              initial={{ opacity: 0, y: 40 }} // নিচ থেকে ওপরে উঠবে
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="space-y-5 absolute left-0 right-0"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {BANNER_SLIDES[currentSlide].badge}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                {renderTitle(BANNER_SLIDES[currentSlide].title, BANNER_SLIDES[currentSlide].highlightWord)}
              </h1>

              <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
                {BANNER_SLIDES[currentSlide].desc}
              </p>

              <div className="pt-2 flex items-center gap-4">
               <Link href={'/shop'}>
                 <Button
                  size="lg"
                  className="bg-[#ff7a45] hover:bg-[#ff662b] text-white font-bold rounded-xl px-8 py-6 shadow-md shadow-orange-500/10 dark:shadow-none transition-all duration-300 text-base"
                  // endContent={<Plus size={18} />}
                >
                  Shop Now
                </Button>
               </Link>

                {/* স্লাইডার ইন্ডিকেটর ডটস */}
                <div className="flex gap-2 items-center">
                  {BANNER_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx ? "w-6 bg-emerald-500" : "w-2.5 bg-slate-300 dark:bg-slate-700"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Slider Column (Right to Left Image Animation with Custom Bottom Drop Shadow) */}
        <div className="lg:col-span-5 flex justify-center relative w-full h-[320px] sm:h-[400px] md:h-[450px]">
          <div className="absolute w-72 h-72 bg-emerald-400/20 dark:bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          
          <div className="relative w-full h-full max-w-[420px] rounded-3xl overflow-hidden p-2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 80, scale: 0.98 }} // ডান থেকে বামে স্লাইড হবে
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -80, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-full h-full flex flex-col items-center justify-center"
              >
                {/* ইমেজ কন্টেনার - নো বর্ডার, নো ব্যাকগ্রাউন্ড বক্স শ্যাডো */}
                <div className="relative w-full h-[90%]">
                  <Image
                    src={BANNER_SLIDES[currentSlide].img}
                    alt="Organic Premium Product Showcase"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
                {/* হালকা বটম ড্রপ শ্যাডো - হুবহু image_b44609.png-এর মতো ওভাল শেপ শ্যাডো */}
                <div className="absolute bottom-2 w-[70%] h-4 bg-black/15 dark:bg-black/40 blur-md rounded-full pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Infinite Left to Right Slider (css-marquee) with max-w-7xl mx-auto */}
      <div className="w-full mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f8f9fa] dark:from-[#0b0f19] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f8f9fa] dark:from-[#0b0f19] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max gap-6 animate-marquee max-w-7xl mx-auto">
          {/* Loop 1 */}
          {SLIDER_ITEMS.map((item) => (
            <div key={`slider-1-${item.id}`} className="flex items-center gap-4 bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/60 shadow-sm px-5 py-3 rounded-2xl min-w-[240px]">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider block">{item.tag}</span>
                <h4 className="text-sm font-bold">{item.name}</h4>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">{item.price}</p>
              </div>
            </div>
          ))}
          {/* Loop 2 */}
          {SLIDER_ITEMS.map((item) => (
            <div key={`slider-2-${item.id}`} className="flex items-center gap-4 bg-white dark:bg-[#151c2c] border border-slate-100 dark:border-slate-800/60 shadow-sm px-5 py-3 rounded-2xl min-w-[240px]">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-900">
                <Image src={item.img} alt={item.name} fill className="object-cover" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider block">{item.tag}</span>
                <h4 className="text-sm font-bold">{item.name}</h4>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}