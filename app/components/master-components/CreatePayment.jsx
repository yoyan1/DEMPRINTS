"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tabs, Tab, Input} from "@nextui-org/react";
import { MdAdd} from 'react-icons/md';

export default function CreatePayment() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selected, setSelected] = useState("method");

  const handleOpen = () => {
    onOpen();
  }
  return (
    <>
      <div class="p-md">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            <div className="py-3 px-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                Payment Method
            </h5>
            </div>
            <div className="p-6 pt-0">
            <Button color="primary" onPress={handleOpen}><MdAdd/> payment</Button>
            </div>
        </div>
        <Modal 
            size="md"
            isOpen={isOpen} 
            onClose={onClose} 
        >
            <ModalContent>
            {() => (
                <>
                <ModalHeader className="flex flex-col gap-1">Payment Method</ModalHeader>
                <ModalBody>
                    <div>
                      <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                      >
                        <Tab key="options" title="Options">
                          <form className="flex flex-col gap-4">
                            <span>Create new Payment Options</span>
                            <Input isRequired label="Options" placeholder="Enter new options"/>
                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Submit
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="type" title="Type">
                          <form className="flex flex-col gap-4">
                            <span>Create new Payment Type</span>
                            <Input isRequired label="Type" placeholder="Enter new payment type"/>
                            <div className="flex gap-2 justify-end">
                              <Button fullWidth color="primary">
                                Submit
                              </Button>
                            </div>
                          </form>
                        </Tab>
                      </Tabs>
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
