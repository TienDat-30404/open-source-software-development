import React from 'react'
import SidebarProfile from '../../pages/Profile/Sidebar/SidebarProfile'
import AdminHeader from '../Admin/AdminHeader'
import Header from '../components/Header/Header'

export default function ProfileLayout({ children }) {
    return (
         <div className='bg-white h-screen w-screen flex flex-col z-50'>
              <Header />
              {/* <Body /> */}
              <div className='flex w-full h-full mt-16'>
                <div className='w-1/6 bg-gray-300 p-2'>
                  <SidebarProfile />
                </div>
                <div className="w-5/6 text-white rounded-lg h-full overflow-y-auto ">
                  {children}
                </div>
              </div>
            </div>
    )
}
