"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Form,
  Button,
  Input,
  Label,
  TextArea,
  Select,
  Header,
  ListBox,
  Separator,
  Selection,
  Key,
} from "@heroui/react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import { addProduct } from "@/lib/action/product-add";
import { toast } from "react-toastify";
import { useClientSession } from "@/lib/core/session-client";

// --- Types ---
interface FormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: string;
  discountPrice: string;
  priority: "low" | "medium" | "high";
  category: string;
  location: string;
  availability: "true" | "false";
  imageUrl: string;
  userId: string;
}

interface ImageUrlInputProps {
  name: "imageUrl";
  type: "url";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  variant: "bordered";
  size: "sm";
  className: string;
}

const CATEGORY_OPTIONS = ["Burger", "Pizza", "Drinks", "Dessert", "Snacks"];

export default function AddItemPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const { user } = useClientSession();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    discountPrice: "",
    priority: "medium",
    category: "",
    location: "",
    availability: "true",
    imageUrl: "",
    userId: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    AOS.init({ duration: 800, once: true });

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelector(".gsap-header"),
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    }
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriorityChange = (value: Key | null) => {
    const selectedValue = value as "low" | "medium" | "high";

    setFormData((prev) => ({
      ...prev,
      priority: selectedValue || "medium",
    }));
  };

  const handleCategoryChange = (value: Key | null) => {
    setFormData((prev) => ({
      ...prev,
      category: value?.toString() || "",
    }));
  };

  const handleAvailabilityChange = (value: Key | null) => {
    const selectedValue = value?.toString() as "true" | "false";

    setFormData((prev) => ({
      ...prev,
      availability: selectedValue || "true",
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        { method: "POST", body: uploadData },
      );
      const result = await response.json();

      if (result.success) {
        setFormData((prev) => ({ ...prev, imageUrl: result.data.url }));
      } else {
        alert("Image upload failed. Check API key configuration.");
      }
    } catch (err) {
      if (err) {
        toast.error("something is Wrong");
      }
    
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      ...formData,
      price: Number(formData.price),
      discountPrice: formData.discountPrice
        ? Number(formData.discountPrice)
        : undefined,
      availability: formData.availability === "true",
      feature: false,
      rating: 0,
      reviewCount: 0,
      userId: user?.id,
    };

    try {
      const result = await addProduct(payload);

      if (result.insertedId) {
        toast.success("Product Added Successfully");
      }
    } catch (err) {
      if (err) {
        toast.error("Failed to add product");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      shortDescription: "",
      fullDescription: "",
      price: "",
      discountPrice: "",
      priority: "medium",
      category: "",
      location: "",
      availability: "true",
      imageUrl: "",
      userId: "",
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 md:p-8"
    >
      <div
        data-aos="fade-up"
        className="w-full max-w-2xl bg-content1 rounded-2xl shadow-xl border border-divider p-6 sm:p-8 space-y-6"
      >
        <div className="gsap-header text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Create New Item
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill in the metrics below to list your item in the database.
          </p>
        </div>

        <Separator />

        <Form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Classic Beef Burger"
              variant="primary"
              className="w-full"
            />
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="shortDescription" className="text-sm font-medium">
              Short Description
            </Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              type="text"
              required
              value={formData.shortDescription}
              onChange={handleInputChange}
              placeholder="Brief summary sentence..."
              variant="primary"
              className="w-full"
            />
          </div>

          {/* Full Description */}
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="fullDescription" className="text-sm font-medium">
              Full Description
            </Label>
            <TextArea
              id="fullDescription"
              name="fullDescription"
              required
              value={formData.fullDescription}
              onChange={handleInputChange}
              className="rounded-xl border border-border/70 bg-surface px-4 py-3 text-sm leading-6 shadow-sm"
              placeholder="Provide a deep dive explanation of the item..."
              rows={5}
              style={{ resize: "vertical" }}
            />
          </div>

          {/* Price & Discount Price Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Label htmlFor="price" className="text-sm font-medium">
                Price (৳)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                required
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                variant="primary"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="discountPrice" className="text-sm font-medium">
                Discount Price (৳)
              </Label>
              <Input
                id="discountPrice"
                name="discountPrice"
                type="number"
                value={formData.discountPrice}
                onChange={handleInputChange}
                placeholder="Optional"
                variant="primary"
              />
            </div>
          </div>

          {/* Category & Priority Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {/* Category Select */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="category" className="text-sm font-medium">
                Category
              </Label>
              <Select
                id="category"
                selectedKey={formData.category}
                onSelectionChange={handleCategoryChange}
                aria-label="Select category"
              >
                <Select.Trigger className="w-full border border-border/70 rounded-xl px-3 py-2 text-sm bg-background flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-content1 border border-divider rounded-xl shadow-lg">
                  <ListBox className="p-1">
                    {CATEGORY_OPTIONS.map((cat, i) => (
                      <ListBox.Item
                        key={i}
                        id={cat}
                        className="px-3 py-2 text-sm rounded-lg hover:bg-default-100 cursor-pointer flex justify-between items-center"
                      >
                        <Label>{cat}</Label>
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Priority Select */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="priority" className="text-sm font-medium">
                Priority Level
              </Label>
              <Select
                id="priority"
                selectedKey={formData.priority}
                onSelectionChange={handlePriorityChange}
                aria-label="Select priority level"
              >
                <Select.Trigger className="w-full border border-border/70 rounded-xl px-3 py-2 text-sm bg-background flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-content1 border border-divider rounded-xl shadow-lg">
                  <ListBox className="p-1">
                    <Header className="px-2 py-1 text-xs font-semibold text-muted-foreground">
                      Select Options
                    </Header>
                    <ListBox.Item
                      key="low"
                      id="low"
                      className="px-3 py-2 text-sm rounded-lg hover:bg-default-100 cursor-pointer flex justify-between items-center"
                    >
                      <Label>Low Priority</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      key="medium"
                      id="medium"
                      className="px-3 py-2 text-sm rounded-lg hover:bg-default-100 cursor-pointer flex justify-between items-center"
                    >
                      <Label>Medium Priority</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      key="high"
                      id="high"
                      className="px-3 py-2 text-sm rounded-lg hover:bg-default-100 cursor-pointer flex justify-between items-center"
                    >
                      <Label>High Priority</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          {/* Location & Availability Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-1">
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Gulshan, Dhaka"
                variant="primary"
              />
            </div>

            {/* Availability Select */}
            <div className="flex flex-col gap-1">
              <Label htmlFor="availability" className="text-sm font-medium">
                Availability
              </Label>
              <Select
                id="availability"
                selectedKey={formData.availability}
                onSelectionChange={handleAvailabilityChange}
                aria-label="Select availability"
              >
                <Select.Trigger className="w-full border border-border/70 rounded-xl px-3 py-2 text-sm bg-background flex justify-between items-center">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-content1 border border-divider rounded-xl shadow-lg">
                  <ListBox className="p-1">
                    <ListBox.Item
                      key="true"
                      id="true"
                      className="px-3 py-2 text-sm rounded-lg hover:bg-default-100 cursor-pointer flex justify-between items-center"
                    >
                      <Label>Available</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                    <ListBox.Item
                      key="false"
                      id="false"
                      className="px-3 py-2 text-sm rounded-lg hover:bg-default-100 cursor-pointer flex justify-between items-center"
                    >
                      <Label>Unavailable</Label>
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="image-file" className="text-sm font-medium">
              Item Image Asset
            </Label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                id="image-file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-default-100 file:text-foreground hover:file:bg-default-200 cursor-pointer border border-dashed border-divider rounded-xl p-1"
              />
              {formData.imageUrl && (
                <div className="text-xs text-success font-medium truncate max-w-xs sm:max-w-none self-center">
                  ✓ Image Staged
                </div>
              )}
            </div>
            {isUploading && (
              <p className="text-xs text-warning animate-pulse">
                Uploading asset binaries directly to ImgBB storage...
              </p>
            )}

            <Input
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleInputChange}
              placeholder="Or explicitly paste external Image link URL here..."
              variant="primary"
              // size="sm"
              className="mt-1"
            />
          </div>

          <Separator className="my-2" />

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
            <Button
              type="reset"
              variant="secondary"
              onClick={handleReset}
              className="w-full sm:w-auto font-medium"
            >
              Reset Inputs
            </Button>
            <Button
              type="submit"
              variant="primary"
              isPending={isSubmitting || isUploading}
              isDisabled={isUploading}
              className="w-full sm:w-auto font-medium shadow-md shadow-primary/20"
            >
              {isSubmitting ? "Saving record..." : "Submit New Item"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
