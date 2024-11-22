"use client"
import React, {useEffect, useState} from 'react'
import { Link } from "@nextui-org/react"
import { Toaster } from '../components/ui/toaster'
import DarkMode from '../components/public-component/darkMode'
import Employee from '../components/master-components/employee/wrapperModal'
import CreateProduct from '../components/master-components/CreateProduct'
import CreateCustomer from '../components/master-components/CreateCustomer'
import CreateSupplier from '../components/master-components/CreateSupplier'
import CreatePayment from '../components/master-components/CreatePayment'
import CreateExpenses from '../components/master-components/CreateExpenses'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User, Spinner} from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa6";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { VscOrganization } from "react-icons/vsc";
import { FaCashRegister } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { decodeToken } from '../utils/decodeToken'
import { useRouter } from 'next/navigation'


export default function page() {
    const router = useRouter();
    const [user, setUser] = useState({id_number: "", name: ""})
    const [loading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      const loadUser = async () =>{
  
        const token = localStorage.getItem("token");
    
        if (token) {
          const decode = await decodeToken(token)
          setUser(decode);
    
          if(user){
            // const currentTime = Math.floor(Date.now() / 1000);
            // if (decode.exp < currentTime) {
            //   localStorage.removeItem("token");
            //   router.replace("/"); 
            //   return;
            // }
      
            if(!['super admin'].includes(decode.role)){
              router.replace('/')
              localStorage.removeItem("token");
              
            }
          }
          setLoading(false)
        } else{
          router.replace('/')
        }
      }
  
      loadUser()
    }, [router]);

    function logout () {
      localStorage.removeItem("token")
      router.replace("/")
    }
  
    if(loading){
      return <div className="h-screen w-screen flex justify-center items-center"><Spinner/></div>
    }

    if(user) {
        return (
          <body className='bg-slate-300 dark:bg-gray-900 h-full'>
              <Toaster/>
              <div className='flex justify-between items-center w-full p-3 bg-blue-950 text-slate-100'>
                  <div className='flex items-center gap-2'>
                      <Avatar src="/LogoV3.jpg" size="md" />
                      <p className="font-bold text-inherit">DEMPRINTS</p>
                  </div>
                  <div className='flex items-center gap-5'>
                      <DarkMode/>
                      <Dropdown placement="bottom-start">
                          <DropdownTrigger>
                          <User
                              as="button"
                              avatarProps={{
                              isBordered: true,
                              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                              }}
                              className="transition-transform"
                              description={user.id_number}
                              name={user.name}
                          />
                          </DropdownTrigger>
                          <DropdownMenu aria-label="User Actions" variant="flat">
                          <DropdownItem key="profile" className="h-14 gap-2">
                              <p className="font-bold">Signed in as</p>
                              <p className="font-bold">{user.id_number}</p>
                          </DropdownItem>
                          <DropdownItem key="admin">
                            <Link href="/admin">
                              Switch to Admin
                            </Link>
                          </DropdownItem>
                          <DropdownItem key="logout" color="danger" onClick={logout}>
                              Log Out
                          </DropdownItem>
                          </DropdownMenu>
                      </Dropdown>              
                  </div>
              </div>
              {/* <div >
                  <Tabs color="primary" className="bg-gray-100 dark:bg-gray-950 w-full px-5 py-3" selectedKey={selected} onSelectionChange={setSelected}>
                      <Tab key="employee" title="Employee">
                          <div className='p-5'>
                              <h3 className='text-lg font-bold mb-5'>Employee Master Data</h3>
                              <div className='flex gap-5'>
                                  <Card className='flex flex-col gap-5 items-center w-44 h-44'>
                                      <CardBody>
                                          <FaUserPlus className='h-12 w-12 text-blue-800'/>
                                          <span className='font-bold text-slate-700'>Register User</span>
                          
                                      </CardBody>
                                  </Card>
                                  <Card className='flex flex-col gap-5 items-center w-44 h-44'>
                                      <CardBody>
                                          <PiUserList className='h-12 w-12 text-blue-800'/>
                                          <span className='font-bold text-slate-700'>User List</span>
                          
                                      </CardBody>
                                  </Card>
                                  <Card className='flex flex-col gap-5 items-center w-44 h-44'>
                                      <CardBody>
                                          <TbListDetails className='h-12 w-12 text-blue-800'/>
                                          <span className='font-bold text-slate-700'>Job Details</span>
                          
                                      </CardBody>
                                  </Card>
                              </div>
                          </div>
                      </Tab>
                      <Tab key="product" title="Product">
                          Product
                      </Tab>
                      <Tab key="customer" title="Customer">
                          Customer
                      </Tab>
                      <Tab key="supplier" title="Supplier">
                          Supplier
                      </Tab>
                      <Tab key="payment" title="Payment">
                          Payment
                      </Tab>
                      <Tab key="Expenses" title="Expenses">
                          Expenses
                      </Tab>
                  </Tabs>
              </div> */}
              <div className="p-10">
                  <div className="flex flex-col gap-10 justify-center items-center h-full">
                      <div className='flex gap-5 flex-col md:flex-row lg:flex-row'>
                          <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                              <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-900 to-blue-800">
                                  <CgProfile className="w-32 h-32"/>
                              </div>
                              <div className="py-3 px-6">
                                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  Employee
                                  </h5>
                                  <p className="text-xm text-default-400">{'Manage user accounts, personal info, and employment details'}</p>
                              </div>
                              <div className="p-6 pt-0">
                                  <Employee/>
                              </div>
                          </div>
                          <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                              <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-900 to-blue-800">
                                  <FaBoxOpen className="w-32 h-32"/>
                              </div>
                              <div className="py-3 px-6">
                                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  Product Master Data
                                  </h5>
                                  <p className="text-xm text-default-400">Create and manage product categories</p>
                              </div>
                              <div className="p-6 pt-0">
                                  <CreateProduct/>
                              </div>
                          </div>
                          <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                              <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-900 to-blue-800">
                                  <FaUsersBetweenLines className="w-32 h-32"/>
                              </div>
                              <div className="py-3 px-6">
                                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  Customer Master Data
                                  </h5>
                                  <p className="text-xm text-default-400">Manage customer information and type</p>
                              </div>
                              <div className="p-6 pt-0">
                                  <CreateCustomer/>
                              </div>
                          </div>
                      </div>
                      <div className='flex gap-5 flex-col md:flex-row lg:flex-row'>
                          <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                              <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-900 to-blue-800">
                                  <VscOrganization className="w-32 h-32"/>
                              </div>
                              <div className="py-3 px-6">
                                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  Supplier Master Data
                                  </h5>
                                  <p className="text-xm text-default-400">Manage supplier information and representatives</p>
                              </div>
                              <div className="p-6 pt-0">
                                  <CreateSupplier/>
                              </div>
                          </div>
                          <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                              <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-900 to-blue-800">
                                  <FaCashRegister className="w-32 h-32"/>
                              </div>
                              <div className="py-3 px-6">
                                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  Payment Method Master Data
                                  </h5>
                                  <p className="text-xm text-default-400">Manage Payment Options and Types.</p>
                              </div>
                              <div className="p-6 pt-0">
                                  <CreatePayment/>
                              </div>
                          </div>
                          <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                              <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-900 to-blue-800">
                                  <TbReportMoney className="w-32 h-32"/>
                              </div>
                              <div className="py-3 px-6">
                                  <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                                  Expenses
                                  </h5>
                                  <p className="text-xm text-default-400">Track and categorize business expenses.</p>
                              </div>
                              <div className="p-6 pt-0">
                                  <CreateExpenses/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </body>
        )
    }
}

