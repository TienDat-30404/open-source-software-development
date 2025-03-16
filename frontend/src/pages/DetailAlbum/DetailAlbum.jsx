import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { getAllAlbum } from '../../services/AlbumService';
import {
  CircleCheckBig, Ellipsis, CirclePlus, Play, Pause, Plus, Heart, List, Radio, User,
  Disc, FileText, Upload,
} from 'lucide-react';
import { switchDurationVideo } from '../../until/function';
import MenuItem from '../../components/MenuItem';
import Header from './Header';
export default function DetailAlbum() {
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveringSong, setHoveringSong] = useState(null)
  const audioRef = React.useRef(null)

  useEffect(() => {
    audioRef.current = new Audio()
    const fetchData = async () => {
      const response = await getAllAlbum(id);
      setDetails(response);
    };
    fetchData();
  }, [id]);

  const handlePlaySong = (song) => {
    if (currentSong?.id === song.id) {
      if (isPlaying) {
        audioRef.current.pause()
      }
      else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
    else {
      setCurrentSong(song)
      audioRef.current.src = song.audio_url
      audioRef.current.load()
      audioRef.current.play()
      setIsPlaying(true)
    }
  }


  return (
    <div>
      {details && (
        <div className='w-full h-full p-1'>
          <Header details={details} />
          <div className="bg-gradient-to-b h-36 from-[#601d1d] to-[#121212] text-white p-4 rounded-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-[#1DB954] rounded-full">
                  {isPlaying ? (
                    <Pause
                      onClick={() => {
                        audioRef.current.pause();
                        setIsPlaying(false);
                      }}
                      className="w-10 h-7"
                    />
                  ) :
                    currentSong != null ? (

                      <Play
                        className="w-10 h-7"
                        onClick={() => handlePlaySong(currentSong)}
                      />
                    ) :
                      <Play
                        className="w-10 h-7"
                        onClick={() => handlePlaySong(details?.songs[0])}
                      />
                  }
                </div>
                <button class="relative inline-flex items-center justify-center p-0.5 ms-3 me-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-white border border-white">
                  <span class="relative px-4 py-1 transition-all ease-in duration-75 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Theo dõi
                  </span>
                </button>

                <Ellipsis size={24} color="white" />

              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 ">Phổ biến</h2>
            {/* <div className="bg-[#282828] text-white rounded-md w-72 py-2 absolute top-20">
              <MenuItem icon={<Plus />} text="Add to playlist" />
              <MenuItem icon={<Heart />} text="Save to your Liked Songs" />
              <MenuItem icon={<List />} text="Add to queue" />
              <MenuItem icon={<Radio />} text="Go to song radio" />
              <MenuItem icon={<User />} text="Go to artist" />
              <MenuItem icon={<Disc />} text="Go to album" />
              <MenuItem icon={<FileText />} text="View credits" />
              <MenuItem icon={<Upload />} text="Share" />
            </div> */}
          
            <div className="space-y-1">
              {details?.songs?.map((song, index) => (
                <div key={song.id} className="flex items-center justify-between cursor-pointer hover:bg-[#424141] py-2 rounded-lg"
                  onClick={() => handlePlaySong(song)}
                  onMouseEnter={() => setHoveringSong(song.id)}
                  onMouseLeave={() => setHoveringSong(null)}
                >
                  <div className="flex items-center">

                    {currentSong?.id === song?.id && isPlaying ? (
                      <Pause size={17} />
                    ) : hoveringSong === song?.id ? (
                      <Play size={17} />
                    ) :
                      <span className="pr-4 text-base ">{index + 1}</span>
                    }

                    <img src={song?.image} alt={song?.name} className="w-18 h-10 rounded-md pr-2" />
                    <span className={currentSong?.audio_url === song?.audio_url ? "text-green-500 font-bold" : ""}>{song?.title}</span>
                  </div>

                  <div className="flex items-center">
                    <span className="pr-4">14.059.103</span>
                    {hoveringSong === song.id && (
                      <CirclePlus size={17} className='pr-3 text-gray-300' />
                    )}
                    <span className='pr-3'>{switchDurationVideo(song?.duration)}</span>
                    {hoveringSong === song?.id && (
                      <Ellipsis size={20} />
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Audio element */}
      {/* <audio ref={audioRef} onEnded={() => setIsPlaying(false)} /> */}
    </div>
  );
}
