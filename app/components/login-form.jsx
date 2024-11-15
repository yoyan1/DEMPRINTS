"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@nextui-org/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { useUserStore } from "../stores/userStore"
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const { login, loading } = useUserStore()
  const [ credentials, setCredentials ] = useState({email: '', password: ''})
  const [mounted, setMounted] = useState(false); 
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  
  if (!mounted) {
    return <div>Loading...</div>; 
  }
  const router = useRouter()

  const submit = async (e) =>{
    e.preventDefault()
    const response = await login(credentials)
    if(!response.data.err){
      if (typeof window !== "undefined") { 
        localStorage.setItem("token", response.data.token)
      }
      router.push('/test')
    } else{
      console.log(response.data.message)
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={credentials.email}
                onChange={(e)=>(setCredentials((prevData) => ({...prevData, email: e.target.value})))}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input 
              id="password"
              type="password" 
              required 
              value={credentials.password} 
              onChange={(e)=>(setCredentials((prevData) => ({...prevData, password: e.target.value})))}
              />
            </div>
            <Button type="submit" color="primary" className="w-full" isLoading={loading}>
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
