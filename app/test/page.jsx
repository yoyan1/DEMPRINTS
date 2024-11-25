
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
import { Select, SelectItem, Input } from '@nextui-org/react'
import { onFileChange } from '../composables/fileHandler';

const INITIAL_VISIBLE_COLUMNS = ["transaction_no", "item_name", "unit_cost",  "customer_type", "customer_name", "payment_type", "sales_person", "actions"];
export default function page() {
  const [filterSelection, setFilterSelection] = React.useState("")
  const [image, setImage] = React.useState(null)


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
      <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div class="md:flex">
          <div class="w-full p-3">
            <div
              class="relative h-48 rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <div class="absolute flex flex-col items-center">
                {image? (
                  <img
                    alt="File Icon"
                    class="mb-3"
                    src={image}
                  />
                ): (
                  <img
                    alt="File Icon"
                    class="mb-3"
                    src="https://img.icons8.com/dusk/64/000000/file.png"
                  />
                )}
                <span class="block text-gray-500 font-semibold"
                  >Drag &amp; drop your files here</span
                >
                <span class="block text-gray-400 font-normal mt-1"
                  >or click to upload</span
                >
              </div>

              <input
                class="h-full w-full opacity-0 cursor-pointer"
                type="file"
                onChange={(e)=> {
                  const result = onFileChange(e)
                  setImage(result)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

