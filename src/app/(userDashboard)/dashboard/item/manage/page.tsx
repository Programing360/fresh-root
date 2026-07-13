import ItemManagementTable from '@/components/dashboard/ItemManagementTable';
import { allProducts } from '@/lib/api/products';
import { getUserSession } from '@/lib/core/session';

const page = async() => {
    const user = await getUserSession()
    const shopProduct = await allProducts()

    const manageProducts = shopProduct.filter(p => p.userId === user?.id)

    const roleBaseData = user?.role === 'admin' ? shopProduct : manageProducts


    // console.log(roleBaseData);

    return (
        <div>
            <ItemManagementTable manageProducts={roleBaseData}/>
        </div>
    );
};

export default page;