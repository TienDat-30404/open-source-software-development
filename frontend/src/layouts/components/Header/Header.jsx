import React from 'react';
import { Search, House, Bell } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import SearchComponent from '../../../components/SearchComponent';
import { Link } from 'react-router-dom';
export default function Header() {
  const navigate = useNavigate()
  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-black text-white flex items-center justify-between shadow-lg z-50 px-4">
      <div className="flex items-center space-x-4">
        <div
          className="w-8 h-8 "
          onClick={() => navigate('/')}
        >
          <img src="https://tse2.mm.bing.net/th?id=OIP.fkSXxvt9TDjfoykMqGhrWAHaHa&pid=Api&P=0&h=180" alt="Spotify Logo" className="w-full h-full" />
        </div>

        <div
          className='bg-[#282828] rounded-full p-3'>
          <House />
        </div>

        <SearchComponent
          background="bg-[#282828]"
          placeholder="Bạn muốn phát nội dung gì"
          width="5"
          height="5"
          isRounded
        />

      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/premium"
          className="bg-white text-black rounded-full py-1 px-3 font-semibold">
          Khám phá Premium
        </Link>
        <button className="text-gray-400">Cài đặt ứng dụng</button>
        <Bell />
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          T
        </div>
      </div>
    </div>

  );
}