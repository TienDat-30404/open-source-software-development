import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);
  const [message, setMessage] = useState(null); // Lưu thông báo
  const [messageType, setMessageType] = useState('success'); // success | error
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
      showMessage('Lỗi tải danh sách phòng!', 'error');
    }
  };

  const handleAddOrUpdateRoom = async () => {
    if (!roomName.trim()) {
      showMessage('Tên phòng không được để trống!', 'error');
      return;
    }

    if (editingRoom) {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/conversations/rooms/${editingRoom.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: roomName }),
          }
        );

        if (res.ok) {
          setRooms((prevRooms) =>
            prevRooms.map((room) =>
              room.id === editingRoom.id ? { ...room, name: roomName } : room
            )
          );
          showMessage('Cập nhật phòng thành công!', 'success');
          setEditingRoom(null);
          setRoomName('');
        } else {
          showMessage('Cập nhật phòng thất bại!', 'error');
        }
      } catch (err) {
        showMessage('Lỗi kết nối khi cập nhật phòng!', 'error');
      }
    } else {
      try {
        const res = await fetch(
          'http://127.0.0.1:8000/api/conversations/rooms',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: roomName }),
          }
        );

        if (res.ok) {
          const newRoomData = await res.json();
          setRooms((prevRooms) => [...prevRooms, newRoomData.data]);
          setRoomName('');
          showMessage('Thêm phòng thành công!', 'success');
        } else {
          showMessage('Thêm phòng thất bại!', 'error');
        }
      } catch (err) {
        showMessage('Lỗi kết nối khi thêm phòng!', 'error');
      }
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
        showMessage('Xóa phòng thành công!', 'success');
      } else {
        showMessage('Xóa phòng thất bại!', 'error');
      }
    } catch (err) {
      showMessage('Lỗi kết nối khi xóa phòng!', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        💬 Quản lý phòng
      </h2>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded text-white ${
            messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg overflow-auto mb-6 max-h-96">
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
                <td className="p-3">{room.name}</td>
                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setEditingRoom(room);
                      setRoomName(room.name);
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 items-center mt-4">
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Nhập tên phòng..."
          className="border rounded p-2 w-64"
        />
        <button
          onClick={handleAddOrUpdateRoom}
          className={`px-3 py-1 rounded text-white ${
            editingRoom
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {editingRoom ? 'Lưu' : 'Thêm phòng'}
        </button>
        {editingRoom && (
          <button
            onClick={() => {
              setEditingRoom(null);
              setRoomName('');
            }}
            className="px-3 py-1 rounded bg-gray-500 text-white hover:bg-gray-600"
          >
            Hủy
          </button>
        )}
      </div>
    </div>
  );
}
