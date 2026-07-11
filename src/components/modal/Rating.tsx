import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  reviewCount: number;
}

export default function Rating({ rating, reviewCount }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating
                ? "fill-amber-500 text-amber-500"
                : "text-neutral-200 dark:text-neutral-700"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-neutral-500 dark:text-neutral-400">
        ({reviewCount} customer {reviewCount === 1 ? "review" : "reviews"})
      </span>
    </div>
  );
}