"use client";

import React from "react";
import { Loader2, Sparkles } from "lucide-react";

export default function Loading(): React.JSX.Element {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden">
      
      {/* Premium Ambient Background Mesh Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/5 pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[100px] dark:bg-teal-500/5 pointer-events-none animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Main Spinner Content Box */}
      <div className="relative flex flex-col items-center justify-center text-center px-6">
        
        {/* Animated Brand Emblem/Icon */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-emerald-700/20 dark:bg-emerald-500/10 blur-xl animate-ping opacity-75" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-700 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-black font-black text-3xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
            🌿
          </div>
        </div>

        {/* Brand Typography */}
        <div className="flex items-center gap-1.5 text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          fresh<span className="text-emerald-700 dark:text-emerald-400">Root</span>
        </div>

        {/* Informative Status Badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1.5 rounded-full mb-6">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700 dark:text-emerald-400" />
          Securing Connection
        </div>

        {/* Micro-copy or Subtitle */}
        <p className="max-w-[280px] text-xs font-semibold text-neutral-400 dark:text-neutral-500 leading-relaxed select-none">
          Optimizing trace archives and encrypting organic credentials...
        </p>
      </div>

      {/* Bottom Legal/Security Signature */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="text-[10px] font-bold text-neutral-300 dark:text-neutral-800 tracking-widest uppercase select-none flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> Encrypted Vault System
        </span>
      </div>
      
    </div>
  );
}