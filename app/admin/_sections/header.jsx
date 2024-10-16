"use client"
import React from 'react'
import { usePathname } from 'next/navigation';
import DropdownComponent from '@/app/components/adminComponents/dropdown/headerDropDown'
import {Navbar, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link} from "@nextui-org/react";

export default function Header (){
  const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
      {
        name: 'Dashboard',
        icon: '',
        link: '/admin'
      },
      {
        name: 'Sales',
        icon: '',
        link: '/admin/sales'
      },
      {
        name: 'Accounts',
        icon: '',
        link: '/admin/employee-accounts'
      },
      {
        name: 'Settings',
        icon: '',
        link: '/admin/settings'
      },
    ];
    return(
      <Navbar onMenuOpenChange={setIsMenuOpen}  className="bg-gradient-to-r from-blue-400 to-blue-950">
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden text-white"
          />
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <DropdownComponent/>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item}>
              <Link
                color={
                  pathname === item.link ? "primary" : "foreground"
                }
                className="w-full"
                href={item.link}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    )
}