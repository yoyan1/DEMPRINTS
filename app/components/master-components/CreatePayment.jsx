"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd, MdRemove } from 'react-icons/md';
import {Listbox, ListboxItem, Input} from "@nextui-org/react";

export default function CreatePayment() {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const [paymentOptions, setPaymentOptions] = useState([]);
  const handleOpen = () => {
    onOpen();
  }
  const [optionInput, setInput] = useState('')
  const handleChange = (event) => {
    setInput(event.target.value)
  }
  const addOption = () =>{
    if (optionInput.trim() !== '') { 
      setPaymentOptions((prevOptions) => [...prevOptions, optionInput]); 
      setInput(''); 
    }
  }
  
  const removeOption = (optionToRemove) => {
    setPaymentOptions((prevOptions) =>
      prevOptions.filter(option => option !== optionToRemove) // Filter out the option to remove
    );
  };
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
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                    <div>
                      <span>Payment Method</span>
                      <div>
                        <span>Options</span>
                        <div>
                          <Listbox
                            aria-label="User Menu"
                            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
                            itemClasses={{
                              base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                            }}
                          >
                            {paymentOptions.map((option) => (
                              <ListboxItem
                                key={option}
                                endContent={
                                  <Button color="red" variant="light" className="rounded-full" onPress={removeOption(option)}>
                                    <MdRemove/>
                                  </Button>
                                  }
                              >
                                {option}
                              </ListboxItem>

                            ))}
                          </Listbox>
                          <div className="flex items-center gap-5 py-3">
                            <Input label="add option" value={optionInput} onChange={handleChange}/>
                            <Button color="primary" onPress={addOption}><MdAdd/></Button>
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
