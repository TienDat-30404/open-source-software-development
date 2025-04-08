import { useEffect, useState, useRef } from 'react';

export default function ChatApp() {
  const [username, setUsername] = useState('admin');
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [rooms, setRooms] = useState([]);
  const chatRef = useRef(null);


  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/conversations/rooms/')
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

  useEffect(() => {
    if (!roomName) return;

    const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
      setMessages([]);
      loadMessages(roomName);
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          message: data.message,
          timestamp: data.timestamp,
        },
      ]);
    };

    newSocket.onclose = () => console.log('WebSocket disconnected');

    return () => newSocket.close();
  }, [roomName]);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const loadMessages = async (room) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/conversations/messages/${room}`
      );
      const data = await response.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        setMessages(
          data.data.map((msg) => ({
            username: msg.username,
            message: msg.content,
            timestamp: msg.timestamp,
          }))
        );
      } else {
        console.error('Invalid message response format:', data);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleSendMessage = () => {
    console.log(socket)
    if (message.trim() && socket) {
      const timestamp = new Date().toISOString();
      socket.send(JSON.stringify({ username, message, timestamp }));
      setMessage('');
    }
  };

  // 💡 Nhóm tin nhắn theo ngày
  const groupedMessages = messages.reduce((acc, msg) => {
    const date = new Date(msg.timestamp).toLocaleDateString('vi-VN');
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div className={` p-4 max-w-lg mx-auto bg-white shadow-lg rounded-lg`}>
      <h2 className="text-xl font-bold mb-2 text-center">💬 Nhóm Chat</h2>

      {/* Chọn phòng chat */}
      <select
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="border p-2 w-full mb-2 rounded-lg"
      >
        <option value="">Chọn nhóm</option>
        {rooms.map((room, index) => (
          <option key={index} value={room}>
            {room}
          </option>
        ))}
      </select>

      {/* Khung chat */}
      <div ref={chatRef} className="border p-2 h-96 overflow-y-auto bg-gray-100 rounded-lg">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Hiển thị ngày */}
            <div className="text-center text-xs font-semibold text-gray-500 my-2">
              {date}
            </div>
            {msgs.map((msg, index) => {
              const isMine = msg.username === username;
              const showAvatar = index === 0 || msgs[index - 1].username !== msg.username;

              return (
                <div key={index} className={`flex mb-2 ${isMine ? 'justify-end' : 'justify-start'}`}>
                  {!isMine && showAvatar && (
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.username}`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}

                  <div className="flex flex-col max-w-xs">
                    {!isMine && showAvatar && (
                      <div className="text-sm font-semibold text-gray-600 mb-1">
                        {msg.username}
                      </div>
                    )}

                    <div className={`px-3 py-2 rounded-2xl shadow ${isMine ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                      {msg.message}
                    </div>

                    {/* Hiển thị giờ nhắn (HH:mm) */}
                    <div className="text-xs text-gray-400 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Ô nhập tin nhắn */}
      <div className="flex items-center border-t pt-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white p-2 px-4 rounded-full shadow-md hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
}
