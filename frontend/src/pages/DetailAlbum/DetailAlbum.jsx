import React, { useState, useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { getAllAlbum } from '../../services/AlbumService';
import { Ellipsis, Plus } from 'lucide-react';
import { switchDurationVideo } from '../../until/function';
import Header from './Header';
import CardSong from '../../components/Song/CardSong';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import useSelectedSong from '../../hooks/useSelectedSong';
import PlayOrPauseMainButton from '../../components/PlayOrPauseMainButton';
import { Download, HeartPulse } from 'lucide-react';
import LoadingDownload from '../../components/LoadingDownload';
import { downloadMusic } from '../../until/function';
import { useAddSongFavorite } from '../../hooks/useFavorite';
import { useSelector } from 'react-redux';
import { checkPremium } from '../../services/TransactionService';
import { toast, ToastContainer } from 'react-toastify';
export default function DetailAlbum() {
  const { accessToken } = useSelector(state => state.auth)
  const { id } = useParams()
  const [details, setDetails] = useState({})
  const { currentSong, isPlaying, handlePlaySong, audioRef } = useAudioPlayer();
  const { selectedSong, handleSelectedSong, handleClickOutside, hoveringSong, setHoveringSong } = useSelectedSong();
  const [loadingDownloadMusic, setLoadingDownloadMusic] = useState(false);
  const addSongFavorite = useAddSongFavorite(accessToken)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAlbum(id);
      setDetails(response);
    };
    fetchData();
  }, [id]);


  const handleDownloadMusic = async (song) => {
    const isCheckPremium = await checkPremium("", accessToken)
    if (isCheckPremium?.data?.is_premium) {
      const fileUrl = song?.audio_url;
      if (fileUrl) {
        setLoadingDownloadMusic(true);
        await downloadMusic(fileUrl, `${song.title}.mp3`);
        setLoadingDownloadMusic(false);
      }
    }
    else {
      toast.error("Vui lòng chọn gói premium để tận hưởng chức năng này")
    }
  };

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

                <PlayOrPauseMainButton
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  songDefault={details?.songs?.length > 0 ? details.songs[0] : null}
                  handlePlaySong={handlePlaySong}
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
                  menuItems={[
                    {
                      icon: <Plus />,
                      text: "Thêm vào danh sách phát",
                      isSubMenu: true,
                    },
                    {
                      icon: <Download />,
                      text: "Tải bài hát",
                      isSubMenu: false,
                      onClick: () => handleDownloadMusic(song)
                    },
                    {
                      icon: <HeartPulse />,
                      text: "Thêm vào bài hát yêu thích",
                      isSubMenu: false,
                      onClick: () => handleAddFavoriteSong(song)
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
        </div>
      )}
      <ToastContainer
        className="text-base"
        fontSize="10px"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
