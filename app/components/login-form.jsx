"use client"
import React, { useEffect, useState } from "react"
import { Input, Button } from "@nextui-org/react"
import { useUserStore } from "../stores/userStore"
import { useRouter } from 'next/navigation'
import { decodeToken } from "../utils/decodeToken"

export function LoginForm() {
  const { login, loading } = useUserStore()
  const [ credentials, setCredentials ] = useState({email: '', password: ''})
  const [errorMessage, setErrorMessage] = useState()
  const [mounted, setMounted] = useState(false); 
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  
  if (!mounted) {
    return <div>Loading...</div>; 
  }
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prevData) => ({...prevData, [name] : value}))
    
  }
  const submit = async (e) =>{
    e.preventDefault()
    const response = await login(credentials)
    if(!response.data.err){
      setErrorMessage(response.data.message)
      if (typeof window !== "undefined") { 
        localStorage.setItem("token", response.data.token)
        const decode = await decodeToken(response.data.token)

        if(['admin', 'super admin'].includes(decode.role)){
          router.push('/admin')
        } else if(decode.role === 'staff'){
          router.push('/staff')
        } else{
          setErrorMessage("Role not found")
        }
      }
    } else{
      setErrorMessage(response.data.message)
      console.log(response.data.message)
    }
  }

  return (
    <div className="max-w-lg w-full">
      <div
        // style="box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);"
        className="rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold">
            Welcome
          </h2>
          <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
          <form onSubmit={submit} className="mt-8 space-y-6">
            {errorMessage}
            <div className="rounded-md shadow-sm flex flex-col gap-3">
              <div>
                <Input 
                size="lg" 
                label="ID Number" 
                labelPlacement="outside" 
                placeholder="123456789"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <Input 
                size="lg" 
                label="Password" 
                type="password" 
                labelPlacement="outside" 
                placeholder="Enter your password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-indigo-500 focus:ring-indigo-400 border-gray-600 rounded"
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                />
                <label className="ml-2 block text-sm text-gray-400" for="remember-me"
                  >Remember me</label
                >
              </div>

              <div className="text-sm">
                <a
                  className="font-medium text-indigo-500 hover:text-indigo-400"
                  href="#"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" size="lg" color="primary" className="w-full" isLoading={loading}>Sign In</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
