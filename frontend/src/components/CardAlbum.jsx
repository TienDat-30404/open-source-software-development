import { useNavigate } from 'react-router-dom'

export default function CardAlbum({id, imageUrl, title, year, artist }) {
    const navigate = useNavigate()
    const switchDetailAlbum = () => {
      navigate(`album/${id}`)
    }
    return (
      <div className="w-[150px] flex-shrink-0" onClick={() => switchDetailAlbum()}>
        <img src={imageUrl} alt={title} className="rounded-md mb-2 w-full h-36 " />
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{new Date(year).getFullYear()} • {artist}</p>
      </div>
    );
  }