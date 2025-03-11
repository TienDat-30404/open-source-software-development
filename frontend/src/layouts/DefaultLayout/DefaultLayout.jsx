import React from 'react'
import Header from '../components/Header/Header'
import Body from '../../pages/HomePage/Body'

export default function DefaultLayout() {
  return (
    <div  className='bg-black h-screen w-screen flex flex-col z-50'>
      <Header />
      <Body />
    </div>
  )
}
