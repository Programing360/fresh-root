"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, LayoutGrid, List, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Product } from "@/types/product";
import { allProducts } from "@/lib/api/products";

interface ShopPageProps {
  initialProducts: Product[]; 
}

export default function ShopPage({ initialProducts }: ShopPageProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState<boolean>(false);

  // console.log(searchQuery);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialProducts.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [initialProducts]);

  const allCategories = useMemo(() => {
    return Array.from(new Set(initialProducts.map((p) => p.category)));
  }, [initialProducts]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setIsLoading(true);
      try {
        
        const response = await allProducts({
          category: selectedCategory || undefined,
          sort: sortBy,
          search: searchQuery.trim() || undefined,
        });
      
        if (response && Array.isArray(response)) {
          setProducts(response);
        }
      } catch (error) {
        console.error("Failed to fetch filtered products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFilteredProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fcfcfb] text-neutral-800 dark:bg-[#111c1e] dark:text-neutral-100">
      
      {/* Premium Hero Shop Banner */}
      <div className="relative h-[340px] w-full overflow-hidden bg-emerald-950">
        <Image
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
          alt="Shop Banner"
          fill
          priority
          className="object-cover opacity-35 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fcfcfb]/30 dark:to-[#0c0e0c]/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="serif-font text-4xl sm:text-5xl font-bold tracking-wide text-white mb-2">Shop Layout</h1>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-300">
            <span className="text-white/70">Home</span>
            <span>»</span>
            <span className="text-emerald-400">Products</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-neutral-200/60 dark:border-neutral-800/60 pb-6">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing <span className="font-semibold text-neutral-800 dark:text-neutral-200">{products.length}</span> results
            {selectedCategory && (
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
                {selectedCategory}
                <button onClick={() => setSelectedCategory(null)} className="font-bold hover:text-emerald-900">×</button>
              </span>
            )}
          </p>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-xl border border-neutral-200 p-1 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
              <button 
                onClick={() => setViewMode("grid")}
                className={`rounded-lg p-1.5 transition-colors ${viewMode === "grid" ? "bg-neutral-100 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400" : "text-neutral-400 hover:text-neutral-600"}`} 
                aria-label="Grid View"
              >
                <LayoutGrid size={16} />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`rounded-lg p-1.5 transition-colors ${viewMode === "list" ? "bg-neutral-100 dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400" : "text-neutral-400 hover:text-neutral-600"}`} 
                aria-label="List View"
              >
                <List size={16} />
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center justify-between gap-8 rounded-xl border border-neutral-200 px-4 py-2 text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm transition-transform"
              >
                <span className="text-neutral-600 dark:text-neutral-300 capitalize">
                  Sort by: {sortBy.replace(/-/g, " ")}
                </span>
                <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-200 ${isSortDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isSortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-1.5 w-48 rounded-xl border border-neutral-200 bg-white p-1.5 shadow-xl dark:border-neutral-800 dark:bg-neutral-900 z-20"
                    >
                      {[
                        { key: "latest", label: "Latest Products" },
                        { key: "low-to-high", label: "Price: Low to High" },
                        { key: "high-to-low", label: "Price: High to Low" },
                        { key: "rating", label: "Top Rated" }
                      ].map((option) => (
                        <button
                          key={option.key}
                          onClick={() => {
                            setSortBy(option.key);
                            setIsSortDropdownOpen(false);
                          }}
                          className={`w-full text-left rounded-lg px-3 py-2 text-xs font-medium transition-colors ${sortBy === option.key ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400" : "text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800"}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex items-center min-w-[220px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full rounded-xl border border-neutral-200 py-2 pl-4 pr-10 text-sm outline-none focus:border-emerald-500 bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm transition-colors"
              />
              <Search size={15} className="absolute right-3.5 text-neutral-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "flex flex-col gap-4"
              }>
                {[...Array(8)].map((_, index) => (
                  <SkeletonCard key={index} viewMode={viewMode} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-neutral-200 rounded-2xl dark:border-neutral-800">
                <p className="text-neutral-400 font-medium">No products found matching your parameters.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory(null); }} 
                  className="mt-4 text-xs font-bold text-emerald-600 hover:underline"
                >
                  Reset Active Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "flex flex-col gap-4"
              }>
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                    isHovered={hoveredCard === product._id}
                    onHoverStart={() => setHoveredCard(product._id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  />
                ))}
              </div>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/30 sticky top-6">
              <h2 className="serif-font text-lg font-bold tracking-wide text-neutral-800 dark:text-neutral-100 pb-2 border-b-2 border-emerald-500 max-w-max mb-5">
                Categories
              </h2>
              
              <ul className="flex flex-col">
                {allCategories.map((categoryName) => {
                  const isSelected = selectedCategory === categoryName;
                  return (
                    <li
                      key={categoryName}
                      onClick={() => setSelectedCategory(isSelected ? null : categoryName)}
                      className={`flex items-center justify-between border-b border-neutral-100 py-3 text-[13px] font-semibold transition-all cursor-pointer group dark:border-neutral-800/40 ${
                        isSelected 
                          ? "text-emerald-600 dark:text-emerald-400 translate-x-1" 
                          : "text-neutral-600 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`text-xs transition-colors ${isSelected ? "text-emerald-500 font-bold" : "text-neutral-300 group-hover:text-emerald-500"}`}>
                          {isSelected ? "•" : "›"}
                        </span>
                        {categoryName}
                      </span>
                      <span className={`rounded px-2 py-0.5 text-[11px] font-bold transition-colors ${
                        isSelected 
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" 
                          : "bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500"
                      }`}>
                        {categoryCounts[categoryName] || 0}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}