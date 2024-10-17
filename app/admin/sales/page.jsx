"use client";
import React from 'react'
import AdminLayout from '../layout/layout'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { FaFileAlt, FaPrint } from 'react-icons/fa';
import TransactionTable from '@/app/components/adminComponents/sales/TransactionTable'
import {columns, transactions, itemOptions, typeOptions} from "./data";

export default function sales() {
  return (
    <AdminLayout>
      <main className="flex flex-1 rounded-md flex-col gap-4 m-4 lg:gap-6 lg:m-6 bg-white">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-bold text-2xl">Sales Overview</h1>
              <span className="text-sm text-slate-400">{"Let's"} see the current statistic performance</span>
            </div>
            <div>
              <span className="text-sm py-1 px-2 border rounded-full">October 16, 2024</span>
            </div>
          </div>
          <div>
            <Tabs aria-label="Options" color="primary">
              <Tab key="summary" title={
                <div className="flex items-center space-x-2">
                  <FaFileAlt/>
                  <span>Summary</span>
                </div>
              }>
                <Card>
                  <CardBody>
                    <div className="flex gap-10 justify-between">
                      <div className="flex-1 rounded-md flex flex-col gap-5 bg-gradient-to-tr from-blue-800 to-blue-400 text-white p-5">
                        <h1 className="text-xl">Overall Revenue</h1>
                        <div>
                          <h1 className="text-xl">$25,000</h1>
                          <div className="text-xs">
                            <span className="mr-3 text-gray-600 px-1 rounded-lg bg-gray-50">+ 9%</span>
                            this month
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 rounded-md flex flex-col gap-5 bg-gradient-to-tr from-blue-800 to-blue-400 text-white p-5">
                        <h1 className="text-xl">Overall Revenue</h1>
                        <div>
                          <h1 className="text-xl">$25,000</h1>
                          <div className="text-xs">
                            <span className="mr-3 text-gray-600 px-1 rounded-lg bg-gray-50">+ 9%</span>
                            this month
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 rounded-md flex flex-col gap-5 bg-gradient-to-tr from-blue-800 to-blue-400 text-white p-5">
                        <h1 className="text-xl">Overall Revenue</h1>
                        <div>
                          <h1 className="text-xl">$25,000</h1>
                          <div className="text-xs">
                            <span className="mr-3 text-gray-600 px-1 rounded-lg bg-gray-50">+ 9%</span>
                            this month
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="expenses" title={
                <div className="flex items-center space-x-2">
                  <FaPrint/>
                  <span>Transaction</span>
                </div>
              }>
                <Card className='no-shadow'>
                  <CardBody>
                    <TransactionTable columns={columns} transactions={transactions} itemOptions={itemOptions} typeOptions={typeOptions} isMaximized={false}/>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
        </div>
      </main>
    </AdminLayout>
  )
}
