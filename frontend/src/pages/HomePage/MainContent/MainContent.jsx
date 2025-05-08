import React, { Fragment, useState } from 'react'
import Radio from './Radio'
import Artist from './Artist'
import Album from './Album'
import Song from './Song'
import IconChat from '../../../components/Element/IconChat'
import RoomsPage from '../../Room/RoomsPage'
import IconAi from '../../../components/Element/IconAi'
import ChatAI from '../../Chat/ChatAI'
import TopSongs from './TopSongs'
import { useGetAllCatgory } from '../../../hooks/useCategory'
export default function MainContent() {
  const [showRoom, setShowRoom] = useState(false)
  const [showChatAI, setShowChatAI] = useState(false)
  const { data: categories } = useGetAllCatgory("");
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <div className='p-4'>
      <div className="flex space-x-4 mb-8">
        <button className="bg-white text-black rounded-full p-2  font-semibold">Tất cả</button>
        {categories && categories.results?.length > 0 &&
          categories.results.map((category, index) => (
            <Fragment key={index}>
              <button
                onClick={() => setSelectedCategory(category?.id)}
                className="text-white p-2 bg-[#282828] rounded-full">
                {category?.name}
              </button>
            </Fragment>
          ))}

      </div>
      <div className="flex items-center justify-between mb-8 ">
        <h2 className="text-2xl font-bold">Radio phổ biến</h2>
      </div>
      
      <div
        onClick={() => setShowRoom(!showRoom)}
        className='fixed z-20 top-20 right-10'
      >
        <IconChat />
      </div>
      <div
        className='fixed z-20 top-40 right-10 cursor-pointer'
        onClick={() => setShowChatAI(!showChatAI)}
      >
        <IconAi />
      </div>
      <RoomsPage show={showRoom} />
      <Song selectedCategory={selectedCategory} />
      <TopSongs />
      <Album />
      <Artist />
      <ChatAI show={showChatAI} onCloseChatAi={() => setShowChatAI(false)} />
    </div>
  )
}
