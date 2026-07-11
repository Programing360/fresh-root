import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-2xl bg-neutral-50 p-6 md:h-full md:aspect-auto md:rounded-l-2xl md:rounded-tr-none dark:bg-neutral-900/40">
      {/* Main Image Slider Panel */}
      <div className="relative h-full w-full max-w-[340px] max-h-[340px] md:max-w-[400px] md:max-h-[400px]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="group relative h-full w-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`Product preview perspective ${currentIndex + 1}`}
              fill
              priority
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105 dark:mix-blend-normal"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows with Glassmorphism */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200/50 bg-white/70 p-2.5 text-neutral-700 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:scale-105 active:scale-95 dark:border-neutral-800/50 dark:bg-neutral-950/70 dark:text-neutral-300 dark:hover:bg-neutral-950"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-neutral-200/50 bg-white/70 p-2.5 text-neutral-700 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:scale-105 active:scale-95 dark:border-neutral-800/50 dark:bg-neutral-950/70 dark:text-neutral-300 dark:hover:bg-neutral-950"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Interactive Pagination Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-5 bg-neutral-800 dark:bg-neutral-200"
                  : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}