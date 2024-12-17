"use client"
import React from 'react'
import {SidebarTrigger} from '@/app/components/ui/sidebar'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Button } from '@/app/components/ui/button'
// import Requests from '../../components/adminComponents/requests/requestModal'

import DarkMode from '@/app/components/public-component/darkMode.jsx';
// import { useRouter } from "next/navigation";

export default function Heading() {
  

  return (
    <>
      {/* bg-gradient-to-tr from-blue-400 to-blue-950 */}

      <nav className=" border-b border-gray-200 px-4 py-2.5 left-0 right-0 top-0 z-50 bg-white dark:bg-black mb-3  ">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
             <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex justify-start items-center"></div>
          <div className="flex items-center lg:order-2">
           <DarkMode/>
          </div>
        </div>
      </nav>
      {/* 
      <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"></div>
      </nav> */}
    </>
  );
}
