"use client";
import React, { useEffect } from 'react'
import TransactionTable from '@/app/components/adminComponents/sales/TransactionTable'
import {useSalesStore} from '@/app/stores/transactionStore'
import AdminLayout from '../layout/layout'
import { getDateAndTime } from '@/app/composables/dateAndTime'
import { formatDate } from '@/app/composables/formateDateAndTime';
import { BiLineChart, BiLineChartDown } from "react-icons/bi";

export default function Sales() {
  const {columns, itemOptions, typeOptions, transactions, loading, fetchTransactions } = useSalesStore();
  const {date} = getDateAndTime()
  useEffect(() =>{
    fetchTransactions()
  }, [fetchTransactions])

  const getDateYesterday = () =>{
    let dateNow = new Date(date);
    dateNow.setDate(dateNow.getDate());

    let month = dateNow.getMonth() + 1;  
    let day = dateNow.getDate();
    let year = dateNow.getFullYear();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    let formattedDate = `${year}-${day}-${month}`;
    return formattedDate
  }
  const getTotalSalesDaily = () =>{
    let totalSales = 0
    let totalYesterday = 0
    transactions.map((item) =>{
      if(item.date === date){
        totalSales = totalSales + item.total
      }
       else if(item.date === getDateYesterday()){
        totalYesterday = totalYesterday + item.total
       }
    })
    
    return {totalSales, totalYesterday}
  }

  const {totalSales, totalYesterday} = getTotalSalesDaily()
  return (
    <AdminLayout>
        <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6">
          <div className='flex flex-col gap-2'>
            <div className="flex justify-between items-start rounded-lg bg-white dark:bg-black p-5">
              <div className='flex gap-2'>
                <div>
                  <h1 className="font-bold text-2xl">Sales Overview</h1>
                  <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
                </div>
                <div className='flex items-end gap-5 border p-3 shadow-sm rounded-lg border-blue-600 '>
                  <div className='flex flex-col'>
                    <span>Today's sales </span>
                    <span className='text-slate-400 text-sm'>{ totalSales }</span>
                  </div>
                  { totalSales > totalYesterday? (
                    <BiLineChart className='text-green-400 h-8 w-8'/>
                  ): (
                    <BiLineChartDown className='text-red-400 h-8 w-8 '/>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm py-1 px-2 border rounded-full">{formatDate(date)}</span>
              </div>
            </div>
            <div className='bg-white dark:bg-black rounded-lg p-5'>
              <TransactionTable columns={columns} transactions={transactions} itemOptions={itemOptions} typeOptions={typeOptions} loading={loading} isMaximized={false} refresh={fetchTransactions}/>
            </div>
          </div>
        </main>
    </AdminLayout>
  )
}
