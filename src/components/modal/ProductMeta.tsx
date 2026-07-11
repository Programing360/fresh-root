import React from "react";

interface ProductMetaProps {
  sku: string;
  category: string;
  tags: string[];
  specifications?: Array<{ key: string; value: string }>;
}

export default function ProductMeta({ sku, category, tags, specifications }: ProductMetaProps) {
  return (
    <div className="space-y-2.5 text-sm">
      <div className="flex items-center gap-2">
        <span className="font-bold text-neutral-800 dark:text-neutral-200 min-w-[80px]">SKU:</span>
        <span className="text-neutral-600 dark:text-neutral-400 font-mono text-[13px]">{sku}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-neutral-800 dark:text-neutral-200 min-w-[80px]">Category:</span>
        <span className="text-neutral-600 dark:text-neutral-400">{category}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-bold text-neutral-800 dark:text-neutral-200 min-w-[80px]">Tags:</span>
        <span className="text-neutral-600 dark:text-neutral-400">{tags.join(", ")}</span>
      </div>

      {specifications && specifications.length > 0 && (
        <div className="pt-2 mt-2 border-t border-dashed border-neutral-100 dark:border-neutral-800/60 space-y-2.5">
          {specifications.map((spec) => (
            <div key={spec.key} className="flex items-center gap-2">
              <span className="font-bold text-neutral-800 dark:text-neutral-200 min-w-[80px]">{spec.key}:</span>
              <span className="text-neutral-600 dark:text-neutral-400">{spec.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}