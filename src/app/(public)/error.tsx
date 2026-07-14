"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

interface ErrorPageProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const router = useRouter();
  const errorCodeRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log the error securely if passed from Next.js global error boundaries
    if (error) {
      console.error("Caught system runtime boundary exception:", error);
    }

    // Initialize AOS Entrance animations
    AOS.init({
      duration: 800,
      once: true,
    });

    // High-fidelity GSAP floating/wobble animation for the "404" or "Oops" text
    if (errorCodeRef.current) {
      gsap.to(errorCodeRef.current, {
        y: -15,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }
  }, [error]);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 selection:bg-danger/20"
    >
      <div 
        data-aos="zoom-in" 
        className="w-full max-w-md text-center space-y-6 sm:space-y-8"
      >
        {/* Animated Main Error Hero Graphic */}
        <div className="relative select-none py-4">
          <h1 
            ref={errorCodeRef}
            className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-default-600 via-default-400 to-default-200 dark:from-default-300 dark:via-default-500 dark:to-background drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
          >
            Oops!
          </h1>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
        </div>

        {/* Content Section */}
        <div className="space-y-3 px-2">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Something went sideways here
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            The page you are trying to reach does not post exist, or an unexpected runtime exception interrupted the server processing route.
          </p>
          
          {error?.digest && (
            <p className="text-xs font-mono bg-default-100 dark:bg-default-50 text-danger-500 rounded-lg py-1 px-2 inline-block mt-2">
              ID: {error.digest}
            </p>
          )}
        </div>

        {/* Action Button Controls Container */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {reset ? (
            // If used as error.tsx wrapper, provide a mechanism to attempt recovering the state
            <Button
              variant="primary"
              onClick={() => reset()}
              className="w-full sm:w-auto font-semibold px-6"
            >
              Try Re-rendering Route
            </Button>
          ) : (
            // Default structural navigation backward fallbacks
            <Button
              variant="primary"
              onClick={() => router.back()}
              className="w-full sm:w-auto font-medium px-6"
            >
              Go Back
            </Button>
          )}

          <Button
            variant="primary"
            onClick={() => router.push("/")}
            className="w-full sm:w-auto font-semibold px-6 shadow-md shadow-primary/20"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}