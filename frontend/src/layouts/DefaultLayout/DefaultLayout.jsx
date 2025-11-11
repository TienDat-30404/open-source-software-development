import React, { Children } from 'react'
import Header from '../components/Header/Header'
import Body from '../../pages/HomePage/Body'
import Sidebar from '../../pages/HomePage/Sidebar/Sidebar'
import Footer from '../components/Footer/Footer'
export default function DefaultLayout({ children }) {
  return (
    <div className='bg-black h-screen w-screen flex flex-col z-50'>
      <Header />
      <div
        className="bg-red-700 w-full text-white text-center py-2 fixed top-16 shadow-lg z-40"
      >
        <strong className="uppercase mr-2 font-extrabold text-lg">⚠️ CẢNH BÁO: ĐÂY CHỈ LÀ WEBSITE DEMO</strong>
        <span className="hidden sm:inline text-sm">(Các tính năng, cam kết, và dữ liệu chỉ mang tính chất minh họa)</span>
      </div>
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
