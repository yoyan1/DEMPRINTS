
"use client"
import { productStore } from "../stores/productStore"
import React, { useEffect } from 'react'

export default function page() {
  const {products, error, loadProduct, fetchProducts} = productStore()

  useEffect(()=>{
    fetchProducts()
  }, [fetchProducts])

  if(loadProduct) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      {products}
    </div>
  )
}
