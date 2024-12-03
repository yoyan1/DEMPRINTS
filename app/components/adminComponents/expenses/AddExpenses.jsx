"use client"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Select, SelectItem, Input} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import {getDateAndTime} from '@/app/composables/dateAndTime'
import { useExpensesStore } from '@/app/stores/ExpensesStore'
 
export default function CreateTransaction({isSubmit}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { categoryList, loading, fetchExpensesCategory} = useExpensesStore()
  const [category, setCategory] = useState([])
  const [ paymentSourceList, setPaymentSourceList ] = useState([])
  const [idGenerated, setIdGenerated] = useState([{_id: '', count: 0}])
  const [errorMessages, setErrorMessages] = useState({})
  const {date} = getDateAndTime()
  const [expensesData, setExpensesData] = useState({
                                          date: date,
                                          category: "",
                                          type: "",
                                          transaction_no: "", 
                                          item_name: "", 
                                          unit_cost: 0, 
                                          quantity: 1, 
                                          total: 0,
                                          payment_source: ''
                                      })
                                      


  const fetchAll = async  () =>{
    const result = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/getExpensesCategory');
    setCategory(result.data); 
    const responseOptions = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/paymentSource')
    setPaymentSourceList(responseOptions.data)
    const responseID = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/getIDExpenses`)
    if(responseID.data.length > 0){
      setIdGenerated(responseID.data)
      console.log(responseID.data)
    }
  }

  useEffect(() =>{
    fetchAll()
    fetchExpensesCategory()
  }, [])

  const isValid = () => {
    const errors = {};
    if(!expensesData.category) errors.category = "This field must not be empty."
    if(!expensesData.type) errors.type = "This field must not be empty."
    if(!expensesData.item_name) errors.item_name = "This field must not be empty."
    if(expensesData.unit_cost <= 0) errors.unit_cost = "Invalid."
    if(expensesData.quantity <= 0) errors.quantity = "Invalid."
    if(!expensesData.payment_source) errors.payment_source = "This field must not be empty."

    setErrorMessages(errors);
    return errors;    
  }

  const handleChange = (e) =>{
    const {name, value} = e.target
    if(name === 'unit_cost'){
      const total =  expensesData.quantity > 0? value * expensesData.quantity : 0
      setExpensesData((prevData) => ({...prevData, unit_cost: value, total: total}))
    } else if (name === 'quantity'){
      const total =  value > 0? expensesData.unit_cost * value : 0
      setExpensesData((prevData) => ({...prevData, quantity: value, total: total, }))
    } else {
      console.log("error");
      
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const submit = async () => {

    const errors = isValid()
    if(Object.keys(errors).length !== 0){
      return
    }

    setIsLoading(true)
    const newId = idGenerated[0].count+1
    const transaction_no =  `000${newId}`
    const newData = {
      date: date,
      category: expensesData.category,
      type: expensesData.type,
      transaction_no: transaction_no, 
      item_name: expensesData.item_name,
      unit_cost: expensesData.unit_cost, 
      quantity: expensesData.quantity,
      total: expensesData.total,
      payment_source: expensesData.payment_source
    }
    console.log(newData)
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/collection/createExpenses`, newData)
      const updateId = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/collection/updateIDExpenses`, {id: idGenerated[0]._id, count: newId})
      console.log(response.data.message)
      console.log(updateId.data)
      fetchAll()
      onClose()
      isSubmit("done")
      setExpensesData({
        date: "",
        category: "",
        type: "",
        transaction_no: "", 
        item_name: "",
        unit_cost: 0, 
        quantity: 1,
        total: 0,
      })
    } catch(e){
      console.log(e);
    }
    setIsLoading(false)
  };  

  return (
    <>
      <Button onPress={onOpen} className="bg-green-600 text-slate-200" size="sm"><MdAdd/> Expenses</Button>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Expenses</ModalHeader>
              <ModalBody>
                <Select 
                  label="Category" 
                  defaultSelectedKeys={[expensesData.category]}
                  isInvalid={errorMessages.category? true : false}
                  color={errorMessages.category ? "danger" : ""}
                  errorMessage={errorMessages.category}
                  value={expensesData.category}
                  onChange={(e) =>(setExpensesData((prevData)=>({...prevData, category: e.target.value, type: ""})))}
                  isLoading={loading}
                >
                  {categoryList.map((item) =>(
                    <SelectItem key={item.name}>{item.name}</SelectItem>
                  ))}
                </Select>
                {expensesData.category? (
                  <Select 
                    label="Type" 
                    defaultSelectedKeys={[expensesData.type]}
                    isInvalid={errorMessages.type? true : false}
                    color={errorMessages.type ? "danger" : ""}
                    errorMessage={errorMessages.type}
                    value={expensesData.type}
                    onChange={(e) =>(setExpensesData((prevData)=>({...prevData, type: e.target.value})))}
                  >
                    {categoryList.map((item) =>(
                      item.name === expensesData.category? (
                        item.list.map((list) => (
                          <SelectItem key={list}>{list}</SelectItem>
                        ))
                      ): null
                    ))}
                  </Select>
                ): null}
                <Input
                  label="Item Name"
                  placeholder="Enter item name"
                  variant="bordered"
                  isInvalid={errorMessages.item_name? true : false}
                  color={errorMessages.item_name ? "danger" : ""}
                  errorMessage={errorMessages.item_name}
                  value={expensesData.item_name}
                  onChange={(e)=>(setExpensesData((prevData)=>({...prevData, item_name: e.target.value})))}
                />
                <Input
                  label="Cost"
                  placeholder="Enter unit cost"
                  type="number"
                  variant="bordered"
                  name="unit_cost"
                  isInvalid={errorMessages.unit_cost? true : false}
                  color={errorMessages.unit_cost ? "danger" : ""}
                  errorMessage={errorMessages.unit_cost}
                  value={expensesData.unit_cost}
                  onChange={handleChange}
                />
                <Input
                  label="Quantity"
                  placeholder="Enter item quantity"
                  variant="bordered"
                  name="quantity"
                  isInvalid={errorMessages.quantity? true : false}
                  color={errorMessages.quantity ? "danger" : ""}
                  errorMessage={errorMessages.quantity}
                  value={expensesData.quantity}
                  onChange={handleChange}
                />
                  <Select 
                    label="Payment From" 
                    isInvalid={errorMessages.payment_source? true : false}
                    color={errorMessages.payment_source ? "danger" : ""}
                    errorMessage={errorMessages.payment_source}
                    value={expensesData.payment_source}
                    onChange={(e) =>(setExpensesData((prevData)=>({...prevData, payment_source: e.target.value})))}
                  >
                    {paymentSourceList.map((item) =>(
                      <SelectItem key={item.name}>{item.name}</SelectItem>
                    ))}
                  </Select>
                <div>
                  total amount: {expensesData.total}
                </div>
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