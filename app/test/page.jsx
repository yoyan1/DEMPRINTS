"use client"
import React, { useEffect, useState } from 'react'
import { useUserStore } from "../stores/userStore"
import { useRouter } from 'next/navigation'

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
    return <div>Loading...</div>;
  }

  if(!isAuthenticate && user) {
    if(user.role === 'super admin'){
      router.push('/damin')
    } else if(user.role === 'staff'){
      router.push('/staff')
    }
  }
  if(isAuthenticate) {
    router.push('/login')
  }


  return (
    <div>
      {user ? (
        <div>
          <h1>User Info</h1>
          <p>Role: {user.role}</p>  {/* Assuming the user has a name field */}
          <p>Name: {user.name}</p>  {/* Assuming the user has a name field */}
          <p>Email: {user.email}</p>  {/* Assuming the user has an email field */}
          {/* Render more fields as necessary */}
        </div>
      ) : (
        <div>No user data found</div>
      )}
    </div>
  );
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
