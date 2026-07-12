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

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addProduct = async (data: NewProductInput) => {
  const res = await fetch(`${baseURL}/api/item/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to add product: ${res.status}`);
  }

  return res.json();
};