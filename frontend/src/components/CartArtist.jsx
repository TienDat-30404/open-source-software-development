import React from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
function CardArtist({ id, imageUrl, artistName, artistType }) {
  const navigate = useNavigate()
  const switchDetailArtist = () => {
    navigate(`artist/${id}`)
  }
  return (
    <div onClick={() => switchDetailArtist()} className="bg-[#131212] rounded-lg w-[15%] mr-5 p-2 ">
      <img src={imageUrl} alt={artistName} className="rounded-full w-40 h-36 mx-auto mb-4" />
      <div className=" inset-0 flex items-center justify-center bg-[#323232] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Play className="text-white z-10" size={32} />
      </div>
      <h3 className="text-lg font-semibold text-center mb-1">{artistName}</h3>
      <p className="text-sm text-gray-400 text-center">{artistType}</p>
    </div>
  );
}

export default CardArtist;