'use client';

import React, { useEffect } from 'react';
// import { Spinner } from "@nextui-org/react";
import { Image } from '@nextui-org/image';
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { useUserStore } from '../../stores/userStore';
import DarkMode from '@/app/components/public-component/darkMode.jsx';
// import { useRouter } from "next/navigation";

export default function Heading() {
  const { user, getAuthenticateUser } = useUserStore();
  // const router = useRouter();

  useEffect(() => {
    getAuthenticateUser();
  }, [getAuthenticateUser]);

  // if (loading) {
  //   return (
  //     <div><Spinner label="Loading..." /></div>
  //   );
  // }

  // if (!user && !loading) {
  //   router.push('/login');
  //   return null;
  // }

  return (
    <>
      {/* bg-gradient-to-tr from-blue-400 to-blue-950 */}

      <nav className=" border-b border-gray-200 px-4 py-2.5 left-0 right-0 top-0 z-50  ">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              data-drawer-target="drawer-navigation"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              aria-label="Toggle sidebar"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                aria-hidden="true"
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
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
