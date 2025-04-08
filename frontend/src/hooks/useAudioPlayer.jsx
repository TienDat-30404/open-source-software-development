import { useState, useRef, useEffect } from "react";

export default function useAudioPlayer() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const handlePlaySong = (song) => {
    const audio = audioRef.current;

    if (currentSong?.id === song.id) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else {
      setCurrentSong(song);
      audio.src = song.audio_url;
      audio.load();
      audio.play();
    }
  };

  return { currentSong, isPlaying, handlePlaySong, audioRef };
}
