"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import {getDateAndTime} from '@/app/composables/dateAndTime'
import {useUserStore} from '@/app/stores/userStore'

export default function CreateTransaction({refresh}) {
  const {users, fetchUsers} = useUserStore()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [products, setProducts] = useState([])
  const [options, setOptionList] = useState([])
  const [type, setTypeList] = useState([])
  const [customer_type, setCustomerType] = useState([]);
  const {date, time} = getDateAndTime()
  const [salesData, setSalesData] = useState({
                                        item_name: "",
                                        measurement: "",
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
    let ascending = result.data.slice().sort();
    setProducts(ascending);
    const responseOptions = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentOptions')
    setOptionList(responseOptions.data)
    const responseType = await axios.get('https://demprints-backend.vercel.app/api/master/getPaymentType')
    setTypeList(responseType.data)
    const customerType = await axios.get('https://demprints-backend.vercel.app/api/master/getCustomerType')
    setCustomerType(customerType.data)
  }

  useEffect(() =>{
    fetchAll()
  }, [])
  useEffect(() =>{
    fetchUsers()
  }, [fetchUsers])


  const handleMeasurementChange = (e) =>{
    const value = e.target.value
    products.forEach((item) => {
      if (item.unit === value && item.name === salesData.item_name) {
        const unitCost = item.price;
        const total = salesData.quantity > 0? unitCost * salesData.quantity : unitCost;
        setSalesData((prevData) => (
          {
            ...prevData,
            measurement: value,
            unit_cost: unitCost,
            amount: total,
            total: total,
          }
        ));
      }
    })
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    products.forEach((item) => {
      if (item.name === salesData.item_name && item.unit === salesData.measurement) {
        const unitCost = item.price;
        const total = unitCost * value;
        setSalesData((prevData) => {
          const newData = {
            ...prevData,
            [name]: value,
            unit_cost: unitCost,
            amount: total,
            total: total,
          }
          return newData; 
        });
      }
    });
  }
  
  const discounted = (e) =>{
    const value = e.target.value
    const discount = value > 0? value / 100 : 0
    const newTotal = discount !== 0? salesData.total * discount : 0
    const total = salesData.amount - newTotal

    setSalesData((prevData) => (
      {...prevData, discount: value, total: total}
    ))

  }


  const [isLoading, setIsLoading] = useState(false)
  const submit = async () => {
    setIsLoading(true)
    const responseID = await axios.get('https://demprints-backend.vercel.app/api/collection/getId')
    const generatedID = responseID.data.length > 0? responseID.data : [{_id: '', count: 0}]
    const newId = generatedID[0].count+1
    const transaction_no =  `000${newId}`
    const balance = salesData.total - salesData.amount_paid
    const newData = {
      date:date,
      time: time,
      transaction_no: transaction_no,
      item_no: "0001",
      item_name: salesData.item_name,
      unit_cost: salesData.unit_cost,
      quantity: salesData.quantity,
      amount: salesData.amount,
      discount: salesData.discount,
      total: salesData.total,
      customer_type: salesData.customer_type,
      customer_name: salesData.customer_name,
      payment_type: salesData.payment_type,
      payment_options: salesData.payment_options,
      sales_person: salesData.sales_person,
      remarks: balance > 0? balance : 0
    }

    const response = await axios.post('https://demprints-backend.vercel.app/api/collection/addTransaction', newData)
    const updateId = await axios.post('https://demprints-backend.vercel.app/api/collection/updateID', {id: generatedID[0]._id, count: newId})
    console.log(response.data)
    console.log(updateId.data)
    setIsLoading(false)
    refresh(response.data)
    setSalesData({
      item_name: "",
      unit_cost: 0,
      quantity: 0,
      amount: 0,
      discount: 0,
      total: 0,
      amount_paid: 0,
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
                <div className="flex gap-3">
                  <Select 
                    label="Product name" 
                    value={salesData.item_name}
                    onChange={(e)=> (setSalesData((prevData)=>(
                      {
                        ...prevData, 
                        item_name: e.target.value, 
                        measurement: '',
                        unit_cost: 0,
                        quantity: 0,
                        total: 0
                      }
                    )))}
                  >
                    {products.map((item, index) => (
                      index > 0? (
                        item.name !== products[index-1].name? (
                          <SelectItem key={item.name}>
                            {item.name}
                          </SelectItem>
                        ): null
                      ): (
                        <SelectItem key={item.name}>
                          {item.name}
                        </SelectItem>
                      )
                    ))}
                  </Select>
                  {salesData.item_name? (
                    <Select 
                      label="Unit of Measurement" 
                      value={salesData.measurement}
                      onChange={handleMeasurementChange}
                    >
                      
                      {products.map(item => (
                        salesData.item_name == item.name? (
                          <SelectItem key={item.unit}>
                            {item.unit}
                          </SelectItem>
                        ) : null
                      ))}
                    </Select>
                  ): null}
                </div>
                {salesData.measurement? (
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
                      onChange={discounted}
                      />
                  </div>
                ): null}
                <Select 
                  label="Customer type" 
                  name="unit"
                  value={salesData.customer_type}
                  onChange={(e)=>(setSalesData((prevData)=>({...prevData, customer_type: e.target.value})))}
                >
                  {customer_type.map(item => (
                    <SelectItem key={item.name}>
                      {item.name}
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
                <div className="flex gap-3">
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
                </div>
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
                {salesData.payment_type.toLocaleLowerCase() === 'down payment'? (
                  <Input
                    autoFocus
                    label="Amount Paid"
                    placeholder="Enter paid amount"
                    variant="bordered"
                    type="number"
                    value={salesData.amount_paid}
                    onChange={(e)=>(setSalesData((prevData)=>({...prevData, amount_paid: e.target.value})))}
                  />
                ): null}
                {salesData.measurement? (
                  <div className="flex justify-between">
                    <span>total amount: {Math.round(salesData.total)}</span>
                    <span>Product cost: {salesData.unit_cost}</span>
                  </div>
                ): null}
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