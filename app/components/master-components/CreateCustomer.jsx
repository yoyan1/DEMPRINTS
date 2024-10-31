"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
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
            <Button color="primary" onPress={handleOpen}>View details</Button>
            <Modal 
                size="md"
                isOpen={isOpen} 
                onClose={onClose} 
                scrollBehavior="outside"
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
