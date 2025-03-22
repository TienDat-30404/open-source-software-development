import React, { Children } from 'react'
import Header from '../components/Header/Header'
import Body from '../../pages/HomePage/Body'
import Sidebar from '../../pages/HomePage/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'
export default function DefaultLayout({ children }) {
  return (
    <div className='bg-black h-screen w-screen flex flex-col z-50'>
      <Header />
      {/* <Body /> */}
      <div className='flex w-full h-5/6  pt-16'>
        <div className='w-1/4 h-full'>
          <Sidebar />
        </div>
        <div className="w-3/4 text-white rounded-lg h-full overflow-y-auto">
        {children}
        </div>
      </div>
      <Footer />
    </div>
  )
}
