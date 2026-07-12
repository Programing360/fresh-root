import ItemManagementTable from '@/components/dashboard/ItemManagementTable';
import { allProducts } from '@/lib/api/products';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async() => {
    const user = await getUserSession()
    const shopProduct = await allProducts()

    const manageProducts = shopProduct.filter(p => p.userId === user?.id)
    console.log(manageProducts);

    return (
        <div>
            <ItemManagementTable manageProducts={manageProducts}/>
        </div>
    );
};

export default page;