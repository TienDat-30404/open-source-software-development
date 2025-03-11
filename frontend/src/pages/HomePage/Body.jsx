import React from 'react'
import Sidebar from './Sidebar/Sidebar'
import MainContent from './MainContent/MainContent'

export default function Body() {
  return (
    <div className='flex h-screen pt-16'>
      <Sidebar /> 
      <MainContent />
    </div>
  )
}
