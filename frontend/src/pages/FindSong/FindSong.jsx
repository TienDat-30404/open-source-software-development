import React, { useEffect, useState } from 'react'
import CardSong from '../../components/CardSong'
import { getAllSong } from '../../services/SongService'
import PaginationLeftButton from '../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../components/Pagination/PaginationRightButton'
export default function FindSong() {
    const [songs, setSongs] = useState({})
    const [page, setPage] = useState(1)
    const params = new URLSearchParams(window.location.search)
    const nameSong = params.get('name')
    useEffect(() => {
        const fetchData = async () => {
            let query = `/?page=${page}&search=${nameSong}`
            const response = await getAllSong(query)
            setSongs(response)
        }
        fetchData()
    }, [params])
    console.log(songs)
    return (
        <div className='relative'>
            <div className='flex items-center space-x-2 p-2'>
                <h1 className='text-1xl'>Bài hát tìm kiếm : </h1>
                {nameSong && (
                    <h1 className='text-1xl text-red-500'>{nameSong}</h1>
                )}
                <h1 className='text-1xl'>({songs?.results?.length} kết quả được tìm thấy)</h1>
            </div>
            <div className='flex items-center'>
                <PaginationLeftButton
                    page={page}
                    setPage={setPage}
                    next={songs.next}
                    previous={songs.previous}
                />

                {songs && songs?.results?.length > 0 && songs?.results?.map((song, index) => (
                    <CardSong key={index}
                        id={song?.id}
                        imageUrl={song?.image}
                        title={song?.title}
                        artist={song?.artists && song?.artists[0]?.name}
                    />
                ))}

                <PaginationRightButton
                    page={page}
                    setPage={setPage}
                    next={songs.next}
                    previous={songs.previous}
                />
            </div>
        </div>
    )
}
