import React from "react";
import Heading from "./head/heading";
import Sidebar from "./head/aside";
import { Image } from "@nextui-org/image";

export default function Layout({ children }) {
  return (
    <div className="bg-white text-black dark:bg-gray-900">
      <Heading>
        <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-900">
          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
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
              />
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
              />
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <a href="" className="flex items-center mr-4">
            <Image
              src="/LogoV3.jpg"
              className="mr-3 h-10 rounded-full"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              DEMPRINT
            </span>
          </a>
        </div>
      </Heading>
     
        <Sidebar
          className="fixed top-0 left-0 z-40 w-40 h-screen pt-14 transition-transform -translate-x-full dark:bg-black dark:text-white"
          aria-label="Sidenav"
          id="drawer-navigation"
        />
        <main className=" sticky   bg-white dark:bg-black text-black dark:text-white">
          {children}
        </main>
      
    </div>
  );
}
