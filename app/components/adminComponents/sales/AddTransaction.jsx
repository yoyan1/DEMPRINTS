"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import {getDateAndTime} from '@/app/composables/dateAndTime'
import {useUserStore} from '@/app/stores/userStore'

export default function CreateTransaction({isSubmit}) {
  const {users, fetchUsers} = useUserStore()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [products, setProducts] = useState([])
  const [options, setOptionList] = useState([])
  const [type, setTypeList] = useState([])
  const [idGenerated, setIdGenerated] = useState([{_id: '', count: 0}])
  const {date, time} = getDateAndTime()
  const [salesData, setSalesData] = useState({
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
    const result = await axios.get('https://demprints-backend.vercel.app/api/master/products');
    setProducts(result.data); 
    const responseOptions = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentOptions')
    setOptionList(responseOptions.data)
    const responseType = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentType')
    setTypeList(responseType.data)
    const responseID = await axios.get('https://demprints-backend.vercel.app/api/collection/getId')
    if(responseID.data.length > 0){
      setIdGenerated(responseID.data)
      console.log(responseID.data)
    }
  }

  useEffect(() =>{
    fetchAll()
  }, [])
  useEffect(() =>{
    fetchUsers()
  }, [fetchUsers])

  const customer_type = ['Walk in', 'Online'];

  const handleChange = (e) =>{
    const {name, value} = e.target
    products.forEach((item) => {
      if (item.name === salesData.item_name) {
        const unitCost = item.price;
        const total = unitCost * value;
  
        // Update state and log the new values
        setSalesData((prevData) => {
          const newData = {
            ...prevData,
            [name]: value,
            unit_cost: unitCost,
            total: total,
          }
          console.log("Updated Sales Data:", newData); 
          return newData; 
        });
      }
    });
  }
  
  const [isLoading, setIsLoading] = useState(false)
  const submit = async () => {
    setIsLoading(true)
    console.log('function called')
    const newId = idGenerated[0].count+1
    const transaction_no =  `000${newId}`

    const newData = {
      date:date,
      time: time,
      transaction_no: transaction_no,
      item_no: "0001",
      item_name: salesData.item_name,
      unit_cost: salesData.unit_cost,
      quantity: salesData.quantity,
      amount: salesData.unit_cost,
      discount: salesData.discount,
      total: salesData.total,
      customer_type: salesData.customer_type,
      customer_name: salesData.customer_name,
      payment_type: salesData.payment_type,
      payment_options: salesData.payment_options,
      sales_person: salesData.sales_person,
      remarks: ""
    }

    const response = await axios.post('https://demprints-backend.vercel.app/api/collection/addTransaction', newData)
    const updateId = await axios.post('https://demprints-backend.vercel.app/api/collection/updateID', {id: idGenerated[0]._id, count: newId})
    console.log(response.data)
    console.log(updateId.data)
    setIsLoading(false)
    isSubmit(response.data)
    setSalesData({
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
    fetchAll()
    onClose()
    
  };  

  return (
    <>
      <Button onPress={onOpen} color="primary"><MdAdd/> order</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          {() => (
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
                    disabled={salesData.item_name === ''? true : false}
                    value={salesData.quantity}
                    name="quantity"
                    onChange={handleChange}
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
                <Select 
                  label="Sales Person" 
                  value={salesData.sales_person}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, sales_person: e.target.value})))}
                >
                  {users.map(item => (
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
                <Button color="primary" onPress={submit} isLoading={isLoading}>
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