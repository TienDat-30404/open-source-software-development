import React from 'react'
import { Plus, Search } from 'lucide-react'
import MenuItem from '../MenuItem'
import SearchComponent from '../SearchComponent'
import { usePlaylists } from '../../hooks/usePlaylists'
import { addSongOnPlaylist } from '../../services/PlayListService'
import { useSelector } from 'react-redux'
export default function SongPlaylist({ song }) {
    const {auth} = useSelector(state => state.auth)

    const { data: playlists, isLoading, isError, error, refetch } = usePlaylists(`/?user_id=${auth.id}`);
    console.log(playlists)
    const handleAddSongOnPlaylist = async (idPlaylist) => {
        const response = await addSongOnPlaylist(idPlaylist, {
            song_id: song?.id
        })
        console.log(playlists)
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
