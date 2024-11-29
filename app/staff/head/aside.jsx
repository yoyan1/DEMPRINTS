'use client';

import React, { useEffect, useState } from 'react';
import { FaClipboardList } from 'react-icons/fa';
import Link from 'next/link';
import {
  Divider,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { decodeToken } from '@/app/utils/decodeToken';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const decode = await decodeToken(token);
        setUser(decode);

        if (user) {
          if (!['staff'].includes(decode.role)) {
            router.replace('/');
            localStorage.removeItem('token');
          }
        }
      } else {
        router.replace('/');
      }
    };

    loadUser();
  }, [router]);


  const handleLgout = () => {
    localStorage.removeItem('token');
    router.replace('/');
  }

  return (
    <>
      <button
        data-drawer-target="cta-button-sidebar"
        data-drawer-toggle="cta-button-sidebar"
        aria-controls="cta-button-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="cta-button-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-blue-900"
        aria-label="Sidebar"
       
      >
        <div className="h-full px-3 py-4 overflow-y-auto dark:bg-gray-800">
          <a href="" className="flex items-center justify-start mr-3 mb-5">
            <Image src="/LogoV3.jpg" className="mr-1 h-10 rounded-full" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              DEMPRINT
            </span>
          </a>
          <ul className="space-y-2 font-medium mb-5">
            <Link
              href="/staff/transactions"
              className={`flex text-sm mb-5  items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${
                pathname === '/staff' ? 'bg-blue-900 text-dark rounded-lg' : ''
              }`}
            >
              <FaClipboardList className="flex-shrink-0 w-6 h-6 text-sm " />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Transaction
              </span>
            </Link>
            <Divider className="bg-white mt-5" />
            <Dropdown className="mt-3">
              <DropdownTrigger className="rounded-full justify-start">
                <Button
                  className="flex text-sm  items-center gap-3 rounded-lg px-3 py-2 bg-transparent text-black dark:text-white"
                  aria-label="Open user menu"
                >
                  <Image
                    className="bordered rounded-full w-5 h-5"
                    src="/image.png"
                  />
                  {user?.name} <BsThreeDotsVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="User Menu">
                <DropdownItem key="username">
                  <span className="text-black dark:text-white"> {user?.name}</span>
                </DropdownItem>
                
                <DropdownItem
                  onClick={handleLgout}
                  className="flex"
                  key="logout"
                  startContent={
                    <>
                     <MdLogout /> <span className="text-black dark:text-white">Logout</span>
                    </>
                  }
                ></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </ul>
        </div>
      </aside>
    </>
  );
}
