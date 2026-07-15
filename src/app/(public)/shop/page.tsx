import React from 'react';
import ShopPage from './shop';
import { allProducts } from '@/lib/api/products';


const page = async() => {

    const products = await allProducts()

    return (
        <div>
            <ShopPage initialProducts={products}></ShopPage>
        </div>
    );
};

export default page;