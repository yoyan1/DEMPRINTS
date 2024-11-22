'use client'

import React from 'react';
import SideNav from './aside';

export default function Lastlayout({children}) {
  return (
    <>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <SideNav />
      </aside>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            {children}
        </div>
      </div>
    </>
  );
}
