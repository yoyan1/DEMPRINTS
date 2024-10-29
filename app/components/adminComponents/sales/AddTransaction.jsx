"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import {getDateAndTime} from '@/app/composables/dateAndTime'

export default function CreateTransaction() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [products, setProducts] = useState([])
  const [options, setOptionList] = useState([])
  const [type, setTypeList] = useState([])
  const {date, time} = getDateAndTime()
  const [salesData, setSalesData] = useState({
                                        date:null,
                                        time: null,
                                        transaction_no: "",
                                        item_no: "",
                                        item_name: "",
                                        unit_cost: 0,
                                        quantity: 0,
                                        amount: 0,
                                        discount: 0,
                                        total: 0,
                                        customer_type: "",
                                        customer_name: "",
                                        payment_type: "",
                                        payment_options: "",
                                        sales_person: "",
                                        remarks: "",
                                      })
                                      

  const fetchAll = async  () =>{
    const result = await axios.get('http://localhost:5000/api/master/products');
    setProducts(result.data); 
    const responseOptions = await axios.get('http://localhost:5000/api/master/getPaymentOptions')
    setOptionList(responseOptions.data)
    const responseType = await axios.get('http://localhost:5000/api/master/getPaymentType')
    setTypeList(responseType.data)
  }

  useEffect(() =>{
    fetchAll()
  }, [])

  const customer_type = ['Walk in', 'Online'];

  const submit = async () => {
    console.log('function called')
    console.log(date, time)
    products.forEach((item) => {
      if (item.name === salesData.item_name) {
        const unitCost = item.price;
        const total = unitCost * salesData.quantity;
  
        // Update state and log the new values
        setSalesData((prevData) => {
          const newData = {
            ...prevData,
            unit_cost: unitCost,
            total: total,
          };
          console.log("Updated Sales Data:", newData); 
          return newData; 
        });
      }
    });
  };  

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
                  value={salesData.item_name}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, item_name: e.target.value})))}
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
                    value={salesData.quantity}
                    onChange={(e)=>(setSalesData((prevData)=>({...prevData, quantity: e.target.value})))}
                    />
                    <Input
                    autoFocus
                    label="Discount"
                    placeholder="Enter cutomer discount"
                    variant="bordered"
                    value={salesData.discount}
                     onChange={(e)=>(setSalesData((prevData)=>({...prevData, discount: e.target.value})))}
                    />
                </div>
                <Select 
                  label="Customer type" 
                  name="unit"
                  value={salesData.customer_type}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, customer_type: e.target.value})))}
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
                  value={salesData.customer_name}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, customer_name: e.target.value})))}
                />
                <Select 
                  label="Payment type" 
                  name="unit"
                  value={salesData.payment_type}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, payment_type: e.target.value})))}
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
                  value={salesData.payment_options}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, payment_options: e.target.value})))}
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
                <Button color="primary" onPress={submit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}