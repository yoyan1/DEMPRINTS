import React from "react";
import Heading from "./head/heading";
import Sidebar from "./head/aside";

export default function Layout({ children }) {
  return (
    <>
<<<<<<< HEAD
      <div class="antialiased bg-white text-black">
=======
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
>>>>>>> 202b874fc19a43711851b8faeee32405316d45e8
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
