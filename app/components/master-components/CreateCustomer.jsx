"use client"
import React, {useEffect, useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tabs, Tab, Listbox, ListboxItem} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import UpdateCustomerType from './form/updateCustomerType'
import Delete from './actions/Delete'
import { useCustomerType } from '@/app/stores/customerType'

export default function CreateCustomer() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { toast } = useToast()
  const {customerType, fetchCustomerType } = useCustomerType()
  const [selected, setSelected] = useState("operational");
  const [inputType, setInputType] = useState('')

  const handleOpen = () => {
    onOpen();
  }

  useEffect(() =>{
    fetchCustomerType()
  }, [fetchCustomerType])
  
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (e) =>{
    e.preventDefault()
    setIsLoading(true)
    if(inputType === ''){
        return
        setIsLoading(false)
    }
    const response = await axios.post(`https://demprints-backend.vercel.app/api/master/createCustomerType`, {name: inputType})
    toast({
        variant: "success",
        title: "Success!",
        color: "success",
        description: response.data,
      })
    setInputType('')
    setIsLoading(false)
    fetchCustomerType()
  }

  return (
    <>
        <div className="p-md">
            <Button color="primary" onPress={handleOpen}>View details</Button>
            <Modal 
                size="md"
                isOpen={isOpen} 
                onClose={onClose} 
                scrollBehavior="outside"
            >
                <ModalContent>
                {() => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Customer Master Data</ModalHeader>
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
                            <Tab key="type" title="Customer Type">
                                <div>
                                    <form onSubmit={onSubmit} className="flex items-center">
                                        <Input onChange={(e)=>(setInputType(e.target.value))} label="Type" value={inputType} placeholder="Enter new Customer Type" isRequired/>
                                        {inputType? <Button isIconOnly type="submit" color="primary" variant="light" isLoading={isLoading}><IoIosAdd className="w-8 h-8"/></Button> : null}
                                    </form>
                                    <Listbox
                                    aria-label="Listbox Variants"
                                    color="solid" 
                                    topContent="Customer Type List"
                                    >
                                        {customerType.map((list) => (
                                            <ListboxItem key={list.name}>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm">{list.name}</span>
                                                    <div>
                                                        <UpdateCustomerType data={list} done={fetchCustomerType}/>
                                                        <Delete id={list._id} type="Customer Type" done={fetchCustomerType} collection="customerType"/>
                                                    </div>
                                                </div>
                                            </ListboxItem>
                                            
                                        ))}
                                    </Listbox>
                                </div>
                            </Tab>
                            <Tab key='new' title='Create customer'>
                                <div>
                                    <span>Customer Information</span>
                                    <div className="flex flex-col gap-3">
                                        <Input label="Firstname" placeholder="Enter customer name" variant="bordered"/>
                                        <Input label="Middle name (optional)" placeholder="Customer middle name" variant="bordered"/>
                                        <Input label="Lastname" placeholder="Customer lastname" variant="bordered"/>
                                    </div>
                                    <div className="pt-3">
                                        <span>Type</span>
                                        <Select label="Customer type">
                                            {customerType.map((type) => (
                                                <SelectItem key={type}>
                                                {type}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
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
