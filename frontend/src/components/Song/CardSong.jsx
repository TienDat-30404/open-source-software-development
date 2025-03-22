import React from "react";
import SongActions from "./SongActions";
import SongInfo from "./SongInfo";
export default function CardSong({
    song,
    index,
    currentSong,
    isPlaying,
    hoveringSong,
    setHoveringSong,
    handlePlaySong,
    switchDurationVideo,
    selectedSong,
    handleSelectedSong,
    clickOutside,
    menuItems
}) {
    return (
        <div
            key={song.id}
            className="flex items-center justify-between cursor-pointer hover:bg-[#424141] py-2 rounded-lg"
            onMouseEnter={() => setHoveringSong(song.id)}
            onMouseLeave={() => setHoveringSong(null)}
        >
            {/* Thông tin bài hát */}
            <SongInfo
                index={index}
                isPlaying={isPlaying}
                currentSong={currentSong}
                hoveringSong={hoveringSong}
                song={song}
                handlePlaySong={handlePlaySong}
            />

            {/* Hành động bài hát */}
            <SongActions
                song={song}
                hoveringSong={hoveringSong}
                switchDurationVideo={switchDurationVideo}
                selectedSong={selectedSong}
                handleSelectedSong={handleSelectedSong}
                clickOutside={clickOutside}
                menuItems={menuItems}
            />
        </div>
    );
}
