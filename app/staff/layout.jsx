import React from "react";
import Heading from "./head/heading";
import Sidebar from "./head/aside";
import { Image } from "@nextui-org/image";

export default function Layout({ children }) {
  return (
    <>
      <div class="antialiased bg-white text-black">
        <div className="antialiased bg-gray-50 dark:bg-gray-900 ">
          <div className="flex flex-col">
            <Heading >
              <div class="flex justify-start items-center">
                <button
                  data-drawer-target="drawer-navigation"
                  data-drawer-toggle="drawer-navigation"
                  aria-controls="drawer-navigation"
                  class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    aria-hidden="true"
                    class="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Toggle sidebar</span>
                </button>
                <a href="" className="flex items-center justify-between mr-4">
                  <Image src="/LogoV3.jpg" className="mr-3 h-10 rounded-full" />
                  <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                    DEMPRINT
                  </span>
                </a>
              </div>
            </Heading>
          </div>
          <div className="flex flex-row bg-white dark:bg-black dark:text-white ">
            <Sidebar
              className="w-64 p-4 mr-5 dark:bg-black dark:text-white "
              aria-label="Sidenav"
              id="drawer-navigation"
            />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
