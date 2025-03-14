import React, { useEffect, useState } from 'react'
import { Plus, Search, Library, ArrowRight } from "lucide-react";
import { getAllPlaylist } from '../../../services/PlayListService';
import CartPlayList from '../../../components/CartPlayList';
export default function Sidebar() {
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPlaylist('')
      setPlaylists(response.playlists)
    }
    fetchData()
  }, [])
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
        {playlists?.length > 0 && playlists?.map((playlist, index) => (
          <CartPlayList
            key={index}
            id={playlist?.id}
            image={playlist?.songs[0]?.image}
            name_playlist={playlist?.title}
            name_user="Tiến Đạt"
          />
        ))}
      </div>
    </div>


  )
}
