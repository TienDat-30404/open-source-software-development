import React from 'react'
import { Music } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function CartPlayList({ id, image, name_playlist, name_user }) {
    const navigate = useNavigate()
    const switchPlayList = () => {
        navigate(`/playlist/${id}`)
    }
    return (
        <div
            className="flex items-center gap-2"
            onClick={() => switchPlayList(id)}
        >
            {image ? (
                <img
                    src={image}
                    alt="playlist"
                    className="w-1/6 h-12 rounded-md"
                />
            ) : <Music className='w-1/6' />}
            <div>
                <p className="text-white text-sm font-semibold">{name_playlist}</p>
                <p className="text-sm text-gray-400">Danh sách phát · {name_user}</p>
            </div>
        </div>
    )
}
