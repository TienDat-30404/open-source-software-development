import { useEffect, useState, useRef, Fragment } from "react";
import styled from 'styled-components';
import TextAnimation from "../../components/Element/TextAnimation";
import './ChatRoom.scss';
import { useSelector } from "react-redux";
import { getMessageByRoom } from "../../services/RoomService";
export default function ChatRoom({ roomName, onCloseRoom }) {

  const {auth, accessToken} = useSelector(state => state.auth)
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(auth.username)
  }, [])

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const chatRef = useRef(null);

  // useEffect(() => {
  //   if (!roomName) return;
  //   const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
  //   setSocket(newSocket);

  //   newSocket.onopen = () => {
  //     console.log("WebSocket connected");
  //     setMessages([]);
  //     loadMessages(roomName);
  //   };

  //   newSocket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     setMessages((prev) => [
  //       ...prev,
  //       { username: data.username, message: data.message, timestamp: data.timestamp },
  //     ]);
  //   };

  //   newSocket.onclose = () => console.log("WebSocket disconnected");

  //   return () => newSocket.close();
  // }, [roomName]);


  // test 
  useEffect(() => {
    if (username && roomName) {
      // const newSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
      const newSocket = new WebSocket(`wss://${import.meta.env.VITE_API_URL}/ws/chat/${roomName}/`);

      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log("WebSocket connected");
        setMessages([]);
        loadMessages(roomName);
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prev) => [
          ...prev,
          { username: data.username, message: data.message, timestamp: data.timestamp },
        ]);
      };

      newSocket.onclose = () => console.log("WebSocket disconnected");

      return () => newSocket.close();
    }
  }, [roomName, username]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const loadMessages = async (room) => {
    try {
      // const response = await fetch(`http://127.0.0.1:8000/api/conversations/messages/${room}`);
      const res = await getMessageByRoom(room, "", accessToken)
      if(res.status === 'success')
      {
        setMessages(res.data.map((msg) => ({
          username: msg.username,
          message: msg.content,
          timestamp: msg.timestamp,
        })));
      }
      else {
        console.error("Invalid message response format:", res);
      }
     
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && socket) {
      const timestamp = new Date().toISOString();
      socket.send(JSON.stringify({ username, message, timestamp }));
      setMessage("");
    }
  };

  // Nhóm tin nhắn theo ngày
  const groupedMessages = messages.reduce((acc, msg) => {
    const date = new Date(msg.timestamp).toLocaleDateString("vi-VN");
    if (!acc[date]) acc[date] = [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <Fragment>

      <div className="w-[500px] background_room  fixed z-50 top-32 right-12  mx-auto bg-white dark:bg-zinc-800 shadow-md rounded-lg overflow-hidden">
        <div className="flex flex-col h-[400px] ">
          <div className="px-4 py-3 flex items-center justify-between border-b dark:border-zinc-700">
            <div className="flex space-x-2 items-center">
              <h2 className="text-[22px] font-semibold  ">Phòng:</h2>
              <TextAnimation text={roomName} />

            </div>
            <p
              onClick={onCloseRoom}
              className=" text-white text-[20px] p-2 hover:text-gray-500 cursor-pointer"
            >
              X
            </p>
          </div>

          <div ref={chatRef} className="flex-1 p-3 overflow-y-auto flex flex-col space-y-2">
            {Object.entries(groupedMessages).map(([date, msgs]) => (
              <div key={date}>
                <div className="text-center text-xs font-semibold text-gray-500 my-2">{date}</div>
                {msgs.map((msg, index) => {
                  const isMine = msg.username === username;
                  const showAvatar = index === 0 || msgs[index - 1].username !== msg.username;

                  return (
                    <div className={` flex ${isMine ? 'justify-end' : 'justify-start'}`}>

                      <div key={index} className={`chat-message  max-w-[70%] rounded-lg px-3 py-1.5 text-sm`}>
                        {!isMine && showAvatar && (
                          <div className="flex items-center mb-1">
                            <img
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${msg.username}`}
                              alt="Avatar"
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <div className="text-sm font-semibold text-gray-600">{msg.username}</div>
                          </div>
                        )}

                        <div className={`px-3 py-2  break-words  rounded-lg shadow ${isMine ? "bg-blue-500 text-white" : "bg-white text-black break-words"}`}>
                          {msg.message}
                        </div>

                        <div className="text-xs text-gray-700 mt-1 text-right">
                          {new Date(msg.timestamp).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="px-3 py-2 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 p-2 border rounded-lg dark:bg-zinc-700 text-black  dark:border-zinc-600 text-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-lg transition duration-300 ease-in-out text-sm"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>

    
    </Fragment>
  )
}

