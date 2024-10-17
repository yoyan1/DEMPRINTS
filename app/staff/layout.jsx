import React from "react";
import Heading from "./head/heading";
import Sidebar from "./head/aside";

export default function Layout({ children }) {
  return (
    <>
      <div class="antialiased bg-white text-black">
        <div className="flex flex-col">
          <Heading/>
        </div>
        <div className="flex flex-row">
         
          <Sidebar className="w-64 p-4 mr-5" />
          {children}
        </div>
      </div>
    </>
  );
}
