import React from 'react'
import Header from '../components/Header/Header'
import MainContent from '../../pages/HomePage/MainContent/MainContent'

export default function CartLayout({children}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
