import React, { Children } from 'react'
import Header from '../components/Header/Header'
import Body from '../../pages/HomePage/Body'
import Sidebar from '../../pages/HomePage/Sidebar/Sidebar'
export default function DefaultLayout({ children }) {
  return (
    <div className='bg-black h-screen w-screen flex flex-col z-50'>
      <Header />
      {/* <Body /> */}
      <div className='flex h-screen pt-16'>
        <Sidebar />
        <div className='ml-[calc(25.3%)] flex-1 bg-[#282828] text-white rounded-lg'>
          {children}
        </div>
      </div>
    </div>
  )
}
