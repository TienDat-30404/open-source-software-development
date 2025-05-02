import React, { useState } from 'react';
import IconChat from '../../../components/Element/IconChat';
import IconAi from '../../../components/Element/IconAi';
import ChatAI from '../../Chat/ChatAI';
import RoomsPage from '../../Room/RoomsPage';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
export default function MusicPlayer() {
  const { id } = useParams();
  const [showRoom, setShowRoom] = useState(false);
  const [showChatAI, setShowChatAI] = useState(false);
  const [videoUrl, setVideoUrl] = useState(''); // URL video mẫu
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/songs/${id}`
        );
        setVideoUrl(response.data.video_url);
        alert(videoUrl);
      } catch (error) {
        console.error('Lỗi khi tải video:', error);
      }
    };

    if (id) {
      fetchVideoUrl();
    }
  }, [id]);
  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button className="bg-white text-black rounded-full p-2 font-semibold">
          Tất cả
        </button>
        <button className="text-white p-2 bg-[#282828] rounded-full">
          Âm nhạc
        </button>
        <button className="text-white p-2 bg-[#282828] rounded-full">MV</button>
      </div>

      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Trình phát nhạc</h2>
      </div>

      {/* Video Player */}
      <div className="w-full max-w-4xl mx-auto mb-12">
        <video controls className="w-full rounded-xl shadow-lg">
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>

      {/* Nút mở chat và AI */}
      <div
        onClick={() => setShowRoom(!showRoom)}
        className="fixed z-20 top-20 right-10 cursor-pointer"
      >
        <IconChat />
      </div>
      <div
        onClick={() => setShowChatAI(!showChatAI)}
        className="fixed z-20 top-40 right-10 cursor-pointer"
      >
        <IconAi />
      </div>

      {/* Các component phụ */}
      <RoomsPage show={showRoom} />
      <ChatAI show={showChatAI} onCloseChatAi={() => setShowChatAI(false)} />
    </div>
  );
}
