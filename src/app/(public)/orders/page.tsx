"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 

  Package, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Inbox, 
  Clock, 
  HelpCircle 
} from 'lucide-react';
import Link from 'next/link';

// ==========================================
// 1. DATA SCHEMAS & INTERFACES
// ==========================================
interface OrderDetails {
  orderId: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered';
  totalAmount: string;
  paymentMethod: string;
  itemsCount: number;
}

export default function OrderPage() {
  // Simulate order availability. 
  // Change itemsCount to 0 to dynamically test the premium empty state card view.
  const [order, setOrder] = useState<OrderDetails | null>({
    orderId: "FH-98342-AMAR",
    date: "July 12, 2026",
    status: "processing",
    totalAmount: "$124.50",
    paymentMethod: "Credit Card (Visa)",
    itemsCount: 0, // <-- Set to 0 to trigger the requested empty card layout
  });

  // Animation Variant Blueprints
  const cardVariants:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0b0f19] text-neutral-900 dark:text-neutral-100 px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* ==========================================
            HEADER ARCHITECTURE
            ========================================== */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-900 dark:text-white">
            Order Workspace
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Monitor transaction streams, tracking data updates, and logistical manifest status.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {(!order || order.itemsCount === 0) ? (
            
            // ==========================================
            // 2. PREMIUM EMPTY CARD SECTION (NO PRODUCTS)
            // ==========================================
            <motion.div
              key="empty-state"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="relative overflow-hidden rounded-2xl border border-neutral-200/70 bg-white/80 p-8 text-center shadow-xl backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-900/60 sm:p-12"
            >
              {/* Decorative Subtle Gradient Background Accent */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

              {/* Central Premium Icon Container */}
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 text-neutral-400 dark:text-neutral-600 mb-6">
                <Inbox size={26} strokeWidth={1.5} />
              </div>

              <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Your order container is empty
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                There are currently no product parcels mapped to this transaction log profile. Browse our organic selections to populate this field list.
              </p>

              {/* Action Link Button */}
              <div className="mt-8">
                <Link href={'/shop'}>
                  <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-emerald-600 text-xs font-bold uppercase tracking-wider text-white shadow-md dark:bg-white dark:text-black dark:hover:bg-emerald-500 dark:hover:text-white transition-colors duration-200"
                >
                  Explore Showcase Products
                  <ArrowRight size={14} />
                </motion.button>
                </Link>
              </div>
            </motion.div>

          ) : (

            // ==========================================
            // 3. PREMIUM ACTIVE ORDER METADATA PANEL
            // ==========================================
            <motion.div
              key="active-order"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Core Order Metadata Overview Card */}
              <div className="rounded-2xl border border-neutral-200/70 bg-white p-6 shadow-md dark:border-neutral-800/60 dark:bg-neutral-900/40">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-5">
                  <div>
                    <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      Reference Number
                    </span>
                    <p className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                      {order.orderId}
                    </p>
                  </div>
                  <div className="flex gap-3 sm:text-right">
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                        Date Registered
                      </span>
                      <p className="text-sm font-medium mt-0.5 text-neutral-700 dark:text-neutral-300">
                        {order.date}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Timeline Vector Matrix */}
                <div className="mt-8 px-2">
                  <div className="relative flex items-center justify-between w-full">
                    {/* Background Progress Tracks */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-neutral-100 dark:bg-neutral-800 -z-10" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-0.5 bg-emerald-500 -z-10" />

                    {/* Step 1: Placed */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-emerald-500/10 shadow-sm">
                        <Package size={14} />
                      </div>
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">Placed</span>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-emerald-500/10 shadow-sm">
                        <Clock size={14} className="animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Processing</span>
                    </div>

                    {/* Step 3: Shipped */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 flex items-center justify-center">
                        <Truck size={14} />
                      </div>
                      <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Shipped</span>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 flex items-center justify-center">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supplementary Financial Overview Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800/60 dark:bg-neutral-900/30">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Payment Structure</span>
                  <p className="text-sm font-bold mt-1 text-neutral-800 dark:text-neutral-200">{order.paymentMethod}</p>
                </div>
                <div className="rounded-xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-800/60 dark:bg-neutral-900/30">
                  <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">Total Ledger Charge</span>
                  <p className="text-base font-extrabold mt-0.5 text-[#558223]">{order.totalAmount}</p>
                </div>
              </div>

              {/* Support Hotline Info Row Link */}
              <div className="flex items-center justify-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
                <HelpCircle size={14} />
                <span>Need tracking assistance? <a href="#" className="underline hover:text-neutral-600 dark:hover:text-neutral-300">Contact Support Desk</a></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}