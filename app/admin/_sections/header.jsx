"use client"
import DropdownComponent from '@/app/components/adminComponents/dropdown/headerDropDown'


export default function Header (){
//   const pathname = usePathname

    return(
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 bg-gradient-to-r from-blue-400 to-blue-950">
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button> */}
            {/* </SheetTrigger> */}
            {/* <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold" 
                >
                  <Image src="/LogoV3.jpg" alt="logo" width={50} height={50} className="rounded-full"/>
                  <span className="text-blue-400">DEM</span><span className="text-blue-950">PRINTS</span>
                </Link>
                <Link
                  href="pages/admin"
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${pathname === '/admin'? 'bg-blue-400' : ''}`}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl  px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Sales
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="/pages/admin/expenses"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground  hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Expenses
                </Link>
                <Link
                  href="/pages/admin/accounts"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Accounts
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
              <div className="mt-auto">
              <Card x-chunk="dashboard-02-chunk-0 bg-blue-100">
                <CardHeader className="pt-0 p-4">
                  <CardTitle className="text-blue-400">DEM<span className="text-blue-950">PRINTS</span></CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, esse.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0 flex justify-center">
                  <Image src="/LogoV3.jpg" alt="logo" width={150} height={150}/>
                </CardContent>
              </Card>
                </div>
            </SheetContent> */}
          {/* </Sheet> */}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                {/* <Input
                    placeholder="search.."
                    startContent={
                        <BiSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    className="max-w-[300px]"
                /> */}

              </div>
            </form>
          </div>
          <DropdownComponent/>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
    )
}