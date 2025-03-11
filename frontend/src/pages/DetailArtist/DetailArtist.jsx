import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { getAllArtist } from '../../services/ArtistService';
import { CircleCheckBig, CirclePlay, Ellipsis } from 'lucide-react';

export default function DetailArtist() {
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [currentSong, setCurrentSong] = useState(null);  // Bài hát đang phát
  const [isPlaying, setIsPlaying] = useState(false);  // Trạng thái phát nhạc
  const audioRef = React.useRef(new Audio()); // Audio player

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllArtist(id);
      setDetails(response);
    };
    fetchData();
  }, [id]);

  // Xử lý khi click vào bài hát
  const handlePlaySong = (song) => {
    if (currentSong?.audio_url === song.audio_url) {
      // Nếu đang phát bài đó thì toggle play/pause
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      // Nếu chọn bài mới thì đổi nhạc
      setCurrentSong(song);
      audioRef.current.src = song.audio_url;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {details && (
        <Fragment>
          <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
            <img src={details?.image} alt={details?.name} className="absolute inset-0 w-full object-cover" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="flex items-center mb-2">
                <CircleCheckBig className="text-blue-500 mr-2" />
                <span className="text-sm">Nghệ sĩ được xác minh</span>
              </div>
              <h1 className="text-6xl font-bold py-2">{details?.name}</h1>
              <p className="text-base py-3">394.233 người nghe hằng tháng</p>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#601d1d] to-[#121212] text-white p-4 rounded-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Phổ biến</h2>

            <div className="space-y-3">
              {details?.songs?.map((song, index) => (
                <div key={song.id} className="flex items-center justify-between cursor-pointer hover:bg-gray-700 p-2 rounded-lg"
                  onClick={() => handlePlaySong(song)}>
                  <div className="flex items-center">
                    <span className="mr-4 text-base text-gray-400">{index + 1}</span>
                    <img src={song?.image} alt={song?.name} className="w-12 h-12 rounded-md mr-2" />
                    <span className={currentSong?.audio_url === song.audio_url ? "text-green-500 font-bold" : ""}>{song?.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-4">14.059.103</span>
                    <span>4:17</span>
                    {currentSong?.audio_url === song.audio_url && isPlaying ? <CirclePlay className="text-green-500 ml-2" /> : <Ellipsis size={20} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      )}
      {/* Audio element */}
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
