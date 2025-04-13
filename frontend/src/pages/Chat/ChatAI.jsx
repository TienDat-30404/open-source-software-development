import React, { useEffect, useState } from 'react'
import { chatWithAI } from '../../services/SongService'
import AnimationAI from '../../components/Element/AnimationAI'
import './Chat.scss'
import { Loader2Icon, MoveRight } from 'lucide-react'
import { useAskQuestionAI, useGetHistoryChatAi } from '../../hooks/useChatAi'
import LoadingResponseChatAI from '../../components/Element/LoadingResponseChatAI'
export default function ChatAI({ show, onCloseChatAi }) {
  const userId = "375039d7-32ac-4c2c-b2c7-fd3708b45d4a"
  const query = `/?user=${userId}`
  const { data: historyChat, isLoading, isError, error, refetch } = useGetHistoryChatAi(query)
  const askQuestionMutation = useAskQuestionAI()
  const [message, setMessage] = useState("")
  const [statusResponse, setStatusResponse] = useState(false)
  const handleSendRequest = async() => {
    if (!message.trim()) return;
    setStatusResponse(true)
    askQuestionMutation.mutate({
      query : message,
      user : userId
    })
  }
  return (
    <div className={`${show ? 'flex' : 'hidden'} background-chat-ai  top-20  text-gray-300 p-2  flex flex-col`}>
      <div className='h-450px overflow-auto'>
        <div className='p-2  hover:text-gray-500 cursor-pointer'>
          <MoveRight
            size={30}
            className='text-black'
            onClick={onCloseChatAi}

          />
          
        </div>
        {/* <AnimationAI /> */}
      
        {historyChat && historyChat?.data?.length > 0 ? historyChat?.data?.map((item, index) => (
          <div>
            <h2 className="font-bold text-black">{item?.key_search}</h2>
            <p key={index} className="text-black mt-2">{item?.content}</p>
          </div>

        )) :
          <h2></h2>
        }

        {statusResponse && !askQuestionMutation.isSuccess &&  (
          <LoadingResponseChatAI />
        )}
      </div>

      <div className='mt-auto p-4 '>
        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSendRequest();
            }
          }}
          rows="4" 
          class=" block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
        >

        </textarea>
      </div>
    

    </div>
  )
}
