"use client"
import React, {useState, useEffect}from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Listbox, ListboxItem} from "@nextui-org/react";
import {Tabs, Tab, Input} from "@nextui-org/react";
import {Select,  SelectItem} from "@nextui-org/select";
import { MdAdd } from 'react-icons/md';
import axios from "axios";
// import { Input } from "@nextui-org/react";

export default function CreateProduct() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selected, setSelected] = useState("category");
  const [category, setCategory] = useState([])
  const [category_name, setCategoryName] = useState('')
  const [unit, setUnit] = useState('')
  const [measurement, setMeasurement] = useState([])
  const [productData, setProductData] = useState({ name: '', category: '', unit: '', price: 0,})
  
  const fetchCategoryAndMeasurement = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/master/productCategory');
        setCategory(response.data); 
        const res = await axios.get('http://localhost:5000/api/master/productMeasurement');
        setMeasurement(res.data); 
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
      fetchCategoryAndMeasurement(); 
  }, []); 


  const handleOpen = () => {
    onOpen();
  }

  // const handleProductDataChange = (e) =>{
  //   const [name, value] = e.target

  //   setProductData((prevData) => ({
  //     ...prevData,
  //     [name]: value
  //   }))
  // }

  const submitCategory = async () =>{
    const response = await axios.post('http://localhost:5000/api/master/createCategory', {category_name: category_name})
    console.log(response);
  }
  const submitMeasurement = async () =>{
    const response = await axios.post('http://localhost:5000/api/master/createMeasurement', {unit: unit})
    console.log(response);
  }

  const submitProduct = async () =>{
    const response = await axios.post('http://localhost:5000/api/master/createProduct', productData)
    console.log(response);

    setProductData({ name: '', category: '', unit: '', price: 0,})
  }

  return (
    <>
      <div className="p-md">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            <div className="py-3 px-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              Product / Services
            </h5>
            </div>
            <div className="p-6 pt-0">
            <Button color="primary" onPress={handleOpen}><MdAdd/> product / service</Button>
            </div>
        </div>
          <Modal 
              size="lg"
              isOpen={isOpen} 
              onClose={onClose} 
          >
              <ModalContent>
              {() => (
                  <>
                  <ModalHeader className="flex flex-col gap-1">Product Master Data</ModalHeader>
                  <ModalBody>
                      <div>
                        <Tabs
                          fullWidth
                          size="md"
                          aria-label="Tabs form"
                          selectedKey={selected}
                          onSelectionChange={setSelected}
                        >
                          <Tab key="category" title="Category">
                            <form  className="flex flex-col gap-4">
                              <span>Create Product Category</span>
                              <Input isRequired label="Category" placeholder="Enter category" type="email" value={category_name} onChange={(e) => setCategoryName(e.target.value)}/>
                              <div className="flex gap-2 justify-end">
                                <Button type="submit" onPress={submitCategory} fullWidth color="primary">
                                  Submit
                                </Button>
                              </div>
                            </form>
                            <Listbox
                            aria-label="Listbox Variants"
                            color="solid" 
                            topContent={<span>List of Category</span>}
                            >
                              {category.map(item =>(
                                <ListboxItem key={item.id}>{item.name}</ListboxItem>
                              ))}
                            </Listbox>
                          </Tab>
                          <Tab key="unit" title="Measurement">
                            <Listbox
                              aria-label="Listbox Variants"
                              color="solid" 
                              topContent={<span>List Unit of Measurements</span>}
                              >
                                {measurement.map(item =>(
                                  <ListboxItem key={item.id}>{item.name}</ListboxItem>
                                ))}
                              </Listbox>
                            <form className="flex flex-col gap-4">
                              <span>Create Unit of Measurement</span>
                              <Input isRequired label="Unit" placeholder="Unit of measurement" value={unit} onChange={(e) => setUnit(e.target.value)}/>
                              <div className="flex gap-2 justify-end">
                                <Button onPress={submitMeasurement} fullWidth color="primary">
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </Tab>
                          <Tab key="create" title="Product">
                            <form className="flex flex-col gap-4">
                              <span>Create Product</span>
                              <Select 
                                label="Select an category" 
                                value={productData.category}
                                name="category"
                                onChange={(e)=>(setProductData((prevData)=>({...prevData, category: e.target.value})))}
                              >
                                {category.map(item =>(
                                  <SelectItem key={item.name}>{item.name}</SelectItem>
                                ))}
                              </Select>
                              <Input isRequired label="Product name" placeholder="Enter product name" value={productData.name} name="name" onChange={(e)=>(setProductData((prevData)=>({...prevData, name: e.target.value})))}/>
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
                              <div className="flex gap-2 justify-end">
                                <Button onPress={submitProduct} fullWidth color="primary">
                                  Submit
                                </Button>
                              </div>
                            </form>
                          </Tab>
                        </Tabs>
                      </div>
                  </ModalBody>
                  </>
              ) }
              </ModalContent>
          </Modal>    
        </div>
    </>
  );
}
