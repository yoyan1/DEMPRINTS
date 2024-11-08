"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, } from "@nextui-org/react";
import EmployeeAccounts from './employee'

export default function ModalWrapper() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
      <div className="p-md">
        <Button color="primary" onPress={handleOpen}>View details</Button>
        <Modal 
            size="3xl"
            isOpen={isOpen} 
            onClose={onClose} 
            scrollBehavior="outside"
        >
            <ModalContent>
            {() => (
                <>
                <ModalHeader className="flex flex-col gap-1">Employee Accounts</ModalHeader>
                <ModalBody>
                    <div>
                      <EmployeeAccounts/>
                    </div>
                </ModalBody>
                </>
            )}
            </ModalContent>
        </Modal>    
        </div>
    </>
  );
}
