import React, { useEffect, useState } from 'react'
import CardSong from '../../../components/CardSong'
import { getAllSong } from '../../../services/SongService'
import PaginationLeftButton from '../../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../../components/Pagination/PaginationRightButton'
export default function Song() {
    const [songs, setSongs] = useState({})
    const [page, setPage] = useState(1)
    useEffect(() => {
        let query = `page=${page}`
        const fetchData = async () => {
            const response = await getAllSong(query)
            setSongs(response)
        }
        fetchData()
    }, [page])
    return (
        <div className='relative'>
            <h1 className='text-2xl'>Song</h1>
            <div className='flex items-center'>
                <PaginationLeftButton
                    page={page}
                    setPage={setPage}
                    next={songs.next}
                    previous={songs.previous}
                />

                {songs?.results?.length > 0 && songs?.results?.map((song, index) => (
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
