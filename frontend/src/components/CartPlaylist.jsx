import React from 'react'
import { Music } from 'lucide-react'
export default function CartPlaylist({image, name_playlist, name_user}) {
    return (
        <div className="flex items-center gap-2">
            {image ? (
                <img
                    src={image}
                    alt="playlist"
                    className="w-12 h-12 rounded-md"
                />
            ) : <Music />}
            <div>
                <p className="text-white text-base font-semibold">{name_playlist}</p>
                <p className="text-sm text-gray-400">Danh sách phát · {name_user}</p>
            </div>
        </div>
    )
}
