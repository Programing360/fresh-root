"use client";

import React, { Suspense, useState, useEffect, createContext, useContext } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useClientSession } from "@/lib/core/session-client";
import Sidebar, { navItems } from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

// Shape of the user object returned by useClientSession()
export interface ClientSessionUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  image?: string | null;
  role?: string; // present if you're using better-auth's admin/role plugin
  createdAt?: Date;
  updatedAt?: Date;
}

interface DashboardContextType {
  user: ClientSessionUser | null;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (val: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      "useDashboard must be declared within a DashboardProvider context layer.",
    );
  return context;
}

// Default export just wraps the real layout in a Suspense boundary,
// because useSearchParams() (used below) requires one to avoid the
// "should be wrapped in a suspense boundary" prerender error.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#fafafa] dark:bg-[#0c0d0c]">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      }
    >
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </Suspense>
  );
}

function DashboardLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // CHANGE: user now comes straight from the real session hook, no more mock
  const { user, session, isPending } = useClientSession();
  console.log(user);

  // Authentication shielding routing framework guard
  useEffect(() => {
    const simulateAuthCheck = () => {
      if (!session) {
        const fullCallback = searchParams.toString()
          ? `${pathname}?${searchParams.toString()}`
          : pathname;
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

  // CHANGE: role check now reads directly off the real `user`, not MOCK_SESSION
  const visibleNavItems = navItems.filter(
    (item) => !item.adminOnly || user?.role === "admin",
  );

  return (
    <DashboardContext.Provider
      value={{ user: user ?? null, sidebarCollapsed, setSidebarCollapsed }}
    >
      <div className="min-h-screen bg-[#fcfcfb] text-neutral-800 dark:bg-[#090a09] dark:text-neutral-100 flex transition-colors duration-200">
        <Sidebar
          pathname={pathname}
          visibleNavItems={visibleNavItems}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* WORKSPACE APP CONTENT SHELL DISPLAY LAYOUTS CONTAINER */}
        <div
          className={`flex-1 flex flex-col transition-all duration-200 ${
            sidebarCollapsed ? "md:pl-20" : "md:pl-64"
          }`}
        >
          {/* CHANGE: pass real user straight through, displaySession prop removed */}
          <Header
            user={user ?? null}
            onMobileMenuClick={() => setMobileOpen(true)}
          />

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