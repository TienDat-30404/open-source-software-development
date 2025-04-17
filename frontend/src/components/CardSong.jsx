import { useNavigate } from 'react-router-dom'

export default function CardSong({id, imageUrl, title, artist }) {
    const navigate = useNavigate()
    const switchDetailSong = () => {
      navigate(`/song/${id}`)
    }
    return (
      <div 
        className="w-[160px] flex-shrink-0 hover:bg-[#282828] rounded-md p-2 cursor-pointer"  
        onClick={() => switchDetailSong()}
      >
        <img src={imageUrl} alt={title} className="rounded-md mb-2 w-full h-36 " />
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">Bài hát • {artist}</p>
      </div>
    );
  }