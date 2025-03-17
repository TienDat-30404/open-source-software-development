import { useState, useEffect, useRef } from "react";

export default function useSelectedSong() {
    const [selectedSong, setSelectedSong] = useState({
        menuVisible: false,
        idSong: null,
    });

    const [hoveringSong, setHoveringSong] = useState(null)



    const handleSelectedSong = (e, idSong) => {
        e.preventDefault();
        setSelectedSong({
            menuVisible: true,
            idSong,
        });
    };

    const handleClickOutside = () => {
        if (selectedSong.menuVisible) return;
        setSelectedSong({
            menuVisible: false,
            idSong: null
        })
    };
    return { selectedSong, handleSelectedSong, handleClickOutside, hoveringSong, setHoveringSong };
}
