"use client";

import React from "react";
import { Image } from "@nextui-org/image";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
// import { TbLogout2 } from "react-icons/tb";
// import { IoPersonCircle } from "react-icons/io5";

export default function Heading() {
  return (
    <>
      <nav className="border-b border-gray-200 px-4 py-2.5  left-0 right-0 top-0 z-50 bg-gradient-to-tr from-blue-400 to-blue-950">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <a href="" className="flex items-center justify-between mr-4">
              <Image src="/LogoV3.jpg" className="mr-3 h-10 rounded-full" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                DEMPRINT
              </span>
            </a>
          </div>
          <div className="flex items-center lg:order-2">
            <Dropdown>
              <DropdownTrigger className="rounded-full">
                <Button className=" bg-none rounded-full bg-transparent w-11 h-11 ">
                  <span className="sr-only ">Open user menu</span>
                  <Image
                    className="bordered rounded-full w-11 h-11"
                    src="/image.png"
                  />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem className="" key="new">
                  <span className="text-black">
                    Roland Clarion
                  </span>
                </DropdownItem>

                <DropdownItem className=" " key="edit">
                  <span className="text-black">Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
}
