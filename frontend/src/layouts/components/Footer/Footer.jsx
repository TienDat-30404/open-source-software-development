

import {
    CirclePlus, Shuffle, SkipBack, Play, SkipForward, Repeat, SquarePlay, MicVocal, List, MonitorSpeaker, Volume,
    Volume1, Volume2, VolumeOff, Maximize, Pause
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAudioPlayer } from "../../../hooks/useAudioPlayer";
import { useGetHistoryMusicListening } from "../../../hooks/useMusicListeningHistory";
import { useSelector } from "react-redux";
export default function Footer() {
    const {accessToken} = useSelector(state => state.auth)
    const [queuedSong, setQueuedSong] = useState(null);

    const { data: historyMusics, isLoading, isError, error, refetch } = useGetHistoryMusicListening("", accessToken);
    console.log("his", historyMusics)
    const { currentSong, isPlaying, handlePlaySong, audioRef } = useAudioPlayer();
    console.log("isPlaying", isPlaying)
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [lastVolume, setLastVolume] = useState(1);
    useEffect(() => {
        const updateProgress = () => {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        };
        const audio = audioRef.current;
        audio.addEventListener("timeupdate", updateProgress);
        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
        };
    }, [audioRef]);

    const togglePlay = () => {
        if (!currentSong && queuedSong) {
            handlePlaySong(queuedSong);
        } else {
            handlePlaySong(currentSong);
        }
    };


    useEffect(() => {
        if (historyMusics && historyMusics?.data?.length > 0) {
            const latestItem = historyMusics.data.reduce((latest, current) => {
                return new Date(current.played_at) > new Date(latest.played_at) ? current : latest;
            });
            if (latestItem.song?.id !== currentSong?.id) {
                setQueuedSong(latestItem.song);
            }
        }
    }, [historyMusics]);

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
        setMuted(e.target.value === "0");
    };

    const toggleMute = () => {
        if (muted) {
            setVolume(lastVolume);
            audioRef.current.volume = lastVolume;
        } else {
            setLastVolume(volume);
            setVolume(0);
            audioRef.current.volume = 0;
        }
        setMuted(!muted);

    };

    let duration = 260
    if (duration < 60) {
        duration = duration
    }
    else {
        duration = Math.floor(duration / 60) + ":" + duration % 60
    }

    return (
        <div className="fixed bottom-0 left-0 w-full h-1/6 bg-black text-white flex items-center px-6 justify-between shadow-lg z-50">
            {/* Thông tin bài hát */}
            <div className="flex items-center w-1/4">
                <img src="http://www.freeiconspng.com/uploads/blue-user-icon-32.jpg" className="w-12 h-12 rounded mr-4" />
                <div>
                    <h3 className="text-sm font-semibold">{currentSong?.title}</h3>
                    <p className="text-xs text-gray-400">
                        {currentSong?.artists?.map((item, index) => (
                            item?.name
                        ))}
                    </p>
                </div>
            </div>


            {/* Điều khiển phát nhạc */}
            <div className="bg-black w-1/2  text-white flex items-center flex-col justify-center">

                <div className="flex items-center space-x-6">
                    <Shuffle size={20} className="text-[#A9A9A9] " />
                    <SkipBack size={20} className="text-[#A9A9A9]" />
                    <button onClick={togglePlay}>
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <SkipForward size={20} className="text-[#A9A9A9]" />
                    <Repeat size={20} className="text-[#A9A9A9]" />
                </div>

                <div className="self-start">
                    <CirclePlus size={18} />
                </div>
                <div className="w-5/6 flex items-center">
                    <span className="text-xs text-gray-400">0:00</span>
                    <div className="flex items-center  w-4/5 mx-3"
                        onClick={(e) => {
                            const progressBar = e.currentTarget;
                            const rect = progressBar.getBoundingClientRect(); // Lấy vị trí thanh progress
                            const clickX = e.clientX - rect.left; // Vị trí click từ đầu thanh progress
                            const newProgress = (clickX / rect.width) * 100;
                            const newTime = (newProgress / 100) * audioRef.current.duration;

                            audioRef.current.currentTime = newTime;
                            setProgress(newProgress);
                        }}
                    >
                        <div className="bg-gray-700 h-1 w-full rounded-full relative">
                            <div className="bg-white h-1 rounded-full" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <span className="text-xs text-gray-400">{duration}</span>
                </div>
            </div>


            {/* Thanh tiến trình và các nút khác */}
            <div className="flex items-center space-x-4">

                <SquarePlay size={20} />
                <MicVocal size={20} />
                <List size={20} />
                <MonitorSpeaker size={20} />
                {/* <Volume size={20} /> */}
                {/* <Volume1 size={20} />
                <Volume2 size={20} /> */}
                {/* <VolumeOff size={20} /> */}
                <button onClick={toggleMute}>
                    {muted || volume === 0 ? <VolumeOff size={20} /> : <Volume2 size={20} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20"
                />
                <Maximize size={20} />
            </div>

        </div>
    );
}
