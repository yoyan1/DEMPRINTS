"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CiWarning } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useToast } from '@/hooks/use-toast';
import  { useUserStore } from '@/app/stores/userStore'

export default function DeleteUser({ id, refresh }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { toast } = useToast()
  const { deleteUser } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  
  const onDeleted = (data) => {
    toast({
      variant: "success",
      title: data.isSuccess? "Success!" : "Error!",
      color: "success",
      description: data.message,
    })
  }
  
  const deleteItem = async() =>{
    setIsLoading(true)
    console.log(id)
    const response = await deleteUser(id)
    onDeleted(response.data)

    setIsLoading(false)
    refresh("done")
    onClose()
  }
  return (
    <>
      <Button isIconOnly color="danger" variant="light" onPress={onOpen}><RiDeleteBinLine className="h-5 w-5"/></Button>
      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center"><CiWarning className="bg-warning-200 p-1 h-7 w-7 text-warning-950 border border-warning rounded"/>Delete user</ModalHeader>
              <ModalBody>
                <span>Are you sure you want to delete this user?</span>
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