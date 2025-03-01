import React from 'react'
import Header from '../components/Header/Header'
import MainContent from '../../pages/HomePage/MainContent/MainContent'

export default function DetailProductLayout({children}) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
