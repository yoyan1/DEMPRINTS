"use client"
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
// import { Input } from "@nextui-org/react";

export default function CreateTransaction() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleOpen = () => {
    onOpen();
  }

  return (
    <>
        <div class="p-md">
            <Button color="primary" onPress={handleOpen}><MdAdd/> Order</Button>
            <Modal 
                size="2xl"
                isOpen={isOpen} 
                onClose={onClose} 
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Create Order</ModalHeader>
                    <ModalBody>
                        <div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Action
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
