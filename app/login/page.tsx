"use client"
import { LoginForm } from "@/app/components/login-form"
import { Image } from "@nextui-org/react"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        className="flex-1"
        width={700}
        height={1000}
        alt="Demprints"
        src="/DEMPRINTS-bg.jpg"
      />
      <div className="flex-1 flex justify-center">
       <LoginForm />
      </div>
    </div>
  )
}
