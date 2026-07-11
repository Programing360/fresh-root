import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Rating from "./Rating";
import QuantitySelector from "./QuantitySelector";
import ProductMeta from "./ProductMeta";
import { ProductDetail } from "@/types/product";

interface ProductInfoProps {
  product: ProductDetail;
  onAddToCart: (quantity: number) => void;
}

export default function ProductInfo({ product, onAddToCart }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col h-full justify-between p-6 md:p-10">
      <div className="space-y-5">
        {/* Header Block Title & Star Assembly */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white font-serif">
            {product.title}
          </h2>
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        {/* Dynamic Premium Pricing Layer */}
        <p className="text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
          {product.price}
        </p>

        {/* Dynamic Copywriting Description Block */}
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {product.description}
        </p>

        {/* Actions Segment: Selector + Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 pt-2">
          <QuantitySelector quantity={quantity} onChange={setQuantity} />
          
          <button
            type="button"
            onClick={() => onAddToCart(quantity)}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#76A81B] px-6 py-3 text-sm font-bold tracking-wide text-white shadow-md transition-all hover:bg-[#638d16] active:scale-[0.98]"
          >
            <ShoppingCart size={16} />
            Add to cart
          </button>
        </div>
      </div>

      {/* Structured Minimal Divider Line */}
      <hr className="my-6 border-neutral-200/80 dark:border-neutral-800" />

      {/* Meta Technical Metadata Attributes Container */}
      <ProductMeta
        sku={product.sku}
        category={product.category}
        tags={product.tags}
        specifications={product.specifications}
      />
    </div>
  );
}