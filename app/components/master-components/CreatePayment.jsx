"use client"
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tabs, Tab, Input, Listbox, ListboxItem} from "@nextui-org/react";
import { MdAdd} from 'react-icons/md';
import axios from "axios";
import Delete from "./actions/Delete";
import UpdatePayment from "./form/updatePaymet"

export default function CreatePayment() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selected, setSelected] = useState("method");
  const [paymentType, setPaymentType] = useState('')
  const [paymentOptions, setPaymentOptions] = useState('')
  const [typeList, setTypeList] = useState([])
  const [optionList, setOptionList] = useState([])
  const handleOpen = () => {
    onOpen();
  }

  const getPaymentMethod = async () =>{
    try{
      const responseOptions = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentOptions')
      setOptionList(responseOptions.data)
      const responseType = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentType')
      setTypeList(responseType.data)
    } catch(e){
      consol.log(e)
    }
  }

  useEffect(()=>{
    getPaymentMethod()
  }, [])

  const [isLoading, setIsLoading] = useState(false)
  const submitPaymentType = async () =>{
    setIsLoading(true)

    const response = await axios.post('https://demprints-backend.vercel.app/api/master/createPaymentType', {name: paymentType})
    console.log(response)

    setPaymentType('')
    setIsLoading(false)
    getPaymentMethod()
  }
  const submitPaymentOptions = async ()=>{
    setIsLoading(true)
    const response = await axios.post('https://demprints-backend.vercel.app/api/master/createPaymentOptions', {name: paymentOptions})
    console.log(response)

    setPaymentOptions('')
    setIsLoading(false)
    getPaymentMethod()
  }

  const done = () =>{
    getPaymentMethod()
  }
  return (
    <>
      <div className="p-md">
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
            scrollBehavior="outside"
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
                        color="primary"
                        radius="full"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                      >
                        <Tab key="options" title="Options">
                          <Listbox
                          aria-label="Listbox Variants"
                          color="solid" 
                          topContent={<span>Payment options</span>}
                          >
                            {optionList.map((item) =>(
                              <ListboxItem showDivider key={item}>
                                <div className="flex justify-between items-center">
                                  {item.name} 
                                  <div>
                                    <UpdatePayment data={item} type="Options" done={done}/>
                                    <Delete id={item._id} type="Payment Options" done={done} collection="payments"/>
                                  </div>
                                </div>
                              </ListboxItem>
                            ))}
                          </Listbox>
                          <form className="flex flex-col gap-4">
                            <span>Create new Payment Options</span>
                            <Input label="Options" placeholder="Enter new options" value={paymentOptions} onChange={(e)=>(setPaymentOptions(e.target.value))}/>
                            <div className="flex gap-2 justify-end">
                              <Button 
                              fullWidth 
                              color="primary" 
                              onPress={submitPaymentOptions}
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
                                }
                              >
                                Submit
                              </Button>
                            </div>
                          </form>
                        </Tab>
                        <Tab key="type" title="Type">
                          <Listbox
                          aria-label="Listbox Variants"
                          color="solid" 
                          topContent={<span>Payment type</span>}
                          >
                            {typeList.map((item) =>(
                              <ListboxItem showDivider key={item.name}>
                                <div className="flex justify-between items-center">
                                  {item.name} 
                                  <div>
                                    <UpdatePayment data={item} type="Types" done={done}/>
                                    <Delete id={item._id} type="Payment Types" done={done} collection="payments"/>
                                  </div>
                                </div>
                              </ListboxItem>
                            ))}
                          </Listbox>
                          <form className="flex flex-col gap-4">
                            <span>Create new Payment Type</span>
                            <Input label="Type" placeholder="Enter new payment type" value={paymentType} onChange={(e)=>(setPaymentType(e.target.value))}/>
                            <div className="flex gap-2 justify-end">
                              <Button 
                              fullWidth color="primary" 
                              onPress={submitPaymentType}
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
                                }
                              >
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
