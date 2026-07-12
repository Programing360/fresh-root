export interface Nutrition {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  _id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  discountPrice?: number;
  createAt: string;
  rating: number;
  reviewCount: number;
  location: string;
  availability: boolean;
  featured: boolean;
  image: string;
  images: string[];
  reviews: Review[];
  relatedItems: string[];
  userId: string
}