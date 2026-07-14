"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Label,
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Sun, Moon, LayoutDashboard } from "lucide-react";
import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useClientSession } from "@/lib/core/session-client";

interface NavRoute {
  name: string;
  path: string;
}

export default function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  // Better-Auth Session Hook
  const { user, isPending } = useClientSession();
  const isLoggedIn = !!user;

  console.log(user);

  // Real Sign Out Implementation using authClient
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    
  };

  // Safe Hydration & Theme Checker
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 20);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const toggleTheme = (): void => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const publicRoutes: NavRoute[] = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Our Story", path: "/about" },
  ];

  const privateRoutes: NavRoute[] = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Orders", path: "/orders" },
    { name: "Add Product", path: "/add-product" },
  ];

  const routes: NavRoute[] = isLoggedIn ? privateRoutes : publicRoutes;

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -120, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power4.out", delay: 0.15 },
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 sticky-nav ${
        isScrolled
          ? "border-b border-neutral-200/50 bg-[#fbfbfa]/75 shadow-[0_8px_32px_rgba(0,0,0,0.03)] dark:border-neutral-800/40 dark:bg-[#121412]/70 backdrop-blur-2xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-lg shadow-green-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
            🌿
          </span>
          <span className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
            fresh
            <span className="text-emerald-600 font-black dark:text-emerald-400">
              Root
            </span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <ul className="hidden md:flex items-center gap-8">
          {routes.map((route: NavRoute) => {
            const isActive = pathname === route.path;
            return (
              <li key={route.path}>
                <Link
                  href={route.path}
                  className={`relative text-[14px] font-semibold transition-colors py-2 group tracking-wide ${
                    isActive
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-neutral-500 hover:text-emerald-600 dark:text-neutral-400 dark:hover:text-emerald-400"
                  }`}
                >
                  {route.name}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 h-[2.5px] w-full rounded-full bg-emerald-500 dark:bg-emerald-400"
                      layoutId="activeUnderlineSpec"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 28,
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Top-Right Action Controls */}
        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <Button
            isIconOnly
            variant="primary"
            // size="xl"
            onClick={toggleTheme}
            className="text-white dark:text-neutral-300 bg-[#00b26b] dark:bg-neutral-800/50"
            aria-label="Toggle System Theme"
          >
            <motion.div
              initial={false}
              animate={{
                rotate: isDarkMode ? 90 : 0,
                scale: isDarkMode ? 0.95 : 1,
              }}
              transition={{ duration: 0.35, ease: "backOut" }}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-amber-400 fill-amber-400/10" />
              ) : (
                <Moon size={20} className="text-neutral-700" />
              )}
            </motion.div>
          </Button>

          {/* Desktop Session Component */}
          <div className="hidden md:flex items-center gap-4">
            {isPending ? (
              <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse border border-neutral-300/20" />
            ) : isLoggedIn ? (
              <Dropdown>
                <Dropdown.Trigger className="rounded-full">
                  <Avatar>
                    <Avatar.Image alt="Junior Garcia" src={user?.image || ""} />
                    <Avatar.Fallback className="bg-indigo-150 dark:bg-[#31106a] font-bold text-xs text-indigo-600 dark:text-purple-200">
                      {user.name?.slice(0, 1).toUpperCase()}
                    </Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image alt="Jane" src={user?.image || ""} />
                        <Avatar.Fallback className="bg-indigo-50 dark:bg-[#31106a] font-bold text-xs text-indigo-700 dark:text-purple-200">
                          {user.name?.slice(0, 2).toUpperCase()}
                        </Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium">
                          {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                      <Link href="/dashboard">
                        <Label>Dashboard</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="profile" textValue="Profile">
                      <Link href="/dashboard/profile">
                        <Label>Profile</Label>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="settings" textValue="Settings">
                      <div className="flex w-full items-center justify-between gap-2">
                        <Link href="/dashboard/setting">
                          <Label>Settings</Label>
                        </Link>
                        <Gear className="size-3.5 text-muted" />
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item id="new-project" textValue="New project">
                      <div className="flex w-full items-center justify-between gap-2">
                        <Label>Create Team</Label>
                        <Persons className="size-3.5 text-muted" />
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item
                      textValue="Logout"
                      variant="danger"
                    >
                      <div className="flex w-full items-center justify-between gap-2">
                        <Button onClick={handleLogout} className='bg-[#00bb6d]'>
                          Log Out
                        </Button>
                        <ArrowRightFromSquare className="size-3.5 text-danger" />
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/auth/login">
                  <Button
                    variant="primary"
                    className="text-neutral-700 dark:text-neutral-300 font-semibold text-sm hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40 px-4"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/10 rounded-xl px-5 transition-transform active:scale-95">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Mobile Wrapper */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100/30 dark:bg-neutral-900/20 md:hidden active:scale-90 transition-transform"
            aria-label="Responsive Menu Switch"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 rounded-full bg-neutral-600 dark:bg-neutral-300"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              className="h-0.5 w-5 rounded-full bg-neutral-600 dark:bg-neutral-300"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 rounded-full bg-neutral-600 dark:bg-neutral-300"
            />
          </button>
        </div>
      </header>

      {/* Mobile Glass Drawer Component */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-0 w-full bg-[#fbfbfa]/90 dark:bg-[#121412]/90 border-b border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-3xl md:hidden overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-5 p-6">
              <ul className="flex flex-col gap-4">
                {routes.map((route: NavRoute, idx: number) => {
                  const isActive = pathname === route.path;
                  return (
                    <motion.li
                      initial={{ x: -15, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.035, ease: "easeOut" }}
                      key={route.path}
                    >
                      <Link
                        href={route.path}
                        onClick={() => setIsOpen(false)}
                        className={`block text-base font-bold tracking-wide transition-colors ${
                          isActive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-neutral-600 dark:text-neutral-300"
                        }`}
                      >
                        {route.name}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <hr className="border-neutral-200/60 dark:border-neutral-800/60 my-1" />

              <div className="flex flex-col gap-3">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-neutral-200/30 dark:bg-neutral-800/30 p-2 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40">
                      <Avatar>
                        <Avatar.Image
                          sizes="sm"
                          src={
                            user?.image ||
                            ""
                          }
                          className={user?.name || "User"}
                          color="success"
                        />
                      </Avatar>
                      <div className="flex flex-col truncate">
                        <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                          {user?.name}
                        </span>
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 truncate">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full font-bold text-sm rounded-xl"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Link
                      href="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="w-full"
                    >
                      <Button
                        variant="primary"
                        className="w-full text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700 font-bold text-sm rounded-xl"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      href="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="w-full"
                    >
                      <Button className="w-full bg-emerald-600 dark:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-sm">
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
