import React from "react";
import { Play, Pause } from "lucide-react";

export default function SongInfo({song, index, isPlaying, currentSong, hoveringSong, handlePlaySong }) {
    return (
        <div className="flex items-center ">
            <div onClick={() => handlePlaySong(song)}>
                {currentSong?.id === song.id && isPlaying ? (
                    <Pause size={17} />
                ) : hoveringSong === song.id ? (
                    <Play size={17} />
                ) : (
                    <span className="pr-4 text-base">{index + 1}</span>
                )}
            </div>
            <img src={song.image} alt={song.name} className="w-18 h-10 rounded-md pr-2" />
            <span className={currentSong?.audio_url === song.audio_url ? "text-green-500 font-bold" : ""}>
                {song.title}
            </span>
        </div>
    );
}
