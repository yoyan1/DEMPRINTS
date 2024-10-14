"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoHome } from "react-icons/io5";
import { FaChartBar, FaUsers } from "react-icons/fa";
import { IoBarChartSharp, IoSettingsSharp } from "react-icons/io5";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

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
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/pages/admin"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin'? 'bg-blue-400 text-white' : ''}`}
              >
                <IoHome className="h-4 w-4" />
                Dashboard
              </Link>
              {/* <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}


              <Link
                href="/pages/admin/sales"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin/sales'? 'bg-blue-400 text-white' : ''}`}
              >
                <FaChartBar className="h-4 w-4" />
                Sales
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  8
                </Badge> */}
              </Link>
              <Link
                href="/pages/admin/expenses"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin/expenses'? 'bg-blue-400 text-white' : ''}`}
              >
                <IoBarChartSharp className="h-4 w-4" />
                Expenses
              </Link>
              <Link
                href="/pages/admin/accounts"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin/accounts'? 'bg-blue-400 text-white' : ''}`}
              >
                <FaUsers className="h-4 w-4" />
                Accounts
              </Link>
              <Link
                href="/pages/admin/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin/settings'? 'bg-blue-400 text-white' : ''}`}
              >
                <IoSettingsSharp className="h-4 w-4" />
                Setting
              </Link>
              <Link
                href="/pages/admin/test"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${pathname === '/pages/admin/test'? 'bg-blue-400 text-white' : ''}`}
              >
                {/* <TestTube className="h-4 w-4" /> */}
                Test
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