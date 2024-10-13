import React from 'react'
import CreateUser from '../components/master-components/CreateUser'
import CreateProduct from '../components/master-components/CreateProduct'
import CreateCustomer from '../components/master-components/CreateCustomer'
import CreateSupplier from '../components/master-components/CreateSupplier'
import CreatePayment from '../components/master-components/CreatePayment'
import CreateExpenses from '../components/master-components/CreateExpenses'

export default function page() {
  return (
    <main>
        <div className="bg-gradient-to-tl from-blue-400 to to-blue-950 p-10">
            <div className="flex flex-col gap-20 justify-center items-center h-full">
                <div className='flex gap-20 flex-col md:flex-row lg:flex-row'>
                    <CreateUser/>
                    <CreateProduct/>
                    <CreateCustomer/>
                </div>
                <div className='flex gap-20 flex-col md:flex-row lg:flex-row'>
                    <CreateSupplier/>
                    <CreatePayment/>
                    <CreateExpenses/>
                </div>
            </div>
        </div>
    </main>
  )
}

