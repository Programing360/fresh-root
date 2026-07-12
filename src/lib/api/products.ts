import { Product } from "@/types/product";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


export const allProducts = async ():Promise<Product[]> => {
    const res = await fetch(`${baseURL}/products`)
    const data: Product[] = await res.json();
    console.log(data);
  return data;
}