import React from 'react'
import Radio from './Radio'
import Artist from './Artist'
import Album from './Album'
export default function MainContent() {
  return (

    <div className='p-4 '>
      <div className="flex space-x-4 mb-8">
        <button className="bg-white text-black rounded-full p-2  font-semibold">Tất cả</button>
        <button className="text-white p-2 bg-[#282828] rounded-full">Nhạc</button>
        <button className="text-white p-2 bg-[#282828] rounded-full">Podcasts</button>
      </div>
      <div className="flex items-center justify-between mb-8 ">
        <h2 className="text-2xl font-bold">Radio phổ biến</h2>
        <button className="text-gray-400">Hiện tất cả</button>
      </div>
      {/* <Radio /> */}
      <Album />
      <Artist />
    </div>
  )
}
