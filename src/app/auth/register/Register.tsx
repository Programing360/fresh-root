"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckSquare,
  Loader2,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Register(): React.JSX.Element {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms || isLoading) return;

    setIsLoading(true);
    const toastId = toast.loading("Creating your secure profile...");

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/",
      });

      if (error) {
        toast.update(toastId, {
          render: error.message || "Registration failed. Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        setIsLoading(false);
        return;
      }

      toast.update(toastId, {
        render: "Account created successfully! Redirecting home...",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.message || "An unexpected networking issue occurred.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!agreeTerms) {
      toast.error("Please agree to the guidelines first!");
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    const toastId = toast.loading("Connecting to Google Secure Gate...");

    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        toast.update(toastId, {
          render: error.message || "Google Sign-In failed.",
          type: "error",
          isLoading: false,
          autoClose: 4000,
        });
        setIsLoading(false);
        return;
      }
      console.log(data);
      if (data) {
        router.push("/");
      }

      toast.update(toastId, {
        render: "Google authentication approved!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (err: any) {
      toast.update(toastId, {
        render: err?.message || "Failed to initialize Google Sign-In.",
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#f9f9f6] dark:bg-[#0e100e] text-[#1c1e1c] dark:text-neutral-100 transition-colors duration-500 overflow-hidden relative mt-10">
      {/* Premium Ambient Background Mesh Glows */}
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/5 pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[130px] dark:bg-teal-500/5 pointer-events-none" />

      {/* Main Grid Structure Layout */}
      <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* LEFT COLUMN: Registration Interface Box */}
        <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-white/20 dark:bg-[#141614]/10 backdrop-blur-xl border-r border-neutral-300/40 dark:border-neutral-900/40 w-full relative z-20">
          {/* Top Branding Section */}
          <div
            className="flex items-center justify-between w-full mb-10 lg:mb-0"
            data-aos="fade-down"
          >
            <Link
              href="/"
              className="flex items-center gap-2 group font-black text-xl tracking-tight text-neutral-900 dark:text-neutral-50"
            >
              <span className="w-8 h-8 rounded-lg bg-emerald-700 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-black font-black text-base group-hover:rotate-6 transition-transform">
                🌿
              </span>
              fresh
              <span className="text-emerald-700 dark:text-emerald-400">
                Root
              </span>
            </Link>
          </div>

          {/* Form Content Wrapper */}
          <div className="max-w-md w-full mx-auto my-auto flex flex-col justify-center">
            <div className="w-full" data-aos="fade-up" data-aos-delay="100">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-700/10 dark:bg-emerald-400/10 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
                <Sparkles className="w-3 h-3" /> Join The Movement
              </span>
              <h2 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-50">
                Create Your Account
              </h2>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mt-2">
                Gain instant access to unadulterated food elements and
                transparent trace archives.
              </p>
            </div>

            {/* Registration Form Submission Box */}
            <form
              onSubmit={handleRegister}
              className="mt-8 flex flex-col gap-4 w-full"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {/* Full Name Input Field */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 text-neutral-400 dark:text-neutral-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    placeholder="MD Limon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/60 dark:bg-black/30 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm disabled:opacity-50"
                  />
                </div>
              </div>

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
                    placeholder="limon@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-300/80 dark:border-neutral-800 bg-white/60 dark:bg-black/30 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="flex flex-col gap-1.5 relative">
                <label className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                  Password
                </label>
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

              {/* Custom Policy / Terms Checkbox */}
              <div className="flex items-start gap-3 mt-1 select-none">
                <label className="relative flex items-center mt-0.5 cursor-pointer">
                  <input
                    type="checkbox"
                    disabled={isLoading}
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded-md border-2 border-neutral-300 dark:border-neutral-700 bg-white/40 dark:bg-black/20 peer-checked:bg-emerald-700 dark:peer-checked:bg-emerald-500 peer-checked:border-transparent flex items-center justify-center transition-all peer-disabled:opacity-40">
                    <CheckSquare
                      size={14}
                      className="text-white dark:text-[#0e100e] opacity-0 peer-checked:opacity-100 transition-opacity"
                    />
                  </div>
                </label>
                <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 leading-tight">
                  I agree to the strict food integrity guidelines, consumer
                  safety protocols, and privacy clauses.
                </span>
              </div>

              {/* Primary Sign Up Action Button */}
              <button
                type="submit"
                disabled={!agreeTerms || isLoading}
                className="w-full bg-emerald-700 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0e100e] disabled:opacity-50 disabled:cursor-not-allowed font-bold py-4 rounded-2xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-2 text-sm md:text-base group cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    Create Free Account
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>

              {/* Divider Line */}
              <div className="flex items-center gap-3 my-2 text-neutral-400 dark:text-neutral-600">
                <div className="h-[1px] w-full bg-neutral-300/60 dark:bg-neutral-800" />
                <span className="text-[10px] font-bold tracking-widest uppercase shrink-0">
                  Or Join With
                </span>
                <div className="h-[1px] w-full bg-neutral-300/60 dark:bg-neutral-800" />
              </div>

              {/* Google Sign In Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={!agreeTerms || isLoading}
                className="w-full py-3.5 px-4 rounded-2xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black/20 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all font-bold text-sm flex items-center justify-center gap-3 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    className="text-[#4285F4]"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    className="text-[#34A853]"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    className="text-[#FBBC05]"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    className="text-[#EA4335]"
                  />
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Alternative Login Path Anchor */}
            <p
              className="text-center text-xs font-semibold text-neutral-500 dark:text-neutral-400 mt-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Already have an verified profile?{" "}
              <Link
                href="/auth/login"
                className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
              >
                Sign in instead
              </Link>
            </p>
          </div>

          {/* Privacy Integrity Badge Footer row */}
          <div
            className="text-center lg:text-left pt-6 lg:pt-0"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="text-[10px] font-semibold text-neutral-400 dark:text-neutral-500 tracking-wide select-none">
              Your data is completely siloed and encrypted via biomorphic
              protocols.
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Splendid Organic Foods Banner Section */}
        <div className="hidden lg:block lg:col-span-7 relative overflow-hidden h-full">
          <Image
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=90"
            alt="Organic Harvest Grains, Raw Jaggery, Honey & Ghee"
            fill
            priority
            className="object-cover scale-102"
            sizes="60vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Glassmorphic Floating Testimonial Panel */}
          <div
            className="absolute bottom-12 left-12 right-12 p-8 rounded-[32px] border border-white/10 bg-black/20 backdrop-blur-xl shadow-2xl max-w-xl text-left"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl mb-4 inline-block">
              Absolute Food Traceability
            </span>
            <blockquote className="text-xl font-medium tracking-tight text-white leading-relaxed">
              “Consuming foods in their raw, unaltered physical states optimizes
              cell lifecycle repair speeds and significantly diminishes
              biological inflammation spikes.”
            </blockquote>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold tracking-wide text-neutral-300 uppercase">
                Molecular Biology Agriculture Council
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
