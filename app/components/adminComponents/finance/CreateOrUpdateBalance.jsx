"use client"
import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Select, SelectItem} from "@nextui-org/react";
// import {MailIcon} from './MailIcon.jsx';
// import {LockIcon} from './LockIcon.jsx';
import { MdAdd } from "react-icons/md";
import { TbCurrencyPeso } from "react-icons/tb";
import axios from "axios";
import { useBalanceStore } from "../../../stores/balanceStore";

export default function CreateOrUpdate() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [paymentSourceList, setPaymentSourceList] = useState([])
  const {  addBalance, loadBalance } = useBalanceStore()
  const [ balanceData, setBalanceData ] = useState({
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

  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await addBalance(balanceData)
    console.log(result)
    setBalanceData({
      amount: 0,
      type: ""
    })
    // done("done")
  }
  return (
    <>
      <Button onPress={onOpen} color="primary"><MdAdd className="h-6 w-6"/> Balance</Button>

        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Add Remaining Balance</ModalHeader>
                <ModalBody>
                  <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <Select 
                    label="Cash Source"
                    placeholder="Enter cash source"
                    isLoading={lazyLoad}
                    value={balanceData.type}
                    onChange={(e) => setBalanceData((prevData)=> ({...prevData, type: e.target.value}))}
                    >
                      {paymentSourceList.map((item) => (
                        <SelectItem key={item.name}>{item.name}</SelectItem>  
                      ))}
                    </Select>
                    <Input
                      topContent={<TbCurrencyPeso/>}
                      autoFocus
                      type="number"
                      label="Amount"
                      placeholder="Enter amount"
                      variant="bordered"
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