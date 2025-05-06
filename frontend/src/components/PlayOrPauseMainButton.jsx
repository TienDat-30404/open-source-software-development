import { Play, Pause } from "lucide-react";

export default function PlayOrPauseMainButton({ isPlaying, currentSong, songDefault, handlePlaySong }) {
  const handlePlayMusic = () => {
    if(currentSong !== null)
    {
        handlePlaySong(currentSong)
    }
    else 
    {
      handlePlaySong(songDefault)
    }
   
  }
  return (
    <div className="bg-[#1DB954] rounded-full cursor-pointer">
      {isPlaying ? (
        <Pause onClick={() => handlePlayMusic()} className="w-10 h-7" />
      ) : (
        <Play onClick={() => handlePlayMusic()} className="w-10 h-7" />
      )}
    </div>
  );
}
