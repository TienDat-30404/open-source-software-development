import React, { useState } from 'react'
import { chatWithAI } from '../../services/SongService'

export default function ChatAI({ show, onCloseChatAi }) {

  const [responseAI, setReponseAI] = useState("")
  const [message, setMessage] = useState("")
  const handleSendRequest = async () => {
    const fetchData = async () => {
      const querySearch = `/?query=${message}`
      const response = await chatWithAI(querySearch)
      console.log('response', response)
      setReponseAI(response)
    }
    fetchData()
  }
  return (
    <div className={`${show ? 'flex' : 'hidden'} fixed z-50 top-32 right-12 max-h-[400px] w-[600px]  bg-gray-800 text-gray-300 h-screen flex flex-col`}>
      <input
        className='text-black'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
      />
      <p
        className=" text-white text-[20px] p-2 hover:text-gray-500 cursor-pointer"
        onClick={onCloseChatAi}
      >
        X
      </p>
      <button
        onClick={() => handleSendRequest()}
      >
        Gửi
      </button>
      {responseAI?.status === 200 && responseAI?.suggestions?.length > 0 ? (
        <div className="mt-4">
          <h2 className="font-bold text-white">Bài nào có liên quan đến từ khóa : {message}:</h2>
          {responseAI.suggestions.map((content, index) => (
            <p key={index} className="text-white mt-2">{content}</p>
          ))}
        </div>
      ) : (
        responseAI?.status === 200 && <p className="text-white mt-2">Không có gợi ý nào.</p>
      )}
    </div>
  )
}
