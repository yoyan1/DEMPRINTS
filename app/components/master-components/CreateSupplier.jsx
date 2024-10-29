"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

export default function CreateSupplier() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [supplierData, setSupplierData] = useState({
        type: '',
        name: '',
        address: '',
        contact_number: 0,
        rep_name: '',
        rep_position: '',
        rep_contact_number: 0,
    })
  const handleOpen = () => {
    onOpen();
  }

  const submit = async () =>{
    console.log(supplierData)
    const response = await axios.post('http://localhost:5000/api/master/createSupplier', supplierData)
    console.log(response)
    setSupplierData({
        type: '',
        name: '',
        address: '',
        contact_number: 0,
        rep_name: '',
        rep_position: '',
        rep_contact_number: 0,
    })
  }
  return (
    <>
        <div className="p-md">
            <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                </div>
                <div className="py-3 px-6">
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Supplier
                </h5>
                </div>
                <div className="p-6 pt-0">
                <Button color="primary" onPress={handleOpen}><MdAdd/> supplier</Button>
                </div>
            </div>
            <Modal 
                size="md"
                isOpen={isOpen} 
                onClose={onClose} 
                scrollBehavior="outside"
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Supplier Master Data</ModalHeader>
                    <ModalBody>
                        <div>
                            <span>Supplier Information</span>
                            <div className="flex flex-col gap-4">
                                <Select 
                                label="type" 
                                value={supplierData.type} 
                                onChange={(e) => 
                                  setSupplierData((prevData) => ({
                                    ...prevData, 
                                    type: e.target.value
                                  }))
                                } 
                                >
                                    <SelectItem key='individual'>Individual</SelectItem>
                                    <SelectItem key='organization'>Organization</SelectItem>
                                </Select>
                                <Input 
                                label="Name" 
                                placeholder="Enter supplier name" 
                                value={supplierData.name} 
                                onChange={(e) => 
                                  setSupplierData((prevData) => ({
                                    ...prevData, 
                                    name: e.target.value
                                  }))
                                } />
                                <Input 
                                label="Address" 
                                placeholder="Enter supplier address"
                                value={supplierData.address} 
                                onChange={(e) => 
                                  setSupplierData((prevData) => ({
                                    ...prevData, 
                                    address: e.target.value
                                  }))
                                } 
                                />
                                <Input 
                                type="number" 
                                label="Contact No." 
                                placeholder="Enter suplier contact #"
                                value={supplierData.contact_number} 
                                onChange={(e) => 
                                  setSupplierData((prevData) => ({
                                    ...prevData, 
                                    contact_number: e.target.value
                                  }))
                                } 
                                />
                                <div>
                                    <span>Representative Details</span>
                                    <div className="flex flex-col gap-3">
                                        <Input 
                                        label="Name" 
                                        placeholder="Enter representative name"
                                        value={supplierData.rep_name} 
                                        onChange={(e) => 
                                        setSupplierData((prevData) => ({
                                            ...prevData, 
                                            rep_name: e.target.value
                                        }))
                                        } 
                                        />
                                        <Input 
                                        label="Position" 
                                        placeholder="Enter position"
                                        value={supplierData.rep_position} 
                                        onChange={(e) => 
                                        setSupplierData((prevData) => ({
                                            ...prevData, 
                                            rep_position: e.target.value
                                        }))
                                        } 
                                        />
                                        <Input 
                                        label="Contact No." 
                                        placeholder="Enter representative contact #"
                                        value={supplierData.rep_contact_number} 
                                        onChange={(e) => 
                                        setSupplierData((prevData) => ({
                                            ...prevData, 
                                            rep_contact_number: e.target.value
                                        }))
                                        } 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={submit}>
                        Submit
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>    
        </div>
    </>
  );
}
