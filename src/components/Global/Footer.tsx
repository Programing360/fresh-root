"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, ArrowUp, Sparkles } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer(): React.JSX.Element {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const linksGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!linksGridRef.current) return;

    const ctx = gsap.context(() => {
      // Elegant staggered upward fade on footer scroll entry
      gsap.fromTo(
        linksGridRef.current!.children,
        { 
          y: 30, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: linksGridRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    shop: [
      { name: "Raw Honey", href: "/shop/honey" },
      { name: "Organic Jaggery", href: "/shop/jaggery" },
      { name: "Bilona Ghee", href: "/shop/ghee" },
      { name: "Seasonal Fruits", href: "/shop/fruits" },
    ],
    company: [
      { name: "Our Story", href: "/about" },
      { name: "Bio-Farms Track", href: "/farms" },
      { name: "Lab Traceability", href: "/labs" },
      { name: "Journals & Blogs", href: "/blog" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Shipping Policies", href: "/shipping" },
      { name: "Return & Refund", href: "/returns" },
      { name: "Contact Support", href: "/contact" },
    ],
  };

  return (
    <footer
      ref={footerRef}
      className="w-full pt-24 pb-12 bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative border-t border-neutral-300/40 dark:border-neutral-900"
    >
      {/* Background Ambient Mesh Glows */}
      <div className="absolute bottom-0 left-1/10 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] dark:bg-emerald-500/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/10 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] dark:bg-teal-500/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* TOP PANEL: Brand & Contact Cards */}
        <div ref={linksGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Intro Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 group font-black text-xl tracking-tight text-neutral-900 dark:text-neutral-50">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-black font-black text-base group-hover:rotate-6 transition-transform">
                f
              </span>
              fresh<span className="text-emerald-700 dark:text-emerald-400">Root</span>
            </Link>
            
            <p className="mt-5 text-sm font-medium text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xs">
              Pioneering absolute food purity through verified lab-traceable processing and zero-tailpipe emission distribution freight channels.
            </p>

            {/* Social Connect Icons */}
            <div className="flex items-center gap-3 mt-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-neutral-200/50 dark:bg-neutral-900/50 border border-neutral-300/50 dark:border-neutral-800/60 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:text-emerald-700 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-black shadow-sm transition-colors duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Dynamic Content Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-4 sm:gap-6">
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-5 flex items-center gap-1">
                <Sparkles size={10} /> Provisions
              </h4>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-neutral-900 dark:hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-5">Ecosystem</h4>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {footerLinks.company.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-neutral-900 dark:hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mb-5">Assistance</h4>
              <ul className="flex flex-col gap-3.5 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {footerLinks.support.map((link) => (
                  <li key={link.name}><Link href={link.href} className="hover:text-neutral-900 dark:hover:text-white transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Glassmorphic Contact Quick-Card */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-3xl border border-neutral-300/50 dark:border-neutral-800/60 bg-white/30 dark:bg-[#141614]/20 backdrop-blur-xl shadow-sm flex flex-col gap-4">
              <h4 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Direct Logistics Hub</h4>
              
              <div className="flex items-start gap-3 text-xs font-medium text-neutral-600 dark:text-neutral-400 leading-normal">
                <MapPin size={15} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Green Agro Park, Block B-42, Corporate Zone, BD</span>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <Phone size={15} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>+880 1754-318654</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <Mail size={15} className="text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>support@freshroot.co</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM PANEL: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-neutral-200/50 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 text-center sm:text-left select-none">
            © {new Date().getFullYear()} freshRoot Hub Inc. Formulated with absolute natural integrity. All rights reserved.
          </p>

          {/* Smooth Dynamic Scroll to Top Vector Toggle */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer outline-none focus:outline-none"
          >
            Back to summit
            <div className="w-8 h-8 rounded-full border border-neutral-300/60 dark:border-neutral-800/60 flex items-center justify-center group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-500">
              <ArrowUp size={14} />
            </div>
          </motion.button>
        </div>

      </div>
    </footer>
  );
}