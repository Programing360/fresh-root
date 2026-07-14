export type UserRole = "user" | "admin";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image: string;
  createAt: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  description: string;
  trend: {
    value: number;
    isPositive: boolean;
  };
  icon: string;
  adminOnly?: boolean;
}

export interface InventoryItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  date: string;
  priority: "low" | "medium" | "high";
  category: string;
  location: string;
  rating: number;
  imageUrl?: string;
  status: "active" | "draft" | "archived";
}