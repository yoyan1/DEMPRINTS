"use client"
import React from 'react'
import { Toaster } from '../components/ui/toaster'
import DarkMode from '../components/public-component/darkMode'
import Employee from '../components/master-components/employee/wrapperModal'
import CreateProduct from '../components/master-components/CreateProduct'
import CreateCustomer from '../components/master-components/CreateCustomer'
import CreateSupplier from '../components/master-components/CreateSupplier'
import CreatePayment from '../components/master-components/CreatePayment'
import CreateExpenses from '../components/master-components/CreateExpenses'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, User} from "@nextui-org/react";
import { CgProfile } from "react-icons/cg";
import { FaBoxOpen } from "react-icons/fa6";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { VscOrganization } from "react-icons/vsc";
import { FaCashRegister } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";


export default function page() {
  return (
    <main>
        <Toaster/>
        <div className='flex justify-between items-center w-full p-3'>
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
                        description="@tonyreichert"
                        name="Tony Reichert"
                    />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">@tonyreichert</p>
                    </DropdownItem>
                    <DropdownItem key="settings">
                        My Settings
                    </DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">
                        Analytics
                    </DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">
                        Help & Feedback
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>              
            </div>
        </div>
        <div className="bg-slate-100 dark:bg-gray-900 p-10">
            <div className="flex flex-col gap-10 justify-center items-center h-full">
                <div className='flex gap-5 flex-col md:flex-row lg:flex-row'>
                    <div className="flex-1 relative flex flex-col justify-between rounded-xl bg-white dark:bg-black bg-clip-border text-gray-700 shadow-md">
                        <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
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
                        <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
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
                        <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
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
                        <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
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
                        <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
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
                        <div className="flex justify-center items-center relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
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
    </main>
  )
}

