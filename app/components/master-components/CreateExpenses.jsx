"use client"
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tabs, Tab, Input, Listbox, ListboxItem, Accordion, AccordionItem} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Delete from './actions/Delete'
import UpdateExpensesCategory from './form/updateExpensesCategory'
import { useExpensesStore } from '@/app/stores/ExpensesStore'

export default function CreateExpenses() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { toast } = useToast()
  const { categoryList, fetchExpensesCategory } = useExpensesStore()
  const [ errorMessage, setErrorMessages ] = useState({})
  const [selected, setSelected] = useState("operational");
  const [category, setCategory] = useState({name: '', list: []})
  const [paymentSource, setPaymentSource] = useState([])
  const [paymentSourceList, setPaymentSourceList] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState(new Set(["1"]));

  const handleOpen = () => {
    onOpen();
  }

  const getPaymentMethod = async () =>{
    try{
      const responseOptions = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/paymentSource')
      setPaymentSourceList(responseOptions.data)
    } catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getPaymentMethod()
  }, [])

  const handleNameChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const addItemToList = () => {
        if(inputValue.trim() !== ''){
            const newItem = inputValue;
            if (newItem) {
            setCategory((prevData) => ({
                ...prevData,
                list: [...prevData.list, newItem],
            }));
            }
            console.log(category);
            setInputValue('')
        }

  
    };
    const removeItem = (index) => {
        setCategory((prevData) => {
            const newList = [...prevData.list];
            newList.splice(index, 1);
            return { ...prevData, list: newList };
        })
    };    

    const isValid = () => {
        const errors = {};
        if(!category.name) errors.name = "This field must not be empty."
    
        setErrorMessages(errors);
        return errors;    
    }

    const [isLoading, setIsLoading] = useState(false)
    const submit = async () =>{

        const errors = isValid()
        if(Object.keys(errors).length !== 0){
          return
        }

        setIsLoading(true)
        if(inputValue.trim() !== ''){
            const newItem = inputValue;
            if (newItem) {
            setCategory((prevData) => ({
                ...prevData,
                list: [...prevData.list, newItem],
            }));
            }
            console.log(category);
            setInputValue('')
        }

        try{
            const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/master/createExpensesCategory', category)
            setIsLoading(false)
            toast({
                variant: "outline",
                title: response.data.isSuccess? "Success!" : "Error!",
                color: "success",
                description: response.data.message,
              })
            fetchExpensesCategory()
            setCategory({name: '', list: []})
        } catch(e){
            console.log(e)
        }
    } 
  
    const sourceIsValid = () => {
        const errors = {};
        if(!paymentSource) errors.options = "This field must not be empty."
        setErrorMessages(errors);
        return errors;
      }

      
    const submitPaymentSource = async () =>{
        
        const errors = sourceIsValid()
          if(Object.keys(errors).length !== 0){
            return
        }
        setIsLoading(true)
        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/master/createPaymentSource', {name: paymentSource})
        console.log(response)
        toast({
          variant: "outline",
          title: "Success!",
          color: "success",
          description: response.data.message,
        })
        setPaymentSource('')
        setIsLoading(false)
        getPaymentMethod()
      }


    useEffect(()=>{
        fetchExpensesCategory()
    }, [])

    const itemClasses = {
        base: "py-0 w-full",
        title: "font-normal text-medium",
        trigger: "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content: "text-small px-2",
      };
    
    const done = () =>{
        fetchExpensesCategory()
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
                    <ModalHeader className="flex flex-col gap-1">Expenses Master Data</ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="flex flex-col ap-5">
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
                                        <Tab key='add' title='Add new'>
                                            <form>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex gap-4 items-end pb-5">
                                                        <Input 
                                                        onChange={handleNameChange}
                                                        isInvalid={errorMessage.name? true : false}
                                                        color={errorMessage.name ? "danger" : ""}
                                                        errorMessage={errorMessage.name} 
                                                        value={category.name} 
                                                        label="Category" 
                                                        placeholder="Enter new category"/>
                                                    </div>
                                                    {category.name != ''? (
                                                        <div>
                                                            <div>
                                                                <Listbox
                                                                aria-label="Listbox Variants"
                                                                color="solid" 
                                                                topContent={category.name != ''? <span>Category {category.name}</span> : ''}
                                                                >
                                                                    {category.list.map((list, index) => (
                                                                        <ListboxItem key={list}>
                                                                            <div className="flex justify-between items-center">
                                                                                <span className="text-sm">{list}</span>
                                                                                <Button isIconOnly color="warning" variant="light" aria-label="Take a photo" onPress={() => removeItem(index)}>
                                                                                    <CiCircleRemove className="h-8 w-8"/>
                                                                                </Button>
                                                                            </div>
                                                                        </ListboxItem>
                                                                        
                                                                    ))}
                                                                </Listbox>
                                                            </div>
                                                            <div className="flex gap-3 items-center">
                                                                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Type" placeholder="Enter new type"/>
                                                                <Button onPress={addItemToList} color="primary" variant="light"><IoMdAdd className="h-8 w-8"/></Button>
                                                            </div>

                                                        </div>
                                                    ): null}    
                                                </div>
                                                <div className="flex justify-center pt-5">
                                                    <Button 
                                                    color="primary" 
                                                    className="w-44" 
                                                    onPress={submit} 
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
                                        <Tab key='list' title='category'>
                                            <div>
                                                <Accordion 
                                                selectedKeys={selectedKeys} 
                                                onSelectionChange={setSelectedKeys}
                                                variant="splitted"
                                                itemClasses={itemClasses}
                                                >
                                                    {categoryList.map((item) =>(
                                                        <AccordionItem 
                                                        key={item.id}
                                                        aria-label={item.name} 
                                                        title={item.name}
                                                         >
                                                            <div className="bg-slate-100 p-2 rounded border">
                                                                <div className="flex justify-between items-center">
                                                                    <span>List of category: {item.name}</span>
                                                                    <div>
                                                                        <UpdateExpensesCategory data={item} done={done}/>
                                                                        <Delete id={item._id} type="Expenses Category" done={done} collection="expenses"/>
                                                                    </div>
                                                                </div>
                                                                <Listbox
                                                                aria-label="Listbox Variants"
                                                                color="solid" 
                                                                >
                                                                    {item.list.map((list) =>(
                                                                        <ListboxItem showDivider key={list}>{list} </ListboxItem>
                                                                        ))}
                                                                </Listbox>
                                                            </div>
                                                        </AccordionItem>
                                                    ))}
                                                </Accordion>
                                            </div>
                                        </Tab>
                                        <Tab key="options" title="Options">
                                            <Listbox
                                            aria-label="Listbox Variants"
                                            color="solid" 
                                            topContent={<span>Payment Source</span>}
                                            >
                                                {paymentSourceList.map((item) =>(
                                                <ListboxItem showDivider key={item}>
                                                    <div className="flex justify-between items-center">
                                                    {item.name} 
                                                    <div>
                                                        {/* <UpdatdePayment data={item} type="Options" done={done}/> */}
                                                        <Delete id={item._id} type="Payment Source" done={getPaymentMethod} collection="source"/>
                                                    </div>
                                                    </div>
                                                </ListboxItem>
                                                ))}
                                            </Listbox>
                                            <form className="flex flex-col gap-4">
                                                <span>Create new Payment Source</span>
                                                <Input 
                                                label="source" 
                                                placeholder="Enter new Payment Source" 
                                                isInvalid={errorMessage.options? true : false}
                                                color={errorMessage.options ? "danger" : ""}
                                                errorMessage={errorMessage.options}
                                                value={paymentSource} onChange={(e)=>(setPaymentSource(e.target.value))}/>
                                                <div className="flex gap-2 justify-end">
                                                <Button 
                                                fullWidth 
                                                color="primary"
                                                type="submit" 
                                                isLoading={isLoading}
                                                onPress={submitPaymentSource}
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
                            </div>
                        </form>
                    </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>    
        </div>
    </>
  );
}
