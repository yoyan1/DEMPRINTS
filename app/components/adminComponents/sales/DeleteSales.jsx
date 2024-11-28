"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CiWarning } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useToast } from '@/hooks/use-toast';
import  { useSalesStore } from '@/app/stores/transactionStore'
import { useIdStore } from "@/app/stores/idStore";

export default function DeleteSale({ id, label, refresh }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { toast } = useToast()
  const { deleteTransaction } = useSalesStore()
  const { fetchTransactionId, updateTransactionId } = useIdStore()
  const [isLoading, setIsLoading] = useState(false)
  
  
  const deleteItem = async() =>{
    setIsLoading(true)
    console.log(id)
    try{
        const response = await deleteTransaction(id)
        const responseID = await fetchTransactionId()
        const generatedID = responseID.data.length > 0? responseID.data : [{_id: '', count: 0}]
        const newId = generatedID[0].count-1
        const updateId = await updateTransactionId({id: generatedID[0]._id, count: newId})
        refresh("done")
    } catch(e){
        console.log(e.message)
    }
    setIsLoading(false)
    onClose()
  }
  return (
    <>
        {label? (
            <span onClick={onOpen}>{label}</span>
        ) : (
            <Button isIconOnly color='danger' variant="light" onPress={onOpen}><RiDeleteBinLine className="h-4 w-4"/></Button>
        )}
      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center"><CiWarning className="bg-warning-200 p-1 h-7 w-7 text-warning-950 border border-warning rounded"/>Delete transaction</ModalHeader>
              <ModalBody>
                <span>Are you sure you want to delete this transaction?</span>
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