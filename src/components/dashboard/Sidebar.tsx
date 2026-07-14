"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  User,
  PackagePlus,
  Layers,
  Users,
  BarChart3,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// Nav item definitions live here since they're sidebar-specific
export const navItems = [
  { label: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: User },
  { label: "Add Item", href: "/dashboard/item/add", icon: PackagePlus },
  { label: "Manage Items", href: "/dashboard/item/manage", icon: Layers },
  {
    label: "Manage Users",
    href: "/dashboard/users",
    icon: Users,
    adminOnly: true,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    adminOnly: true,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    adminOnly: true,
  },
];

interface SidebarProps {
  pathname: string;
  visibleNavItems: typeof navItems;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (val: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (val: boolean) => void;
}

export default function Sidebar({
  pathname,
  visibleNavItems,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  return (
    <>
      {/* DESKTOP SIDEBAR SHELL CONTAINER */}
      <aside
        className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-20 border-r border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/70 transition-all duration-200 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Sidebar Top branding identity block area */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-100 dark:border-neutral-900">
          <Link href={"/"}>
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-500/20">
                <Sparkles size={16} />
              </div>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-sm tracking-wide bg-gradient-to-r from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent"
                >
                  Fresh Root
                </motion.span>
              )}
            </div>
          </Link>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* Core Sidebar Links Map Block Layout */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {visibleNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-5 rounded-r bg-emerald-500"
                    />
                  )}
                  <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Desktop Footer Logout Section */}
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-900">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-500/5 transition-all">
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Log Out</span>}
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER DRAWER IMPLEMENTATION OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-72 z-50 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-900 p-4 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-900">
                <span className="font-bold text-base tracking-wide text-neutral-900 dark:text-white">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg border dark:border-neutral-800"
                >
                  <X size={16} />
                </button>
              </div>
              <nav className="flex-1 space-y-1">
                {visibleNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold ${
                          isActive
                            ? "text-emerald-600 bg-emerald-500/5 dark:text-emerald-400"
                            : "text-neutral-500"
                        }`}
                      >
                        <Icon size={18} />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <button className="w-full mt-auto flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-red-500 bg-red-500/5">
                <LogOut size={18} /> <span>Log Out</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}