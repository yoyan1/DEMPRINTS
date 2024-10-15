"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaShoppingCart, FaUsers } from "react-icons/fa";
import { IoIosGrid } from 'react-icons/io';
import { IoSettingsSharp } from "react-icons/io5";
import {Card, CardHeader, CardBody, Image, Button} from "@nextui-org/react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Aside (){
  const pathname = usePathname()
    return(
      <div className="hidden  bg-muted/40 md:block bg-gradient-to-tr from-blue-950 to-blue-400">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/LogoV3.jpg" alt="demprint logo" width={40} height={40} className="rounded-full"/>
              <span className="text-white">DEMPRINTS</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <RxHamburgerMenu/>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/admin"
                className={`flex  items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/admin'? 'bg-blue-400 text-white' : ''}`}
              >
                <IoIosGrid className="h-4 w-4" />
                Dashboard
              </Link>


              <Link
                href="/admin/sales"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/admin/sales'? 'bg-blue-400 text-white' : ''}`}
              >
                <FaShoppingCart className="h-4 w-4" />
                Sales
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  8
                </Badge> */}
              </Link>
              <Link
                href="/admin/employee-accounts"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/admin/employee-accounts'? 'bg-blue-400 text-white' : ''}`}
              >
                <FaUsers className="h-4 w-4" />
                Accounts
              </Link>
              <Link
                href="/admin/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin/settings'? 'bg-blue-400 text-white' : ''}`}
              >
                <IoSettingsSharp className="h-4 w-4" />
                Setting
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <h4 className="font-bold text-large">DEMPRINTS</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src="/LogoV3.jpg"
                    width={270}
                    />
                </CardBody>
            </Card>
          </div>
        </div>
    </div>
    )
}