"use client"
import React, { useEffect } from 'react'
import { Link } from "@nextui-org/react"
import AdminLayout from '../../layout/layout'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import GcashTransactionTable from '../../../components/adminComponents/gcash/TransactionTable';
import { useGcashTransactionStore } from '../../../stores/gcashTransactionStore';

export default function GcashTransaction() {
  const { transaction_gcash, loadTransaction, fetchGcashTransaction } = useGcashTransactionStore()

  useEffect(()=>{
    fetchGcashTransaction()
  }, [fetchGcashTransaction])
  return (
    <AdminLayout>
      <div>
        <div className='px-5 pt-5'>
          <Breadcrumbs radius="sm" variant="solid" color="primary">
            <BreadcrumbItem><Link href={`/admin/finance`} className="text-black">Home</Link></BreadcrumbItem>
            <BreadcrumbItem>Gcash Transaction</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <main className="flex flex-1 flex-col gap-4 m-4 lg:gap-6 lg:m-6 bg-white dark:bg-gray-950 p-5 rounded-lg">
          <div>
            <GcashTransactionTable transaction_gcash={transaction_gcash} loadTransaction={loadTransaction} refresh={fetchGcashTransaction}/>
          </div>
        </main>
      </div>
    </AdminLayout>
  )
}