import { LoginForm } from "@/app/components/login-form"
import { Image } from "@nextui-org/react"

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <div className="flex-1 bg-blue-200 w-[100vh] ">
        <Image
        width={300}
        alt="NextUI hero Image"
        src="https://nextui.org/images/hero-card-complete.jpeg"
      />
      </div>
      <div className="flex-1">
       <LoginForm />
      </div>
    </div>
  )
}
