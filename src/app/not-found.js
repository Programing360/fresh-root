"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoveLeft, Home, Compass, Sparkles } from "lucide-react";

export default function NotFound(){
  const router = useRouter();

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden">
      
      {/* Premium Ambient Background Mesh Glows */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/5 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-amber-500/10 blur-[130px] dark:bg-amber-500/5 pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Main Container Content */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto">
        
        {/* Giant Dynamic 404 Header Layout */}
        <div className="relative mb-6 select-none">
          <h1 className="text-[120px] font-black tracking-tighter leading-none text-neutral-900/10 dark:text-neutral-50/5">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-700/10 dark:bg-emerald-500/10 border border-emerald-700/20 dark:border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shadow-xl transform rotate-6 animate-bounce" style={{ animationDuration: '4s' }}>
              <Compass size={42} className="animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>
        </div>

        {/* Status Error Badge */}
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
          Node Map Lost
        </span>

        {/* Error Typography Headings */}
        <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Page Not Found.
        </h2>
        
        {/* Micro-copy or Subtitle */}
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
          The crop batch path or trace archive directory you are looking for has been harvested, relocated, or never existed in our schema.
        </p>

        {/* Action Operation Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Go Back Trigger */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black/20 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
          >
            <MoveLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>

          {/* Return Home Route */}
          <Link
            href="/"
            className="w-full sm:w-1/2 bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-50 dark:hover:bg-emerald-400 text-white dark:text-[#0e100e] font-bold py-3.5 px-5 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm group cursor-pointer"
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>

      </div>

      {/* Bottom Legal/Security Signature */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="text-[10px] font-bold text-neutral-300 dark:text-neutral-800 tracking-widest uppercase select-none flex items-center justify-center gap-1">
          <br /><Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> freshRoot Identity Router
        </span>
      </div>
      
    </div>
  );
}