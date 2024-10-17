"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

export default function CreateSupplier() {
  const {isOpen, onOpen, onClose} = useDisclosure();

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
                    Supplier
                </h5>
                </div>
                <div className="p-6 pt-0">
                <Button color="primary" onPress={handleOpen}><MdAdd/> supplier</Button>
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
                    <ModalHeader className="flex flex-col gap-1">Supplier Master Data</ModalHeader>
                    <ModalBody>
                        <div>
                            <span>Supplier Information</span>
                            <div className="flex flex-col gap-4">
                                <Select label="type">
                                    <SelectItem>Individual</SelectItem>
                                    <SelectItem>Organization</SelectItem>
                                </Select>
                                <Input label="Name" placeholder="Enter supplier name"/>
                                <Input label="Address" placeholder="Enter supplier address"/>
                                <Input type="number" label="Contact No." placeholder="Enter suplier contact #"/>
                                <div>
                                    <span>Representative Details</span>
                                    <div className="flex flex-col gap-3">
                                        <Input  label="Name" placeholder="Enter representative name"/>
                                        <Input label="Position" placeholder="Enter position"/>
                                        <Input label="Contact No." placeholder="Enter representative contact #"/>
                                    </div>
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
