import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Eye, MapPin, Calendar } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  rating: number;
  image: string;
  category: string;
  accentColor: string;
  description?: string;
  location?: string;
  date?: string;
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export default function ProductCard({
  product,
  viewMode,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: ProductCardProps) {
  // Default values handling unprovided optional fields cleanly
  const description = product.description || "Premium quality curated item, organically harvested and locally handled with care.";
  const location = product.location || "Dhaka, Bangladesh";
  const date = product.date || "Available Now";

  return (
    <motion.div
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.name}`}
      className={`group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/60 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 outline-none cursor-pointer flex transition-all ${
        viewMode === "grid" ? "flex-col justify-between h-[440px]" : "flex-row items-center justify-between gap-6 w-full"
      }`}
      animate={{ y: isHovered && viewMode === "grid" ? -6 : 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Premium Glassmorphism Hover Effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-500/0 to-emerald-500/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 backdrop-blur-[2px]" />
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal" />

      {/* Internal Layout Card Content Wrapper */}
      <div
        className={`relative flex w-full flex-col items-center justify-between rounded-xl border border-dashed p-4 transition-colors duration-200 ${
          viewMode === "grid" ? "h-full" : "sm:flex-row text-left gap-6"
        } ${product.accentColor}`}
      >
        {/* Product Image Box */}
        <div
          className={`relative aspect-square w-full transition-transform duration-300 group-hover:scale-105 ${
            viewMode === "grid" ? "max-w-[130px]" : "max-w-[90px] shrink-0"
          }`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-w-1280px) 25vw, 33vw"
            className="object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg"
          />
        </div>

        {/* Product Meta & Description Engine */}
        <div className={`w-full flex-1 ${viewMode === "grid" ? "mt-4 text-center" : "text-left pl-2"}`}>
          <h3 className="serif-font text-base font-bold tracking-wide text-neutral-800 dark:text-neutral-100 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="mt-0.5 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {product.priceDisplay}
          </p>

          {/* Short Functional Product Description */}
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Secondary Context Meta Array Container */}
          <div className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-400 dark:text-neutral-500 ${
            viewMode === "grid" ? "justify-center" : "justify-start"
          }`}>
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {location}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {date}
            </span>
          </div>
          
          {/* Star Rating Render Layout */}
          <div className={`mt-2.5 flex gap-0.5 ${viewMode === "grid" ? "justify-center" : "justify-start"}`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={`${
                  i < product.rating
                    ? "fill-amber-400 text-amber-400"
                    : "text-neutral-200 dark:text-neutral-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Height Preserving Spacer block */}
        {viewMode === "grid" && <div className="h-9 w-full" />}

        {/* Action Call To Action View Details Slide Over Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center justify-center gap-2 border border-white/20 bg-neutral-900/80 px-4 py-2 text-[11px] font-bold tracking-wider text-white shadow-xl backdrop-blur-md transition-colors hover:bg-emerald-600 dark:bg-neutral-100 dark:text-black dark:hover:bg-emerald-500 dark:hover:text-white ${
                viewMode === "grid" ? "absolute bottom-4 left-4 right-4 rounded-xl" : "relative rounded-lg shrink-0 mt-3 sm:mt-0"
              }`}
            >
              <Eye size={13} />
              SEE DETAILS
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}