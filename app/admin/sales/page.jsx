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
import {parseDate, getLocalTimeZone} from "@internationalized/date";

const getDateYesterday = (currentDate) => {
  let dateNow = new Date(currentDate); 
  dateNow.setDate(dateNow.getDate() - 1); 

  let month = dateNow.getMonth() + 1;  
  let day = dateNow.getDate();
  let year = dateNow.getFullYear();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  return `${year}-${day}-${month}`;
};

const getTotalSalesDaily = (transactions, dateNow) => {
  const dateYesterday = getDateYesterday(dateNow);
  const dateSelected = dateNow
  return transactions.reduce(
    (acc, item) => {
      if (item.date === dateSelected) {
        acc.totalSales += item.total;
      } else if (item.date === dateYesterday) {
        acc.totalYesterday += item.total;
      }
      return acc;
    },
    { totalSales: 0, totalYesterday: 0 } 
  );
};

export default function Sales() {
  const {columns, itemOptions, typeOptions, transactions, loading, fetchTransactions } = useSalesStore();
  const {date} = getDateAndTime()
  const [value, setValue] = React.useState({
    start: parseDate(date),
    end: parseDate(date),
  });

  useEffect(() =>{
    fetchTransactions()
  }, [fetchTransactions])

  const filteredTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const start = new Date(value.start);
        const end = new Date(value.end);
        if(start === date){
          return transaction
        } else{
          return transactionDate >= start && transactionDate <= end;

        }

      }),
    [transactions, value.start, value.end]
  );

  const { totalSales, totalYesterday } = useMemo(
    () => getTotalSalesDaily(transactions, date),
    [transactions, date] 
  );
  


  return (
    <AdminLayout>
        <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6">
          <div className='flex flex-col gap-2'>
            <div className="flex justify-between items-start rounded-lg bg-white dark:bg-gray-900 p-5">
              <div className='flex gap-5'>
                <div>
                  <h1 className="font-bold text-2xl">Sales Overview</h1>
                  <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
                </div>
                <div className=' border-2 p-3 shadow-sm rounded-xl border-blue-600 '>
                    <span className='text-sm text-slate-400'>{formatDate(date)}</span>
                    <div className='flex items-end gap-5'>
                      <span className='font-sans font-semibold'>Sales: </span>
                      <span className='text-slate-400 text-sm'>{ Math.round(totalSales) }</span>
                      { totalSales > totalYesterday? (
                        <BiLineChart className='text-green-600 h-5 w-5'/>
                      ): (
                        <BiLineChartDown className='text-red-600 h-5 w-5 '/>
                      )}
                    </div>
                </div>
              </div>
              <div>
                <DateRangePicker
                  label="Date range"
                  value={value}
                  onChange={setValue}
                  startContent={
                    <div>
                      <IoMdCloseCircle 
                      className='cursor-pointer hover:text-red-400' 
                      // onClick={()=>(setValue({
                      //     start: parseDate('00/00/0000'),
                      //     end: parseDate('00/00/0000'),
                      //   })
                      // )}
                  /></div>
                  }
                />
              </div>
            </div>
            <div className='bg-white dark:bg-gray-900 rounded-lg p-5'>
              <TransactionTable columns={columns} transactions={filteredTransactions} itemOptions={itemOptions} typeOptions={typeOptions} loading={loading} isMaximized={false} refresh={fetchTransactions}/>
            </div>
          </div>
        </main>
    </AdminLayout>
  )
}
