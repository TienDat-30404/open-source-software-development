import React, { useEffect, useState } from 'react'
import CardSong from '../../../components/CardSong'
import { getAllSong } from '../../../services/SongService'
import PaginationLeftButton from '../../../components/Pagination/PaginationLeftButton'
import PaginationRightButton from '../../../components/Pagination/PaginationRightButton'
import { useGetTopSong } from '../../../hooks/useMusicListeningHistory'
export default function TopSongs() {
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(7)
    let query = `/?page=${page}&size=${size}`
    const { data: topSongs, isLoading, isError, error } = useGetTopSong(query)
    console.log(topSongs)
    return (
        <div className='relative'>
            <h1 className='text-2xl'>Top bài hát nghe nhiều nhất</h1>
            <div className='flex items-center'>
                <PaginationLeftButton
                    page={page}
                    setPage={setPage}
                    next={topSongs?.next}
                    previous={topSongs?.previous}
                />

                {topSongs && topSongs?.results?.length > 0 && topSongs?.results?.map((item, index) => (
                    <CardSong key={index}
                        id={item?.song?.id}
                        imageUrl={item?.song?.image}
                        title={item?.song?.title}
                        artist={item?.song?.artists && item?.song?.artists[0]?.name}
                    />
                ))}

                <PaginationRightButton
                    page={page}
                    setPage={setPage}
                    next={topSongs?.next}
                    previous={topSongs?.previous}
                />
            </div>
        </div>
    )
}
