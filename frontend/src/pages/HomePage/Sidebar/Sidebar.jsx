import React, { useEffect, useState } from 'react'
import { Plus, Search, Library, ArrowRight, Music, FolderPlus } from "lucide-react";
import { createPlayList, getAllPlaylist } from '../../../services/PlayListService';
import CartPlayList from '../../../components/CartPlayList';
export default function Sidebar() {
  const [playlists, setPlaylists] = useState([])
  const [showCreatePlayList, setShowCreatePlayList] = useState(false)
 
  const user = "07e1a821-a856-4efc-9d11-5957b5322a63"
  const handleCreatePlayList = async () => {
    console.log("user", user)
    const response = await createPlayList({
      user: user,
      title : "",
      description : ""
    })
    console.log("response", response)
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPlaylist('')
      setPlaylists(response.playlists)
    }
    fetchData()
  }, [handleCreatePlayList])

  return (

    <div className="w-1/4 h-full bg-[#121212] text-white fixed top-16 left-0 p-5 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Library size={20} />
          <span className="font-semibold text-base">Thư viện</span>
        </div>
        <div className='flex items-center relative'>
          <Plus
            size={20}
            className="text-gray-300 cursor-pointer mr-3"
            onClick={() => setShowCreatePlayList(!showCreatePlayList)}
          />
          {showCreatePlayList && (
            <div className="absolute top-full right-9 mt-2 w-56 bg-[#282828] px-3 rounded-md shadow-lg z-10">
              <div className='flex items-center py-2'>
                <Music size={17} />
                <h2
                  className="text-white text-sm ml-2"
                  onClick={() => handleCreatePlayList()}
                >
                  Tạo danh sách phát mới
                </h2>
              </div>
              <div className='flex items-center py-2'>
                <FolderPlus size={17} />
                <h2 className="text-white text-sm ml-2">Tạo danh sách phát mới</h2>
              </div>

            </div>
          )}
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

            name_playlist={playlist?.title != "" ? playlist?.title : `Danh sách phát của tôi # ${index + 1}`}
            name_user="Tiến Đạt"
          />
        ))}
      </div>
    </div>


  )
}
