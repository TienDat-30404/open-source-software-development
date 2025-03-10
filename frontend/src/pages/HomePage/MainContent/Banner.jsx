import React from 'react'
import { useState, useEffect } from 'react'
export default function Banner() {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/songs/');
        if (!response.ok) throw new Error("API response was not ok");
        const data = await response.json();
        setDatas(data)
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [])
  return (
    <div>
      {datas.songs?.length > 0 && datas.songs.map((song, index) => (
        <div key={song.id} className="song-item">
          <img src={song.image} alt={song.title} className="song-image" />
          <div className="song-info">
            <h3 className="song-title">{song.title}</h3>
            {song?.artists?.map((artist, index) => (
              <p className="song-artist">{artist?.name}</p>
            ))}
          </div>
          <span className="song-duration">{song.duration}</span>
          {/* <button className="play-button" onClick={() => handlePlayPause(song)}>
            {currentSong === song.id && isPlaying ? "⏸" : "▶️"}
          </button> */}
           <audio controls>
            <source src={song?.audio_url} type="audio/mpeg" />
            Trình duyệt của bạn không hỗ trợ phát nhạc.
          </audio>

        </div>
      ))}
    </div>
  )
}
