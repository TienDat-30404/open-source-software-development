import React, { useEffect, useState } from 'react'
import CardAlbum from '../../../components/CardAlbum'
import { getAllAlbum } from '../../../services/AlbumService'
import PaginationLeftButton from '../../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../../components/Pagination/PaginationRightButton'
export default function Album() {
    const [albums, setAlbums] = useState({})
    const [page, setPage] = useState(1)
    useEffect(() => {
        let query = `page=${page}`
        const fetchData = async () => {
            const response = await getAllAlbum(query)
            setAlbums(response)
        }
        fetchData()
    }, [page])
    return (
        <div className='relative'>
            <h1 className='text-2xl'>Album</h1>
            <div className='flex items-center'>
                <PaginationLeftButton
                    page={page}
                    setPage={setPage}
                    next={albums.next}
                    previous={albums.previous}
                />

                {albums?.results?.length > 0 && albums?.results?.map((album, index) => (
                    <CardAlbum key={index}
                        id={album?.id}
                        imageUrl={album?.image}
                        title={album?.title}
                        year={album?.release_date}
                        artist={album?.songs[0]?.artists?.map((artist) => artist?.name).join(', ') || 'Unknown Artist'}

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
