"use client"
import {Modal, ModalContent, ModalHeader, ModalBody,  Button, useDisclosure, Select, SelectItem, Input, Textarea} from "@nextui-org/react";
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

export default function CreateTransaction({user, refresh}) {
  const {users, fetchUsers} = useUserStore()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [errorMessage, setErrorMessages ] = useState({})
  const {products, loadProduct, fetchProducts} = productStore()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filteredVariants, setFilteredVariants] = useState([])
  const [filteredUnit, setFilteredUnit] = useState([])
  const [isPercent, setIsPercent] = useState(true)
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
                                        price_type: "fixed",
                                        product_price: 0,
                                        unit_cost: 0,
                                        quantity: 0,
                                        sub_total: 0,
                                        discount: 0,
                                        total_amount: 0,
                                        amount_paid: 0,
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
        variants: '',
        unit_cost: 0,
        quantity: 1,
        total_amount: 0
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
        variants: '',
        unit_cost: 0,
        quantity: 1,
        total_amount: 0
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
        sub_total: 0,
        total_amount: 0,
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
          product_price: unitCost,
          unit_cost: unitCost,
          sub_total: total,
          total_amount: total,
        }
      ))
    }
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    const findProduct = products.filter((item) => item.name === salesData.item_name && item.unit === salesData.measurement)
    if (findProduct.length > 0) {
      const unitCost = findProduct[0].price;
      const total = unitCost * value;
      setSalesData((prevData) => {
        const newData = {
          ...prevData,
          [name]: value,
          unit_cost: unitCost,
          sub_total: total,
          total_amount: total,
        }
        return newData; 
      });
    }

  }
  
  const discounted = (value, isPercent) =>{
    if(isPercent) {
      const discount = value > 0? value / 100 : 0
      const newTotal = discount !== 0? salesData.sub_total * discount : 0
      const total = salesData.sub_total - newTotal
      setSalesData((prevData) => (
        {...prevData, discount: value, total_amount: total}
      ))
    } else{
      const total = salesData.sub_total - value

      setSalesData((prevData) => (
        {...prevData, discount: value, total_amount: total}
      ))
    }

  }
  
  const priceChange = (e) => {
    const newTotal = salesData.quantity * e.target.value
    setSalesData((prevData) => (
      {...prevData, unit_cost: e.target.value, total_amount: newTotal, sub_total: newTotal, discount: 0}
    ))
  }

  const isValid = () => {
    const errors = {};
    if(!salesData.item_name) errors.item_name = "Please select product."
    if(!salesData.measurement) errors.measurement = "Please select measurement."
    if(!salesData.quantity) errors.quantity = "This field must not be empty."
    if(salesData.discount) {
      if(isPercent && salesData.discount > 100){
        errors.discount = "Invalid discount."
        
      } 
    }
    if(!salesData.customer_name) errors.customer_name = "This field must not be empty."
    if(!salesData.customer_type) errors.customer_type = "Please select customer type."
    if(!salesData.payment_type) errors.payment_type = "Please select payment type."
    if(!salesData.payment_options) errors.payment_options = "Please select payment options."
    if(salesData.amount_paid > salesData.total_amount) errors.amount_paid = "Too much"
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
    const balance = salesData.total_amount - salesData.amount_paid

    const findUser = salesData.sales_person? users.filter((row) => salesData.sales_person === row.name) : []
    const newData = {
      date:date,
      time: time,
      transaction_no: transaction_no(),
      item_no: salesData.item_no,
      item_name: salesData.item_name,
      unit_cost: salesData.unit_cost,
      quantity: salesData.quantity,
      sub_total: salesData.sub_total,
      discount: salesData.discount,
      discount_type: isPercent? "%" : "₱",
      total_amount: salesData.total_amount,
      amount_paid: salesData.amount_paid > 0? salesData.amount_paid : salesData.total_amount,
      balance: salesData.amount_paid > 0? balance : 0,
      customer_type: salesData.customer_type,
      customer_name: salesData.customer_name,
      payment_type: salesData.payment_type,
      payment_options: salesData.payment_options,
      sales_person: salesData.sales_person? salesData.sales_person : user.name,
      remarks: salesData.remarks,
      employee_id: findUser.length > 0 ? findUser[0].id : user.id
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
      sub_total: 0,
      discount: 0,
      variants: '',
      measurement: '',
      total_amount: 0,
      amount_paid: 0,
      balance: 0, 
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
      <Button onPress={onOpen} className="bg-blue-900 text-slate-200"><MdAdd/> order</Button>
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
              <ModalHeader className="flex flex-col gap-1 bg-blue-900 text-white">Create Order</ModalHeader>
              <ModalBody>
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="flex gap-5 items-end">
                    <Select 
                      label="Product Category" 
                      labelPlacement="outside"
                      size="md"
                      defaultSelectedKeys={[salesData.category]}
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
                        defaultSelectedKeys={[salesData.item_name]}
                        isInvalid={errorMessage.item_name? true : false}
                        color={errorMessage.item_name ? "danger" : ""}
                        errorMessage={errorMessage.item_name}
                        value={salesData.item_name}
                        onChange={handleNameChange}
                      >
                        {(() => {
                          const seen = new Set();
                          return filteredProducts.map((item) => {
                            const value = item.name;
                            if (seen.has(value)) return null; 
                            seen.add(value);
                            return (
                              <SelectItem key={value}>
                                {value}
                              </SelectItem>
                            );
                          });
                        })()}
                      </Select>
                      <Select 
                        label="Variants" 
                        labelPlacement="outside"
                        size="md"
                        radius="none"
                        placeholder="Select variants"
                        defaultSelectedKeys={[salesData.variants]}
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
                        defaultSelectedKeys={[salesData.measurement]}
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
                        defaultSelectedKeys={[salesData.customer_type]}
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
                          defaultSelectedKeys={[salesData.payment_type]}
                          isInvalid={errorMessage.payment_type? true : false}
                          color={errorMessage.payment_type ? "danger" : ""}
                          errorMessage={errorMessage.payment_type}
                          value={salesData.payment_type}
                          onChange={(e)=>(setSalesData((prevData)=>({...prevData, payment_type: e.target.value, amount_paid: 0})))}
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
                          defaultSelectedKeys={[salesData.payment_options]}
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
                        defaultSelectedKeys={[salesData.sales_person]}
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
                    <div className=" flex-1 flex flex-col gap-5 border rounded-md p-3">
                      <div className="flex flex-col gap-2">
                        <span>Product cost </span>
                        {salesData.measurement? (
                          <div className="flex justify-between items-end">
                            <Select 
                              label="Price type" 
                              labelPlacement="outside"
                              size="sm"
                              radius="sm"
                              className="w-44"
                              defaultSelectedKeys={[salesData.price_type]}
                              value={salesData.price_type}
                              onChange={(e)=>{
                                setSalesData((prevData)=>({...prevData, price_type: e.target.value}))
                                e.target.value === 'fixed'? setSalesData((prevData) => ({...prevData, unit_cost: salesData.product_price})) : null
                              }}
                            >
                                <SelectItem key='fixed'>
                                  Fixed
                                </SelectItem>
                                <SelectItem key='custome'>
                                  Custom
                                </SelectItem>
                            </Select>
                            {salesData.price_type === 'custome'? (
                              <Input
                              placeholder="custom price"
                              variant="bordered"
                              value={salesData.unit_cost}
                              onChange={priceChange}
                              />
                            ): (
                              <span>{salesData.unit_cost}</span>
                            )}
                          </div>

                        ): null}
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount </span>
                        {salesData.sub_total}
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Discount </span>
                          {salesData.measurement? (
                               <Input
                                placeholder="Discount"
                                labelPlacement="outside"
                                className="w-44"
                                variant="bordered"
                                isInvalid={errorMessage.discount? true : false}
                                color={errorMessage.discount ? "danger" : ""}
                                errorMessage={errorMessage.discount}
                                value={salesData.discount}
                                onChange={(e) => discounted(e.target.value, isPercent)}
                                endContent={
                                  <div className="flex items-center">
                                    <label className="sr-only" htmlFor="currency">
                                      Discount
                                    </label>
                                    <select
                                      className="outline-none border-0 bg-transparent text-default-400 text-small"
                                      id="currency"
                                      name="currency"
                                      onChange={(e) => {
                                        const defineIfPercent = e.target.value === "percent"? true : false
                                        setIsPercent(defineIfPercent)
                                        discounted(salesData.discount, defineIfPercent)
                                      }}
                                    >
                                      <option value="percent">%</option>
                                      <option value="peso">₱</option>
                                    </select>
                                  </div>
                                }
                                type="number"
                              />
                            
                          ): null}
                      </div>
                      <div className="flex justify-between">
                        <span>Discount Applied </span>
                        ₱ {Math.round(salesData.sub_total - salesData.total_amount)}
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount After Discount </span>
                        {Math.round(salesData.total_amount)}
                      </div>
                      {salesData.amount_paid? (
                        <div className="flex justify-between">
                          <span>Balance </span>
                          {Math.round(salesData.total_amount-salesData.amount_paid)}
                        </div>
                      ): null}
                    </div>
                  </div>
                    <Textarea
                    label="Remarks"
                    placeholder="Enter remarks"
                    className="max-w-full"
                    variant="bordered"
                    value={salesData.remarks}
                    onValueChange={(value) => setSalesData((prevData)=> ({...prevData, remarks: value}))}
                    />
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