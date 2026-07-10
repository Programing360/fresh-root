"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Sun, Moon } from "lucide-react";

// Explicit TypeScript Definitions
interface NavRoute {
  name: string;
  path: string;
}

interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn = false }: NavbarProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);

  // Synchronize initial theme state safely on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark: boolean = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    }
  }, []);

  // Strict Event Handler for Dark Mode Switch
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

  // Type-safe route arrays
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
    { name: "Favorites", path: "/favorites" },
  ];

  const routes: NavRoute[] = isLoggedIn ? privateRoutes : publicRoutes;

  // Type-Safe GSAP Entrance Animation
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-neutral-200/40 bg-[#fbfbfa]/60 dark:border-neutral-800/40 dark:bg-[#121412]/60 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] transition-colors duration-500"
    >
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        
        {/* Branding / Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 text-white shadow-md shadow-green-500/20 transition-transform group-hover:scale-105">
            🌿
          </span>
          <span className="text-xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
            fresh<span className="text-emerald-600 font-extrabold dark:text-emerald-400">Root</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8">
          {routes.map((route: NavRoute) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className="relative text-sm font-medium text-neutral-600 hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-400 transition-colors py-2 group"
              >
                {route.name}
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-500 dark:bg-emerald-400 transition-all group-hover:w-full"
                  layoutId="underline"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Group: Theme + User Options */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle Button */}
          <Button
            isIconOnly
            variant="light"
            radius="full"
            onClick={toggleTheme}
            className="text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            aria-label="Toggle theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 90 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
            </motion.div>
          </Button>

          {/* Desktop Auth / Profile Dropdown */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Dropdown placement="bottom-end" className="bg-[#fbfbfa]/90 dark:bg-[#121412]/90 backdrop-blur-md border border-neutral-200/40 dark:border-neutral-800/40">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform border-emerald-500 dark:border-emerald-400"
                    color="success"
                    size="sm"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb"
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold text-neutral-500 dark:text-neutral-400">Signed in as</p>
                    <p className="font-semibold text-emerald-600 dark:text-emerald-400">user@freshroot.com</p>
                  </DropdownItem>
                  <DropdownItem key="settings" className="text-neutral-700 dark:text-neutral-200">My Account</DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button variant="light" className="font-medium text-neutral-600 dark:text-neutral-300">
                  Sign In
                </Button>
                <Button className="bg-emerald-600 dark:bg-emerald-500 text-white font-medium shadow-md shadow-emerald-600/20 hover:bg-emerald-700 dark:hover:bg-emerald-600">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-neutral-200/50 dark:border-neutral-800/50 bg-white/50 dark:bg-black/20 md:hidden"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 bg-neutral-600 dark:bg-neutral-300"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-0.5 w-5 bg-neutral-600 dark:bg-neutral-300"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="h-0.5 w-5 bg-neutral-600 dark:bg-neutral-300"
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-20 left-0 w-full bg-[#fbfbfa]/95 dark:bg-[#121412]/95 border-b border-neutral-200/40 dark:border-neutral-800/40 backdrop-blur-2xl md:hidden overflow-hidden shadow-xl"
          >
            <div className="flex flex-col gap-4 p-6">
              <ul className="flex flex-col gap-4">
                {routes.map((route: NavRoute, idx: number) => (
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    key={route.path}
                  >
                    <Link
                      href={route.path}
                      onClick={() => setIsOpen(false)}
                      className="block text-lg font-medium text-neutral-700 hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-400"
                    >
                      {route.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <hr className="border-neutral-200/60 dark:border-neutral-800/60 my-2" />
              
              <div className="flex flex-col gap-3">
                {isLoggedIn ? (
                  <Button color="danger" variant="flat" className="w-full">
                    Log Out
                  </Button>
                ) : (
                  <>
                    <Button variant="bordered" className="w-full text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700">
                      Sign In
                    </Button>
                    <Button className="w-full bg-emerald-600 dark:bg-emerald-500 text-white">
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}