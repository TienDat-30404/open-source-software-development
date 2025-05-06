import React from 'react'
import { switchDurationVideo } from '../../until/function';

export default function Header({ details }) {
    return (
        <div className=" w-full h-64 rounded-lg overflow-hidden bg-gradient-to-l  from-[#378438e1] to-[#9517174a]">
            <div className=" w-full h-full flex">
                <img src={details?.image} className="w-1/5 h-full rounded-md p-5" />
                <div className="flex flex-col justify-center " >
                    <p className="text-xs uppercase text-white font-medium">Bài hát</p>
                    <h1 className="text-6xl font-bold text-white pt-3">{details?.title}</h1>
                    <div className='flex items-center pt-3 space-x-2'>
                        <img
                            src={details?.artists && details.artists[0]?.image}
                            className='w-5 h-5 rounded-full'
                        />
                        <p className="text-sm text-gray-300">
                            {details?.artists && details.artists[0]?.name}
                        </p>
                        <div className='w-1 h-1 bg-yellow-100 rounded-full'></div>
                        <p className="text-sm text-gray-300">
                            {new Date(details?.release_date).getFullYear()}
                        </p>

                        <div className='w-1 h-1 bg-yellow-100 rounded-full'></div>
                        <p className="text-sm text-gray-300">
                            {switchDurationVideo(details?.duration)}
                        </p>



                    </div>
                </div>
            </div>
        </div>
    )
}
