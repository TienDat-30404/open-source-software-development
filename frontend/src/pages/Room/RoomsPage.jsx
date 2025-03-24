import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/conversations/rooms')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success' && Array.isArray(data.data)) {
          setRooms(data.data.map((room) => room.name));
        } else {
          console.error('Invalid response format:', data);
        }
      })
      .catch((err) => console.error('Error fetching rooms:', err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      {/* Tiêu đề */}
      <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-8">
        💬 Danh sách phòng
      </h2>

      {/* Lưới danh sách phòng */}
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow-lg rounded-2xl flex flex-col items-center justify-between text-lg font-semibold text-gray-700 transition duration-300 hover:shadow-2xl"
          >
            <span className="mb-4 text-xl">{room}</span>
            <button
              onClick={() => navigate(`/chat/${room}`)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md transition duration-300 hover:bg-blue-600 hover:scale-105"
            >
              Tham gia phòng
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
