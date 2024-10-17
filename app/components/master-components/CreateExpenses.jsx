"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Tabs, Tab, Input, Listbox, ListboxItem} from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

export default function CreateExpenses() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selected, setSelected] = useState("operational");
  const [category, setCategory] = useState({name: '', list: []})
  const [inputValue, setInputValue] = useState('')

  const handleOpen = () => {
    onOpen();
  }

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


  return (
    <>
        <div className="p-md">
            <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                </div>
                <div className="py-3 px-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Expenses
                </h5>
                </div>
                <div className="p-6 pt-0">
                <Button color="primary" onPress={handleOpen}><IoMdAdd/> expenses</Button>
                </div>
            </div>
            <Modal 
                size="md"
                isOpen={isOpen} 
                onClose={onClose} 
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
                                        selectedKey={selected}
                                        onSelectionChange={setSelected}
                                    >
                                        <Tab key='add' title='Add new'>
                                            <form>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex gap-4 items-end pb-5">
                                                        <Input onChange={handleNameChange} label="Category" placeholder="Enter new category"/>
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
                                                                                <span className="text-lg">{list}</span>
                                                                                <Button isIconOnly color="warning" variant="light" aria-label="Take a photo" onPress={() => removeItem(index)}>
                                                                                    <CiCircleRemove className="h-8 w-8"/>
                                                                                </Button>
                                                                            </div>
                                                                        </ListboxItem>
                                                                        
                                                                    ))}
                                                                </Listbox>
                                                            </div>
                                                            <div className="flex gap-3 items-center">
                                                                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Operational" placeholder="Enter new operationl"/>
                                                                <Button onPress={addItemToList} color="primary" variant="light"><IoMdAdd className="h-8 w-8"/></Button>
                                                            </div>

                                                        </div>
                                                    ): null}    
                                                </div>
                                                <div className="flex justify-center pt-5">
                                                    <Button color="primary" className="w-44">Submit</Button>
                                                </div>
                                            </form>
                                        </Tab>
                                        <Tab key='update' title='Update category'>
                                            <div>
                                                <Listbox
                                                aria-label="Listbox Variants"
                                                color="solid" 
                                                >
                                                    <ListboxItem>
                                                        
                                                    </ListboxItem>
                                                </Listbox>
                                            </div>
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
