'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { FaClipboardList } from 'react-icons/fa';
import Link from "next/link"

export default function SideNav() {
  const pathname = usePathname();
  return (
    <>
      <ul class="space-y-2 font-medium">
        <Link
          href="/staff/transactions"
          className={`flex text-sm  items-center gap-3 rounded-lg px-3 py-2 text-white transition-all hover:text-blue-200 text-md ${
            pathname === '/staff/transactions' ? 'bg-blue-400 text-dark' : ''
          }`}
        >
          <FaClipboardList className="flex-shrink-0 w-6 h-6 text-sm " />
          <span className="flex-1 ml-3 text-left whitespace-nowrap">
            Transaction
          </span>
        </Link>
      </ul>
    </>
  );
}
