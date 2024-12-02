"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import axios from "axios";
import { useToast } from '@/hooks/use-toast';

export default function Delete({ id, type, done, collection }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const onDeleted = (message) => {
    toast({
      variant: "success",
      title: "Success!",
      color: "success",
      description: message,
    })
  }
  const deleteItem = async() =>{
    setIsLoading(true)
    if(collection === 'products'){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/master/products/${id}`)
      console.log(response.data);
      onDeleted(response.data)
      done(response.data)
    }
    if(collection === 'payments'){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/master/deletePaymentMethod/${id}`)
      console.log(response.data);
      onDeleted(response.data)
      done(response.data)
    }
    if(collection === 'source'){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/master/deletePaymentSource/${id}`)
      console.log(response.data);
      onDeleted(response.data)
      done(response.data)
    }
    
    if(collection === 'expenses'){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/master/deleteExpensesCategory/${id}`)
      console.log(response.data);
      onDeleted(response.data)
      done(response.data)

    }
    if(collection === 'customerType'){
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/master/deleteCustomerType/${id}`)
      console.log(response.data);
      onDeleted(response.data)
      done(response.data)

    }
    setIsLoading(false)
    onClose()
  }
  return (
    <>
      <Button isIconOnly color="danger" variant="light" onPress={onOpen}><MdDeleteOutline className="h-5 w-5"/></Button>
      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center"><CiWarning className="bg-warning-200 p-1 h-7 w-7 text-warning-950 border border-warning rounded"/>Delete {type}</ModalHeader>
              <ModalBody>
                <span>Are you sure you want to delete this {type}?</span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={deleteItem} isLoading={isLoading}>
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