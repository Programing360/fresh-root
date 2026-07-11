"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowLeft, Home, Lock, Sparkles } from "lucide-react";

export default function Unauthorized(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden">
      
      {/* Premium Ambient Background Mesh Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-rose-500/10 blur-[130px] dark:bg-rose-500/5 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/5 pointer-events-none" />

      {/* Main Container Content */}
      <div className="relative flex flex-col items-center justify-center text-center px-6 max-w-md mx-auto">
        
        {/* Shield Icon Frame Wrapper */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-rose-500/10 dark:bg-rose-500/5 blur-xl animate-pulse" />
          <div className="w-20 h-20 rounded-3xl bg-rose-500/10 dark:bg-rose-500/5 border border-rose-500/30 dark:border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-lg transform -rotate-3 transition-transform duration-300">
            <ShieldAlert size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-[#0e100e] dark:bg-[#f9f9f6] text-white dark:text-black flex items-center justify-center shadow-md">
            <Lock size={12} className="text-rose-500" />
          </div>
        </div>

        {/* Status Error Badge */}
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
          Error 401: Unauthorized
        </span>

        {/* Error Typography Headings */}
        <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
          Access Restricted.
        </h2>
        
        {/* Micro-copy or Subtitle */}
        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
          Your current cryptographic token or role layout does not grant validation rights to view this secure organic batch node.
        </p>

        {/* Action Operation Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          {/* Go Back Trigger */}
          <button
            onClick={() => router.back()}
            className="w-full sm:w-1/2 py-3.5 px-5 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black/20 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
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

        {/* Alternative Sign In Context Hint */}
        <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 mt-6">
          Think this is a mistake?{" "}
          <Link href="/auth/login" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
            Re-authenticate here
          </Link>
        </p>
      </div>

      {/* Bottom Legal/Security Signature */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <span className="text-[10px] font-bold text-neutral-300 dark:text-neutral-800 tracking-widest uppercase select-none flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-500" /> Secure Protocol Breach Prevented
        </span>
      </div>
      
    </div>
  );
}