"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  GitCompare,
  Heart,
  Maximize2,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { FaFacebook, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa";

interface ShopDetailsPageProps {
  shopProduct: Product;
  relatedProducts?: Product[];
}

export default function ShopDetailsPage({
  shopProduct,
  relatedProducts = [],
}: ShopDetailsPageProps) {
  const product = shopProduct;
  const [quantity, setQuantity] = useState<number>(1);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Gallery images: fall back to the single `image` field if `images` array is empty
  const galleryImages = product.images?.length ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState<string>(galleryImages[0]);

  const incrementQty = () => setQuantity((prev) => prev + 1);
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const priceDisplay = product.discountPrice
    ? `৳${product.discountPrice}`
    : `৳${product.price}`;

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100">
      {/* HERO BANNER */}
      <div className="relative h-64 w-full flex flex-col items-center justify-center overflow-hidden bg-neutral-900">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1600&auto=format&fit=crop"
          alt="Shop Header Background"
          fill
          priority
          className="object-cover opacity-45 select-none"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="serif-font text-4xl sm:text-5xl font-bold tracking-wide text-white drop-shadow-sm mb-3">
            Shop
          </h1>
          <nav className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-200/90">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <span className="text-neutral-400">»</span>
            <Link href="/shop" className="hover:text-emerald-400 transition-colors">Products</Link>
            <span className="text-neutral-400">»</span>
            <span className="text-emerald-400 font-bold">{product.title}</span>
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square w-full rounded-2xl border border-neutral-100 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/20 p-8 flex items-center justify-center group overflow-hidden">
              <button className="absolute top-4 right-4 p-2.5 rounded-full bg-white dark:bg-neutral-900 text-neutral-400 dark:text-neutral-500 shadow-sm border border-neutral-100 dark:border-neutral-800 opacity-0 group-hover:opacity-100 transition-all hover:text-emerald-500 dark:hover:text-emerald-400 z-10">
                <Maximize2 size={16} />
              </button>
              <div className="relative w-full h-full max-w-[380px] aspect-square transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className="object-contain mix-blend-multiply dark:mix-blend-normal rounded-xl"
                />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    aria-label={`View image ${index + 1}`}
                    className={`relative h-20 w-20 shrink-0 rounded-xl border-2 p-1.5 transition-all ${
                      activeImage === img
                        ? "border-emerald-600 shadow-sm"
                        : "border-neutral-200 dark:border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }`}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={img}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col">
            <h2 className="serif-font text-3xl sm:text-4xl font-bold tracking-wide text-neutral-900 dark:text-neutral-50">
              {product.title}
            </h2>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-neutral-200 dark:text-neutral-700"
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">
                ({product.reviewCount} customer review{product.reviewCount !== 1 ? "s" : ""})
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <p className="serif-font text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                {priceDisplay}
              </p>
              {product.discountPrice && (
                <p className="text-base text-neutral-400 line-through">৳{product.price}</p>
              )}
            </div>

            <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
              {product.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-b border-dashed border-neutral-200 dark:border-neutral-800 pb-8">
              <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 p-1">
                <button
                  onClick={decrementQty}
                  className="p-2 rounded-lg text-neutral-500 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  {quantity}
                </span>
                <button
                  onClick={incrementQty}
                  className="p-2 rounded-lg text-neutral-500 hover:bg-white dark:hover:bg-neutral-800 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                disabled={!product.availability}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#70a32a] hover:bg-[#5f8b23] disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold tracking-wide text-white transition-colors shadow-sm"
              >
                <ShoppingCart size={16} />
                {product.availability ? "Add to cart" : "Unavailable"}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff6f00] hover:bg-[#e66400] text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-colors">
                <GitCompare size={14} />
                Compare
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 transition-colors">
                <Heart size={14} className="text-neutral-400" />
                Add to wishlist
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-900 space-y-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <p><span className="font-bold text-neutral-700 dark:text-neutral-300">Category:</span> {product.category}</p>
              {/* <p><span className="font-bold text-neutral-700 dark:text-neutral-300">Cuisine:</span> {product?.cuisine}</p> */}
              <p><span className="font-bold text-neutral-700 dark:text-neutral-300">Delivery Time:</span> 3 days</p>
              {/* <p><span className="font-bold text-neutral-700 dark:text-neutral-300">Ingredients:</span> {product?.ingredients.join(", ")}</p> */}
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-900 flex items-center gap-3">
              <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">Share:</span>
              <div className="flex items-center gap-2 text-neutral-400 dark:text-neutral-500">
                <a href="#" className="hover:text-emerald-500 transition-colors"><FaFacebook size={14} /></a>
                <a href="#" className="hover:text-emerald-500 transition-colors"><FaTwitter size={14} /></a>
                <a href="#" className="hover:text-emerald-500 transition-colors"><FaPinterest size={14} /></a>
                <a href="#" className="hover:text-emerald-500 transition-colors"><FaLinkedin size={14} /></a>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-neutral-200/60 dark:border-neutral-800/80">
            <h3 className="serif-font text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8 text-center sm:text-left">
              Related Products
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                  viewMode="grid"
                  isHovered={hoveredCard === relatedProduct._id}
                  onHoverStart={() => setHoveredCard(relatedProduct._id)}
                  onHoverEnd={() => setHoveredCard(null)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}