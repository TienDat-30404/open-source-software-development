import { useState, useRef, useEffect } from "react";

export default function useAudioPlayer() {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;
        const handleEnded = () => {
            setIsPlaying(false);
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, []);

    const handlePlaySong = (song) => {
        if (currentSong?.id === song.id) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            setCurrentSong(song);
            audioRef.current.src = song.audio_url;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return { currentSong, isPlaying, handlePlaySong, audioRef };
}
