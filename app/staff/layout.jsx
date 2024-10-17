import React from "react";
import Heading from "./head/heading";
import Sidebar from "./head/aside";

export default function Layout({ children }) {
  return (
    <>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col">
          <Heading />
        </div>
        <div className="flex flex-row">
          {/* Sidebar placed on the left */}
          <Sidebar className="w-64 p-4" />
          <main className="flex-grow p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
