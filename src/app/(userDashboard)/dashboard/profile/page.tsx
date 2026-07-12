"use client";

import React from "react";
import { useDashboard } from "../layout";
import { Calendar, Mail, ShieldAlert, Award, FileText, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useDashboard();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Profile Header Detail Profile Identity Plate */}
      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 dark:border-neutral-900 dark:bg-neutral-950/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
        <div className="flex flex-col sm:flex-row items-center gap-6 pt-2">
          <img src={user.avatarUrl} alt="Avatar Frame Graphic Log" className="h-20 w-20 rounded-full border-2 border-neutral-100 dark:border-neutral-800 object-cover shadow-sm" />
          <div className="text-center sm:text-left flex-1 space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">{user.name}</h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm font-medium text-neutral-400 dark:text-neutral-500">
              <span className="flex items-center gap-1.5"><Mail size={14} />{user.email}</span>
              <span className="h-1 w-1 bg-neutral-300 rounded-full" />
              <span className="flex items-center gap-1.5"><Calendar size={14} strokeWidth={2} />Joined {user.joinDate}</span>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm">
            Edit Config
          </motion.button>
        </div>
      </div>

      {/* Structural Account Parameter Grid Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-900 dark:bg-neutral-950/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400"><ShieldAlert size={14} /> Authorization Layer</div>
          <p className="text-sm font-bold flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <Award size={16} /> Verified Security System System {user.role.toUpperCase()} Status
          </p>
        </div>
        <div className="rounded-xl border border-neutral-200/60 bg-white p-5 dark:border-neutral-900 dark:bg-neutral-950/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400"><FileText size={14} /> Activity Feed Logs</div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5 font-medium"><CheckCircle size={14} className="text-emerald-500" /> Account instances compiled cleanly.</p>
        </div>
      </div>
    </div>
  );
}