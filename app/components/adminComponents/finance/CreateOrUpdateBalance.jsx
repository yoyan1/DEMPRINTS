"use client"
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Select, SelectItem, DatePicker} from "@nextui-org/react";
// import {MailIcon} from './MailIcon.jsx';
// import {LockIcon} from './LockIcon.jsx';
import { MdAdd } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import axios from "axios";
import { useBalanceStore } from "../../../stores/balanceStore";
import { getDateAndTime } from "../../../composables/dateAndTime";

export default function CreateOrUpdate({dateOptions, refresh}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [paymentSourceList, setPaymentSourceList] = useState([])
  const {  addBalance, loadBalance } = useBalanceStore()
  const {date, time} = getDateAndTime()
  const [errorMessages, setErrorMessages] = useState({})
  const [ balanceData, setBalanceData ] = useState({
    date: date,
    amount: 0,
    type: ""
  })

  const [lazyLoad, setLazyLoad] = useState(false)
  const getPaymentMethod = async () =>{
    setLazyLoad(true)
    try{
      const responseOptions = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/master/paymentSource')
      setPaymentSourceList(responseOptions.data)
    } catch(e){
      console.log(e)
    }
    setLazyLoad(false)
  }

  useEffect(()=>{
    getPaymentMethod()
  }, [getPaymentMethod])

  // const handleDateChange = (date) => {
  //   setBalanceData((prevData) => ({
  //     ...prevData,
  //     date: `${date.year}-${date.month}-${date.day}`,
  //   }));
  // };

  const isValid = () => {
      const errors = {};
      if(!balanceData.type) errors.type = "Please select cash source."
      if(!balanceData.date) errors.date = "Please select date."
      if(balanceData.amount <= 0) errors.amount = "Enter valid amount."

      setErrorMessages(errors);
      return errors;    
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errors = isValid()
        if(Object.keys(errors).length !== 0){
          return
    }

    const result = await addBalance(balanceData)
    console.log(result)
    setBalanceData({
      date: '',
      amount: 0,
      type: ""
    })
    refresh("done")
    onClose()
  }
  return (
    <>
      <Button onPress={onOpen} className="bg-green-600 text-slate-200" size='sm'><MdAdd className="h-6 w-6"/> Balance</Button>

        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          placement="top-center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add Remaining Balance</ModalHeader>
                <ModalBody>
                  <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <Select 
                    label="Cash Source"
                    placeholder="Enter cash source"
                    isInvalid={errorMessages.type? true : false}
                    color={errorMessages.type ? "danger" : ""}
                    errorMessage={errorMessages.type}
                    value={balanceData.type}
                    onChange={(e) => setBalanceData((prevData)=> ({...prevData, type: e.target.value}))}
                    >
                      {paymentSourceList.map((item) => (
                        <SelectItem key={item.name}>{item.name}</SelectItem>  
                      ))}
                    </Select>
                    <Select 
                    label="Date"
                    isInvalid={errorMessages.date? true : false}
                    color={errorMessages.date ? "danger" : ""}
                    errorMessage={errorMessages.date}
                    value={balanceData.date}
                    onChange={(e) => setBalanceData((prevData)=> ({...prevData, date: e.target.value}))}
                    >
                      <SelectItem key={date}>{date}</SelectItem>  
                      {dateOptions.map((row) => (
                        <SelectItem key={row}>{row}</SelectItem>  
                      ))}
                    </Select>
                    {/* <DatePicker onChange={handleDateChange} clearable showMonthAndYearPickers label="Date" variant="bordered" /> */}
                    <Input
                      topContent={<TbCurrencyPeso/>}
                      autoFocus
                      type="number"
                      label="Amount"
                      placeholder="Enter amount"
                      variant="bordered"
                      isInvalid={errorMessages.amount? true : false}
                      color={errorMessages.amount ? "danger" : ""}
                      errorMessage={errorMessages.amount}
                      value={balanceData.amount}
                      onChange={(e) => setBalanceData((prevData)=> ({...prevData, amount: e.target.value}))}
                    />
                    <div className="flex justify-end gap-5 py-3">
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit" isLoading={loadBalance}>
                        Submit
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
    </>
  );
}