import React, { useState } from 'react';
import ChatAI from './ChatAI';
import RoomsPage from '../Room/RoomsPage';
import IconChat from '../../components/Element/IconChat';
import IconAi from '../../components/Element/IconAi';

export default function AiPromptPlayer() {
  const [showRoom, setShowRoom] = useState(false);
  const [showChatAI, setShowChatAI] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async () => {
    setLoading(true);
    setAiResponse('');
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/plans/search/art', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
  
      if (!response.ok) {
        throw new Error('Phản hồi không hợp lệ từ server.');
      }
  
      const data = await response.json();
  
      // Gán nội dung trả về từ Django (trường ai_response)
      setAiResponse(data.ai_response || 'Không có phản hồi từ AI.');
    } catch (error) {
      setAiResponse('Đã xảy ra lỗi khi gửi yêu cầu.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 mb-8">
        <button className="bg-white text-black rounded-full p-2 font-semibold">
          Tất cả
        </button>
        <button className="text-white p-2 bg-[#282828] rounded-full">AI</button>
        <button className="text-white p-2 bg-[#282828] rounded-full">Khác</button>
      </div>

      {/* Tiêu đề */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Trò chuyện với AI về nghệ sĩ</h2>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <textarea
          className="w-full p-4 rounded-lg border bg-[#1e1e1e] text-white"
          rows="4"
          placeholder="Nhập câu hỏi về nghệ sĩ..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>
        <button
          onClick={handleSendPrompt}
          className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Gửi đến AI
        </button>
      </div>

      {/* Kết quả */}
      <div className="p-4 bg-[#121212] text-white rounded-lg min-h-[100px]">
        {loading ? 'Đang phản hồi...' : aiResponse || 'Chưa có phản hồi.'}
      </div>

      {/* Nút chat + AI */}
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
