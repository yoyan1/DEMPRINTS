"use client";

import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { BsPieChartFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DarkMode from '@/app/components/public-component/darkMode.jsx';

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <main>
      <aside
        className="  top-0 left-0 z-40 w-64 h-screen pt-1 transition-transform  -translate-x-full bg-gradient-to-tr from-blue-950 to-blue-400 border-r border-gray-200 md:translate-x-0  dark:border-gray-700 max-h-screen"
        aria-label="Sidenav"
        id="drawer-navigation"
        
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-none">
          <ul className="space-y-1 ">
            <Link
              href="/staff/Overview"
              className={`flex text-sm  items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${
                pathname === "/staff/Overview" ? "bg-blue-400 text-dark" : ""
              }`}
            >
              <BsPieChartFill className="flex-shrink-0 w-6 h-6 text-sm " />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Overview
              </span>
            </Link>

            <Link
              href="/staff/transaction"
              className={`flex text-sm  items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${
                pathname === "/staff/transaction" ? "bg-blue-400 text-dark" : ""
              }`}
            >
              <FaClipboardList className="flex-shrink-0 w-6 h-6 text-sm " />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Transaction
              </span>
            </Link>
            <Link
              href="/staff/transaction"
              className={`flex text-sm  items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${
                pathname === "/staff/" ? "bg-blue-400 text-dark" : ""
              }`}
            >
              <IoSettingsSharp className="flex-shrink-0 w-6 h-6 text-sm " />
              <span className="flex-1 ml-3 text-left whitespace-nowrap">
                Setting
              </span>
            </Link>
          </ul>
          <DarkMode/>
        </div>
        
      </aside>
    </main>
  );
}
