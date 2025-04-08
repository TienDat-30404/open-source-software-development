import React, { useEffect, useState } from 'react'
import CardArtist from '../../../components/CartArtist'
import { getAllArtist } from '../../../services/ArtistService'
import PaginationLeftButton from '../../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../../components/Pagination/PaginationRightButton'
export default function Artist() {
    const [artists, setArtists] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            let query = `/?page=${page}`
            const response = await getAllArtist(query)
            console.log(response)
            setArtists(response)
        }
        fetchData()
    }, [page])

    return (
        <div className='relative'>
            <h1 className='text-2xl'>Nghệ sĩ</h1>
            <div className='flex items-center'>
                <PaginationLeftButton
                    page={page}
                    setPage={setPage}
                    previous={artists.previous}
                    next={artists.next}
                />

                {artists?.results?.length > 0 && artists?.results?.map((artist, index) => (
                    <CardArtist key={index}
                        id={artist?.id}
                        imageUrl={artist?.image}
                        artistName={artist?.name}
                        artistType="Nghệ sĩ"
                    />
                ))}

                <PaginationRightButton
                    page={page}
                    setPage={setPage}
                    previous={artists.previous}
                    next={artists.next}
                />
            </div>
        </div>
    )
}
