import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);
  const [editName, setEditName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/conversations/rooms');
      const data = await res.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        setRooms(data.data);
      }
    } catch (err) {
      console.error('Error fetching rooms:', err);
    }
  };

  const handleAddRoom = async () => {
    if (!newRoom.trim()) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/conversations/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newRoom }),
      });

      if (res.ok) {
        const newRoomData = await res.json(); // Nhận dữ liệu từ server
        setRooms((prevRooms) => [...prevRooms, newRoomData.data]); // Cập nhật state rooms
        setNewRoom('');
      }
    } catch (err) {
      console.error('Error adding room:', err);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa phòng này?')) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/conversations/rooms/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (res.ok) {
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
      }
    } catch (err) {
      console.error('Error deleting room:', err);
    }
  };

  const handleUpdateRoom = async () => {
    if (!editName.trim()) return;
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/conversations/rooms/${editingRoom.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: editName }),
        }
      );

      if (res.ok) {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === editingRoom.id ? { ...room, name: editName } : room
          )
        );
        setEditingRoom(null);
        setEditName('');
      }
    } catch (err) {
      console.error('Error updating room:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        💬 Quản lý phòng
      </h2>

      {/* Thêm phòng */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          placeholder="Nhập tên phòng..."
          className="border rounded p-2"
        />
        <button
          onClick={handleAddRoom}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Thêm phòng
        </button>
      </div>

      {/* Bảng danh sách phòng */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Tên phòng</th>
              <th className="p-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-t">
                <td className="p-3">
                  {editingRoom?.id === room.id ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="border p-1 w-full"
                    />
                  ) : (
                    <span>{room.name}</span>
                  )}
                </td>
                <td className="p-3 flex gap-2 justify-center">
                  {editingRoom?.id === room.id ? (
                    <button
                      onClick={handleUpdateRoom}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Lưu
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingRoom(room);
                          setEditName(room.name);
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
