"use client";
import React from 'react'
import AdminLayout from './layout/layout'
import Revenue from '@/app/components/adminComponents/dashboad/Revenue'
import ExpensesAnalysis from '@/app/components/adminComponents/dashboad/ExpensesAnalysis'
import ExpensesSummary from '@/app/components/adminComponents/dashboad/ExpensesSummary'
import SalesSourceSummary from '@/app/components/adminComponents/dashboad/SalesSourceSummary'
// import SalesSource from '@/app/components/adminComponents/dashboad/SalesSource';
// import SalesCategory from '@/app/components/adminComponents/dashboad/SalesCategory';
import SalesRepresentative from '@/app/components/adminComponents/dashboad/SalesRepresentative';
// import Analytics from '@/app/components/adminComponents/dashboad/Analytics'
// import SummaryReport from '@/app/components/adminComponents/dashboad/SummaryReport'
// import { FaArrowUpShortWide } from "react-icons/fa6";

export default function Dashboard() {
  return (
    <AdminLayout>
      <main className="flex flex-1 flex-col gap-4 m-4 lg:gap-6 lg:m-6 max-h-[85vh] overflow-y-scroll">
        <div>
          <h1 className='text-xl'>Dashboard</h1>
          <span className='text-default-400 text-sm'>An any way to manage sales with care and precision</span>
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-5">
            <div className='flex gap-5'>
              <div className=' bg-white p-5 rounded-md shadow-md'>
                <Revenue />
              </div>
              <div className=' bg-white p-5 rounded-md shadow-md'>
                <ExpensesAnalysis/>
              </div>
            </div>
            <div>
              <SalesRepresentative/>
            </div>
          </div>
          <div className='flex flex-col gap-5'>
            <div className=' bg-white p-5 rounded-md shadow-md'>
              <ExpensesSummary/>
            </div>
            <div className=' bg-white p-5 rounded-md shadow-md'>
              <SalesSourceSummary/>
            </div>
          </div>
        </div>
        {/* <div className='flex flex-col gap-4'>
          <div>
            <h1 className='text-xl'>Dashboard</h1>
            <span className='text-default-400 text-sm'>An any way to manage sales with care and precision</span>
          </div>
          <div className='flex items-start w-full gap-5 pr-2'>
            <div className='flex-1 flex flex-col gap-5'>
              <div className='flex justify-between gap-5'>
                <div className='p-5 flex-1 bg-blue-900 text-white rounded-xl'>
                  <span className='text-sm text-slate-300'>October 27, 2024</span>
                  <h1>Sale Revenue Increase <span className='text-green-400'>+10%</span> this week</h1>
                </div>
                <div className='p-5 flex-1 border rounded-xl bg-white'>
                  <span className='text-sm text-default-600'>Net Income</span>  
                  <div className='flex justify-between'>
                    <span className='text-2xl'>$ 100</span>
                    <span className='flex text-success items-center text-sm'><FaArrowUpShortWide/>+10.2%</span>
                  </div>
                </div>
                <div className='p-5 flex-1 border rounded-xl bg-white'>
                  <span className='text-sm text-default-600'>Expenses</span>
                  <div className='flex justify-between'>
                    <span className='text-2xl'>$ 100</span>
                    <span className='flex text-red-600 items-center text-sm'><FaArrowUpShortWide/>+10.6%</span>
                  </div>
                </div>
              </div>
              <SalesRepresentative/>
            </div>
            <div className='flex flex-col gap-5'>
              <SalesSource/>
              <SalesCategory/>
            </div>
          </div>
          <div>
            <Analytics/>
            <SummaryReport/>
          </div>
        </div> */}
      </main>
    </AdminLayout>
  )
}
