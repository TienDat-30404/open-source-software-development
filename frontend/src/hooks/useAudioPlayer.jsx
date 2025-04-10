
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const AudioPlayerContext = createContext();
import { useSaveHistoryListeningMusic } from './useMusicListeningHistory';
export const useAudioPlayer = () => {
  return useContext(AudioPlayerContext);
};

export const AudioPlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const savedHistoryListeningMusicMutation = useSaveHistoryListeningMusic();

  // Handle play/pause and song change
  const handlePlaySong = (song) => {
    const audio = audioRef.current;
    if (currentSong?.id === song.id) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      savedHistoryListeningMusicMutation.mutate({
        song_id : song?.id
      })
      setIsPlaying(false);
      setCurrentSong(song);
      audio.src = song.audio_url;
      audio.load();
      audio.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <AudioPlayerContext.Provider value={{ currentSong, isPlaying, handlePlaySong, audioRef }}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
