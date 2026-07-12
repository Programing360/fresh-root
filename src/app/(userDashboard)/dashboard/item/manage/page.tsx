"use client";

import React, { useState } from "react";
import { List, LayoutGrid, Search, Trash2, Eye, Edit3, X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { InventoryItem } from "@/types/dashboard";

const INITIAL_CATALOG_MOCK: InventoryItem[] = [
  { id: "1", title: "Premium Biona Honey", shortDescription: "", fullDescription: "", price: 22.00, date: "2026-07-10", priority: "high", category: "Food Drinks", location: "Hub 1", rating: 5, status: "active", imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=200&auto=format&fit=crop" },
  { id: "2", title: "Organic Yellow Bananas", shortDescription: "", fullDescription: "", price: 12.50, date: "2026-07-09", priority: "medium", category: "Fresh Fruits", location: "Hub 2", rating: 4, status: "active", imageUrl: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=200&auto=format&fit=crop" },
  { id: "3", title: "Fresh Garden Strawberries", shortDescription: "", fullDescription: "", price: 18.00, date: "2026-07-08", priority: "low", category: "Fresh Fruits", location: "Hub 1", rating: 5, status: "draft", imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=200&auto=format&fit=crop" },
];

export default function ItemManagementTable() {
  const [catalog, setCatalog] = useState<InventoryItem[]>(INITIAL_CATALOG_MOCK);
  const [layoutMode, setLayoutMode] = useState<"table" | "grid">("table");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeDeletionTarget, setActiveDeletionTarget] = useState<string | null>(null);

  const parsedCatalog = catalog.filter(item => 
    item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const confirmDestructiveRemoval = (targetId: string) => {
    setCatalog(prev => prev.filter(item => item.id !== targetId));
    setActiveDeletionTarget(null);
  };

  return (
    <div className="space-y-6">
      
      {/* FILTER CONTROL BAR HEADER STRIP SEGMENT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/80 bg-white dark:border-neutral-900 dark:bg-neutral-950/40">
        <div className="relative flex-1 max-w-md flex items-center">
          <Search size={16} className="absolute left-3.5 text-neutral-400 pointer-events-none" />
          <input 
            type="text" 
            placeholder="Search criteria inventory indexing query..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
          />
        </div>
        
        {/* Switch Control Elements for Layout Displays */}
        <div className="flex items-center gap-2 border dark:border-neutral-800 p-1 rounded-xl w-max bg-neutral-50 dark:bg-neutral-900/40">
          <button onClick={() => setLayoutMode("table")} className={`p-2 rounded-lg transition-all ${layoutMode === "table" ? "bg-white dark:bg-neutral-800 text-emerald-500 shadow-sm" : "text-neutral-400"}`}><List size={15}/></button>
          <button onClick={() => setLayoutMode("grid")} className={`p-2 rounded-lg transition-all ${layoutMode === "grid" ? "bg-white dark:bg-neutral-800 text-emerald-500 shadow-sm" : "text-neutral-400"}`}><LayoutGrid size={15}/></button>
        </div>
      </div>

      {/* DYNAMIC PRESENTATION CONDITIONAL ROUTER CONDITIONAL GRID AREA */}
      <AnimatePresence mode="wait">
        {parsedCatalog.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-3">
            <span className="text-sm font-bold text-neutral-400 dark:text-neutral-500">No database inventory objects match parameters criteria filters.</span>
          </motion.div>
        ) : layoutMode === "table" ? (
          
          /* RESPONSIVE FLUID SCROLL DATA MATRIX TABLE */
          <motion.div key="table-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-900 dark:bg-neutral-950/40 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-900 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/10">
                  <th className="p-4">Visual Asset</th>
                  <th className="p-4">Title Designation</th>
                  <th className="p-4">Category Group</th>
                  <th className="p-4">Financial Cost</th>
                  <th className="p-4">System Trace Status</th>
                  <th className="p-4 text-right">Row Controls</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-neutral-100 dark:divide-neutral-900">
                {parsedCatalog.map((item) => (
                  <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                    <td className="p-4"><img src={item.imageUrl} alt="" className="h-10 w-10 rounded-lg object-cover border dark:border-neutral-800" /></td>
                    <td className="p-4 font-bold text-neutral-900 dark:text-white">{item.title}</td>
                    <td className="p-4 text-neutral-500">{item.category}</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">${item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${item.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-neutral-500/10 text-neutral-400'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button aria-label="Inspect entity details" className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Eye size={14}/></button>
                      <button aria-label="Modify configuration fields" className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"><Edit3 size={14}/></button>
                      <button onClick={() => setActiveDeletionTarget(item.id)} aria-label="Destroy structural array entry index element instance" className="p-2 text-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={14}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          
          /* FLEXIBLE EQUAL HEIGHT MATRIX INTERACTIVE GRID VIEW DISPLAY CARD RENDER */
          <motion.div key="grid-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parsedCatalog.map((item) => (
              <div key={item.id} className="rounded-2xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-900 dark:bg-neutral-950/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                <div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border dark:border-neutral-900 bg-neutral-100 mb-4">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mt-1">{item.category}</p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-3 border-t dark:border-neutral-900">
                  <span className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">${item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <button className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white border dark:border-neutral-800 rounded-lg"><Edit3 size={13}/></button>
                    <button onClick={() => setActiveDeletionTarget(item.id)} className="p-2 text-neutral-400 hover:text-red-500 border dark:border-neutral-800 rounded-lg"><Trash2 size={13}/></button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESTRUCTIVE ACTION VERIFICATION INTERFACE DELETION CONFIRMATION MODAL CONTROL PORTAL */}
      <AnimatePresence>
        {activeDeletionTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveDeletionTarget(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }} className="relative w-full max-w-md rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-neutral-900 dark:bg-neutral-950 z-10 space-y-4">
              <div className="flex items-center gap-3 text-amber-500">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20"><AlertTriangle size={20}/></div>
                <h4 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Verify Structural Deletion</h4>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">Are you sure you want to delete this product? This action cannot be undone.</p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button onClick={() => setActiveDeletionTarget(null)} className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">Cancel</button>
                <button onClick={() => confirmDestructiveRemoval(activeDeletionTarget)} className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm">Confirm Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}