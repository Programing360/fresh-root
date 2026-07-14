import { serverAction } from "../core/server";

interface NewProductInput {
    price: number;
    discountPrice: number | undefined;
    availability: boolean;
    title: string;
    shortDescription: string;
    fullDescription: string;
    priority: "high" | "low" | "medium";
    category: string;
    location: string;
    imageUrl: string;
}

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addProduct = async (data: NewProductInput) => {
  const res = await serverAction(`api/item/add`, data);

  return res;
};