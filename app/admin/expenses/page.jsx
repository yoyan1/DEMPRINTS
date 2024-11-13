"use client"
import React, { useEffect } from 'react'
import AdminLayout from '../layout/layout'
import {useSalesStore} from '@/app/stores/transactionStore'
import ExpensesTable from '@/app/components/adminComponents/expenses/ExpensesTable'

export default function page() {
  const {columns, itemOptions, typeOptions, transactions, loading, fetchTransactions } = useSalesStore();

  useEffect(()=>{
    fetchTransactions()
  }, [fetchTransactions])
  return (
    <AdminLayout>
      <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6">
        <div className='flex flex-col gap-2'>
          <div className="flex justify-between items-start rounded-lg bg-white dark:bg-gray-900 p-5">
            <div>
              <h1 className="font-bold text-2xl">Expenses Overview</h1>
              <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
            </div>
            <div>
              <span className="text-sm py-1 px-2 border rounded-full">October 16, 2024</span>
            </div>
          </div>
          <div className='bg-white dark:bg-gray-900 p-5 rounded-lg'>
            <ExpensesTable columns={columns} transactions={transactions} itemOptions={itemOptions} typeOptions={typeOptions} loading={loading} isMaximized={false} refresh={fetchTransactions}/>
          </div>
        </div>
      </main>
  </AdminLayout>
  )
}
