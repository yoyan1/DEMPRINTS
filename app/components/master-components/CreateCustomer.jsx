"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

export default function CreateCustomer() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const customerType = ['Walk-in', 'Online', 'Direct (Referral)']
  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
        <div className="p-md">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            <div className="py-3 px-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Customer
            </h5>
            </div>
            <div className="p-6 pt-0">
            <Button color="primary" onPress={handleOpen}><MdAdd/> customer</Button>
            </div>
        </div>
        <Modal 
            size="md"
            isOpen={isOpen} 
            onClose={onClose} 
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Customer Master Data</ModalHeader>
                <ModalBody>
                    <div>
                        <div>
                            <span>Customer Information</span>
                            <div className="flex flex-col gap-3">
                                <Input label="Firstname" placeholder="Enter customer name" variant="bordered"/>
                                <Input label="Middle name (optional)" placeholder="Customer middle name" variant="bordered"/>
                                <Input label="Lastname" placeholder="Customer lastname" variant="bordered"/>
                            </div>
                            <div className="pt-3">
                                <span>Type</span>
                                <Select label="Customer type">
                                    {customerType.map((type) => (
                                        <SelectItem key={type}>
                                        {type}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                    Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                    Submit
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
        </div>
    </>
  );
}
