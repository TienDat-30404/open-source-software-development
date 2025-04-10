import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { getAllArtist } from '../../services/ArtistService';
import { CircleCheckBig, Ellipsis, Plus } from 'lucide-react';
import { switchDurationVideo } from '../../until/function';
import CardSong from '../../components/Song/CardSong';
import PlayOrPauseMainButton from '../../components/PlayOrPauseMainButton';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import useSelectedSong from '../../hooks/useSelectedSong';
import { downloadMusic } from '../../until/function';
import { Download } from 'lucide-react';
import LoadingDownload from '../../components/LoadingDownload';
export default function DetailArtist() {
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const { currentSong, isPlaying, handlePlaySong, audioRef } = useAudioPlayer();
  console.log(currentSong)
  const { selectedSong, handleSelectedSong, handleClickOutside, hoveringSong, setHoveringSong } = useSelectedSong();
  const [loadingDownloadMusic, setLoadingDownloadMusic] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllArtist(id);
      setDetails(response);
    };
    fetchData();
  }, [id]);

  const handleDownloadMusic = async (song) => {
    const fileUrl = song?.audio_url;
    if (fileUrl) {
      setLoadingDownloadMusic(true);
      await downloadMusic(fileUrl, `${song.title}.mp3`);
      setLoadingDownloadMusic(false);
    }
  };

  return (
    <div>
      {details && (
        <Fragment>
          <div className="relative w-full h-64 bg-gray-800 rounded-lg overflow-hidden">
            <img src={details?.image} className="absolute inset-0 w-full object-cover" />
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">

                <PlayOrPauseMainButton
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  songDefault={details?.songs?.length > 0 ? details.songs[0] : null}
                  handlePlaySong={handlePlaySong}
                 
                />
                <button class="relative inline-flex items-center justify-center p-0.5 ms-3 me-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-white border border-white">
                  <span class="relative px-4 py-1 transition-all ease-in duration-75 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    Theo dõi
                  </span>
                </button>

                <Ellipsis size={24} color="white" />

              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Phổ biến</h2>

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
                  menuItems={[
                    {
                      icon: <Plus />,
                      text: "Thêm vào danh sách phát",
                      isSubMenu: true
                    },
                    {
                      icon: <Download />,
                      text: "Tải bài hát",
                      isSubMenu: false,
                      onClick: () => handleDownloadMusic(song)
                    }
                  ]}
                />
              ))}
            </div>
          </div>

          {loadingDownloadMusic && (
            <div className="absolute inset-0 bg-opacity-50 bg-black flex items-center justify-center z-50">
              <LoadingDownload />
            </div>
          )}
        </Fragment>
      )}
      {/* Audio element */}
      {/* <audio ref={audioRef} onEnded={() => setIsPlaying(false)} /> */}
    </div>
  );
}
