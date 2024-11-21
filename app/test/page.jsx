
// "use client"
// import { productStore } from "../stores/productStore"
// import React, { useEffect } from 'react'

// export default function page() {
//   const {products, error, loadProduct, fetchProducts} = productStore()

//   useEffect(()=>{
//     fetchProducts()
//   }, [fetchProducts])

//   if(loadProduct) {
//     return <div>Loading...</div>;
//   }

//   if(error) {
//     return <div>{error}</div>;
//   }
//   return (
//     <div>
//       {products}
//     </div>
//   )
// }
"use client"
import React from 'react'
import { Select, SelectItem } from '@nextui-org/react'

const INITIAL_VISIBLE_COLUMNS = ["transaction_no", "item_name", "unit_cost",  "customer_type", "customer_name", "payment_type", "sales_person", "actions"];
export default function page() {
  const [filterSelection, setFilterSelection] = React.useState("")
  return (
    <div>
      {filterSelection}
      <Select 
        label="Filter selection" 
        className="max-w-xs" 
        value={filterSelection}
        onChange={(e)=> setFilterSelection(e.target.value)}
      >
          <SelectItem key="name">
            name
          </SelectItem>
          <SelectItem key="product">
            product
          </SelectItem>
      </Select>
    </div>
  )
}

