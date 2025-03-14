import React, { useEffect, useState } from 'react'
import CardAlbum from '../../../components/CardAlbum'
import { getAllAlbum } from '../../../services/AlbumService'
export default function Album() {
    const [albums, setAlbums] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllAlbum('')
            setAlbums(response)
            console.log(response)
        }
        fetchData()
    }, [])
    return (
        <div className=''>
            <div className='flex items-center'>
                {albums?.results?.length > 0 && albums?.results?.map((album, index) => (
                    <CardAlbum key={index}
                        id={album?.id}
                        imageUrl={album?.image}
                        title={album?.title}
                        year={album?.release_date}
                        artist="22"
                    />
                ))}
            </div>
        </div>
    )
}
