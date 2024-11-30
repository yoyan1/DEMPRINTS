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
import Requests from '../../components/adminComponents/requests/requestModal'

export default function Header (){
    const { setTheme } = useTheme()
    return(
      <div className='flex justify-between px-5 py-2 bg-white dark:bg-gray-900'>
        <SidebarTrigger className="-ml-1" />
        <div className='flex items-center'>
          <Requests/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="light" size="icon" >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
}