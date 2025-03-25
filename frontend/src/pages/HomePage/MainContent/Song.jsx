import React, { useEffect, useState } from 'react'
import CardSong from '../../../components/CardSong'
import { getAllSong } from '../../../services/SongService'
import PaginationLeftButton from '../../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../../components/Pagination/PaginationRightButton'
export default function Song() {
    const [albums, setAlbums] = useState({})
    const [page, setPage] = useState(1)
    useEffect(() => {
        let query = `page=${page}`
        const fetchData = async () => {
            const response = await getAllSong(query)
            setAlbums(response)
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
                    next={albums.next}
                    previous={albums.previous}
                />

                {albums?.results?.length > 0 && albums?.results?.map((album, index) => (
                    <CardSong key={index}
                        id={album?.id}
                        imageUrl={album?.image}
                        title={album?.title}
                        artist="22"
                    />
                ))}

                <PaginationRightButton
                    page={page}
                    setPage={setPage}
                    next={albums.next}
                    previous={albums.previous}
                />
            </div>
        </div>
    )
}
