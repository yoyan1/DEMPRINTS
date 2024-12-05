"use client"
import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner} from "@nextui-org/react";
import { formatDate, formatTime } from "@/app/composables/formateDateAndTime";
import { formattedNumber } from "@/app/composables/CurrencyFormat"
import CreateOrUpdate from "./CreateOrUpdateBalance";
import { FaSync } from "react-icons/fa";

export default function App({financeData, loading, paymentSourceList, options, done}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const sortedFinanceDescending = financeData.sort((a, b) => new Date(b.date) - new Date(a.date))
  const sortedPaymentSourceList = paymentSourceList.sort((a, b) => a.name - b.name)
  const sortedOptionsList = options.sort((a, b) => a.name - b.name)
  return (
    <>
      <Button onPress={onOpen} color="primary" size='sm'>View all</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='full' scrollBehavior='inside'>
        <ModalContent >
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Report Summary</ModalHeader>
              <ModalBody>
              <div className="py-3 flex justify-between">
                <CreateOrUpdate />
                <div className="flex gap-5">
                  <Button isIconOnly color="success" onPress={done} size='sm'><FaSync className="w-4 h-4 text-white"/></Button>
                </div>
              </div>
              <div className='overflow-x-scroll max-w-screen'>
                <Table removeWrapper aria-label="Example static collection table">
                  <TableHeader 
                      classNames={{
                          th: "bg-blue-300 text-dark"
                      }}>
                    <TableColumn>DATE</TableColumn>
                    {sortedPaymentSourceList.map((row) => <TableColumn>{row.name}</TableColumn>)}
                    <TableColumn>Beggining Balance</TableColumn>
                    {sortedOptionsList.map((row) => <TableColumn className='bg-primary text-white w-60'>{row.name} PAYMENT</TableColumn>)}
                    <TableColumn className='bg-primary text-white w-60'>TOTAL SALES</TableColumn>
                    {sortedPaymentSourceList.map((row) => <TableColumn className='bg-warning text-white w-60'>{row.name}</TableColumn>)}
                    <TableColumn className='bg-warning text-white w-60'>TOTAL EXPENSES</TableColumn>
                    <TableColumn>NET</TableColumn>
                    {sortedPaymentSourceList.map((row) => <TableColumn className='bg-blue-300 '>{row.name}</TableColumn>)}
                    <TableColumn>End day Balance</TableColumn>
                  </TableHeader>
                  <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..." />}>
                        {sortedFinanceDescending.map((data) => (
                            <TableRow key={data.date}>
                                <TableCell><div className="w-[80px]">{formatDate(data.date)}</div></TableCell>
                                {sortedPaymentSourceList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell><div className="w-[80px]">₱ {formattedNumber(data.prev_source_balance[newName])}</div></TableCell>
                                })}
                                <TableCell>₱ {formattedNumber(data.prevBalance)}</TableCell>
                                {sortedOptionsList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell className='bg-primary text-white'><div className="w-[80px]">₱ {formattedNumber(data.sales_source[newName])}</div></TableCell>
                                })}
                                <TableCell className='bg-primary text-white'><div className="w-[80px]">₱ {formattedNumber(data.totalSales)}</div></TableCell>
                                {sortedPaymentSourceList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell className='bg-warning'><div className="w-[80px]">₱ {formattedNumber(data.payment_source[newName])}</div></TableCell>
                                })}
                                <TableCell className='bg-warning'>₱ {formattedNumber(data.totalExpenses)}</TableCell>
                                <TableCell>₱ {formattedNumber(data.net)}</TableCell>
                                {sortedPaymentSourceList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell className='bg-blue-300'><div className="w-[80px]">₱ {formattedNumber(data.end_source_balance[newName])}</div></TableCell>
                                })}
                                <TableCell><div className="w-[150px]">₱ {formattedNumber(data.endBalance)}</div></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
              </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}