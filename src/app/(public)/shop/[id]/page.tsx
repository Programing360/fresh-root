import React from "react";
import ShopDetailsPage from "./ProductDetails";
import { productsDetails } from "@/lib/api/products";
interface PageProps {
  params: Promise<{ id: string }>;
}
const page = async ({params}: PageProps) => {
  const {id} = await params;

  const shopProduct = await productsDetails(id);

  // console.log(shopProduct, id);

  return (
    <div>
      <ShopDetailsPage shopProduct={shopProduct}></ShopDetailsPage>
    </div>
  );
};

export default page;
