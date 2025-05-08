import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { getAllSong } from '../../services/SongService';
import { Ellipsis, Plus, Play, Pause, CookingPot } from 'lucide-react';
import Header from './Header';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import { useSelector } from 'react-redux';
import { useAddSongFavorite } from '../../hooks/useFavorite';

export default function DetailSong() {
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const { accessToken } = useSelector(state => state.auth)

  const { currentSong, handlePlaySong, isPlaying } = useAudioPlayer();
  const addSongFavorite = useAddSongFavorite(accessToken)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllSong(id);
      setDetails(response);
      audioRef.current.src = response?.audio_url;
    };
    fetchData();
  }, [id]);


  const handleAddFavoriteSong = async (song) => {
    addSongFavorite.mutate({
      song_id: song.id
    })
  }
  return (
    <div>
      {details && (
        <div className='w-full h-full p-1'>
          <Header details={details} />
          <div className="bg-gradient-to-b h-36 from-[#601d1d] to-[#121212] text-white p-4 rounded-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">

                {isPlaying && currentSong?.id === details.id ? (
                  <div className="bg-[#1DB954] rounded-full cursor-pointer p-4" onClick={() => handlePlaySong(details)}>
                    <Pause size={20} />
                  </div>
                ) : (
                  <div className="bg-[#1DB954] rounded-full cursor-pointer p-4" onClick={() => handlePlaySong(details)}>
                    <Play size={20} />
                  </div>
                )}
                < button
                  onClick={() => handleAddFavoriteSong(details)}
                   class=" inline-flex items-center justify-center p-0.5 ms-3 me-3 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-white border border-white">
                  <Plus />
                </button>

                <Ellipsis size={24} color="white" />

              </div>
            </div>
          </div>
        </div>
      )}


    </div >
  );
}
