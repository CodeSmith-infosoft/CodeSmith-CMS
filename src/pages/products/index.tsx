import AddProductPopup from '@/components/AddProductPopup'
import PageTitle from '@/components/CommonComponents/PageTitle'
import Products from '@/components/Products/Products'
import { useState } from 'react'

const ProductsPage = () => {
    const [addMultipleOpen, setAddMultipleOpen] = useState(false)
    const [totalCount, setTotalCount] = useState(0)

    return (
        <>
            <PageTitle title='Products' button='Product' isExport={false} handleProductPopup={setAddMultipleOpen} totalCount={totalCount} />
            <Products setTotalCount={setTotalCount} />
            <AddProductPopup isOpen={addMultipleOpen} setIsOpen={()=>setAddMultipleOpen(false)} />
        </>
    )
}

export default ProductsPage