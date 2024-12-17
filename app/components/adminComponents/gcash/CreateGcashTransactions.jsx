"use client"
import React, { useEffect, useState, useMemo } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Select, SelectItem, DatePicker} from "@nextui-org/react";
// import {MailIcon} from './MailIcon.jsx';
// import {LockIcon} from './LockIcon.jsx';
import { MdAdd } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import axios from "axios";
import { useGcashTransactionStore } from "../../../stores/gcashTransactionStore";
import { productStore } from "@/app/stores/productStore";
import { getDateAndTime } from "../../../composables/dateAndTime";

export default function CreateGcashTransaction({refresh}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {products, loadProduct, fetchProducts} = productStore()
  const { createGcashTransaction, loadTransaction } = useGcashTransactionStore()
  const [ transactionData, setTransactionData ] = useState({
    date: '', 
    time: '', 
    particulars: '',
    code: '',
    debit: 0,
    cash_source: '',
    amount: '',
    credit: 0
  })


  useEffect(()=>{
    fetchProducts()
  }, [fetchProducts])

  // const handleDateChange = (date) => {
  //   setBalanceData((prevData) => ({
  //     ...prevData,
  //     date: `${date.year}-${date.month}-${date.day}`,
  //   }));
  // };

  const filteredProducts = useMemo(()=> {
    return products.filter((row) => row.category.toLowerCase().includes('gcash'))
  }, [products])

  const onSubmit = async (e) => {
    e.preventDefault()
    const {date, time} = getDateAndTime()
    const findProduct = filteredProducts.find((row) => row.item_code === transactionData.code)
    if(!findProduct) {
      return
    }
    const newData = {
      ...transactionData,
      date: date, 
      time: time, 
      particulars: findProduct.name,
      debit: findProduct.name.toLowerCase().includes('cash in')? transactionData.amount : 0,
      cash_source: findProduct.name.toLowerCase().includes('cash in')? 'gcash' : 'cash in box',
      credit: findProduct.name.toLowerCase().includes('cash out')? transactionData.amount : 0
    }

    const result = await createGcashTransaction(newData)
    console.log(result)
    setTransactionData({
      date: '', 
      time: '', 
      particulars: '',
      code: '',
      debit: 0,
      cash_source: '',
      amount: '',
      credit: 0
    })
    refresh("done")
    onClose()
  }
  return (
    <>
      <Button onPress={onOpen} className="bg-green-600 text-slate-200 mb-3" size='sm'><MdAdd className="h-6 w-6"/> Gcash</Button>

        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          placement="top-center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">Gcash Transaction</ModalHeader>
                <ModalBody>
                  <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <Select 
                    label="Select Product"
                    isLoading={loadProduct}
                    value={transactionData.code}
                    onChange={(e) => setTransactionData((prevData)=> ({...prevData, code: e.target.value}))}
                    >
                      {filteredProducts.map((item) => (
                        <SelectItem key={item.item_code}>{item.name} - {item.variants} {item.item_code}</SelectItem>  
                      ))}
                    </Select>
                    {/* <Select 
                    label="Date"
                    value={balanceData.date}
                    onChange={(e) => setBalanceData((prevData)=> ({...prevData, date: e.target.value}))}
                    >
                      <SelectItem key={date}>{date}</SelectItem>  
                      {dateOptions.map((row) => (
                        <SelectItem key={row}>{row}</SelectItem>  
                      ))}
                    </Select> */}
                    {/* <DatePicker onChange={handleDateChange} clearable showMonthAndYearPickers label="Date" variant="bordered" /> */}
                    <Input
                      topContent={<TbCurrencyPeso/>}
                      autoFocus
                      type="number"
                      label="Amount"
                      placeholder="Enter amount"
                      variant="bordered"
                      value={transactionData.amount}
                      onChange={(e) => setTransactionData((prevData)=> ({...prevData, amount: e.target.value}))}
                    />
                    <div className="flex justify-end gap-5 py-3">
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit" isLoading={loadTransaction}>
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