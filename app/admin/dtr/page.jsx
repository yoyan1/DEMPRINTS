import React from 'react'
import AdminLayout from '../layout/layout'
import DTRLogs from '../../components/adminComponents/DTR/DTRLogs'

export default function test() {
  return (
    <AdminLayout>
      <div>
        <div className='flex flex-col m-4 lg:m-6'>
          <span className='text-lg'>DTR Summary for December</span>
          <span className='text-sm text-gray-700'>December 17, 2024</span>
        </div>
        <main className="flex flex-1 flex-col gap-4 m-4 lg:gap-6 lg:m-6 bg-white dark:bg-gray-950 p-2 rounded-lg">
          <div>
            <DTRLogs/>
          </div>
        </main>
      </div>
    </AdminLayout>
  )
}
