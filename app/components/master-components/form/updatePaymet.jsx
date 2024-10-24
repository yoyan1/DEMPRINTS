"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure} from "@nextui-org/react";
import { TbEdit } from "react-icons/tb";
import { LuClipboardEdit } from "react-icons/lu";
import axios from "axios";

export default function UpdateProduct({ data, type, done, }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [inputValue, setInputValue] = useState(data.name)
  const [isLoading, setIsLoading] = useState(false)

  const updateItem = async () =>{
    setIsLoading(true)
    try{
      const response = await axios.post(`http://localhost:5000/api/master/updatePaymentMethod/${data._id}`, {name: inputValue} )
      console.log(response);

      done(response.data)
      onClose()
      setIsLoading(false)
    } catch(e){
      console.log(e)
      setIsLoading(false)
    }

    
  }

  return (
    <>
      <Button isIconOnly color="primary" onPress={onOpen} variant="light"><TbEdit className="h-5 w-5"/> </Button>
      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center"><LuClipboardEdit className="bg-primary-200 p-1 h-7 w-7 text-primary border border-primary rounded"/>Update {type}</ModalHeader>
              <ModalBody>
                  <form  className="flex flex-col gap-4">
                  <span>Create Payment {type}</span>
                  <Input isRequired label={type} placeholder={`Enter payment ${type}`}  value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                  </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                color="primary" 
                onPress={updateItem}
                isLoading={isLoading}
                spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-current"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                }>
                  Proceed
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}