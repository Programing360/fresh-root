"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Star, Eye, Heart, ShoppingCart, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types/product";
import { addToCart, addToWishlist, removeFromWishlist } from "@/lib/api/cart";
import Link from "next/link";


const ITEMS_PER_PAGE = 4;

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const [wishlisted, setWishlisted] = useState<Set<string>>(new Set());
  const [loadingCartId, setLoadingCartId] = useState<string | null>(null);
  const [loadingWishlistId, setLoadingWishlistId] = useState<string | null>(null);

  // Dynamic category list derived from the actual product data
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category)));
    return ["All", ...unique];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      activeCategory === "All" ? true : product.category === activeCategory
    );
  }, [products, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = currentPage * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  const goPrev = () => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  const goNext = () => setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));

  const handleAddToCart = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingCartId(productId);
    try {
      await addToCart(productId, 1);
      // এখানে চাইলে toast notification দেখাতে পারো (e.g. react-hot-toast)
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCartId(null);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setLoadingWishlistId(productId);
    const isWishlisted = wishlisted.has(productId);

    try {
      if (isWishlisted) {
        await removeFromWishlist(productId);
        setWishlisted((prev) => {
          const next = new Set(prev);
          next.delete(productId);
          return next;
        });
      } else {
        await addToWishlist(productId);
        setWishlisted((prev) => new Set(prev).add(productId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWishlistId(null);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER AND CATEGORY NAVIGATION FILTER ROW */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-4 border-b border-neutral-100 dark:border-neutral-900">
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
          Featured Products
        </h2>
        
        <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold tracking-wide rounded-full transition-all duration-200 outline-none ${
                  isActive
                    ? "bg-[#558223] text-white shadow-sm"
                    : "text-neutral-600 hover:text-[#558223] dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </nav>
      </div>

      {/* DYNAMIC CARDS GRID MATRIX */}
      {paginatedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-neutral-200 rounded-2xl dark:border-neutral-800">
          <p className="text-neutral-400 font-medium">No products found in this category.</p>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedProducts.map((product) => {
              const priceDisplay = product.discountPrice ?? product.price;
              const showOldPrice = product.discountPrice != null;
              const isWishlisted = wishlisted.has(product._id);

              return (
                <motion.div
                  layout
                  key={product._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="group relative flex flex-col justify-between bg-[#f9f9f9] dark:bg-neutral-900/40 rounded-xl p-5 border border-transparent hover:border-neutral-200/60 dark:hover:border-neutral-800 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                    {showOldPrice ? (
                      <span className="bg-[#78b32e] text-white text-xs font-bold px-2 py-0.5 rounded pointer-events-auto">
                        {Math.round(((product.price - product.discountPrice!) / product.price) * 100)}%
                      </span>
                    ) : (
                      <div />
                    )}
                    
                    <span className="bg-white/90 dark:bg-neutral-900/90 shadow-sm border border-neutral-100 dark:border-neutral-800 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 pointer-events-auto">
                      <Star className="fill-amber-400 text-amber-400" size={12} />
                      {product.rating.toFixed(2)}
                    </span>
                  </div>

                  <div className="relative aspect-square w-full flex items-center justify-center p-4 mt-4 mb-6">
                    <div className="relative w-full h-full max-h-[140px] aspect-square transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 mb-1">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-sm font-bold text-[#558223]">
                        ৳{priceDisplay.toFixed(2)}
                      </span>
                      {showOldPrice && (
                        <span className="text-xs font-medium text-neutral-400 line-through">
                          ৳{product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={(e) => handleAddToCart(e, product._id)}
                        disabled={loadingCartId === product._id}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#edf4e6] hover:bg-[#558223] text-[11px] font-bold tracking-wide text-[#558223] hover:text-white transition-colors duration-200 disabled:opacity-50"
                      >
                        {loadingCartId === product._id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <ShoppingCart size={12} />
                        )}
                        Add to cart
                      </button>

                      <div className="flex items-center gap-1.5">
                        <Link href={`/shop/${product._id}`}>
                          <button
                          aria-label="Quick view item"
                          className="p-2 rounded-full bg-[#edf4e6] hover:bg-[#558223] text-[#558223] hover:text-white transition-colors duration-200"
                        >
                          <Eye size={13} />
                        </button>
                        </Link> 
                        <button
                          onClick={(e) => handleToggleWishlist(e, product._id)}
                          disabled={loadingWishlistId === product._id}
                          aria-label="Toggle wishlist"
                          className={`p-2 rounded-full transition-colors duration-200 disabled:opacity-50 ${
                            isWishlisted
                              ? "bg-[#558223] text-white"
                              : "bg-[#edf4e6] hover:bg-[#558223] text-[#558223] hover:text-white"
                          }`}
                        >
                          {loadingWishlistId === product._id ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Heart size={13} className={isWishlisted ? "fill-white" : ""} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* BOTTOM PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-12">
          <button
            onClick={goPrev}
            disabled={currentPage === 0}
            aria-label="Previous page"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-[#558223] hover:text-white hover:border-[#558223] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                aria-label={`Go to page ${index + 1}`}
                className={`h-1 rounded-full transition-all ${
                  currentPage === index
                    ? "w-6 bg-[#558223]"
                    : "w-5 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentPage === totalPages - 1}
            aria-label="Next page"
            className="p-2 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:bg-[#558223] hover:text-white hover:border-[#558223] disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}