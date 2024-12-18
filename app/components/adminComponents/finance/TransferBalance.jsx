"use client"
import React, { useEffect, useMemo, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Select, SelectItem, DatePicker} from "@nextui-org/react";
// import {MailIcon} from './MailIcon.jsx';
// import {LockIcon} from './LockIcon.jsx';
import { TbCurrencyPeso } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from "axios";
import { useBalanceStore } from "../../../stores/balanceStore";
import { getDateAndTime } from "../../../composables/dateAndTime";
import { formattedNumber } from "@/app/composables/CurrencyFormat"

export default function TransferBalance({dateOptions, financeData, refresh}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [paymentSourceList, setPaymentSourceList] = useState([])
  const {  addBalance, loadBalance } = useBalanceStore()
  const {date, time} = getDateAndTime()
  const [ balanceData, setBalanceData ] = useState({
    date: date,
    from: '',
    to: '',
    amount: 0,
    type: ""
  })
  const [errorMessages, setErrorMessages] = useState({})

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

  function normalizeName(name) {
    return name
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/\s+/g, '_')
      .replace(/-+/g, '_')
      .toLowerCase();
  }

  const filterFinance = useMemo(() => {
    const findCashSource = financeData.find((row) => row.date === balanceData.date)
    return findCashSource

  }, [balanceData.date, financeData])

  console.log(filterFinance);
  
  const isValid = () => {
    const errors = {};
    if(!balanceData.from) errors.from = "Please select."
    if(!balanceData.to) errors.to = "Please select."
    if(!balanceData.date) errors.date = "Please select date."
    if(balanceData.amount <= 0) errors.amount = "Enter valid amount."
    if(financeData && balanceData.from){
      if(balanceData.amount > filterFinance.prev_source_balance[normalizeName(balanceData.from)]) errors.amount = "The amount should not exceed the remaining balance."
    }

    setErrorMessages(errors);
    return errors;    
  }

const onSubmit = async (e) => {
    e.preventDefault()
    const errors = isValid()
        if(Object.keys(errors).length !== 0){
          return
    }
    // const result = await addBalance(balanceData)
    // console.log(result)
    // setBalanceData({
    //   date: '',
    //   amount: 0,
    //   type: ""
    // })
    // refresh("done")
    // onClose()
  }
  return (
    <>
      <Button onPress={onOpen} className="bg-green-600 text-slate-200" size='sm'><FaMoneyBillTransfer className="h-6 w-6"/> Transfer</Button>

        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          placement="top-center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">Transfer Balance</ModalHeader>
                <ModalBody>
                  <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    {filterFinance && balanceData.from? (
                        <div>
                            {balanceData.from} remaining balance as of {balanceData.date}<br></br>
                            <span className="text-gray-600 text-sm italic">
                              ₱ {formattedNumber(filterFinance.prev_source_balance[normalizeName(balanceData.from)])}
                            </span>
                        </div>
                    ): null}
                    <div className="flex gap-5 items-center">
                        <Select 
                        label="From"
                        placeholder="Select cash source"
                        isInvalid={errorMessages.from? true : false}
                        color={errorMessages.from ? "danger" : ""}
                        errorMessage={errorMessages.from}
                        value={balanceData.from}
                        onChange={(e) => setBalanceData((prevData)=> ({...prevData, from: e.target.value}))}
                        >
                        {paymentSourceList.map((item) => (
                            <SelectItem key={item.name}>{item.name}</SelectItem>  
                        ))}
                        </Select>
                        <FaLongArrowAltRight className="h-8 w-8"/>
                        <Select 
                        label="To"
                        placeholder="Select cash source"
                        isInvalid={errorMessages.to? true : false}
                        color={errorMessages.to ? "danger" : ""}
                        errorMessage={errorMessages.to}
                        value={balanceData.to}
                        onChange={(e) => setBalanceData((prevData)=> ({...prevData, to: e.target.value}))}
                        >
                        {paymentSourceList.map((item) => (
                            <SelectItem key={item.name}>{item.name}</SelectItem>  
                        ))}
                        </Select>
                    </div>
                    <Select 
                    label="Date"
                    defaultSelectedKeys={[balanceData.date]}
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