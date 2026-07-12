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
  cuisine: string;
  price: number;
  discountPrice?: number;
  date: string;
  rating: number;
  reviewCount: number;
  location: string;
  deliveryTime: string;
  preparationTime: string;
  availability: boolean;
  featured: boolean;
  image: string;
  images: string[];
  ingredients: string[];
  nutrition: Nutrition;
  reviews: Review[];
  relatedItems: string[];
}