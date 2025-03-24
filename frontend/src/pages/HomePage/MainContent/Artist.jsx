import React, { useEffect, useState } from 'react'
import CardArtist from '../../../components/CartArtist'
import { getAllArtist } from '../../../services/ArtistService'
export default function Artist() {
    const [artists, setArtists] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllArtist()
            console.log(response)
            setArtists(response)
        }
        fetchData()
    }, [])
    return (
        <div className=''>
            <h1 className='text-2xl'>Nghệ sĩ</h1>
            <div className='flex items-center'>
                {artists?.results?.length > 0 && artists?.results?.map((artist, index) => (
                    <CardArtist key={index}
                        id={artist?.id}
                        imageUrl={artist?.image}
                        artistName={artist?.name}
                        artistType="Nghệ sĩ"
                    />
                ))}
            </div>
        </div>
    )
}
