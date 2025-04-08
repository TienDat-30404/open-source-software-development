import React, { useState } from 'react'
import Radio from './Radio'
import Artist from './Artist'
import Album from './Album'
import Song from './Song'
import IconChat from '../../../components/Element/IconChat'
import RoomsPage from '../../Room/RoomsPage'
export default function MainContent() {
  const [showRoom, setShowRoom] = useState(false)
  return (

    <div className='p-4'>
      <div className="flex space-x-4 mb-8">
        <button className="bg-white text-black rounded-full p-2  font-semibold">Tất cả</button>
        <button className="text-white p-2 bg-[#282828] rounded-full">Nhạc</button>
        <button className="text-white p-2 bg-[#282828] rounded-full">Podcasts</button>
      </div>
      <div className="flex items-center justify-between mb-8 ">
        <h2 className="text-2xl font-bold">Radio phổ biến</h2>
      </div>
      <div
        onClick={() => setShowRoom(!showRoom)}
        className='fixed z-20 top-20 right-10'
      >
        <IconChat />
      </div>
      <RoomsPage show={showRoom} />
      <Song />
      <Album />
      <Artist />
    </div>
  )
}
