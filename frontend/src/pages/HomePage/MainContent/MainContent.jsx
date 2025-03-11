import React from 'react'
import Radio from './Radio'
import Artist from './Artist'
export default function MainContent() {
  return (

    <div className='p-4'>
      <div className="flex space-x-4 mb-8">
        <button className="bg-[#282828] text-white rounded-full  font-semibold">Tất cả</button>
        <button className="text-gray-400">Nhạc</button>
        <button className="text-gray-400">Podcasts</button>
      </div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Radio phổ biến</h2>
        <button className="text-gray-400">Hiện tất cả</button>
      </div>
      {/* <Radio /> */}
      <Artist />
    </div>
  )
}
