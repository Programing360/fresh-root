"use client";

import React from "react";
import Image from "next/image";
import { Menu, Bell } from "lucide-react";
import { ClientSessionUser } from "@/app/(userDashboard)/dashboard/layout";


interface HeaderProps {
  // CHANGE: single `user` prop instead of `user` + `displaySession`
  user: ClientSessionUser | null;
  onMobileMenuClick: () => void;
}

export default function Header({ user, onMobileMenuClick }: HeaderProps) {
  // CHANGE: real user object has no `image` field, so build initials from
  // the name instead of relying on a photo that will never exist.
  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <header className="sticky top-0 z-10 h-16 border-b border-neutral-200/70 bg-white/70 backdrop-blur-md dark:border-neutral-900/60 dark:bg-neutral-900/50 flex items-center justify-between px-4 sm:px-6">
      <button
        onClick={onMobileMenuClick}
        className="p-2 rounded-xl border border-neutral-200 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400 md:hidden hover:bg-neutral-50"
      >
        <Menu size={16} />
      </button>
      <div className="hidden sm:block text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
        Workspace Scope:{" "}
        <span className="text-neutral-700 dark:text-neutral-300 font-bold">
          {user?.role ?? "guest"} account
        </span>
      </div>

      {/* Header Right Accessory Tray */}
      <div className="flex items-center gap-4 ml-auto">
        <button
          aria-label="Notifications tray icon"
          className="relative p-2 rounded-xl border border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all"
        >
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <Bell size={15} />
        </button>
        <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-800" />
        <div className="flex items-center gap-2.5">
          {/* CHANGE: image field doesn't exist on the real user, so if one
              isn't present we render an initials circle instead of <Image> */}
          {user?.image ? (
            <Image
              src={user.image}
              alt="Session Avatar Profile graphic"
              width={30}
              height={30}
              className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800 object-cover"
            />
          ) : (
            <div className="h-8 w-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
              {initials}
            </div>
          )}
          {/* CHANGE: fallback text when name isn't loaded yet */}
          <span className="hidden md:inline text-xs font-bold text-neutral-700 dark:text-neutral-300">
            {user?.name ?? "..."}
          </span>
        </div>
      </div>
    </header>
  );
}