"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";

export default function CreateTransaction() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [products, setProducts] = useState([])
  const [options, setOptionList] = useState([])
  const [type, setTypeList] = useState([])

  const fetchAll = async  () =>{
    const result = await axios.get('https://demprints-backend.vercel.app/api/master/products');
    setProducts(result.data); 
    const responseOptions = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentOptions')
    setOptionList(responseOptions.data)
    const responseType = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentType')
    setTypeList(responseType.data)
  }

  useEffect(() =>{
    fetchAll()
  }, [])

  const customer_type = ['Walk in', 'Online']
  return (
    <>
      <Button onPress={onOpen} color="primary"><MdAdd/> order</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Order</ModalHeader>
              <ModalBody>
                <Select 
                  label="Product name" 
                  name="unit"
                >
                  {products.map(item => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
                <div className="flex gap-2">
                    <Input
                    autoFocus
                    type="number"
                    label="Quantity"
                    placeholder="Enter quantity"
                    variant="bordered"
                    />
                    <Input
                    autoFocus
                    label="Discount"
                    placeholder="Enter cutomer discount"
                    variant="bordered"
                    />
                </div>
                <Select 
                  label="Customer type" 
                  name="unit"
                >
                  {customer_type.map(item => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  autoFocus
                  label="Customer name"
                  placeholder="Enter customer name"
                  variant="bordered"
                />
                <Select 
                  label="Payment type" 
                  name="unit"
                >
                  {type.map(item => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select 
                  label="Payment options" 
                  name="unit"
                >
                  {options.map(item => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}