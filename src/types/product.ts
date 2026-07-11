export interface ProductDetail {
  id: string;
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  sku: string;
  category: string;
  tags: string[];
  images: string[];
  specifications?: Array<{ key: string; value: string }>;
}