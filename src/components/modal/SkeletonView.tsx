import React from "react";

export default function SkeletonView() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 animate-pulse w-full h-full">
      {/* Left Gallery Plate Shimmer */}
      <div className="relative flex aspect-square w-full items-center justify-center bg-neutral-100 p-8 dark:bg-neutral-800/50 md:h-full md:aspect-auto">
        <div className="h-64 w-64 rounded-xl bg-neutral-200 dark:bg-neutral-700/60" />
        <div className="absolute bottom-6 flex gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-2 w-2 rounded-full bg-neutral-200 dark:bg-neutral-700/60" />
          ))}
        </div>
      </div>

      {/* Right Data Array Information Plate Shimmer */}
      <div className="flex flex-col justify-between p-6 md:p-10 space-y-6">
        <div className="space-y-4">
          <div className="h-8 w-3/4 rounded-lg bg-neutral-200 dark:bg-neutral-700/60" />
          <div className="h-4 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700/60" />
          <div className="h-6 w-1/4 rounded bg-neutral-200 dark:bg-neutral-700/60" />
          
          <div className="space-y-2 pt-2">
            <div className="h-3.5 w-full rounded bg-neutral-200 dark:bg-neutral-700/60" />
            <div className="h-3.5 w-full rounded bg-neutral-200 dark:bg-neutral-700/60" />
            <div className="h-3.5 w-4/5 rounded bg-neutral-200 dark:bg-neutral-700/60" />
          </div>

          <div className="flex gap-4 pt-4">
            <div className="h-11 w-32 rounded-lg bg-neutral-200 dark:bg-neutral-700/60" />
            <div className="h-11 flex-1 rounded-lg bg-neutral-200 dark:bg-neutral-700/60" />
          </div>
        </div>

        <div className="border-t border-neutral-200/80 dark:border-neutral-800 pt-4 space-y-3">
          <div className="h-4 w-1/2 rounded bg-neutral-200 dark:bg-neutral-700/60" />
          <div className="h-4 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700/60" />
          <div className="h-4 w-1/3 rounded bg-neutral-200 dark:bg-neutral-700/60" />
        </div>
      </div>
    </div>
  );
}