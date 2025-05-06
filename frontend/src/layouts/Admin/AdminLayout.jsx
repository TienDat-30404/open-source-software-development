import React from 'react'
import AdminHeader from './AdminHeader'
import AdminSidebar from './AdminSidebar'

export default function AdminLayout({ children }) {
  return (
    <div className='bg-white h-screen w-screen flex flex-col z-50'>
      <AdminHeader />
      {/* <Body /> */}
      <div className='flex w-full h-full'>
        <div className='w-1/6 h-full bg-yellow-200'>
          <AdminSidebar />
        </div>
        <div className="w-5/6 text-white rounded-lg h-full overflow-y-auto ">
          {children}
        </div>
      </div>
    </div>
  )
}
