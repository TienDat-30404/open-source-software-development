import { Play, Pause } from "lucide-react";

export default function PlayOrPauseMainButton({ isPlaying, currentSong, handlePlaySong, audioRef, defaultSong }) {
  const handleClick = () => {
    console.log(isPlaying)
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      handlePlaySong(currentSong || defaultSong);
    }
  };

  return (
    <div className="bg-[#1DB954] rounded-full cursor-pointer">
      {isPlaying ? (
        <Pause onClick={handleClick} className="w-10 h-7" />
      ) : (
        <Play onClick={handleClick} className="w-10 h-7" />
      )}
    </div>
  );
}
