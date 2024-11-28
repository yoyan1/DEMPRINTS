"use client"
import React, { useEffect, useState } from "react"
import { Input, Button } from "@nextui-org/react"
import { useUserStore } from "../stores/userStore"
import { useRouter } from 'next/navigation'
import { decodeToken } from "../utils/decodeToken"
import { IoEye } from "react-icons/io5";
import { IoIosEyeOff } from "react-icons/io";
import ForgotPassword from './user/forgotPassword'


export function LoginForm() {
  const { login, loading } = useUserStore()
  const [ credentials, setCredentials ] = useState({id_number: '', password: ''})
  const [errorMessage, setErrorMessage] = useState({})
  const [mounted, setMounted] = useState(false); 
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  
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
      setErrorMessage({err: response.data.err, msg: `${response.data.message}. Please wait...`})
      if (typeof window !== "undefined") { 
        localStorage.setItem("token", response.data.token)
        const decode = await decodeToken(response.data.token)

        if(['admin', 'super admin'].includes(decode.role)){
          router.push('/admin')
        } else if(decode.role === 'staff'){
          router.push('/staff')
        } else{
          setErrorMessage({err: true, msg: "Role not found"})
        }
      }
    } else{
      setErrorMessage({err: response.data.err, msg: response.data.message})
    }
  }

  return (
    <div className="max-w-lg w-full">
      <div className="overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-center text-3xl font-extrabold">
            Welcome
          </h2>
          <p className="mt-4 text-center text-gray-400">Sign in to continue</p>
          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="flex justify-center">
              {errorMessage.msg? (
                <span className={`min-w-xl text-center p-3 border ${errorMessage.err? 'text-red-600 border-red-600 bg-red-200' : 'text-green-600 border-green-600 bg-green-200'}`}>{errorMessage.msg}</span>
              ) : null}
            </div>
            <div className="rounded-md shadow-sm flex flex-col gap-3">
              <div>
                <Input 
                size="lg" 
                label="ID Number" 
                labelPlacement="outside" 
                placeholder="123456789"
                name="id_number"
                value={credentials.id_number}
                onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <Input 
                size="lg" 
                label="Password" 
                type={isVisible ? "text" : "password"}
                labelPlacement="outside" 
                placeholder="Enter your password"
                name="password"
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <IoIosEyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <IoEye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }          
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
                  <ForgotPassword/>
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
