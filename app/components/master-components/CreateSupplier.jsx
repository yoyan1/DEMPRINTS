"use client"
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import axios from "axios";

export default function CreateSupplier() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { toast } = useToast()
  const [ errorMessage, setErrorMessages ] = useState({})
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

  const isValid = () => {
    const errors = {};
    if(!supplierData.type) errors.type = "This field must not be empty."
    if(!supplierData.name) errors.name = "This field must not be empty."
    if(!supplierData.address) errors.address = "This field must not be empty."
    if(!supplierData.contact_number) errors.contact_number = "This field must not be empty."
    if(supplierData.contact_number.length > 10 || supplierData.contact_number.length < 10) errors.contact_number = "Contact number is invalid."
    if(supplierData.contact_number[0] !== '9') errors.contact_number = "Contact number must start at 9."
    if(!supplierData.rep_name) errors.rep_name = "This field must not be empty."
    if(!supplierData.rep_position) errors.rep_position = "This field must not be empty."
    if(!supplierData.rep_contact_number) errors.rep_contact_number = "This field must not be empty."
    if(supplierData.rep_contact_number.length > 10 || supplierData.rep_contact_number.length > 10) errors.rep_contact_number = "This field must not be empty."
    if(supplierData.rep_contact_number[0] !== '9') errors.rep_contact_number = "Contact number must start at 9."
    setErrorMessages(errors);
    return errors;
  }

  const [loading, setLoading] = useState(false)
  const submit = async (e) =>{
    e.preventDefault();

    const errors = isValid()
    if(Object.keys(errors).length !== 0){
      return
    }
    setLoading(true)
    const response = await axios.post('https://demprints-backend.vercel.app/api/master/createSupplier', supplierData)
    console.log(response)
    toast({
      variant: "outline",
      title: "Success!",
      color: "success",
      description: response.data,
    })

    setSupplierData({
        type: '',
        name: '',
        address: '',
        contact_number: 0,
        rep_name: '',
        rep_position: '',
        rep_contact_number: 0,
    })
    setLoading(false)
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
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Supplier Master Data</ModalHeader>
                    <ModalBody>
                        <form onSubmit={submit}>
                            <span>Supplier Information</span>
                            <div className="flex flex-col gap-4">
                                <Select 
                                label="type" 
                                isInvalid={errorMessage.type? true : false}
                                color={errorMessage.type ? "danger" : ""}
                                errorMessage={errorMessage.type}
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
                                isInvalid={errorMessage.name? true : false}
                                color={errorMessage.name ? "danger" : ""}
                                errorMessage={errorMessage.name}
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
                                isInvalid={errorMessage.address? true : false}
                                color={errorMessage.address ? "danger" : ""}
                                errorMessage={errorMessage.address}
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
                                isInvalid={errorMessage.contact_number? true : false}
                                color={errorMessage.contact_number ? "danger" : ""}
                                errorMessage={errorMessage.contact_number}
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
                                        isInvalid={errorMessage.rep_name? true : false}
                                        color={errorMessage.rep_name ? "danger" : ""}
                                        errorMessage={errorMessage.rep_name}
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
                                        isInvalid={errorMessage.rep_position? true : false}
                                        color={errorMessage.rep_position ? "danger" : ""}
                                        errorMessage={errorMessage.rep_position}
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
                                        isInvalid={errorMessage.rep_contact_number? true : false}
                                        color={errorMessage.rep_contact_number ? "danger" : ""}
                                        errorMessage={errorMessage.rep_contact_number}
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
                            <Button className="w-full mt-5" color="primary" type="submit" isLoading={loading}>Submit</Button>
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
