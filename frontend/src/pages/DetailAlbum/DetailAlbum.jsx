import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { getAllAlbum } from '../../services/AlbumService';
import {Ellipsis, Plus} from 'lucide-react';
import { switchDurationVideo } from '../../until/function';
import Header from './Header';
import CardSong from '../../components/Song/CardSong';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import useSelectedSong from '../../hooks/useSelectedSong';
import PlayOrPauseMainButton from '../../components/PlayOrPauseMainButton';
export default function DetailAlbum() {
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const { currentSong, isPlaying, handlePlaySong, audioRef } = useAudioPlayer();
  const { selectedSong, handleSelectedSong, handleClickOutside, hoveringSong, setHoveringSong } = useSelectedSong(); 
 
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAlbum(id);
      setDetails(response);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {details && (
        <div className='w-full h-full p-1'>
          <Header details={details} />
          <div className="bg-gradient-to-b h-36 from-[#601d1d] to-[#121212] text-white p-4 rounded-lg w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
      
                <PlayOrPauseMainButton 
                  isPlaying={isPlaying}
                  currentSong={currentSong}
                  handlePlaySong={handlePlaySong}
                  audioRef={audioRef}
                  defaultSong={details?.songs?.length > 0 ? details.songs[0] : null}
                />
                
                <button class=" inline-flex items-center justify-center p-0.5 ms-3 me-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-white border border-white">
                  <span class=" px-4 py-1 transition-all ease-in duration-75 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Theo dõi
                  </span>
                </button>

                <Ellipsis size={24} color="white" />

              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 ">Phổ biến</h2>


            <div className="space-y-1">
              {details?.songs?.map((song, index) => (
                <CardSong
                  song={song}
                  index={index}
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  hoveringSong={hoveringSong}
                  setHoveringSong={setHoveringSong}
                  handlePlaySong={handlePlaySong}
                  switchDurationVideo={switchDurationVideo}
                  selectedSong={selectedSong}
                  handleSelectedSong={(e) => handleSelectedSong(e, song?.id)}
                  clickOutside={handleClickOutside}
                  menuItems ={[
                    {
                      icon: <Plus />, 
                      text: "Thêm vào danh sách phát",
                      isSubMenu: true,
                    }
                  ]}
                />
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
