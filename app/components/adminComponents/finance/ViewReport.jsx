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
                    {paymentSourceList.map((row) => <TableColumn>{row.name}</TableColumn>)}
                    <TableColumn>Beggining Balance</TableColumn>
                    {options.map((row) => <TableColumn className='bg-primary text-white w-60'>{row.name} PAYMENT</TableColumn>)}
                    <TableColumn className='bg-primary text-white w-60'>TOTAL SALES</TableColumn>
                    {paymentSourceList.map((row) => <TableColumn className='bg-warning text-white w-60'>{row.name}</TableColumn>)}
                    <TableColumn className='bg-warning text-white w-60'>TOTAL EXPENSES</TableColumn>
                    <TableColumn>NET</TableColumn>
                    {paymentSourceList.map((row) => <TableColumn className='bg-blue-300 '>{row.name}</TableColumn>)}
                    <TableColumn>End day Balance</TableColumn>
                  </TableHeader>
                  <TableBody isLoading={loading} loadingContent={<Spinner label="Loading..." />}>
                        {sortedFinanceDescending.map((data) => (
                            <TableRow key={data.date}>
                                <TableCell>{formatDate(data.date)}</TableCell>
                                {paymentSourceList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell>₱ {formattedNumber(data.prev_source_balance[newName])}</TableCell>
                                })}
                                <TableCell>₱ {formattedNumber(data.prevBalance)}</TableCell>
                                {options.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell className='bg-primary text-white'>₱ {formattedNumber(data.sales_source[newName])}</TableCell>
                                })}
                                <TableCell className='bg-primary text-white'>₱ {formattedNumber(data.totalSales)}</TableCell>
                                {paymentSourceList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell className='bg-warning'>₱ {formattedNumber(data.payment_source[newName])}</TableCell>
                                })}
                                <TableCell className='bg-warning'>₱ {formattedNumber(data.totalExpenses)}</TableCell>
                                <TableCell>₱ {formattedNumber(data.net)}</TableCell>
                                {paymentSourceList.map((row) => {
                                  const newName = row.name.replace(/([a-z])([A-Z])/g, '$1_$2') .replace(/\s+/g, '_').replace(/-+/g, '_').toLowerCase();
                                  return <TableCell className='bg-blue-300'>₱ {formattedNumber(data.end_source_balance[newName])}</TableCell>
                                })}
                                <TableCell>₱ {formattedNumber(data.endBalance)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    
                </Table>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}