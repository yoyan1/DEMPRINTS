"use client"
import {Modal, ModalContent, ModalHeader, ModalBody,  Button, useDisclosure, Select, SelectItem, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import {getDateAndTime} from '@/app/composables/dateAndTime'
import {useUserStore} from '@/app/stores/userStore'
import { productStore } from "@/app/stores/productStore";
import { paymentStore } from "@/app/stores/paymentStore";
import { useCustomerStore } from "@/app//stores/customerStore";
import { useSalesStore } from "@/app/stores/transactionStore";
import { useIdStore } from "@/app/stores/idStore";

export default function CreateTransaction({refresh}) {
  const {users, fetchUsers} = useUserStore()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [errorMessage, setErrorMessages ] = useState({})
  const {products, loadProduct, fetchProducts} = productStore()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filteredVariants, setFilteredVariants] = useState([])
  const [filteredUnit, setFilteredUnit] = useState([])
  const { productsCategory, fetchProductCategory } = productStore()
  const { customer_type, fetchCustomer } = useCustomerStore()
  const { options, type, fetchPayment } = paymentStore()
  const { createTransaction } = useSalesStore()
  const { fetchTransactionId, updateTransactionId } = useIdStore()
  const {date, time} = getDateAndTime()
  const [salesData, setSalesData] = useState({
                                        category: "",
                                        item_no: "",
                                        item_name: "",
                                        variants: "",
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
             
  const fetchAll = () => {
    fetchUsers()
    fetchProductCategory()
    fetchProducts()
    fetchCustomer()
    fetchPayment()
  }
                                      
  useEffect(() =>{
    fetchAll()
  }, [])

 const handleCategoryChange = (e) =>{
    const findProduct = products.filter((row) => row.category === e.target.value)
    setFilteredProducts(findProduct)
    setSalesData((prevData)=>(
      {
        ...prevData, 
        category: e.target.value,
        item_name: "", 
        measurement: '',
        unit_cost: 0,
        quantity: 1,
        total: 0
      }
    ))
    
  }
  
  const handleNameChange = (e) =>{ 
    const findProduct = filteredProducts.filter((row) => row.name === e.target.value)
    setFilteredVariants(findProduct)
    setSalesData((prevData)=>(
      {
        ...prevData, 
        item_name: e.target.value, 
        measurement: '',
        unit_cost: 0,
        quantity: 1,
        total: 0
      }
    ))
 }

 const handleVariantChange = (e) => {
   const findProduct = filteredVariants.filter((item) => item.variants === e.target.value)
   setFilteredUnit(findProduct)
    setSalesData((prevData) => (
      {
        ...prevData,
        variants: e.target.value,
        measurement: "",
        unit_cost: 0,
        amount: 0,
        total: 0,
      }
    ))
 }
  const handleMeasurementChange = (e) =>{
    const value = e.target.value
    const findProduct = filteredProducts.filter((item) => item.unit === value && item.name === salesData.item_name && item.variants === salesData.variants)
    if(findProduct.length > 0){
      const unitCost = findProduct[0].price;
      const total = salesData.quantity > 0? unitCost * salesData.quantity : unitCost;
      setSalesData((prevData) => (
        {
          ...prevData,
          item_no: findProduct[0].item_code,
          measurement: value,
          unit_cost: unitCost,
          amount: total,
          total: total,
        }
      ))
    }
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
    const newTotal = discount !== 0? salesData.amount * discount : 0
    const total = salesData.amount - newTotal

    setSalesData((prevData) => (
      {...prevData, discount: value, total: total}
    ))

  }

  const isValid = () => {
    const errors = {};
    if(!salesData.item_name) errors.item_name = "Please select product."
    if(!salesData.measurement) errors.measurement = "Please select measurement."
    if(!salesData.quantity) errors.quantity = "This field must not be empty."
    if(!salesData.customer_name) errors.customer_name = "This field must not be empty."
    if(!salesData.customer_type) errors.customer_type = "Please select customer type."
    if(!salesData.payment_type) errors.payment_type = "Please select payment type."
    if(!salesData.payment_options) errors.payment_options = "Please select payment options."
    setErrorMessages(errors);
    return errors;
  }

  const [isLoading, setIsLoading] = useState(false)
  const submit = async (e) => {
    e.preventDefault()

    const errors = isValid()
    if(Object.keys(errors).length !== 0){
      return
    }

    setIsLoading(true)
    const responseID = await fetchTransactionId()
    const generatedID = responseID.data.length > 0? responseID.data : [{_id: '', count: 0}]
    const newId = generatedID[0].count+1
    const transaction_no = () =>{
      if(newId >= 1000){
        return `${newId}`
      } else if (newId >= 100){
        return `0${newId}`
      } else if (newId >= 10){
        return `00${newId}`
      } else {
        return `000${newId}`
      }
    } 
    const balance = salesData.total - salesData.amount_paid
    const newData = {
      date:date,
      time: time,
      transaction_no: transaction_no(),
      item_no: salesData.item_no,
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

    const response = await createTransaction(newData)
    const updateId = await updateTransactionId({id: generatedID[0]._id, count: newId})
    console.log(response.data)
    console.log(updateId.data)
    setIsLoading(false)
    refresh(response.data)
    setSalesData({
      category: "",
      item_name: "",
      unit_cost: 0,
      quantity: 1,
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
        size="2xl"
        placement="top-center"
        scrollBehavior="outside"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Order</ModalHeader>
              <ModalBody>
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="flex gap-5 items-end">
                    <Select 
                      label="Product Category" 
                      labelPlacement="outside"
                      size="md"
                      onChange={handleCategoryChange}
                    >
                      {productsCategory.map((item, index) => (
                          <SelectItem key={item.name}>
                            {item.name}
                          </SelectItem>
                      ))}
                    </Select>
                    {/* <SelectProduct products={filteredProducts} selected={(data)=> alert(data)}/> */}
                  </div>
                  {salesData.category? (
                    <div className="flex">
                      <Select 
                        label="Product name" 
                        labelPlacement="outside"
                        size="md"
                        radius="none"
                        placeholder="Select product"
                        isInvalid={errorMessage.item_name? true : false}
                        color={errorMessage.item_name ? "danger" : ""}
                        errorMessage={errorMessage.item_name}
                        value={salesData.item_name}
                        onChange={handleNameChange}
                      >
                        {filteredProducts.map((item, index) => (
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
                      <Select 
                        label="Variants" 
                        labelPlacement="outside"
                        size="md"
                        radius="none"
                        placeholder="Select variants"
                        onChange={handleVariantChange}
                        isDisabled={salesData.item_name? false : true}
                      >
                        
                        {filteredVariants.map(item => (
                            <SelectItem key={item.variants}>
                              {item.variants}
                            </SelectItem>
                        ))}
                      </Select>
                      <Select 
                        label="Unit of Measurement" 
                        labelPlacement="outside"
                        size="md"
                        radius="none"
                        placeholder="Select unit"
                        isDisabled={salesData.variants? false : true}
                        isInvalid={errorMessage.measurement? true : false}
                        color={errorMessage.measurement ? "danger" : ""}
                        errorMessage={errorMessage.measurement}
                        value={salesData.measurement}
                        onChange={handleMeasurementChange}
                      >
                        
                        {filteredUnit.map(item => (
                            <SelectItem key={item.unit}>
                              {item.unit}
                            </SelectItem>
                        ))}
                      </Select>
                      <Input
                      type="number"
                      label="Quantity"
                      labelPlacement="outside"
                      size="md"
                      radius="none"
                      placeholder="Enter quantity"
                      variant="bordered"
                      disabled={salesData.item_name === ''? true : false}
                      isInvalid={errorMessage.quantity? true : false}
                      color={errorMessage.quantity ? "danger" : ""}
                      errorMessage={errorMessage.quantity}
                      value={salesData.quantity}
                      name="quantity"
                      onChange={handleChange}
                      />
                    </div>
                  ): null}
                  <div className="flex gap-5">
                    <div className="flex-1 flex flex-col gap-2">
                      
                      <Select 
                        label="Customer type" 
                        labelPlacement="outside"
                        size="md"
                        radius="sm"
                        placeholder="Select customer type"
                        isInvalid={errorMessage.customer_type? true : false}
                        color={errorMessage.customer_type ? "danger" : ""}
                        errorMessage={errorMessage.customer_type}
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
                        label="Customer name"
                        labelPlacement="outside"
                        size="md"
                        radius="sm"
                        placeholder="Enter customer name"
                        variant="bordered"
                        isInvalid={errorMessage.customer_name? true : false}
                        color={errorMessage.customer_name ? "danger" : ""}
                        errorMessage={errorMessage.customer_name}
                        value={salesData.customer_name}
                        onChange={(e)=>(setSalesData((prevData)=>({...prevData, customer_name: e.target.value})))}
                      />
                      <div className="flex gap-2">
                        <Select 
                          label="Payment type" 
                          placeholder="Select payment type"
                          labelPlacement="outside"
                          size="md"
                          isInvalid={errorMessage.payment_type? true : false}
                          color={errorMessage.payment_type ? "danger" : ""}
                          errorMessage={errorMessage.payment_type}
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
                          labelPlacement="outside"
                          size="md"
                          radius="sm"
                          isInvalid={errorMessage.payment_options? true : false}
                          color={errorMessage.payment_options ? "danger" : ""}
                          errorMessage={errorMessage.payment_options}
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
                        labelPlacement="outside"
                        size="md"
                        radius="sm"
                        placeholder="Leave blank if you are the sales person."
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
                          label="Partial"
                          placeholder="Enter partial amount"
                          variant="bordered"
                          type="number"
                          size="md"
                          radius="sm"
                          value={salesData.amount_paid}
                          onChange={(e)=>(setSalesData((prevData)=>({...prevData, amount_paid: e.target.value})))}
                        />
                      ): null}
                    </div>
                    <div className=" flex-1 flex flex-col gap-5">
                      <div className="flex justify-between">
                        <span>Product cost </span>
                        {salesData.unit_cost}
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount </span>
                        {salesData.amount}
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Discount </span>
                          {salesData.measurement? (
                               <Input
                                placeholder="Discount"
                                labelPlacement="outside"
                                className="w-44"
                                variant="bordered"
                                value={salesData.discount}
                                onChange={discounted}
                                endContent={
                                  <div className="flex items-center">
                                    <label className="sr-only" htmlFor="currency">
                                      Currency
                                    </label>
                                    <select
                                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                                      id="currency"
                                      name="currency"
                                    >
                                      <option>%</option>
                                      <option>₱</option>
                                    </select>
                                  </div>
                                }
                                type="number"
                              />
                            
                          ): null}
                      </div>
                      <div className="flex justify-between">
                        <span>Discount Applied </span>
                        {Math.round(salesData.amount - salesData.total)}
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount After Discount </span>
                        {Math.round(salesData.total)}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-4 py-4">
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" isLoading={isLoading}>
                      Submit
                    </Button>

                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}