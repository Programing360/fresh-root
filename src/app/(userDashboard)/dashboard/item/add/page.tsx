"use client";

import React, { useState } from "react";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Loader2, Sparkles, Image as ImageIcon, CheckCircle } from "lucide-react";
import {
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

const formValidationSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters"),
  shortDescription: z.string().min(5, "Provide a reliable summary text").max(100),
  fullDescription: z.string().min(10, "Extended description is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  date: z.string().min(1, "Date is required"),
  priority: z.enum(["low", "medium", "high"]),
  category: z.string().min(1, "Category is required"),
  location: z.string().min(2, "Location is required"),
  rating: z.coerce.number().min(1).max(5),
  imageUrl: z.string().url("Enter a valid image URL").optional().or(z.literal("")),
});

type FormInputFields = z.infer<typeof formValidationSchema>;
type FormErrors = Partial<Record<keyof FormInputFields, string>>;

const initialFormState: FormInputFields = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  price: 0,
  date: "",
  priority: "medium",
  category: "",
  location: "",
  rating: 1,
  imageUrl: "",
};

export default function FormCreationPage() {
  const [formData, setFormData] = useState<FormInputFields>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateField = <K extends keyof FormInputFields>(field: K, value: FormInputFields[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // ওই field-এ আগের error থাকলে clear করে দাও, user typing শুরু করলেই
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    const result = formValidationSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormInputFields;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsPending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Submitted product data:", result.data);
      setSuccess(true);
      setFormData(initialFormState);
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setSuccess(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-full w-max">
        <Sparkles size={12} /> Creation Pipeline Entry Guard Active
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-sm font-bold flex items-center gap-2"
          >
            <CheckCircle size={16} /> Product saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="rounded-2xl border border-neutral-200/80 bg-white p-6 dark:border-neutral-900 dark:bg-neutral-950/40 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Title */}
            <div className="sm:col-span-2">
              <TextField
                name="title"
                isInvalid={!!errors.title}
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
              >
                <Label>Item Title</Label>
                <Input fullWidth placeholder="e.g. Classic Beef Burger" />
                {errors.title && <FieldError>{errors.title}</FieldError>}
              </TextField>
            </div>

            {/* Short Description */}
            <div className="sm:col-span-2">
              <TextField
                name="shortDescription"
                isInvalid={!!errors.shortDescription}
                value={formData.shortDescription}
                onChange={(e) => updateField("shortDescription", e.target.value)}
              >
                <Label>Short Summary</Label>
                <Input fullWidth placeholder="A brief one-line summary" />
                {errors.shortDescription && <FieldError>{errors.shortDescription}</FieldError>}
              </TextField>
            </div>

            {/* Full Description */}
            <div className="sm:col-span-2">
              <TextField
                name="fullDescription"
                isInvalid={!!errors.fullDescription}
                value={formData.fullDescription}
                onChange={(e) => updateField("fullDescription", e.target.value)}
              >
                <Label>Full Description</Label>
                <TextArea fullWidth rows={4} placeholder="Detailed description..." />
                {errors.fullDescription && <FieldError>{errors.fullDescription}</FieldError>}
              </TextField>
            </div>

            {/* Price */}
            <div>
              <TextField
                name="price"
                type="number"
                isInvalid={!!errors.price}
                value={String(formData.price)}
                onChange={(e) => updateField("price", Number(e.target.value))}
              >
                <Label>Price</Label>
                <Input fullWidth type="number" step="0.01" placeholder="0.00" />
                {errors.price && <FieldError>{errors.price}</FieldError>}
              </TextField>
            </div>

            {/* Date */}
            <div>
              <TextField
                name="date"
                type="date"
                isInvalid={!!errors.date}
                value={formData.date}
                onChange={(e) => updateField("date", e.target.value)}
              >
                <Label>Date</Label>
                <Input fullWidth type="date" />
                {errors.date && <FieldError>{errors.date}</FieldError>}
              </TextField>
            </div>

            {/* Priority — HeroUI Select */}
            <div>
              <Label>Priority</Label>
              <Select
                selectedKey={formData.priority}
                onSelectionChange={(key) => updateField("priority", key as FormInputFields["priority"])}
              >
                <Select.Trigger className="w-full mt-1.5">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="low">Low</ListBox.Item>
                    <ListBox.Item id="medium">Medium</ListBox.Item>
                    <ListBox.Item id="high">High</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Category */}
            <div>
              <TextField
                name="category"
                isInvalid={!!errors.category}
                value={formData.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                <Label>Category</Label>
                <Input fullWidth placeholder="e.g. Burger, Pizza" />
                {errors.category && <FieldError>{errors.category}</FieldError>}
              </TextField>
            </div>

            {/* Location */}
            <div>
              <TextField
                name="location"
                isInvalid={!!errors.location}
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
              >
                <Label>Location</Label>
                <Input fullWidth placeholder="e.g. Dhanmondi, Dhaka" />
                {errors.location && <FieldError>{errors.location}</FieldError>}
              </TextField>
            </div>

            {/* Rating */}
            <div>
              <TextField
                name="rating"
                type="number"
                isInvalid={!!errors.rating}
                value={String(formData.rating)}
                onChange={(e) => updateField("rating", Number(e.target.value))}
              >
                <Label>Rating (1-5)</Label>
                <Input fullWidth type="number" min={1} max={5} step="0.1" />
                {errors.rating && <FieldError>{errors.rating}</FieldError>}
              </TextField>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <TextField
                name="imageUrl"
                isInvalid={!!errors.imageUrl}
                value={formData.imageUrl}
                onChange={(e) => updateField("imageUrl", e.target.value)}
              >
                <Label>Image URL</Label>
                <Input fullWidth placeholder="https://images.unsplash.com/..." />
                {errors.imageUrl && <FieldError>{errors.imageUrl}</FieldError>}
              </TextField>
            </div>

            {/* Live Preview */}
            <div className="sm:col-span-2 pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Live Preview
              </span>
              <div className="w-full aspect-video rounded-xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-neutral-50/50 dark:bg-neutral-900/10 overflow-hidden">
                {formData.imageUrl && /^https?:\/\/.+/i.test(formData.imageUrl) ? (
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-neutral-400 text-xs font-medium flex flex-col items-center gap-2">
                    <ImageIcon size={24} /> Enter a valid image URL to preview
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-dashed border-neutral-100 dark:border-neutral-900 flex items-center justify-end gap-3">
            <Button type="button" variant="secondary" onPress={handleReset}>
              Reset
            </Button>
            <Button type="submit" isDisabled={isPending} className="flex items-center gap-2">
              {isPending ? <Loader2 size={14} className="animate-spin" /> : "Save Entry"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}