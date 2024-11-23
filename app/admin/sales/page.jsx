"use client";
import React, { useEffect, useState, useMemo } from 'react'
import TransactionTable from '@/app/components/adminComponents/sales/TransactionTable'
import {useSalesStore} from '@/app/stores/transactionStore'
import AdminLayout from '../layout/layout'
import { getDateAndTime } from '@/app/composables/dateAndTime'
import { formatDate } from '@/app/composables/formateDateAndTime';
import { BiLineChart, BiLineChartDown } from "react-icons/bi";
import { DateRangePicker } from '@nextui-org/react';
import { IoMdCloseCircle } from "react-icons/io";
import {parseDate} from "@internationalized/date";
import { decodeToken } from '@/app/utils/decodeToken'
import { paymentStore } from '../../stores/paymentStore';


export default function Sales() {
  const {columns, itemOptions, typeOptions, transactions, loading, fetchTransactions } = useSalesStore();
  const {options, fetchPayment} = paymentStore()
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
  
  const getTotalSalesInRange = (transactions, startDate, endDate, options) => {
    return transactions.reduce(
      (acc, item) => {
        const itemDate = new Date(item.date); 
        if (isDateInRange(itemDate, startDate, endDate)) {
          acc.totalSales += item.total_amount;
          options.forEach((row) => {
            if(row.name === item.payment_options)
            acc[row.name] = (acc[row.name] || 0) + item.total_amount;
          });
        }
        return acc;
      },
      { totalSales: 0 }
    );
  };
  
  

  const filteredTransactions = useMemo(() => {
    const start = new Date(value.start);
    const end = new Date(value.end);
  
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= start && transactionDate <= end;
    });
  }, [transactions, value.start, value.end]);
  

  const totals = useMemo(() => {
    const start = new Date(value.start);
    const end = new Date(value.end);
    return getTotalSalesInRange(transactions, start, end, options);
  }, [transactions, value.start, value.end, options]);
  
  const { totalSales, ...salesByOptions } = totals;
  


  return (
    <AdminLayout>
        <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6">
          <div className='flex flex-col gap-2'>
            <div className=" rounded-xl bg-white dark:bg-gray-900 p-5">
              <div className='flex justify-between gap-5'>
                <div>
                  <h1 className="font-bold text-2xl text-blue-950 dark:text-blue-600">Sales Overview</h1>
                  <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
                  <div className='mt-2'>
                    <DateRangePicker
                      value={value}
                      onChange={setValue}
                      color='primary'
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
                </div>
                <div className='flex gap-5'>
                  <div className='p-3 shadow-sm rounded-xl bg-gradient-to-r from-blue-900 to-blue-600 flex flex-col gap-2'>
                    <span className='text-sm text-blue-900 rounded-xl bg-white p-2'>{formatDate(value.start)} - {formatDate(value.end)}</span>
                      <div className='flex items-end gap-5'>
                        <span className='font-sans font-semibold text-slate-100'>Sales: </span>
                        <span className='text-slate-200 text-md font-bold'>{ Math.round(totalSales) }</span>
                      </div>
                  </div>
                  <div className='flex items-start gap-5'>
                    {options.length > 0? (
                      <div className='border border-blue-600 p-3 rounded-md'>
                        <span>Payment Method Breakdown</span>
                        <div className='grid grid-cols-3 gap-4'>
                            {options.map((transactionOptions) => (
                              salesByOptions[transactionOptions.name] > 0? (
                                <div className='flex gap-1 items-center'>
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <span className='font-sans text-slate-700 dark:text-slate-200 text-sm'> {transactionOptions.name}: ₱{salesByOptions[transactionOptions.name] ? salesByOptions[transactionOptions.name] : 0}</span>                 
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
            <div className='bg-white dark:bg-gray-900 rounded-lg p-5'>
              <TransactionTable columns={columns} transactions={filteredTransactions} itemOptions={itemOptions} typeOptions={typeOptions} loading={loading} isMaximized={false} user={user} refresh={fetchTransactions}/>
            </div>
          </div>
        </main>
    </AdminLayout>
  )
}
