import React from 'react'
import { Plus, Search } from 'lucide-react'
import MenuItem from '../MenuItem'
import SearchComponent from '../SearchComponent'
import { usePlaylists } from '../../hooks/usePlaylists'
import { addSongOnPlaylist } from '../../services/PlayListService'
export default function SongPlaylist({ song }) {
    const userId = "07e1a821-a856-4efc-9d11-5957b5322a63"

    const { data: playlists, isLoading, isError, error, refetch } = usePlaylists(`user_id=${userId}`);

    const handleAddSongOnPlaylist = async (idPlaylist) => {
        const response = await addSongOnPlaylist(idPlaylist, {
            song_id: song?.id
        })
    }
    return (
        <div className='absolute right-[100%] w-[250px] bg-[#282828] z-10 max-h-[200px] overflow-y-auto '>
            <SearchComponent
                background="bg-[#3E3E3E]"
                placeholder="Tìm một danh sách phát"
                fontSize="text-[14px]"
                width="4"
                height="4"

            />
            <MenuItem
                icon={<Plus size={17} />}
                text="Danh sách phát mới"
            />
            <div className='w-full h-[1px] bg-[#ccc]'></div>
            {playlists?.results?.length > 0 && playlists?.results?.map((playlist, index) => (
                <h5
                    key={index}
                    className="text-[15px] text-white font-normal px-5 py-2 hover:bg-[#3E3E3E] cursor-pointer"
                    onClick={() => handleAddSongOnPlaylist(playlist?.id)}
                >
                    {playlist?.title}
                </h5>

            ))}
        </div>
    )
}
