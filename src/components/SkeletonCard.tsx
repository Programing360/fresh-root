import React from "react";

export default function SkeletonCard({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/60 shadow-sm flex animate-pulse ${
        viewMode === "grid" ? "flex-col justify-between h-[420px]" : "flex-row items-center gap-6 w-full"
      }`}
    >
      {/* Shimmer overlay effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-100/40 to-transparent dark:via-neutral-800/40 animate-[shimmer_1.5s_infinite]" />

      <div
        className={`relative flex w-full flex-col items-center justify-between rounded-xl border border-dashed border-neutral-200 dark:border-neutral-800 p-4 ${
          viewMode === "grid" ? "h-full" : "sm:flex-row text-left gap-4"
        }`}
      >
        {/* Image Shimmer */}
        <div className={`aspect-square w-full bg-neutral-200 dark:bg-neutral-800 rounded-lg ${
          viewMode === "grid" ? "max-w-[130px]" : "max-w-[80px]"
        }`} />

        {/* Content Shimmer */}
        <div className={`w-full flex-1 ${viewMode === "grid" ? "mt-5 flex flex-col items-center" : "pl-2"}`}>
          <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded mb-2" />
          <div className="h-3 w-1/2 bg-neutral-200 dark:bg-neutral-800 rounded mb-3" />
          
          {/* Description Lines */}
          <div className="w-full space-y-1.5 mt-2">
            <div className="h-2.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded" />
            <div className="h-2.5 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded" />
          </div>

          {/* Meta & Star Shimmer */}
          <div className="flex gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 w-3 bg-neutral-200 dark:bg-neutral-800 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}