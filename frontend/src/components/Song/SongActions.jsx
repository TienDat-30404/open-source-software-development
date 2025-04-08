import React, { useState, useRef, useEffect, Fragment } from "react";
import { CirclePlus, Ellipsis, Plus, ChevronRight } from "lucide-react";
import MenuItem from "../MenuItem";
import SongPlaylist from "./SongPlaylist";
export default function SongActions(
    { song,
        hoveringSong,
        switchDurationVideo,
        selectedSong,
        handleSelectedSong,
        clickOutside,
        menuItems
    }) {
    const [showAddPlaylist, setShowAddPlaylist] = useState(false)
    const menuRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                clickOutside() // Ẩn menu nếu click ra ngoài
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClick = (item) => {
        if (typeof item.onClick === 'function') {
          item.onClick(); 
        } else {
          console.warn('onClick is not a function for item:', item);
        }
      }
    return (
        <div className="flex items-center relative">
            <span className="pr-4">14.059.103</span>
            {hoveringSong === song.id && <CirclePlus size={17} className="pr-3 text-gray-300" />}
            <span className="pr-3">{switchDurationVideo(song.duration)}</span>
            {hoveringSong === song.id && <Ellipsis size={20} onClick={handleSelectedSong} />}

            {selectedSong?.menuVisible && selectedSong?.idSong === song.id && (
                <div ref={menuRef} className=" text-white rounded-md w-72 p-2 absolute bottom-10 right-0">
                    {showAddPlaylist && (
                        <SongPlaylist song={song} />
                    )}
                    {menuItems?.map((item, index) => (
                        <div
                            className="flex items-center w-100 bg-[#3E3E3E]"

                            onMouseEnter={() => {
                                if (item.isSubMenu) {
                                    setShowAddPlaylist(!showAddPlaylist);
                                }
                            }}
                        >
                            <MenuItem
                                icon={item.icon}
                                text={item.text}
                                handleClick={() => handleClick(item)} 
                                clickOutside={() => setShowAddPlaylist(false)}
                            />


                            {item.isSubMenu && <ChevronRight />}
                        </div>
                    ))}
                </div>
            )
            }
        </div >
    );
}

