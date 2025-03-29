import React from 'react'
import BannerPremium from './Banner'
import IntroducePremium from './Introduce'
import ContentPremium from './Content.'
import Benefit from './Benefit'

export default function Premium() {
  return (
    <div className='m-2 bg-[#121212]'>
      <BannerPremium />
      <IntroducePremium />
      <ContentPremium />
      <Benefit />
    </div>
  )
}
