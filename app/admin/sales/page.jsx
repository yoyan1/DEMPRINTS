"use client";
import React, { useEffect, useState, useMemo } from 'react'
import TransactionTable from '@/app/components/adminComponents/sales/TransactionTable'
import {useSalesStore} from '@/app/stores/transactionStore'
import AdminLayout from '../layout/layout'
import { getDateAndTime } from '@/app/composables/dateAndTime'
import { formatDate } from '@/app/composables/formateDateAndTime';
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
import { DateRangePicker, Select, SelectItem } from '@nextui-org/react';
import { IoMdCloseCircle } from "react-icons/io";
import {parseDate} from "@internationalized/date";
import { decodeToken } from '@/app/utils/decodeToken'
import { paymentStore } from '../../stores/paymentStore';
import { formattedNumber } from '@/app/composables/CurrencyFormat'


export default function Sales() {
  const {columns, itemOptions, typeOptions, transactions, loading, fetchTransactions } = useSalesStore();
  const {options, fetchPayment} = paymentStore()
  const [selectedKey, setSelectedKey] = useState("today")
  const {date} = getDateAndTime()
  const [user, setUser] = useState({})
  const [value, setValue] = React.useState({
    start: parseDate(date),
    end: parseDate(date),
  });

  useEffect(() =>{
    fetchPayment()
    fetchTransactions()
    const loadUser = async () =>{

      const token = localStorage.getItem("token");
  
      if (token) {
        const decode = await decodeToken(token)
        setUser(decode);
      }
    }
    loadUser()
  }, [fetchTransactions])

  const isDateInRange = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
  };
  
  const getTotalSalesInRange = (transactions, selectedKey, startDate, endDate, options) => {
    return transactions.reduce(
      (acc, item) => {
        if(selectedKey === 'today'){
          if(item.date === date) {
            acc.totalSalesToday += item.amount_paid;
            options.forEach((row) => {
              if(row.name === item.payment_options)
              acc[row.name] = (acc[row.name] || 0) + item.amount_paid;
            });
          }

        } else if(selectedKey === 'date range'){
          const itemDate = new Date(item.date); 
          if (isDateInRange(itemDate, startDate, endDate)) {
            acc.totalSalesInRange += item.amount_paid;
            options.forEach((row) => {
              if(row.name === item.payment_options)
              acc[row.name] = (acc[row.name] || 0) + item.amount_paid;
            });
          }
        } else{
          acc.totalSales += item.amount_paid;
          options.forEach((row) => {
            if(row.name === item.payment_options)
            acc[row.name] = (acc[row.name] || 0) + item.amount_paid;
          });
        }
        return acc;
      },
      { totalSalesToday: 0, totalSalesInRange: 0, totalSales: 0 }
    );
  };
  
  

  const filteredTransactions = useMemo(() => {
    const start = new Date(value.start);
    const end = new Date(value.end);
  
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if(selectedKey === "today"){
        return transaction.date === date;
      } else if(selectedKey === "date range"){
        return transactionDate >= start && transactionDate <= end;
      } else{
        return transaction
      }
    });
  }, [transactions, selectedKey, value.start, value.end]);
  

  const totals = useMemo(() => {
    const start = new Date(value.start);
    const end = new Date(value.end);
    return getTotalSalesInRange(transactions, selectedKey, start, end, options);
  }, [transactions, selectedKey, value.start, value.end, options]);
  
  const { totalSalesToday, totalSalesInRange, totalSales, ...salesByOptions } = totals;
  


  return (
    <AdminLayout>
        <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6">
          <div className='flex flex-col gap-2'>
            <div className=" rounded-xl bg-white dark:bg-gray-900 p-5">
              <div className='flex gap-5'>
                <div>
                  <h1 className="font-bold text-2xl text-blue-950 dark:text-blue-600">Sales Overview</h1>
                  <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
                  <Select
                  label="Filter Sales"
                  defaultSelectedKeys={[selectedKey]}
                  value={selectedKey}
                  onChange={(e)=> setSelectedKey(e.target.value)}
                  >
                    <SelectItem key="today">Today</SelectItem>
                    <SelectItem key="date range">Date Range</SelectItem>
                    <SelectItem key="all">All</SelectItem>
                  </Select>
                </div>
                <div className='w-full'>
                  <div className='p-3 shadow-sm rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 flex flex-col gap-2 w-full'>
                    <div className='text-sm text-blue-900 dark:text-blue-300 rounded-xl bg-white dark:bg-gray-800 p-2 flex justify-between items-end'>
                      {selectedKey === "date range"? (
                        <div className='mt-2'>
                          <DateRangePicker
                            value={value}
                            onChange={setValue}
                            color='primary'
                            size='sm'
                            startContent={
                              <div>
                                <IoMdCloseCircle 
                                className='cursor-pointer hover:text-red-400' 
                                onClick={()=>(setValue({
                                    start: parseDate(date),
                                    end: parseDate(date),
                                  })
                                )}
                            /></div>
                            }
                          />
                      </div>
                      ) : null}
                      <span>{formatDate(value.start)} - {formatDate(value.end)}</span>
                    </div>
                      <div className='flex items-start gap-5'>
                        <span className='font-sans font-semibold text-slate-100'>Sales: </span>
                        {selectedKey === 'today'? (
                          <span className='text-slate-200 text-md font-bold'>₱{ formattedNumber(totalSalesToday) }</span>
                        ) : selectedKey === 'date range'? (
                          <span className='text-slate-200 text-md font-bold'>₱{ formattedNumber(totalSalesInRange) }</span>
                        ) : (
                          <span className='text-slate-200 text-md font-bold'>₱{ formattedNumber(totalSales) }</span>
                        )}
                        <div className='flex items-start gap-5 bg-white dark:bg-gray-800 w-full'>
                          {options.length > 0? (
                            <div className='border border-blue-600 p-3 rounded-md w-full'>
                              {/* <span>Payment Method Breakdown</span> */}
                              <div className='grid grid-cols-5 gap-4'>
                                  {options.map((transactionOptions) => (
                                    salesByOptions[transactionOptions.name] > 0? (
                                      <div className='flex flex-col gap-1 items-start'>
                                        <span className='font-sans text-slate-700 dark:text-slate-200 text-sm flex items-center'><div className="w-2 h-2 bg-blue-400 rounded-full"></div> {transactionOptions.name}: </span>                 
                                        <span className='font-sans text-slate-700 dark:text-slate-200 text-sm'> ₱{salesByOptions[transactionOptions.name] ? formattedNumber(salesByOptions[transactionOptions.name]) : 0}</span>                 
                                      </div>
                                    ) : null
                                  ))}
                              </div>
                            </div>
                          ): null}

                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white dark:bg-gray-900 rounded-lg p-5'>
              <TransactionTable columns={columns} transactions={filteredTransactions} itemOptions={itemOptions} typeOptions={typeOptions} loading={loading} isMaximized={false} user={user} refresh={fetchTransactions}/>
            </div>
          </div>
        </main>
    </AdminLayout>
  )
}
