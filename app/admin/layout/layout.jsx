import React from 'react'
import Header from '../_sections/header'
import { AppSidebar } from "@/app/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/app/components/ui/sidebar"

export default function AdminLayout({children}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="dark:bg-gray-800 bg-slate-100 h-full">
          {<Header/>}
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 
