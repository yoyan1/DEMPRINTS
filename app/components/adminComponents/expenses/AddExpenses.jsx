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
  const [idGenerated, setIdGenerated] = useState([{_id: '', count: 0}])
  const {date} = getDateAndTime()
  const [expensesData, setExpensesData] = useState({
                                          date: date,
                                          category: "",
                                          type: "",
                                          transaction_no: "", 
                                          item_name: "", 
                                          unit_cost: 0, 
                                          quantity: 0, 
                                          total: 0,
                                      })
                                      

  const fetchAll = async  () =>{
    const result = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/getExpensesCategory');
    setCategory(result.data); 
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
    }
    console.log(newData)
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/collection/createExpenses`, newData)
      const updateId = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/collection/updateIDExpenses`, {id: idGenerated[0]._id, count: newId})
      console.log(response.data.message)
      console.log(updateId.data)
      fetchAll()
      isSubmit("done")
      setExpensesData({
        date: "",
        category: "",
        type: "",
        transaction_no: "", 
        item_name: "",
        unit_cost: 0, 
        quantity: 0,
        total: 0,
      })
      onClose()
    } catch(e){
      console.log(e);
    }
    setIsLoading(false)
  };  

  return (
    <>
      <Button onPress={onOpen} color="primary"><MdAdd/> Expenses</Button>
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
                  value={expensesData.item_name}
                  onChange={(e)=>(setExpensesData((prevData)=>({...prevData, item_name: e.target.value})))}
                />
                <Input
                  label="Cost"
                  placeholder="Enter unit cost"
                  type="number"
                  variant="bordered"
                  name="unit_cost"
                  value={expensesData.unit_cost}
                  onChange={handleChange}
                />
                <Input
                  label="Quantity"
                  placeholder="Enter item quantity"
                  variant="bordered"
                  name="quantity"
                  value={expensesData.quantity}
                  onChange={handleChange}
                />
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