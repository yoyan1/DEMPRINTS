"use client"
import React, { useState } from "react";
import axios from "axios";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MdAdd } from 'react-icons/md';
import {Input} from "@nextui-org/input";
import {Select, SelectItem} from "@nextui-org/react";
import {DatePicker, DateInput} from "@nextui-org/date-picker";
import {CalendarDate} from "@internationalized/date";
import { BsEyeSlash, BsEye } from "react-icons/bs";

export default function CreateUser() {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [step, setStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBirthDate, setSelectedBirthDate] = useState()
  const [selectedHireDate, setSelectedHireDate] = useState()
  const [mandatoryBenefit, setMandatoryBenefit] = useState({ss_no: 0, pab_ibig_no: 0, philhealth: 0})
  const [contactPerson, setContactPerson] = useState({
    name: '',
    address: '',
    contact_number: 0,
    relationship: ''
  })
  const [credentials, setCredentials] = useState({
      email: '',
      password: '',
      firstname: '',
      middlename: '',
      lastname: '',
      gender: '',
      birth_date: '',
      address: '',
      contact_number: '',
      contact_email: '',
      contact_person: contactPerson,
      mandatory_benefit: mandatoryBenefit,
      job_title: '',
      department: '',
      hire_date: '',
      wage: '',
      basis: '',
      frequency: '',
      leave_entitlement: '',
      contract: '',
      pre_employment: '',
      certificates: '',
      review: '',
      actions: '',
  })

  const handleBirthDateChange = (date) => {
    const newBirthDate =  `${date.month}/${date.day}/${date.year}`
    
    setSelectedBirthDate(newBirthDate)
    setCredentials((prevData) => ({
      ...prevData,
      birth_date: selectedBirthDate,
    }));
    
  };
  const handleHireDateChange = (date) => {
    const newHireDate = `${date.month}/${date.day}/${date.year}`
    setSelectedHireDate(newHireDate)
    setCredentials((prevData) => ({
      ...prevData,
      hire_datedate: newHireDate,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleChangeContact = (e) => {
    const { name, value } = e.target;

    setContactPerson((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeBenefit = (e) => {
    const { name, value } = e.target;

    setMandatoryBenefit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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

  const submit = async () =>{

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', credentials);
      
      if (response.status === 201) {
        console.log('Registration successful:', response.data);
        setError(null);
      } else {
        setError('Unexpected response from server');
      }
      
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
        setError(error.response.data.message || 'Error occurred during registration');
      } else if (error.request) {
        console.error('No response from server:', error.request);
        setError('No response from server. Please try again later.');
      } else {
        console.error('Error setting up the request:', error.message);
        setError('Error setting up request');
      }
    }
    console.log(error)
  }
  return (
    <>
      <div className="p-md">
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
        <form onSubmit={submit}>
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
                            <Input type="email" label="Email" placeholder="Enter Email" labelPlacement="outside" variant="bordered" className="max-w-xs" name="email" value={credentials.email} onChange={handleChange}/>
                            <Input
                              label="Password"
                              variant="bordered"
                              placeholder="Enter password"
                              name="password"
                              value={credentials.password} 
                              onChange={handleChange}
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
                                  <Input type="text" labelPlacement="outside"  label="Firstname" variant="bordered" className="max-w-xs" name="firstname" value={credentials.firstname} onChange={handleChange}/>
                                  <Input type="text" labelPlacement="outside"  label="Middlename (optional)" variant="bordered" name="middlename" value={credentials.middlename} onChange={handleChange}/>
                                  <Input type="text" labelPlacement="outside"  label="Lastname" variant="bordered" name="lastname" value={credentials.lastname} onChange={handleChange}/>
                                </div>
                                <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                  <Select  label="Select gender" labelPlacement="outside"  className="max-w-[163px]" variant="bordered" name="gender" value={credentials.gender} onChange={handleChange}>
                                    <SelectItem>Male</SelectItem>
                                    <SelectItem>Female</SelectItem>
                                  </Select>
                                  <DateInput label={"Birth date"} placeholderValue={new CalendarDate(1995, 11, 6)} className="max-w-sm" />
                                </div>
                              </div>
                              <div className="flex flex-col border-t mt-3">
                                <span>Mandatory Benefit</span>
                                <div className="flex flex-col md:flex-row lg:flex-row gap-5">
                                  <Input type="number" labelPlacement="outside"  label="SS No." variant="bordered" className="max-w-xs" name="ss_no" value={mandatoryBenefit.ss_no} onChange={handleChangeBenefit}/>
                                  <Input type="number" labelPlacement="outside"  label="Pag-Ibig No." variant="bordered" name="pag_ibig_no" value={mandatoryBenefit.pab_ibig_no} onChange={handleChangeBenefit}/>
                                  <Input type="number" labelPlacement="outside"  label="Philhealth" variant="bordered" name="philhealth" value={mandatoryBenefit.philhealth} onChange={handleChangeBenefit}/>
                                </div>
                              </div>
                              <div className="h-52 bg-slate-400">

                              </div>
                            </div>
                            <div className="flex flex-col py-2 px-3">
                              <span>Contact Information</span>
                              <Input type="text" labelPlacement="outside"  label="Address" variant="bordered" className="pt-2" name="address" value={credentials.address} onChange={handleChange}/>
                              <div className="flex gap-5 py-5">
                                <Input type="number" labelPlacement="outside"  label="Contact #" variant="bordered" name="contact_number" value={credentials.contact_number} onChange={handleChange}/>
                                <Input type="email" labelPlacement="outside"  label="Email" variant="bordered" name="contact_email" value={credentials.contact_email} onChange={handleChange}/>
                              </div>
                              <div className="border p-3 mt-5">
                                <span >Contact Person</span>
                                <div className="flex gap-5 py-2">
                                  <Input type="text" labelPlacement="outside" placeholder="Enter name"  label="Name" variant="bordered" name="name" value={contactPerson.birth_date} onChange={handleChangeContact}/>\
                                  <Input type="text" labelPlacement="outside"  label="Relationship" variant="bordered" name="relationship" value={contactPerson.relationship} onChange={handleChangeContact}/>
                                </div>
                                <div className="flex gap-5 pb-2">
                                  <Input type="number" labelPlacement="outside"  label="Contact #" variant="bordered"
                                  name="contact_number" value={contactPerson.contact_number} onChange={handleChangeContact}/>
                                  <Input type="email" labelPlacement="outside"  label="Email" variant="bordered"/>
                                </div>
                                <Input type="text" labelPlacement="outside"  label="Address" variant="bordered" name="address" value={contactPerson.address} onChange={handleChangeContact}/>
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
                                name="job_title" 
                                value={credentials.job_title} 
                                onChange={handleChange}
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
                                name="department" 
                                value={credentials.department} 
                                onChange={handleChange}
                              >
                                {depOptions.map((dep) => (
                                  <SelectItem key={dep}>
                                    {dep}
                                  </SelectItem>
                                ))}
                              </Select>
                              <DatePicker label="Hired date" className="max-w-[284px]" value={selectedHireDate} onChange={handleHireDateChange}/>
                            </div>
                          </div>
                          <div>
                            <span>Compensation and Benefits</span>
                            <div className="flex flex-col md:flex-row lg:flex-row gap-5 pt-3">
                              <Input type="number" placeholder="00.00" label="Wage" name="wage" value={credentials.wage} onChange={handleChange} startContent={
                                <div className="pointer-events-none flex items-center">
                                  <span className="text-default-400 text-small">₱</span>
                                </div>
                              }/>
                              <Select label="Compensation Basis"  name="basis" value={credentials.basis} onChange={handleChange}>
                                <SelectItem>Hourly</SelectItem>
                                <SelectItem>Daily</SelectItem>
                                <SelectItem>Pasic Pay</SelectItem>
                              </Select>
                              <Select label="Frequency"  name="frequency" value={credentials.frequency} onChange={handleChange}>
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
                      {step === 3? (
                        <Button color="primary" onPress={submit} type="submit">
                          submit
                        </Button>

                      ):
                        <Button color="primary" onPress={handleButtonClick}>
                          next
                        </Button>
                       }
                  </ModalFooter>
                  </>
              )}
              </ModalContent>
          </Modal>    
        </form>
      </div>
    </>
  );
}
