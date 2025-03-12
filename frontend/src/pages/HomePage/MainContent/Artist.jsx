import React, { useEffect, useState } from 'react'
import CardArtist from '../../../components/CartArtist'
import { getAllArtist } from '../../../services/ArtistService'
export default function Artist() {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const response = await getAllArtist()
            console.log(response)
            setArtists(response.artists)
        }
        fetchData()
    }, [])
    return (
        <div className='flex items-center'>
            {artists?.length > 0 && artists?.map((artist, index) => (
                <CardArtist key={index}
                    imageUrl={artist?.image}
                    artistName={artist?.name}
                    artistType="Nghệ sĩ"
                />
            ))}


        </div>
    )
}
