import { Product } from "@/types/product";
import { protectedFetch } from "../core/server";

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
