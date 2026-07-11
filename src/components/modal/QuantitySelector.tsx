import React from "react";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({ quantity, onChange }: QuantitySelectorProps) {
  const decrement = () => quantity > 1 && onChange(quantity - 1);
  const increment = () => onChange(quantity + 1);

  return (
    <div className="flex items-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-sm">
      <button
        type="button"
        onClick={decrement}
        className="flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span className="w-10 text-center text-sm font-semibold select-none text-neutral-800 dark:text-neutral-200">
        {quantity}
      </span>
      <button
        type="button"
        onClick={increment}
        className="flex h-11 w-11 items-center justify-center text-neutral-500 transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}