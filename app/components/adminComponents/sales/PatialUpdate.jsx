"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure} from "@nextui-org/react";
import  { useSalesStore } from '@/app/stores/transactionStore'

export default function UpdateSale({ data, isPartial, refresh }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { updateTransaction } = useSalesStore()
  const [ newData, setNewData ] = useState(data)
  const [partial, setPartial] = useState(0)
  const [balance ] = useState(data.balance)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessages] = useState('')

  const onPartialChange = (e) => {
    setPartial(e.target.value)
    if(e.target.value > balance ){
        setErrorMessages("Paid amount must be less than or equal to the balance.")
        return
    }
    setErrorMessages("")
    const newBalance = balance - e.target.value
    const paid_amount = newData.total_amount - balance
    const newPaidAmount = Number(paid_amount) + Number(e.target.value)
    // const paid_amount = newData.amount_paid + e.target.value
    setNewData((prevData) => ({ ...prevData, balance: newBalance, amount_paid: newPaidAmount }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    if(isPartial){
        const result = await updateTransaction(data._id, newData)
        setErrorMessages(result.message)
    }else{
        const updateData = {
            ...newData,
            balance: 0,
            paid_amount: newData.total_amount 
        }
        const result = await updateTransaction(data._id, updateData)
        setErrorMessages(result.message)
    }
    refresh("done")
    onClose()
    setIsLoading(false)
    
  }
  return (
    <>
        <span onClick={onOpen}>{isPartial? 'Partial' : 'Mark as paid'}</span>
      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center">Add Partial Payment</ModalHeader>
              <ModalBody>
                <form onSubmit={onSubmit}>
                    {isPartial? (
                        <div>
                            <div className='flex justify-between'>
                                <span>Balance: ₱{newData.balance}</span>
                                <span>Amount Paid: ₱{newData.amount_paid}</span>
                            </div>
                            <Input 
                            label="Partial Payment" 
                            type='number' 
                            isInvalid={errorMessage? true : false}
                            color={errorMessage ? "danger" : ""}
                            errorMessage={errorMessage}
                            value={partial} 
                            onChange={onPartialChange} 
                            placeholder='Enter partial payment'/>
                        </div>
                    ) : (
                        <span>Mark as paid thi amount { balance }?</span>
                    )}
                    <div className='flex justify-end gap-5 py-3'>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                        </Button>
                        <Button color="primary" type='submit'  isLoading={isLoading}>
                        Proceed
                        </Button>
                    </div>
                </form>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}