"use client";
import React from 'react'
import AdminLayout from '../layout/layout'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { FaFileAlt, FaPrint, FaFileExport, FaChartBar } from 'react-icons/fa';
import TransactionTable from '@/app/components/adminComponents/sales/TransactionTable'
import {columns, transactions, itemOptions, typeOptions} from "./data";

export default function sales() {
  return (
    <AdminLayout>
      <main className="flex flex-1 flex-col gap-4 m-4 lg:gap-6 lg:m-6 bg-white">
        <div>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                    <TransactionTable columns={columns} transactions={transactions} itemOptions={itemOptions} typeOptions={typeOptions}/>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="print" title={
                <div className="flex items-center space-x-2">
                  <FaFileExport/>
                  <span>Printing and Exporting</span>
                </div>
              }>
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="create" title={
                <div className="flex items-center space-x-2">
                  <FaChartBar/>
                  <span>Create Order</span>
                </div>
              }>
                <Card>
                  <CardBody>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
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
