import { Search } from "lucide-react";
import { Product } from "@/types/product";
import { publicFetch, serverDelete, serverUpdate } from "../core/server";

export interface ProductQuery {
  category?: string;
  sort?: string;
  search?: string;
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const allProducts = async (query?: ProductQuery): Promise<Product[]> => {
  const params = new URLSearchParams();

  if (query?.category) params.append("category", query.category);
  if (query?.sort) params.append("sort", query.sort);
  if (query?.search) params.append("search", query.search);

  const queryString = params.toString() ? `?${params.toString()}` : "";

  const res = await fetch(`${baseURL}/products${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products from backend");
  }

  const data: Product[] = await res.json();
  return data;
};

export const productsDetails = async (id: string): Promise<Product> => {
  const res = await publicFetch(`product/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }
  return res.json();
};

export const getByCategories = (category: string) => {
  const res = publicFetch(`api/product?category=${category}`);
  return res;
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  const res = await serverUpdate(`api/product-update/${id}`, data);
  return res;
};

export const deleteProduct = async (id: string) => {
  const res = await serverDelete(`api/delete/${id}`);
  return res;
};

export const updateAvailability = async (id: string, availability: boolean) => {
  const res = await fetch(`${baseURL}/product/${id}/availability`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ availability }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update availability: ${res.status}`);
  }

  return res.json();
};
