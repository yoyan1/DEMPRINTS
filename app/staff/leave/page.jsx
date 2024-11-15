"use client";

import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  //   ModalFooter,
  useDisclosure,

  Image,
} from "@nextui-org/react";
import React from "react";
import AddLeave from "../component/addLeave";
import { BiSolidEdit } from "react-icons/bi";
// import { File } from "lucide-react";

export default function LeavePage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal size='sm' isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader classNameName="flex flex-col gap-1">File Leave</ModalHeader>
            <ModalBody>
              <AddLeave />
            </ModalBody>
            {/* <ModalFooter>

            </ModalFooter> */}
          </>
        </ModalContent>
      </Modal>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-end items-center mx-auto max-w-screen-xl">

            <div className="items-center lg:order-2 ">
              {/* <a href="#" className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
              <a href="#" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a> */}
             
              <Button className='float-right' color='primary' size="sm" onPress={onOpen}><BiSolidEdit/>Request</Button>
            </div>

          </div>
        </nav>
      </header>



      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ml-3 mr-3">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Types of Leave
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Proof
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <Image src='../image.png' className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 text-justify font-semibold text-gray-900 dark:text-white">
                Sick Leave
              </td>
              <td className="px-6 py-4">
                <div className=" items-center text-justify">
                  <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi, modi eveniet perferendis cupiditate molestias facilis maiores nesciunt maxime harum quidem hic magni voluptatem! Ex adipisci distinctio magni pariatur quas voluptas.</p>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                <Image src="../medical.png" className="w-16 md:w-32 max-w-full max-h-full" />
              </td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Pending</a>
              </td>
            </tr>

          </tbody>
        </table>
      </div>



    </>
  );
}
