import React, { useEffect, useState } from 'react'
import CardSong from '../../../components/CardSong'
import { getAllSong } from '../../../services/SongService'
import PaginationLeftButton from '../../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../../components/Pagination/PaginationRightButton'
export default function Song({ selectedCategory }) {
    const [songs, setSongs] = useState({})
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(7)
    console.log(selectedCategory)
    useEffect(() => {
        const fetchData = async () => {
            let query = `/?page=${page}&size=${size}`
            if (selectedCategory) {
                query += `&genre=${selectedCategory}`
            }
            console.log(query)
            const response = await getAllSong(query)
            setSongs(response)
        }
        fetchData()
    }, [page, selectedCategory])
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

                {songs && songs?.results?.length > 0 ? songs?.results?.map((song, index) => (
                    <CardSong key={index}
                        id={song?.id}
                        imageUrl={song?.image}
                        title={song?.title}
                        artist={song?.artists && song?.artists[0]?.name}
                    />
                )

                ) : <p className='text-red-500 text-center'>Hiện chưa có bài hát nào thuộc thể loại này</p>}

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
