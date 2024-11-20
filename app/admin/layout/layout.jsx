"use client"
import React from 'react'
import Header from '../_sections/header'
import { AppSidebar } from "@/app/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/ui/sidebar"
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/app/stores/userStore'
import { Spinner } from '@nextui-org/react'

export default function AdminLayout({children}) {
  const { user, loading, error, isAuthenticate, getAuthenticateUser} = useUserStore()
  const router = useRouter();

  React.useEffect(() =>{
    const load = async() => {
      await getAuthenticateUser()
    }

    load()
  }, [getAuthenticateUser])
  
  if(loading) {
    return <div className="h-[100vh] flex justify-center items-center"><Spinner /></div>;
  }

  if(isAuthenticate) {
    router.push('/login')
  }

  if(user){
    return (
      <SidebarProvider>
        <AppSidebar user={user}/>
        <SidebarInset>
          <div className="dark:bg-gray-800 bg-slate-100 h-full">
            {<Header/>}
            {React.cloneElement(children, { user: user })}
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }
} 
