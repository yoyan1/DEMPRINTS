import React from 'react';
import Heading from "./head/heading";
import Sidebar from './head/aside';


export default function Layout({ children }) {
  return (
   
    <>

      <Sidebar />
      <div class=" sm:ml-64">
        
      <Heading/>
      </div>
      <div class="p-4 sm:ml-64">
     
        <div class="p-4 border-2 border-gray-200 border-lined rounded-lg ">
        
          {children}
        </div>
      </div>
    </>
  );
}
