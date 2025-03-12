import React from 'react'
import Radio from './Radio'
import Artist from './Artist'
export default function MainContent() {
  return (

    <div className="ml-[calc(25.3%)] flex-1 bg-[#282828] text-white p-4 rounded-lg">
      <div className="flex space-x-4 mb-8">
        <button className="bg-[#282828] text-white rounded-full py-2 px-4 font-semibold">Tất cả</button>
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
