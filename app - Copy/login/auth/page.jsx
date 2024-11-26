"use client"
import React, { useEffect, useState } from 'react'
import { useUserStore } from "@/app/stores/userStore"
import { useRouter } from 'next/navigation'
import { Spinner } from '@nextui-org/react'

export default function TestPage() {
  const { user, loading, error, isAuthenticate, getAuthenticateUser} = useUserStore()
  const router = useRouter()

  useEffect(() => {
    const load = async() => {
      await getAuthenticateUser()
    }

    load()
  }, [getAuthenticateUser]); 

  if (loading) {
    return <div className="h-[100vh] flex justify-center items-center"><Spinner /></div>;
  }

  if(!isAuthenticate) {
    if(user.role === 'super admin'){
      router.push('/admin')
    } else if(user.role === 'staff'){
      router.push('/staff')
    }
  }

  if(isAuthenticate && !user) {
    router.push('/login')
  }

  return <div className="h-[100vh] flex justify-center items-center"><Spinner /></div>

}

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