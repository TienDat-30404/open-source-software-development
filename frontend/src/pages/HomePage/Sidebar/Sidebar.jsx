import React, { useEffect, useState } from 'react'
import {
  Plus, Search, Library, ArrowRight, Music, ListPlus, UserRoundX, Pen, Trash, FolderPlus, HeartOff, Folder, Pin, Share2
} from "lucide-react";
import CartPlayList from '../../../components/CartPlayList';
import { usePlaylists, useCreatePlaylist, useDeletePlayList } from '../../../hooks/usePlaylists';
import MenuItem from '../../../components/MenuItem';
import { deletePlaylist } from '../../../services/PlayListService';
import EditPlaylistModal from './EditPlaylistModal';
export default function Sidebar() {
  const userId = "375039d7-32ac-4c2c-b2c7-fd3708b45d4a"
  const [searchPlaylist, setSearchPlaylist] = useState('')
  let queryPlaylist = `/?user_id=${userId}${searchPlaylist ? `&title=${searchPlaylist}` : "" }`
  const { data: playlists, isLoading, isError, error, refetch } = usePlaylists(queryPlaylist);
  const createPlaylistMutation = useCreatePlaylist();
  const deletePlaylistMutation = useDeletePlayList()
  const [showCreatePlayList, setShowCreatePlayList] = useState(false)
  const [selectedPlaylist, setSelectedPlaylist] = useState({
    menuVisible: false,
    modalEdit : false,
    playlist: null
  })

  const handleCreatePlayList = async () => {
    createPlaylistMutation.mutate({
      user: userId,
      title: "",
      description: "",
      image : ""
    })
  }

  const handleSelectedPlaylist = (e, playlist) => {
    e.preventDefault()
    setSelectedPlaylist({
      menuVisible: true,
      playlist: playlist
    })
  }
  const handleClickOutside = () => {
    if (selectedPlaylist.modalEdit) return;
    setSelectedPlaylist({
      menuVisible: false,
      idPlaylist: null
    })
  };

  const handleDeletePlaylist = async (id) => {
    deletePlaylistMutation.mutate(id)
    setSelectedPlaylist({
      menuVisible: false,
      idPlaylist: null
    })
  }
  return (

    <div className="w-1/4 h-5/6 bg-[#121212] text-white fixed top-16 left-0 p-5 rounded-lg z-50">
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
            <div className="absolute top-full right-9 mt-2 w-60 bg-[#282828] px-2 rounded-md shadow-lg z-10">
              <MenuItem
                icon={<Music size={17} />}
                text="Tạo danh sách phát mới"
                handleClick={handleCreatePlayList}
              />
              <MenuItem icon={<FolderPlus size={17} />} text="Tạo danh sách phát mới" />
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
          value = {searchPlaylist}
          placeholder="Tìm kiếm"
          onChange={(e) => setSearchPlaylist(e.target.value) }
          className="w-full bg-[#282828] text-sm rounded-full py-2 pl-10 pr-4 text-white focus:outline-none"
        />
      </div>

      {selectedPlaylist.menuVisible && (
        <div className="bg-[#282828] text-white rounded-md w-72 py-2 absolute top-20">
          <MenuItem
            size={8}
            icon={<ListPlus />}
            clickOutside = {() => handleClickOutside()}
            text="Thêm vào danh sách chờ"
          />
          <MenuItem icon={<UserRoundX />} text="Xóa khỏi hồ sơ" />
          <MenuItem
            icon={<Pen />}
            text="Sửa thông tin chi tiết"
            handleClick={() => setSelectedPlaylist(prev => ({...prev, modalEdit : true})) }
          />
          <MenuItem
            icon={<Trash />}
            text="Xóa"
            handleClick={() => handleDeletePlaylist(selectedPlaylist?.playlist?.id)}
          />
          <MenuItem icon={<Music />} text="Tạo danh sách phát" />
          <MenuItem icon={<FolderPlus />} text="Tạo thư mục" />
          <MenuItem icon={<HeartOff />} text="Loại bỏ khỏi hồ sơ sở thích của bạn" />
          <MenuItem icon={<Folder />} text="Di chuyển sang thư mục" />
          <MenuItem icon={<Pin />} text="Ghim danh sách phát" />
          <MenuItem icon={<Share2 />} text="Chia sẻ" />
        </div>
      )}

      <EditPlaylistModal 
        show={selectedPlaylist?.modalEdit} 
        data={selectedPlaylist?.playlist} 
        close = {() => setSelectedPlaylist(prev => ({...prev, modalEdit : false}))}
      />
      <div className="mt-4 flex flex-col gap-2 max-h-[350px] overflow-y-auto">
        {playlists?.results?.length > 0 && playlists?.results?.map((playlist, index) => (
          <CartPlayList
            key={index}
            id={playlist?.id}
            image={playlist?.image}
            name_playlist={playlist?.title != "" ? playlist?.title : `Danh sách phát của tôi # ${index + 1}`}
            name_user="Tiến Đạt"
            clickRight={(e) => handleSelectedPlaylist(e, playlist)}
          />
        ))}
      </div>
    </div>


  )
}
