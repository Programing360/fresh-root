import UserDashboardHomePage from '@/components/dashboard/UserDashboardHome';
import { allProducts } from '@/lib/api/products';
import React from 'react';

const page = async() => {

  const ShopProducts = await allProducts()


  return (
    <div>
      <UserDashboardHomePage shopProducts={ShopProducts}/>
    </div>
  );
};

export default page;