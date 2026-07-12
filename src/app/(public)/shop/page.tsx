import React from 'react';
import ShopPage from './shop';
import { allProducts } from '@/lib/api/products';


const page = async() => {

    const products = await allProducts()
    console.log(products);

    return (
        <div>
            <ShopPage products={products}></ShopPage>
        </div>
    );
};

export default page;