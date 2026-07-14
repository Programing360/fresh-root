"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Eye,

  Heart,
  Repeat,
  ShoppingCart,
} from "lucide-react";
import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductDetail {
  id: string;
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;

  category: string;
  images: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

const CATEGORY_ACCENTS: Record<string, string> = {
  Burger:
    "group-hover:border-amber-500/60 border-amber-200/60 dark:border-amber-900/30",
  Pizza:
    "group-hover:border-red-500/60 border-red-200/60 dark:border-red-900/30",
  Drinks:
    "group-hover:border-emerald-500/60 border-emerald-200/60 dark:border-emerald-900/30",
};
const DEFAULT_ACCENT =
  "group-hover:border-neutral-500/60 border-neutral-200/60 dark:border-neutral-800/40";

export default function ProductCard({
  product,
  viewMode,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: ProductCardProps) {
  const description =
    product.shortDescription ||
    "Premium quality curated item, freshly prepared and delivered with care.";

  const accentColor = CATEGORY_ACCENTS[product.category] || DEFAULT_ACCENT;

  const priceDisplay = product.discountPrice
    ? `৳${product.discountPrice}`
    : `৳${product.price}`;

  const [modalOpen, setModalOpen] = useState(false);
  const [loadingTrigger, setLoadingTrigger] = useState(false);
  const [activeProduct, setActiveProduct] = useState<ProductDetail | null>(
    null,
  );
  const [isWishlisted, setIsWishlisted] = useState(false);

  const openQuickViewModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingTrigger(true);
    setModalOpen(true);

    const detailedData: ProductDetail = {
      id: product._id,
      title: product.title,
      price: priceDisplay,
      rating: product.rating,
      reviewCount: product.reviewCount,
      description,
      category: product.category,
      images: product.images?.length ? product.images : [product.image],
    };

    setActiveProduct(detailedData);
    setTimeout(() => setLoadingTrigger(false), 500);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added to compare: ${product._id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Added to cart: ${product._id}`);
  };

  return (
    <>
      <motion.div
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
        onClick={openQuickViewModal}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${product.title}`}
        className={`group relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900/60 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 outline-none cursor-pointer flex transition-all ${
          viewMode === "grid"
            ? "flex-col justify-between h-[480px]"
            : "flex-row items-center justify-between gap-6 w-full"
        }`}
        animate={{ y: isHovered && viewMode === "grid" ? -6 : 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-500/0 to-emerald-500/0 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:from-emerald-500/5 group-hover:to-teal-500/5 backdrop-blur-[2px]" />
        <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal" />

        {/* Floating Action Icons — Compare / Wishlist / Quick View */}
        {viewMode === "grid" && (
          <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
            <button
              onClick={handleCompare}
              aria-label="Compare product"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-600 shadow-sm backdrop-blur transition-colors hover:bg-emerald-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300"
            >
              <Repeat size={14} />
            </button>
            <button
              onClick={handleWishlistToggle}
              aria-label="Add to wishlist"
              className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur transition-colors ${
                isWishlisted
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-neutral-200 bg-white/90 text-neutral-600 hover:bg-emerald-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300"
              }`}
            >
              <Heart size={14} className={isWishlisted ? "fill-white" : ""} />
            </button>
            <Link href={`/shop/${product._id}`}>
              <button
                aria-label="Quick view"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white/90 text-neutral-600 shadow-sm backdrop-blur transition-colors hover:bg-emerald-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300"
              >
                <Eye size={14} />
              </button>
            </Link>
          </div>
        )}

        <div
          className={`relative flex w-full flex-col items-center justify-between rounded-xl border border-dashed p-4 transition-colors duration-200 ${
            viewMode === "grid" ? "h-full" : "sm:flex-row text-left gap-6"
          } ${accentColor}`}
        >
          {/* Product Image Box */}
          <div
            className={`relative aspect-square w-full transition-transform duration-300 group-hover:scale-105 ${
              viewMode === "grid" ? "max-w-[130px]" : "max-w-[90px] shrink-0"
            }`}
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-w-1280px) 25vw, 33vw"
              className="object-cover mix-blend-multiply dark:mix-blend-normal rounded-lg"
            />
            {!product.availability && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                  Unavailable
                </span>
              </div>
            )}
          </div>

          {/* Product Meta & Description Engine */}
          <div
            className={`w-full flex-1 ${viewMode === "grid" ? "mt-4 text-center" : "text-left pl-2"}`}
          >
            <h3 className="serif-font text-base font-bold tracking-wide text-neutral-800 dark:text-neutral-100 line-clamp-1">
              {product.title}
            </h3>

            <div className="mt-0.5 flex items-center justify-center gap-2 [.text-left_&]:justify-start">
              <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {priceDisplay}
              </p>
              {product.discountPrice && (
                <p className="text-xs text-neutral-400 line-through">
                  ৳{product.price}
                </p>
              )}
            </div>

            <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* <div
              className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-neutral-400 dark:text-neutral-500 ${
                viewMode === "grid" ? "justify-center" : "justify-start"
              }`}
            >
              <span className="flex items-center gap-1">
      
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
      
              </span>
            </div> */}

            <div
              className={`mt-2.5 flex items-center gap-1 ${viewMode === "grid" ? "justify-center" : "justify-start"}`}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={`${
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-200 dark:text-neutral-700"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-neutral-400">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Add to Cart Button — always visible in grid mode, like the reference image */}
          {viewMode === "grid" ? (
            <button
              onClick={handleAddToCart}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 py-2.5 text-xs font-bold tracking-wider text-white shadow-md transition-colors hover:bg-emerald-700"
            >
              <ShoppingCart size={14} />
              ADD TO CART
            </button>
          ) : (
            <div className="mt-3 flex items-center gap-2 sm:mt-0">
              <button
                onClick={handleWishlistToggle}
                aria-label="Add to wishlist"
                className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-colors ${
                  isWishlisted
                    ? "border-emerald-600 bg-emerald-600 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:bg-emerald-600 hover:text-white dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
                }`}
              >
                <Heart size={14} className={isWishlisted ? "fill-white" : ""} />
              </button>
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold tracking-wider text-white shadow-md transition-colors hover:bg-emerald-700"
              >
                <ShoppingCart size={14} />
                ADD TO CART
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* <ProductQuickViewModal
        isOpen={modalOpen}
        isLoading={loadingTrigger}
        product={activeProduct}
        onClose={() => {
          setModalOpen(false);
          setTimeout(() => setActiveProduct(null), 200);
        }}
        onAddToCart={(productId, quantity) => {
          console.log(
            `Dispatched allocation stream: ID: ${productId} | Quantity: ${quantity}`,
          );
        }}
      /> */}
    </>
  );
}
