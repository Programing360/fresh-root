const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const addToCart = async (productId: string, quantity: number = 1) => {
  const res = await fetch(`${baseURL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // যদি cookie-based auth ব্যবহার করো
    body: JSON.stringify({ productId, quantity }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add to cart: ${res.status}`);
  }

  return res.json();
};

export const addToWishlist = async (productId: string) => {
  const res = await fetch(`${baseURL}/wishlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add to wishlist: ${res.status}`);
  }

  return res.json();
};

export const removeFromWishlist = async (productId: string) => {
  const res = await fetch(`${baseURL}/wishlist/${productId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Failed to remove from wishlist: ${res.status}`);
  }

  return res.json();
};