"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Listbox, ListboxItem, Button, Input, useDisclosure} from "@nextui-org/react";
import { TbEdit } from "react-icons/tb";
import { CiCircleRemove } from 'react-icons/ci';
import { LuClipboardEdit } from "react-icons/lu";
import { IoMdAdd } from 'react-icons/io';
import axios from "axios";

export default function UpdateProduct({ data, done, }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [inputValue, setInputValue] = useState('')
  const [category, setCategory] = useState(data)
  const [isLoading, setIsLoading] = useState(false)

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


  const updateItem = async () =>{
    setIsLoading(true)
    try{
      const response = await axios.post(`https://demprints-backend.vercel.app/api/master/updateExpensesCategory/${data._id}`, {name: category.name, list: category.list} )
      console.log(response);

      done(response.data)
      onClose()
      setIsLoading(false)
    } catch(e){
      console.log(e)
      setIsLoading(false)
    }

    
  }

  return (
    <>
      <Button isIconOnly color="primary" onPress={onOpen} variant="light"><TbEdit className="h-5 w-5"/> </Button>
      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-1 items-center"><LuClipboardEdit className="bg-primary-200 p-1 h-7 w-7 text-primary border border-primary rounded"/>Update Expenses Category</ModalHeader>
              <ModalBody>
                <form>
                  <div className="flex flex-col gap-3">
                      <div className="flex gap-4 items-end pb-5">
                          <Input value={category.name} onChange={handleNameChange} label="Category" placeholder="Enter new category"/>
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
                                  <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} label="Operational" placeholder="Enter new operationl"/>
                                  <Button onPress={addItemToList} color="primary" variant="light"><IoMdAdd className="h-8 w-8"/></Button>
                              </div>

                            </div>
                        ): null}    
                    </div>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                color="primary" 
                onPress={updateItem}
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
                }>
                  Proceed
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}