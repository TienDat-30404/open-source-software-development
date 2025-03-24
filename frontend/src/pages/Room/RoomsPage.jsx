import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/conversations/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && Array.isArray(data.data)) {
          setRooms(data.data.map((room) => room.name));
        } else {
          console.error("Invalid response format:", data);
        }
      })
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">💬 Danh sách phòng</h2>
      <ul className="space-y-2">
        {rooms.map((room, index) => (
          <li
            key={index}
            onClick={() => navigate(`/chat/${room}`)}
            className="p-3 bg-gray-100 hover:bg-blue-500 hover:text-white cursor-pointer rounded-lg"
          >
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
}
