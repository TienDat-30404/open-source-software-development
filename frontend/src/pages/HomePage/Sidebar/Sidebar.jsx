import React from 'react'
import { Plus, Search, Library, ArrowRight } from "lucide-react";

export default function Sidebar() {
  return (

    <div className="w-1/4 h-full bg-[#121212] text-white fixed top-16 left-0 p-5 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Library size={20} />
          <span className="font-semibold text-base">Thư viện</span>
        </div>
        <div className='flex items-center'>
          <Plus size={20} className="text-gray-300 cursor-pointer mr-3" />
          <ArrowRight size={20} className="text-gray-300 cursor-pointer" />
        </div>

      </div>

      {/* Danh sách phát */}
      <div className="flex flex-col gap-4">
        <button className="bg-[#282828] px-4 py-2 rounded-full text-sm font-semibold">
          Danh sách phát
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="relative mt-4">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm"
          className="w-full bg-[#282828] text-sm rounded-full py-2 pl-10 pr-4 text-white focus:outline-none"
        />
      </div>

      {/* Danh sách bài hát gần đây */}
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <img
            src="https://tse1.mm.bing.net/th?id=OIP.PcQ4PvC8QyBR_T29IonoowHaHa&pid=Api&P=0&h=180"
            alt="playlist"
            className="w-12 h-12 rounded-md"
          />
          <div>
            <p className="text-green-400 text-base font-semibold">123</p>
            <p className="text-sm text-gray-400">Danh sách phát · T Đạt</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.3jBRDaeXjRDmBxe8EkudOQHaEK&pid=Api&P=0&h=180"
            alt="playlist"
            className="w-12 h-12 rounded-md"
          />
          <div>
            <p className="text-white text-base font-semibold">jj</p>
            <p className="text-sm text-gray-400">Danh sách phát · T Đạt</p>
          </div>
        </div>
      </div>
    </div>


  )
}
