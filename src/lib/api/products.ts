import { Product } from "@/types/product";
import {
  protectedFetch,
  serverDelete,
  serverUpdate,
} from "../core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const allProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${baseURL}/products`);
  const data: Product[] = await res.json();
  return data;
};

export const productsDetails = async (id: string): Promise<Product> => {
  const res = await protectedFetch(`product/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }
  return res.json();
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
