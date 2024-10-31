import React from 'react'
import Aside from '../_sections/aside.jsx'
import Header from '../_sections/header.jsx'


export default function AdminLayout({children}) {
  return (
    <div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] bg-slate-50">
        <Aside/>
        <div className="flex flex-col bg-slate-50">
            <Header/>
            {children}
        </div>
        </div>
    </div>
  )
} 
