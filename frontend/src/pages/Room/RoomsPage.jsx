import React, { Fragment, useState } from 'react';
import LoadingForRoom from '../../components/Element/LoadingForRoom';
import { useCreateRoom, useDeleteRoom, useGetAllRoom } from '../../hooks/useRoom';
import { formatTime } from '../../until/function';
import ChatRoom from '../Chat/ChatRoom';
import './Room.scss'
export default function RoomsPage({ show }) {
  const [selectedRoom, setSelectedRoom] = useState(false)
  const [roomName, setRoomName] = useState(null)
  const [addNameRoom, setAddNameRoom] = useState('')
  const { data: rooms, isLoading, isError, error, refetch } = useGetAllRoom("");
  const createRoomMutation = useCreateRoom();
  const deleteRoomMutation = useDeleteRoom()
  const handleEnterRoom = (roomName) => {
    setSelectedRoom(true)
    setRoomName(roomName)
  }

  const handleCloseRoom = () => {
    setSelectedRoom(false);
    setRoomName(null);
  }

  const handleCreateRoom = async () => {
    createRoomMutation.mutate({
      name: addNameRoom,
      user: "3cb043a1-3ed1-4844-a6a4-b7ac3e27ac30"
    })
    setAddNameRoom('')
  }

  const handleDeleteRoom = async(id) => {
    deleteRoomMutation.mutate(id)
  }
  return (
    <Fragment>

      <div className={`${show && !roomName ? 'block' : 'hidden'}   fixed z-50 top-32 right-12 max-h-[400px] w-[600px]  bg-gray-800 text-gray-300 h-screen flex flex-col`}>
        <div className="bg-gray-900 p-3 flex items-center">
          <LoadingForRoom />
          <h1 className="text-[14px] font-bold text-white mr-4">Danh sách phòng chat</h1>

        </div>

        <div className="add_room">
          <input
            value={addNameRoom}
            onChange={(e) => setAddNameRoom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleCreateRoom();
              }
            }}
            type="value" />
          <label className=''>
            <span style={{ transitionDelay: '350ms' }}>T</span>
            <span style={{ transitionDelay: '350ms' }}>ạ</span>
            <span style={{ transitionDelay: '300ms' }}>o</span>
            <span style={{ transitionDelay: '300ms' }}></span>

            <span style={{ transitionDelay: '250ms' }}>P</span>
            <span style={{ transitionDelay: '200ms' }}>h</span>
            <span style={{ transitionDelay: '150ms' }}>ò</span>
            <span style={{ transitionDelay: '100ms' }}>n</span>
            <span style={{ transitionDelay: '50ms' }}>g</span>
          </label>
        </div>

        {/* Danh sách tin nhắn */}
        <div className="flex-grow overflow-y-auto p-4">
          {rooms && rooms?.data?.map((room, index) => (
            <div className='flex justify-between'>
              <div key={index} className="flex items-start mb-3">
                <img
                  src="https://thumbs.dreamstime.com/z/student-avatar-illustration-user-profile-icon-youth-avatar-student-avatar-illustration-simple-cartoon-user-portrait-user-profile-276205531.jpg"
                  className="w-10 h-12 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="font-semibold text-white">{room?.name}</span>
                    <span className="text-xs text-gray-500 ml-1">{formatTime(room?.created_at)}</span>
                  </div>
                  <p className="text-sm">Người tạo : I am Chater</p>
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => handleEnterRoom(room?.name)}
                  className="bg-blue-500 hover:bg-blue-700 text-[13px] text-white font-bold py-1 px-6 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Vào phòng
                </button>


                <button
                  onClick={() => handleDeleteRoom(room?.id)}
                  className="bg-red-500 hover:bg-red-700 text-[13px] text-white font-bold py-1 px-6 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Xóa phòng
                </button>

                {/* <button
                  onClick={() => handleDeleteRoom(room?.id)}
                  className="bg-green-500 hover:bg-green-700 text-[13px] text-white font-bold py-1 px-6 rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Sửa
                </button> */}
              </div>

            </div>
          ))}
        </div>

      </div>
      {selectedRoom && (
        <ChatRoom roomName={roomName} onCloseRoom={handleCloseRoom} />
      )}


    </Fragment>
  );
}
