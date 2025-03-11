import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
function CardArtist({id, imageUrl, artistName, artistType }) {
  const navigate = useNavigate()
  const switchDetailArtist = () => {
    navigate(`artist/${id}`)
  }
  return (
    <div onClick={() => switchDetailArtist()} className="bg-[#282828] rounded-lg w-[20%]"> 
      <div className="relative">
        <img src={imageUrl} alt={artistName} className="rounded-full w-32 h-32 mx-auto mb-4" />
        <div className="absolute bottom-2 right-2 bg-[#1ED760] rounded-full p-2">
        <Play />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-center mb-1">{artistName}</h3>
      <p className="text-sm text-gray-400 text-center">{artistType}</p>
    </div>
  );
}

export default CardArtist;