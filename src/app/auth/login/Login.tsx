"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Login(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    const toastId = toast.loading("Verifying credentials with secure gate...");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        // Handle explicit auth pipeline payload errors
        toast.update(toastId, {
          render: error.message || "Authentication failed. Please verify your details.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        setIsLoading(false);
        return;
      }

      // Successful verification path processing execution
      toast.update(toastId, {
        render: "Secure signature accepted! Redirecting to hub...",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      
    } catch (err: any) {
      // Catch unexpected networking execution blocks safely
      toast.update(toastId, {
        render: err?.message || "An unexpected connectivity error occurred.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative mt-10">
      {/* Background Ambient Mesh Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[130px] dark:bg-emerald-500/5 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-teal-500/10 blur-[130px] dark:bg-teal-500/5 pointer-events-none" />

      {/* Main Structural Layout Container */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* LEFT COLUMN: Login Form Formulations */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-white/20 dark:bg-[#141614]/10 backdrop-blur-xl border-r border-neutral-300/40 dark:border-neutral-900/40 w-full relative z-20">
          {/* Top Branding Header */}
          <div className="flex items-center justify-between w-full mb-12 lg:mb-0" data-aos="fade-down">
            <Link href="/" className="flex items-center gap-2 group font-black text-xl tracking-tight text-neutral-900 dark:text-neutral-50">
              <span className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-black font-black text-base group-hover:rotate-6 transition-transform">
                🌿
              </span>
              fresh<span className="text-emerald-700 dark:text-emerald-400">Root</span>
            </Link>
          </div>

          {/* Center Form Frame Wrapper */}
          <div className="max-w-md w-full mx-auto my-auto flex flex-col justify-center">
            <div data-aos="fade-up" data-aos-delay="100">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
                <Sparkles className="w-3 h-3" /> Secure Gate
              </span>
              <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
                Welcome Back.
              </h2>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-2">
                Access your natural batch tracking profile and organic orders catalog.
              </p>
            </div>

            {/* Input Target Submissions */}
            <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-4 w-full" data-aos="fade-up" data-aos-delay="200">
              {/* Email Input Field */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-4 text-neutral-400 dark:text-neutral-500 w-5 h-5" />
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/60 dark:bg-black/30 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="flex flex-col gap-1.5 relative">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
                    Forgot secret?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-neutral-400 dark:text-neutral-500 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    disabled={isLoading}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/60 dark:bg-black/30 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm disabled:opacity-50"
                  />
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors focus:outline-none disabled:opacity-30"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Operations Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0e100e] font-bold py-4 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-2 text-sm md:text-base group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Sign In to Account
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Bottom Register Alternative */}
            <p className="text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-6" data-aos="fade-up" data-aos-delay="300">
              New to the purity loop?{" "}
              <Link href="/auth/register" className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          {/* Footer Notice Row */}
          <div className="text-center lg:text-left pt-6 lg:pt-0" data-aos="fade-up" data-aos-delay="400">
            <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wide select-none">
              Protected by multi-tier biological encryption systems.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Cinematic Foods Visual Canvas */}
        <div className="hidden lg:block lg:col-span-7 relative overflow-hidden h-full">
          <Image
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=90"
            alt="Pristine Natural Organic Harvest Provisions"
            fill
            priority
            className="object-cover scale-102"
            sizes="60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Floating Premium Glassmorphic Quote Badge Overlay */}
          <div className="absolute bottom-12 left-12 right-12 p-8 rounded-[32px] border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl max-w-xl text-left" data-aos="fade-left" data-aos-delay="400">
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl mb-4 inline-block">
              100% Farm Verified
            </span>
            <blockquote className="text-xl font-medium tracking-tight text-white leading-relaxed">
              “Sourcing raw food elements devoid of processing chemicals alters your cognitive clarity and baseline physical performance cycles completely.”
            </blockquote>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold tracking-wide text-neutral-300 uppercase">
                The Holistic Dietitians Guild
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}