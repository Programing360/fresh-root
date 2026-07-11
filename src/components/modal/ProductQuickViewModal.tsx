"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ImageGallery from "./ImageGallery";
import ProductInfo from "./ProductInfo";
import SkeletonView from "./SkeletonView";
import { ProductDetail } from "@/types/product";

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetail | null;
  isLoading?: boolean;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductQuickViewModal({
  isOpen,
  onClose,
  product,
  isLoading = false,
  onAddToCart,
}: ProductQuickViewModalProps) {
  
  // Clean layout global escape handling setup
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleAddToCartAction = (quantity: number) => {
    if (product && onAddToCart) {
      onAddToCart(product.id, quantity);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          
          {/* Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm"
          />

          {/* Modal Architecture Window Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] md:max-w-[960px] lg:max-w-[1050px] max-h-[90vh] md:max-h-[640px] overflow-y-auto md:overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800/80 outline-none flex flex-col z-10"
            role="dialog"
            aria-modal="true"
          >
            {/* Safe Structural Close Action Switch Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-30 rounded-full border border-neutral-200/60 bg-white p-2 text-neutral-500 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100 md:right-5 md:top-5"
              aria-label="Close dialog modal view window"
            >
              <X size={16} />
            </button>

            {/* Split Data Layout Engine Handler pipeline conditional */}
            <div className="flex-1 overflow-y-auto md:overflow-hidden">
              {isLoading || !product ? (
                <SkeletonView />
              ) : (
                <div className="grid grid-cols-1 h-full md:grid-cols-2">
                  <ImageGallery images={product.images} />
                  <div className="overflow-y-auto md:max-h-[640px]">
                    <ProductInfo product={product} onAddToCart={handleAddToCartAction} />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}