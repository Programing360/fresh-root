"use client";

import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, User, PackagePlus, Layers, Users, BarChart3, Settings, 
  LogOut, Menu, X, ChevronLeft, ChevronRight, Bell, Sparkles, Loader2 
} from "lucide-react";
import { SessionUser, UserRole } from "@/types/dashboard";

// Simulated Dynamic Hook Mock Authentication State
const MOCK_SESSION: SessionUser = {
  id: "user_fh_9918",
  name: "MD Limon",
  email: "limon@example.com",
  role: "admin", // Toggle to 'user' or 'admin' to dynamically switch structural access limits
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  joinDate: "January 2026"
};

interface DashboardContextType {
  user: SessionUser;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (val: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be declared within a DashboardProvider context layer.");
  return context;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication shielding routing framework guard
  useEffect(() => {
    const simulateAuthCheck = () => {
      const isLogged = true; // Simulating logic check block state
      if (!isLogged) {
        const fullCallback = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
        router.push(`/login?callbackUrl=${encodeURIComponent(fullCallback)}`);
      } else {
        setIsAuthenticated(true);
      }
    };
    simulateAuthCheck();
  }, [pathname, router, searchParams]);

  // Handle route change closing mobile navigation automatically
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-[#0c0d0c]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Profile", href: "/dashboard/profile", icon: User },
    { label: "Add Item", href: "/dashboard/item/add", icon: PackagePlus },
    { label: "Manage Items", href: "/dashboard/item/manage", icon: Layers },
    { label: "Manage Users", href: "/dashboard/users", icon: Users, adminOnly: true },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, adminOnly: true },
    { label: "Settings", href: "/dashboard/settings", icon: Settings, adminOnly: true },
  ];

  const visibleNavItems = navItems.filter(item => !item.adminOnly || MOCK_SESSION.role === "admin");

  return (
    <DashboardContext.Provider value={{ user: MOCK_SESSION, sidebarCollapsed, setSidebarCollapsed }}>
      <div className="min-h-screen bg-[#fcfcfb] text-neutral-800 dark:bg-[#090a09] dark:text-neutral-100 flex transition-colors duration-200">
        
        {/* DESKTOP SIDEBAR SHELL CONTAINER */}
        <aside 
          className={`hidden md:flex flex-col fixed inset-y-0 left-0 z-20 border-r border-neutral-200/80 bg-white/80 backdrop-blur-md dark:border-neutral-900 dark:bg-neutral-950/70 transition-all duration-200 ${
            sidebarCollapsed ? "w-20" : "w-64"
          }`}
        >
          {/* Sidebar Top branding identity block area */}
          <div className="h-16 flex items-center justify-between px-5 border-b border-neutral-100 dark:border-neutral-900">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm shadow-emerald-500/20">
                <Sparkles size={16} />
              </div>
              {!sidebarCollapsed && (
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bold text-sm tracking-wide bg-gradient-to-r from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
                  SaaS Framework
                </motion.span>
              )}
            </div>
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Core Sidebar Links Map Block Layout */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 group cursor-pointer ${
                    isActive 
                      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/5" 
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
                  }`}>
                    {isActive && (
                      <motion.div layoutId="activeIndicator" className="absolute left-0 w-1 h-5 rounded-r bg-emerald-500" />
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
                  <span className="font-bold text-base tracking-wide text-neutral-900 dark:text-white">Navigation</span>
                  <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg border dark:border-neutral-800"><X size={16}/></button>
                </div>
                <nav className="flex-1 space-y-1">
                  {visibleNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        <div className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold ${
                          isActive ? "text-emerald-600 bg-emerald-500/5 dark:text-emerald-400" : "text-neutral-500"
                        }`}>
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

        {/* WORKSPACE APP CONTENT SHELL DISPLAY LAYOUTS CONTAINER */}
        <div className={`flex-1 flex flex-col transition-all duration-200 ${
          sidebarCollapsed ? "md:pl-20" : "md:pl-64"
        }`}>
          
          {/* STICKY ACCESSIBLE TOP HEADER STRIP NAVBAR */}
          <header className="sticky top-0 z-10 h-16 border-b border-neutral-200/70 bg-white/70 backdrop-blur-md dark:border-neutral-900/60 dark:bg-neutral-900/50 flex items-center justify-between px-4 sm:px-6">
            <button 
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-xl border border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 md:hidden hover:bg-neutral-50"
            >
              <Menu size={16} />
            </button>
            <div className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Workspace Scope: <span className="text-neutral-700 dark:text-neutral-300 font-bold">{MOCK_SESSION.role} account</span>
            </div>
            
            {/* Header Right Accessory Tray */}
            <div className="flex items-center gap-4 ml-auto">
              <button aria-label="Notifications tray icon" className="relative p-2 rounded-xl border border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all">
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <Bell size={15} />
              </button>
              <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex items-center gap-2.5">
                <img src={MOCK_SESSION.avatarUrl} alt="Session Avatar Profile graphic" className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover" />
                <span className="hidden md:inline text-xs font-bold text-neutral-700 dark:text-neutral-300">{MOCK_SESSION.name}</span>
              </div>
            </div>
          </header>

          {/* CORE DYNAMIC CHILDREN COMPONENT ROUTE PORT */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto focus:outline-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>

        </div>

      </div>
    </DashboardContext.Provider>
  );
}