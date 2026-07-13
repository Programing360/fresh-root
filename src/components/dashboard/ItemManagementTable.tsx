"use client";

import React, { useState } from "react";
import { List, LayoutGrid, Search, Trash2, Eye, Edit3, X, AlertTriangle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types/product";
import { updateProduct, deleteProduct, updateAvailability } from "@/lib/api/products";
import { toast } from "react-toastify";

interface ItemManagementTableProps {
  manageProducts: Product[];
}

export default function ItemManagementTable({ manageProducts }: ItemManagementTableProps) {
  const [catalog, setCatalog] = useState<Product[]>(manageProducts);
  const [layoutMode, setLayoutMode] = useState<"table" | "grid">("table");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeDeletionTarget, setActiveDeletionTarget] = useState<string | null>(null);
  const [viewTarget, setViewTarget] = useState<Product | null>(null);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toggleLoadingId, setToggleLoadingId] = useState<string | null>(null);

  const parsedCatalog = catalog.filter(
    (item) =>
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // --- DELETE ---
  const confirmDestructiveRemoval = async (targetId: string) => {
    setIsDeleting(true);
    
    try {
      await deleteProduct(targetId);
      setCatalog((prev) => prev.filter((item) => item._id !== targetId));
      toast.success("Product deleted successfully");
      setActiveDeletionTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  // --- AVAILABILITY TOGGLE ---
  const handleAvailabilityToggle = async (item: Product) => {
    setToggleLoadingId(item._id);
    const newAvailability = !item.availability;
    try {
      await updateAvailability(item._id, newAvailability);
      setCatalog((prev) =>
        prev.map((p) => (p._id === item._id ? { ...p, availability: newAvailability } : p))
      );
      toast.success(`Marked as ${newAvailability ? "Available" : "Unavailable"}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update availability");
    } finally {
      setToggleLoadingId(null);
    }
  };

  // --- EDIT SAVE ---
  const handleEditSave = async (updated: Product) => {
    try {
      await updateProduct(updated._id, updated);
      setCatalog((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      toast.success("Product updated successfully");
      setEditTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="space-y-6">
      {/* FILTER CONTROL BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-neutral-200/80 bg-white dark:border-neutral-900 dark:bg-neutral-950/40">
        <div className="relative flex-1 max-w-md flex items-center">
          <Search size={16} className="absolute left-3.5 text-neutral-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full text-xs font-semibold pl-10 pr-4 py-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 border dark:border-neutral-800 p-1 rounded-xl w-max bg-neutral-50 dark:bg-neutral-900/40">
          <button onClick={() => setLayoutMode("table")} className={`p-2 rounded-lg transition-all ${layoutMode === "table" ? "bg-white dark:bg-neutral-800 text-emerald-500 shadow-sm" : "text-neutral-400"}`}>
            <List size={15} />
          </button>
          <button onClick={() => setLayoutMode("grid")} className={`p-2 rounded-lg transition-all ${layoutMode === "grid" ? "bg-white dark:bg-neutral-800 text-emerald-500 shadow-sm" : "text-neutral-400"}`}>
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <AnimatePresence mode="wait">
        {parsedCatalog.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-3">
            <span className="text-sm font-bold text-neutral-400 dark:text-neutral-500">No products match your search.</span>
          </motion.div>
        ) : layoutMode === "table" ? (
          <motion.div key="table-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-auto rounded-2xl border border-neutral-200/80 bg-white dark:border-neutral-900 dark:bg-neutral-950/40 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 dark:border-neutral-900 text-xs font-bold uppercase tracking-wider text-neutral-400 bg-neutral-50/50 dark:bg-neutral-900/10">
                  <th className="p-4">Image</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium divide-y divide-neutral-100 dark:divide-neutral-900">
                {parsedCatalog.map((item) => (
                  <tr key={item._id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/20 transition-colors">
                    <td className="p-4">
                      <img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover border dark:border-neutral-800" />
                    </td>
                    <td className="p-4 font-bold text-neutral-900 dark:text-white">{item.title}</td>
                    <td className="p-4 text-neutral-500">{item.category}</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">৳{item.price.toFixed(2)}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleAvailabilityToggle(item)}
                        disabled={toggleLoadingId === item._id}
                        className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded flex items-center gap-1 transition-colors disabled:opacity-50 ${
                          item.availability ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" : "bg-neutral-500/10 text-neutral-400 hover:bg-neutral-500/20"
                        }`}
                      >
                        {toggleLoadingId === item._id && <Loader2 size={10} className="animate-spin" />}
                        {item.availability ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-1.5">
                      <button onClick={() => setViewTarget(item)} aria-label="View product" className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                        <Eye size={14} />
                      </button>
                      <button onClick={() => setEditTarget(item)} aria-label="Edit product" className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={() => setActiveDeletionTarget(item._id)} aria-label="Delete product" className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div key="grid-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parsedCatalog.map((item) => (
              <div key={item._id} className="rounded-2xl border border-neutral-200/80 bg-white p-4 dark:border-neutral-900 dark:bg-neutral-950/40 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
                <div>
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden border dark:border-neutral-900 bg-neutral-100 mb-4">
                    <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <h3 className="font-bold text-base text-neutral-900 dark:text-white line-clamp-1">{item.title}</h3>
                  <p className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mt-1">{item.category}</p>
                  <button
                    onClick={() => handleAvailabilityToggle(item)}
                    disabled={toggleLoadingId === item._id}
                    className={`mt-2 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded inline-flex items-center gap-1 transition-colors disabled:opacity-50 ${
                      item.availability ? "bg-emerald-500/10 text-emerald-500" : "bg-neutral-500/10 text-neutral-400"
                    }`}
                  >
                    {toggleLoadingId === item._id && <Loader2 size={10} className="animate-spin" />}
                    {item.availability ? "Available" : "Unavailable"}
                  </button>
                </div>
                <div className="flex items-center justify-between mt-6 pt-3 border-t dark:border-neutral-900">
                  <span className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">৳{item.price.toFixed(2)}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewTarget(item)} className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white border dark:border-neutral-800 rounded-lg">
                      <Eye size={13} />
                    </button>
                    <button onClick={() => setEditTarget(item)} className="p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white border dark:border-neutral-800 rounded-lg">
                      <Edit3 size={13} />
                    </button>
                    <button onClick={() => setActiveDeletionTarget(item._id)} className="p-2 text-neutral-400 hover:text-red-500 border dark:border-neutral-800 rounded-lg">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {activeDeletionTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isDeleting && setActiveDeletionTarget(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }} className="relative w-full max-w-md rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-neutral-900 dark:bg-neutral-950 z-10 space-y-4">
              <div className="flex items-center gap-3 text-amber-500">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle size={20} />
                </div>
                <h4 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">Confirm Deletion</h4>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveDeletionTarget(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl cursor-pointer border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDestructiveRemoval(activeDeletionTarget)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-xl cursor-pointer bg-red-500 hover:bg-red-600 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {isDeleting && <Loader2 size={12} className="animate-spin" />}
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {viewTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setViewTarget(null)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }} className="relative w-full max-w-lg rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-neutral-900 dark:bg-neutral-950 z-10 max-h-[85vh] overflow-y-auto">
              <button onClick={() => setViewTarget(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900">
                <X size={16} />
              </button>

              <img src={viewTarget.image} alt={viewTarget.title} className="w-full aspect-video object-cover rounded-xl mb-4 border dark:border-neutral-900" />

              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">{viewTarget.title}</h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{viewTarget.shortDescription}</p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/40">
                  <p className="text-neutral-400 font-bold uppercase mb-0.5">Price</p>
                  <p className="font-bold text-emerald-600">৳{viewTarget.price}</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/40">
                  <p className="text-neutral-400 font-bold uppercase mb-0.5">Category</p>
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">{viewTarget.category}</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/40">
                  <p className="text-neutral-400 font-bold uppercase mb-0.5">Location</p>
                  <p className="font-bold text-neutral-800 dark:text-neutral-200">{viewTarget.location}</p>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/40">
                  <p className="text-neutral-400 font-bold uppercase mb-0.5">Availability</p>
                  <p className={`font-bold ${viewTarget.availability ? "text-emerald-600" : "text-neutral-400"}`}>
                    {viewTarget.availability ? "Available" : "Unavailable"}
                  </p>
                </div>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4 leading-relaxed">{viewTarget.description}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editTarget && (
          <EditProductModal
            product={editTarget}
            onClose={() => setEditTarget(null)}
            onSave={handleEditSave}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- EDIT MODAL SUB-COMPONENT ---
interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => Promise<void>;
}

function EditProductModal({ product, onClose, onSave }: EditProductModalProps) {
  const [form, setForm] = useState<Product>(product);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(form);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isSaving && onClose()} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.96, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 8 }} className="relative w-full max-w-lg rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-xl dark:border-neutral-900 dark:bg-neutral-950 z-10 max-h-[85vh] overflow-y-auto">
        <button onClick={onClose} disabled={isSaving} className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 disabled:opacity-50">
          <X size={16} />
        </button>

        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-5">Edit Product</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Short Description</label>
            <input
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Price</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full text-sm font-medium p-2.5 rounded-xl border dark:border-neutral-800 bg-transparent outline-none focus:border-emerald-500 transition-all"
              required
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold uppercase tracking-wider text-white transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && <Loader2 size={12} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}