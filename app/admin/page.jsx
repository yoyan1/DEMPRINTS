"use client"
import React, { useEffect, useState } from 'react'
import AdminLayout from './layout/layout'
import Revenue from '@/app/components/adminComponents/dashboad/Revenue'
import ExpensesAnalysis from '@/app/components/adminComponents/dashboad/ExpensesAnalysis'
import ExpensesSummary from '@/app/components/adminComponents/dashboad/ExpensesSummary'
import SalesSourceSummary from '@/app/components/adminComponents/dashboad/SalesSourceSummary'
import SalesRepresentative from '@/app/components/adminComponents/dashboad/SalesRepresentative';
import { useSalesStore } from '@/app/stores/transactionStore'
import { useExpensesStore } from '@/app/stores/ExpensesStore'


export default function Dashboard() {
  const {transactions,fetchTransactions } = useSalesStore()
  const {expenses, fetchExpenses } = useExpensesStore()

  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    const load = async () =>{
      await fetchTransactions()
      await fetchExpenses()
      setLoading(false)
    }  
    load()
  }, [])

  return (
    <AdminLayout>
      <main className="flex flex-col items-center gap-4 m-4 lg:gap-6 lg:m-6">
        <div className='w-full'>
          <h1 className='text-xl'>Dashboard</h1>
          <span className='text-default-400 text-sm'>An any way to manage sales with care and precision</span>
        </div>
        {!loading? (
          <div className="flex flex-col md:flex-row lg:flex-row gap-5">
            <div className="flex flex-col gap-5">
              <div className='flex flex-col md:flex-row lg:flex-row gap-5'>
                <div className='flex-1'>
                  <Revenue transactions={transactions} expenses={expenses}/>
                </div>
                <div className='flex-1'>
                  <ExpensesAnalysis/>
                </div>
              </div>
              <div>
                <SalesRepresentative/>
              </div>
            </div>
            <div className='flex flex-col gap-5'>
                <ExpensesSummary/>
                <SalesSourceSummary/>
            </div>
          </div>
        ): null}
      </main>
    </AdminLayout>
  )
}
