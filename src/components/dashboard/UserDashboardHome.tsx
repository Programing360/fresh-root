"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { Package, ShoppingCart, Heart, Clock, DollarSign, Users, TrendingUp, Info } from "lucide-react";
import { Product } from "@/types/product";
import { useClientSession } from "@/lib/core/session-client";


interface ProductsProps {
  shopProducts: Product[];
}
// Mock Data Matrices for Analytics Sections Engine Rendering
const SALES_MOCK_SERIES = [
  { name: "Jan", orders: 45, items: 120, revenue: 2400 },
  { name: "Feb", orders: 62, items: 190, revenue: 3800 },
  { name: "Mar", orders: 85, items: 240, revenue: 5100 },
  { name: "Apr", orders: 74, items: 210, revenue: 4600 },
  { name: "May", orders: 98, items: 310, revenue: 6800 },
  { name: "Jun", orders: 140, items: 420, revenue: 9400 },
];

const CATEGORY_DISTRIBUTION_MOCK = [
  { name: "Food Drinks", value: 45, color: "#10b981" },
  { name: "Fresh Fruits", value: 25, color: "#f59e0b" },
  { name: "Vegetables", value: 20, color: "#3b82f6" },
  { name: "Organic Ghee", value: 10, color: "#ec4899" },
];



export default function UserDashboardHomePage({shopProducts}: ProductsProps) {
  const { user } = useClientSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  console.log(shopProducts);


  const metricCards = [
    { title: "Total Products", value: `${shopProducts?.length}`, description: "Active catalog listings", trend: { value: 12, isPositive: true }, icon: Package },
    { title: "Total Orders", value: "482", description: "Completed transactions line", trend: { value: 8, isPositive: true }, icon: ShoppingCart },
    { title: "Wishlist Items", value: "93", description: "User flag tracking analytics", trend: { value: 3, isPositive: false }, icon: Heart },
    { title: "Pending Orders", value: "14", description: "Requires logistics review", trend: { value: 2, isPositive: false }, icon: Clock },
    { title: "Net Revenue", value: "$14,350", description: "Past 30-day calculation log", trend: { value: 18, isPositive: true }, icon: DollarSign },
    { title: "Active Users", value: "3,892", description: "System structural instances", trend: { value: 24, isPositive: true }, icon: Users, adminOnly: true },
  ];

  const visibleCards = metricCards.filter(card => !card.adminOnly || user?.role === "admin");

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(user?.role === "admin" ? 6 : 5)].map((_, idx) => (
            <div key={idx} className="h-32 rounded-2xl bg-neutral-200 dark:bg-neutral-900 border dark:border-neutral-800" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 rounded-2xl bg-neutral-200 dark:bg-neutral-900" />
          <div className="h-80 rounded-2xl bg-neutral-200 dark:bg-neutral-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Summary Cards Matrix Block Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.015, y: -2 }}
              transition={{ duration: 0.15 }}
              className="relative overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-sm dark:border-neutral-900 dark:bg-neutral-950/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">{card.title}</span>
                <div className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border dark:border-neutral-800 text-neutral-500"><Icon size={16} /></div>
              </div>
              <div className="mt-3 flex items-baseline gap-2.5">
                <span className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">{card.value}</span>
                <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md ${
                  card.trend.isPositive ? "text-emerald-600 bg-emerald-500/5" : "text-amber-600 bg-amber-500/5"
                }`}>
                  <TrendingUp size={11} className={card.trend.isPositive ? "" : "rotate-180"} />
                  {card.trend.value}%
                </span>
              </div>
              <p className="mt-2 text-xs font-medium text-neutral-400 dark:text-neutral-500 flex items-center gap-1">
                <Info size={11} /> {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Analytics Visualization Engine Segment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Progress Vector Core */}
        <div className="lg:col-span-2 rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-900 dark:bg-neutral-950/40">
          <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase mb-6 text-neutral-400">Sales Analytics Ledger</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_MOCK_SERIES} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" className="dark:stroke-neutral-900" />
                <XAxis dataKey="name" stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ background: "#171717", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#revenueGlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown Matrix */}
        <div className="rounded-2xl border border-neutral-200/80 bg-white p-5 dark:border-neutral-900 dark:bg-neutral-950/40 flex flex-col justify-between">
          <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-100 uppercase mb-4 text-neutral-400">Category Allocations</h3>
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_DISTRIBUTION_MOCK} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} dataKey="value">
                  {CATEGORY_DISTRIBUTION_MOCK.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t dark:border-neutral-900">
            {CATEGORY_DISTRIBUTION_MOCK.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 font-semibold">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: cat.color }} />
                <span className="text-neutral-500 dark:text-neutral-400 truncate">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}