"use client"
import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, useDisclosure} from "@nextui-org/react";
import { TbEdit } from "react-icons/tb";
import { LuClipboardEdit } from "react-icons/lu";
import axios from "axios";
import { useToast } from '@/hooks/use-toast';

export default function UpdateProduct({ data, type, category, measurement, done, }) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const { toast } = useToast()
  const [category_name, setCategoryName] = useState(data.name)
  const [unit, setUnit] = useState(data.name)
  const [productData, setProductData] = useState(data)
  const [isLoading, setIsLoading] = useState(false)

  const onDone = (isSuccess, message) =>{
    toast({
      variant: "outline",
      title: isSuccess? 'Success!' : 'Error!',
      color: "success",
      description: message,
    })
  }

  const updateItem = async () =>{
    setIsLoading(true)
    try{
      if(type.toLowerCase() === 'category'){
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/master/updateProductsData/${data._id}`,{name: category_name} )
        console.log(response);
        onDone(true, response.data)
        done(response.data)
      }
      if(type.toLowerCase() === 'measurement'){
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/master/updateProductsData/${data._id}`,{name: unit} )
        console.log(response);
        onDone(true, response.data)
        done(response.data)
      }
      if(type.toLowerCase() === 'product'){
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/master/updateProductsData/${data._id}`,{name: productData.name, category: productData.category, unit: productData.unit, price: productData.price} )
        console.log(response);
        onDone(response.data)
        done(response.data)
      } 
      onClose()
      setIsLoading(false)
    } catch(e){
      console.log(e)
      onDone(false, e)
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
              <ModalHeader className="flex gap-1 items-center"><LuClipboardEdit className="bg-primary-200 p-1 h-7 w-7 text-primary border border-primary rounded"/>Update {type}</ModalHeader>
              <ModalBody>
                {type.toLowerCase() === 'category'? (
                    <form  className="flex flex-col gap-4">
                    <span>Create Product Category</span>
                    <Input isRequired label="Category" placeholder="Enter category" type="email" value={category_name} onChange={(e) => setCategoryName(e.target.value)}/>
                    </form>

                ): type.toLowerCase() === 'measurement'? (
                  <form className="flex flex-col gap-4">
                    <span>Create Unit of Measurement</span>
                    <Input isRequired label="Unit" placeholder="Unit of measurement" value={unit} onChange={(e) => setUnit(e.target.value)}/>
                  </form>
                ):(
                  <form className="flex flex-col gap-4">
                        <span>Update Product</span>
                        <Input isRequired label="Product name" placeholder="Enter product name" value={productData.item_code} name="name" onChange={(e)=>(setProductData((prevData)=>({...prevData, item_code: e.target.value})))}/>
                        <div>
                          <span className='flex-1 text-tiny mb-2'>Category: {productData.category}</span>
                          <Select 
                              label="Select an category" 
                              className='flex-1'
                              value={productData.category}
                              name="category"
                              onChange={(e)=>(setProductData((prevData)=>({...prevData, category: e.target.value})))}
                          >
                              {category.map(item =>(
                              <SelectItem key={item.name}>{item.name}</SelectItem>
                              ))}
                          </Select>
                        </div>
                        <Input isRequired label="Product name" placeholder="Enter product name" value={productData.name} name="name" onChange={(e)=>(setProductData((prevData)=>({...prevData, name: e.target.value})))}/>
                        <Input isRequired label="Product name" placeholder="Enter product name" value={productData.variants} name="name" onChange={(e)=>(setProductData((prevData)=>({...prevData, variants: e.target.value})))}/>
                        <span className='flex-1 text-tiny mb-2'>Unit of Measurement: {productData.unit}</span>
                        <Select 
                            label="Select a unit" 
                            value={productData.unit}
                            name="unit"
                            onChange={(e) => 
                            setProductData((prevData) => ({
                                ...prevData, 
                                unit: e.target.value
                            }))
                            }     
                        >
                            {measurement.map(item => (
                            <SelectItem key={item.name} value={item.name}>
                                {item.name}
                            </SelectItem>
                            ))}
                        </Select>
                        <Input type="number" label="Product price" placeholder="Enter product name" value={productData.price} name="price" onChange={(e)=>(setProductData((prevData)=>({...prevData, price: e.target.value})))}/>
                    </form>    
                )} 
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