import ItemManagementTable from '@/components/dashboard/ItemManagementTable';
import { allProducts } from '@/lib/api/products';
import { getUserSession } from '@/lib/core/session';
import { Suspense } from 'react';

const page = async() => {
    const user = await getUserSession()
    const shopProduct = await allProducts()

    const manageProducts = shopProduct.filter(p => p.userId === user?.id)

    const roleBaseData = user?.role === 'admin' ? shopProduct : manageProducts


    // console.log(roleBaseData);

    return (
        <Suspense fallback={<div>Loading.....</div>}>
            <ItemManagementTable manageProducts={roleBaseData}/>
        </Suspense>
       
    );
};

export default page;