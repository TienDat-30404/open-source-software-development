

import {
    CirclePlus, Shuffle, SkipBack, Play, SkipForward, Repeat, SquarePlay, MicVocal, List, MonitorSpeaker, Volume,
    Volume1, Volume2, VolumeOff, Maximize, Pause
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAudioPlayer } from "../../../hooks/useAudioPlayer";
import { useGetHistoryMusicListening } from "../../../hooks/useMusicListeningHistory";
import { useSelector } from "react-redux";
import { switchDurationVideo } from "../../../until/function";
import { checkPremium } from "../../../services/TransactionService";
import { toast, ToastContainer } from "react-toastify";
import { updateViewsSong } from "../../../services/MusicListeningHistoryService";
export default function Footer() {
    const { accessToken } = useSelector(state => state.auth)
    const [queuedSong, setQueuedSong] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const [isUpdatedViews, setIsUpdatedViews] = useState(false)
    const [currentTimeDisplay, setCurrentTimeDisplay] = useState("0:00");
    const [durationDisplay, setDurationDisplay] = useState("0:00");
    const { data: historyMusics, isLoading, isError, error, refetch } = useGetHistoryMusicListening("", accessToken);
    const { currentSong, isPlaying, handlePlaySong, audioRef } = useAudioPlayer();
    const videoRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [lastVolume, setLastVolume] = useState(1);
    useEffect(() => {

        const audio = audioRef.current;
        const video = videoRef.current;

        let isSyncing = false;

        const handleAudioSeek = () => {
            if (isSyncing) return;
            isSyncing = true;
            video.currentTime = audio.currentTime;
            setTimeout(() => (isSyncing = false), 100); // tránh vòng lặp
        };

        const handleVideoSeek = () => {
            if (isSyncing) return;
            isSyncing = true;
            audio.currentTime = video.currentTime;
            setTimeout(() => (isSyncing = false), 100);
        };



        const updateProgress = () => {
            const currentTime = audio.currentTime
            const duration = audio.duration || 0;
            const progressPercent = (currentTime / duration) * 100;
            setProgress(progressPercent);
            setCurrentTimeDisplay(formatTime(currentTime));

            if (currentTime >= 2 && !isUpdatedViews) { // Kiểm tra thời gian >= 30s và chưa cập nhật lượt nghe
                setIsUpdatedViews(true);
                updateViewsSong({
                    song_id: currentSong?.id
                }, accessToken)
            }

            if (currentSong?.duration) {
                setDurationDisplay(formatTime(duration));  // Sử dụng currentSong.duration
            }
        };
        if (audio) {
            audio.addEventListener("seeked", handleAudioSeek);
        }
        if (video) {
            video.addEventListener("seeked", handleVideoSeek);
        }
        audio.addEventListener("timeupdate", updateProgress);
        return () => {
            audio.removeEventListener("timeupdate", updateProgress);
            if (audio) audio.removeEventListener("seeked", handleAudioSeek);
            if (video) video.removeEventListener("seeked", handleVideoSeek);
        };
    }, [audioRef, videoRef, currentSong, isUpdatedViews]);

    useEffect(() => {
        setIsUpdatedViews(false);  // Mỗi khi currentSong đổi, reset cờ
    }, [currentSong?.id]);


    const audio = audioRef.current;

    const currentTime = audio.currentTime;

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const togglePlay = () => {
        if (!currentSong && queuedSong) {
            handlePlaySong(queuedSong);
        } else {
            handlePlaySong(currentSong);
        }
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play().catch(err => {
                    console.warn("Video play bị chặn:", err);
                });
            }
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

    useEffect(() => {
        if (showVideo && videoRef.current && audioRef.current) {
            const video = videoRef.current;
            video.muted = true;
            const audio = audioRef.current;

            const syncAndPlayVideo = () => {
                const onCanPlay = () => {
                    video.currentTime = audio.currentTime; // Đồng bộ thời gian
                    video.play().catch(err => {
                        console.warn("Không thể phát video:", err);
                    });

                    // Cleanup listener sau khi chạy
                    video.removeEventListener("canplay", onCanPlay);
                };

                video.addEventListener("canplay", onCanPlay);
            };

            syncAndPlayVideo();
        }
    }, [showVideo]);

    useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;

        if (!video || !audio) return;

        const handleVideoPause = () => {
            if (!audio.paused) {
                audio.pause();
            }
        };

        const handleVideoPlay = () => {
            if (audio.paused) {
                audio.play().catch(err => {
                    console.warn("Không thể phát audio khi video play:", err);
                });
            }
        };

        video.addEventListener("pause", handleVideoPause);
        video.addEventListener("play", handleVideoPlay);

        return () => {
            video.removeEventListener("pause", handleVideoPause);
            video.removeEventListener("play", handleVideoPlay);
        };
    }, [showVideo]);


    useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;

        if (!video || !audio) return;

        let ignoreInitialSync = true; // ✅ Cờ để tránh chạy effect khi vừa mở video lần đầu

        const handleVideoPause = () => {
            if (!ignoreInitialSync && !audio.paused) {
                audio.pause();
            }
        };

        const handleVideoPlay = () => {
            if (!ignoreInitialSync && audio.paused) {
                audio.play().catch(err => {
                    console.warn("Không thể phát audio khi video play:", err);
                });
            }
        };

        video.addEventListener("pause", handleVideoPause);
        video.addEventListener("play", handleVideoPlay);

        // ✅ Bỏ qua lần đầu trong khoảng 500ms
        const timeout = setTimeout(() => {
            ignoreInitialSync = false;
        }, 500);

        return () => {
            clearTimeout(timeout);
            video.removeEventListener("pause", handleVideoPause);
            video.removeEventListener("play", handleVideoPlay);
        };
    }, [showVideo]);

    // useEffect(() => {
    //     const video = videoRef.current;
    //     if (video) {
    //         video.volume = volume;
    //         video.muted = muted;
    //     }
    // }, [volume, muted]);


    // useEffect(() => {
    //     const video = videoRef.current;
    //     const audio = audioRef.current;

    //     if (!video || !audio) return;

    //     const handleVolumeChange = () => {
    //         const newVolume = video.volume;
    //         const isMuted = video.muted;

    //         setVolume(newVolume);
    //         setMuted(isMuted);
    //         if (newVolume > 0) setLastVolume(newVolume);

    //         audio.volume = newVolume;
    //         audio.muted = isMuted;
    //     };

    //     video.addEventListener("volumechange", handleVolumeChange);

    //     return () => {
    //         video.removeEventListener("volumechange", handleVolumeChange);
    //     };
    // }, [showVideo]);



    const handleViewVideo = async () => {
        const isCheckPremium = await checkPremium("", accessToken)
        if (isCheckPremium?.data?.is_premium) {
            setShowVideo(!showVideo)
        }
        else {
            toast.error("Vui lòng chọn gói premium để tận hưởng chức năng này")
        }
    };

    const handleNext = () => {
        if (!historyMusics?.data || historyMusics?.data?.length === 0) return;
        const currentIndex = historyMusics.data.findIndex(item => item.song.id === currentSong?.id);
        const nextSong = historyMusics.data[currentIndex + 1] || historyMusics.data[0]; // Chuyển đến bài hát tiếp theo, nếu không có bài tiếp theo thì quay lại bài đầu
        handlePlaySong(nextSong.song); // Phát bài hát mới
        if (videoRef.current) {
            videoRef.current.pause();  // Pause the video
            videoRef.current.currentTime = 0;  // Reset to the beginning
            videoRef.current.load();  // Reload the video source
        }
    };

    const handlePrevious = () => {
        if (!historyMusics?.data || historyMusics?.data?.length === 0) return;
        const currentIndex = historyMusics.data.findIndex(item => item.song.id === currentSong?.id);
        const prevSong = historyMusics.data[currentIndex - 1] || historyMusics.data[historyMusics.data.length - 1]; // Quay lại bài trước, nếu không có bài trước thì chuyển đến bài cuối
        handlePlaySong(prevSong.song); // Phát bài hát mới
        if (videoRef.current) {
            videoRef.current.pause();  // Pause the video
            videoRef.current.currentTime = 0;  // Reset to the beginning
            videoRef.current.load();  // Reload the video source
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;

        if (!video || !audio || !currentSong?.video_url) return;

        // Cập nhật src thủ công
        video.pause();
        video.src = currentSong.video_url;
        video.load();

        video.onloadedmetadata = () => {
            video.currentTime = audio.currentTime;
            video.play().catch(err => {
                console.warn("Không thể phát video mới:", err);
            });
        };

    }, [currentSong?.video_url]);



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
                    <SkipBack onClick={handlePrevious} size={20} className="text-[#A9A9A9]" />
                    <button onClick={togglePlay}>
                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                    <SkipForward onClick={handleNext} size={20} className="text-[#A9A9A9]" />
                    <Repeat size={20} className="text-[#A9A9A9]" />
                </div>

                <div className="self-start">
                    <CirclePlus size={18} />
                </div>
                <div className="w-5/6 flex items-center">
                    <span className="text-xs text-gray-400">{currentTimeDisplay}</span>
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
                    <span className="text-xs text-gray-400">
                        {/* {currentSong ? switchDurationVideo(currentSong?.duration) : "0:00"} */}
                        {durationDisplay}
                    </span>
                </div>
            </div>


            {/* Thanh tiến trình và các nút khác */}
            <div className="flex items-center space-x-4">

                <button onClick={() => handleViewVideo()}>
                    <SquarePlay size={20} />
                </button>
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

            <div className={`fixed bottom-24 right-4 w-[30%] transition-transform duration-500 ${showVideo ? 'translate-x-0' : 'translate-x-[200%]'}`}>
                {currentSong?.video_url ? (
                    <video
                        ref={videoRef}
                        muted
                        controls
                        onLoadedMetadata={() => {
                            const video = videoRef.current;
                            const audio = audioRef.current;
                            if (video && audio) {
                                video.currentTime = audio.currentTime; // Đồng bộ thời gian
                                video.play().catch(err => {
                                    console.warn("Không thể phát video:", err);
                                });
                            }
                        }}
                        className="rounded-lg shadow-md w-full"
                    >
                        <source src={currentSong?.video_url} type="video/mp4" />
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>

                ) : (
                    <div className="bg-black text-white p-4 rounded-lg shadow-md">
                        <h2>Bài hát này không tồn tại video</h2>
                    </div>
                )}
            </div>

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
