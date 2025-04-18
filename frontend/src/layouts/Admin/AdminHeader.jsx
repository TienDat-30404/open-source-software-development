import React from 'react'
import { Search, ChevronDown } from 'lucide-react'
import SwitchScreenBackground from '../../components/Element/SwitchScreenBackground'
export default function
  () {
  return (
    <div className="bg-white h-20 px-6 flex items-center justify-between shadow-sm">
      {/* Ô tìm kiếm */}
      <div className="flex items-center space-x-2">
        <Search size={20} className='text-gray-500' />
        <input
          type="text"
          placeholder="Type to search..."
          className="border-none outline-none text-sm text-gray-600 placeholder-gray-400 w-64"
        />
      </div>

      {/* Các biểu tượng và thông tin người dùng */}
      <div className="flex items-center space-x-4">
        {/* Chế độ tối/sáng (cần xử lý logic chuyển đổi) */}
        <SwitchScreenBackground />

        {/* Thông báo (cần xử lý logic thông báo) */}
        <div className="relative">
          <button className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 13h12a1 1 0 00.707-.293L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {/* Số lượng thông báo */}3
          </span>
        </div>

        {/* Tin nhắn (cần xử lý logic tin nhắn) */}
        <div className="relative">
          <button className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6-2h-2v2h2V6z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {/* Số lượng tin nhắn */}1
          </span>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex items-center">
          <div className="text-right">
            <h6 className="text-sm font-semibold text-gray-700">Thomas Arena</h6>
          </div>
          <div className="ml-3 flex items-center space-x-1 cursor-pointer">
            <img
              src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png" // Thay thế bằng URL ảnh thật
              alt="User Avatar"
              className="rounded-full h-10 w-10 object-cover"
            />
            {/* Dropdown arrow */}
            <ChevronDown size={16} className='text-gray-500' />
          </div>
        </div>
      </div>
    </div>
  )
}
