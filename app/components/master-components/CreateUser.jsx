"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/react";
import {DatePicker} from "@nextui-org/date-picker";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function CreateUser() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleClose = () => {
      if (step === 1) {
        onClose();
      } else {
        setStep(prevStep => prevStep - 1);
      }
  }
  
  const handleButtonClick = () => {
    if(step === 3){
      console.log('Done')
    } else{
      setStep(prevStep => prevStep + 1);
    }
  };

  const jobOptions = ['Executive Director', 'HR Officer', 'Operation Head', 'Graphic Artist']
  const depOptions = ['Management', 'Operation', 'Executive']
  return (
    <>
      <div class="p-md">
        <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
            </div>
            <div className="py-3 px-6">
            <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Employee
            </h5>
            </div>
            <div className="p-6 pt-0">
            <Button color="primary" onPress={onOpen}><MdAdd/> employee</Button>
            </div>
        </div>
        <Modal 
            size={step === 2? '5xl' : '2xl'}
            isOpen={isOpen} 
            onClose={onClose} 
        >
            <ModalContent>
            {() => (
                <>
                <ModalHeader className="flex flex-col gap-1">User Registration</ModalHeader>
                <ModalBody>
                  {
                    step === 1? (
                      <div className="flex flex-col">
                        <span>Credentials</span>
                        <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row gap-5 pt-3">
                          <Input type="email" label="Email" placeholder="Enter Email" labelPlacement="outside" variant="bordered" className="max-w-xs"/>
                          <Input
                            label="Password"
                            variant="bordered"
                            placeholder="Enter password"
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                {isVisible ? (
                                  <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                  <BsEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                              </button>
                            }
                            type={isVisible ? "text" : "password"}
                            className="max-w-xs"
                            labelPlacement="outside"
                          />
                        </div>
                      </div>
                    ) : step === 2 ? (
                      <div className="max-h-[30rem] bg-grey-300 overflow-y-scroll">
                        <span className="text-xl">Personal Information</span>
                        <div className="flex flex-col lg:flex-row mt-2">
                          <div className="flex flex-col gap-4 px-3 mx-2 border-r">
                            <div className="flex flex-col">
                              <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-2">
                                <Input type="text" labelPlacement="outside"  label="Firstname" variant="bordered" className="max-w-xs"/>
                                <Input type="text" labelPlacement="outside"  label="Middlename (optional)" variant="bordered"/>
                                <Input type="text" labelPlacement="outside"  label="Lastname" variant="bordered"/>
                              </div>
                              <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                <Select  label="Select gender" labelPlacement="outside"  className="max-w-[163px]" variant="bordered">
                                  <SelectItem>Male</SelectItem>
                                  <SelectItem>Female</SelectItem>
                                </Select>
                                <DatePicker label="Birth date" labelPlacement="outside" className="max-w-[163px]" variant="bordered"/>
                              </div>
                            </div>
                            <div className="flex flex-col border-t mt-3">
                              <span>Mandatory Benefit</span>
                              <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                <Input type="number" labelPlacement="outside"  label="SS No." variant="bordered" className="max-w-xs"/>
                                <Input type="number" labelPlacement="outside"  label="Pag-Ibig No." variant="bordered"/>
                                <Input type="number" labelPlacement="outside"  label="Philhealth" variant="bordered"/>
                              </div>
                            </div>
                            <div className="h-52 bg-slate-400">

                            </div>
                          </div>
                          <div className="flex flex-col py-2 px-3">
                            <span>Contact Information</span>
                            <Input type="text" labelPlacement="outside"  label="Address" variant="bordered" className="pt-2"/>
                            <div className="flex gap-5 py-5">
                              <Input type="number" labelPlacement="outside"  label="Contact #" variant="bordered"/>
                              <Input type="email" labelPlacement="outside"  label="Email" variant="bordered"/>
                            </div>
                            <div className="border p-3 mt-5">
                              <span >Contact Person</span>
                              <div className="flex gap-5 py-2">
                                <Input type="text" labelPlacement="outside" placeholder="Enter name"  label="Name" variant="bordered"/>
                                <Input type="text" labelPlacement="outside"  label="Relationship" variant="bordered"/>
                              </div>
                              <div className="flex gap-5 pb-2">
                                <Input type="number" labelPlacement="outside"  label="Contact #" variant="bordered"/>
                                <Input type="email" labelPlacement="outside"  label="Email" variant="bordered"/>
                              </div>
                              <Input type="text" labelPlacement="outside"  label="Address" variant="bordered"/>
                            </div>
                          </div>
                        </div>
                      </div>

                    ): step === 3? (
                      <div className="flex flex-col gap-5 max-h-[20rem] overflow-y-scroll">
                        <div>
                          <span>Employment Details</span>
                          <div className="flex flex-col md:flex-row lg:flex-row gap-5 pt-3">
                            <Select 
                              label="Select Job Title" 
                              className="max-w-" 
                            >
                              {jobOptions.map((job) => (
                                <SelectItem key={job}>
                                  {job}
                                </SelectItem>
                              ))}
                            </Select>
                            <Select 
                              label="Select Department" 
                              className="max-w-" 
                            >
                              {depOptions.map((dep) => (
                                <SelectItem key={dep}>
                                  {dep}
                                </SelectItem>
                              ))}
                            </Select>
                            <DatePicker label="Birth date" className="max-w-[284px]" />
                          </div>
                        </div>
                        <div>
                          <span>Compensation and Benefits</span>
                          <div className="flex flex-col md:flex-row lg:flex-row gap-5 pt-3">
                            <Input type="number" placeholder="00.00" label="Wage" startContent={
                              <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">₱</span>
                              </div>
                            }/>
                            <Select label="Compensation Basis">
                              <SelectItem>Hourly</SelectItem>
                              <SelectItem>Daily</SelectItem>
                              <SelectItem>Pasic Pay</SelectItem>
                            </Select>
                            <Select label="Frequency">
                              <SelectItem>Daily</SelectItem>
                              <SelectItem>Weekly</SelectItem>
                              <SelectItem>Bi-monthly</SelectItem>
                              <SelectItem>Monthly</SelectItem>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <span>Legal Compliance and Audit</span>
                          <div className="flex flex-col md:flex-row lg:flex-row gap-5 py-2 pt-3">
                            <Input type="file" label="Contract"/>
                            <Input type="file" label="Pre-employment document"/>
                            <Input type="file" label="Training certificates"/>
                          </div>
                        </div>
                      </div>
                    ):
                    null}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={handleClose}>
                      {step === 1? 'close' : 'prev'}
                    </Button>
                    <Button color="primary" onPress={handleButtonClick}>
                      {step === 3? 'submit' : 'next'}
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
