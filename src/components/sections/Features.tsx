"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Eye, Heart, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Types & Interfaces
interface FeaturedProduct {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  category: string;
  discount?: string;
}

// 2. Mock Data matching the exact layout image
const MOCK_PRODUCTS: FeaturedProduct[] = [
  {
    id: 1,
    title: "Organic Bananas",
    price: 22.00,
    rating: 5.00,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400&auto=format&fit=crop",
    category: "Fresh Fruits",
  },
  {
    id: 2,
    title: "Organic Butter",
    price: 10.00,
    oldPrice: 15.00,
    rating: 5.00,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=400&auto=format&fit=crop",
    category: "Food Drinks",
    discount: "33%",
  },
  {
    id: 3,
    title: "Herbal Tea",
    price: 10.00,
    oldPrice: 15.00,
    rating: 5.00,
    image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=400&auto=format&fit=crop",
    category: "Food Drinks",
    discount: "33%",
  },
  {
    id: 4,
    title: "Fresh Strawberry",
    price: 22.00,
    rating: 5.00,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=400&auto=format&fit=crop",
    category: "Fresh Fruits",
  },
];

const CATEGORIES = ["All", "Food Drinks", "Fresh Fruits", "Nature", "Vegetable"];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filtering Logic
  const filteredProducts = MOCK_PRODUCTS.filter(product => 
    activeCategory === "All" ? true : product.category === activeCategory
  );

  return (
    <section className="w-full bg-white dark:bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* ==========================================
          HEADER AND CATEGORY NAVIGATION FILTER ROW
          ========================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10 pb-4 border-b border-neutral-100 dark:border-neutral-900">
        <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-neutral-50 font-sans">
          Featured Products
        </h2>
        
        {/* Dynamic Nav Tabs */}
        <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
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

      {/* ==========================================
          DYNAMIC CARDS GRID MATRIX
          ========================================== */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="group relative flex flex-col justify-between bg-[#f9f9f9] dark:bg-neutral-900/40 rounded-xl p-5 border border-transparent hover:border-neutral-200/60 dark:hover:border-neutral-800 transition-all shadow-sm hover:shadow-md"
            >
              
              {/* Badges Layout Layer (Discount & Rating) */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                {product.discount ? (
                  <span className="bg-[#78b32e] text-white text-xs font-bold px-2 py-0.5 rounded pointer-events-auto">
                    {product.discount}
                  </span>
                ) : (
                  <div />
                )}
                
                <span className="bg-white/90 dark:bg-neutral-900/90 shadow-sm border border-neutral-100 dark:border-neutral-800 rounded-full px-2 py-0.5 flex items-center gap-1 text-[11px] font-bold text-neutral-800 dark:text-neutral-200 pointer-events-auto">
                  <Star className="fill-amber-400 text-amber-400" size={12} />
                  {product.rating.toFixed(2)}
                </span>
              </div>

              {/* Product Visual Container Image */}
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

              {/* Info & Footer Elements Package */}
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 mb-1">
                  {product.title}
                </h3>

                {/* Pricing Structure Display */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-bold text-[#558223]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs font-medium text-neutral-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Actions Panel Row */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  {/* Add To Cart Simple Button */}
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#edf4e6] hover:bg-[#558223] text-[11px] font-bold tracking-wide text-[#558223] hover:text-white transition-colors duration-200">
                    <ShoppingCart size={12} />
                    Add to cart
                  </button>

                  {/* Micro Quick View and Fav Controls */}
                  <div className="flex items-center gap-1.5">
                    <button 
                      aria-label="Quick view item" 
                      className="p-2 rounded-full bg-[#edf4e6] hover:bg-[#558223] text-[#558223] hover:text-white transition-colors duration-200"
                    >
                      <Eye size={13} />
                    </button>
                    <button 
                      aria-label="Add item to wishlist" 
                      className="p-2 rounded-full bg-[#edf4e6] hover:bg-[#558223] text-[#558223] hover:text-white transition-colors duration-200"
                    >
                      <Heart size={13} />
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ==========================================
          BOTTOM CAROUSEL SLIDER DOT INDICATORS
          ========================================== */}
      <div className="flex items-center justify-center gap-2 mt-12">
        <span className="w-6 h-1 rounded-full bg-[#558223] transition-all" />
        <span className="w-5 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 transition-all" />
        <span className="w-5 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 transition-all" />
      </div>

    </section>
  );
}