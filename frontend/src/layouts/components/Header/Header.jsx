import React, { useState } from 'react';
import { Search, House, Bell } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/authSlice';
import { persistor } from '../../../redux/store';
import { LogOut, Settings } from 'lucide-react';
export default function Header() {
  const dispatch = useDispatch()
  const { auth, isAuthenticated } = useSelector(state => state.auth)
  const [search, setSearch] = useState('')
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const navigate = useNavigate()

  const handleClickLogout = async () => {
    try {
      // Dispatch logout action để xóa state trong Redux
      dispatch(logout());

      // Xóa dữ liệu trong localStorage
      await persistor.purge();

      // Xóa key persist:root trong localStorage
      localStorage.removeItem('persist:root');

      navigate('/login');
    } catch (error) {
      console.error('Error purging persist store:', error);
    }
  };


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

        {/* <SearchComponent
          background="bg-[#282828]"
          placeholder="Bạn muốn phát nội dung gì"
          width="5"
          height="5"
          isRounded
        /> */}
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Tìm kiếm bài hát"
          className="bg-[#282828] rounded-full py-2 pl-10 pr-4 w-96 focus:outline-none"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              navigate(`/search?name=${search}`)
            }
          }}
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
        {isAuthenticated ? (
          <div className="relative group">
          {/* Tên người dùng */}
          <h2 className="hover:text-blue-500 cursor-pointer">{auth?.full_name}</h2>
        
          {/* Dropdown menu */}
          <div className="absolute top-full right-0 w-[200px] bg-gray-400 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50 rounded shadow-lg">
            <div className='flex items-center space-x-2 hover:bg-black p-2 cursor-pointer'>
              <LogOut size={20} />
              <p onClick={handleClickLogout}>Đăng xuất</p>
            </div>
            <div className="border-t border-gray-500"></div>
            <div className='flex items-center space-x-2 p-2 hover:bg-black cursor-pointer'>
              <Settings size={20} />
              <p onClick={() => navigate('/profile')}>Thông tin tài khoản</p>
            </div>
          </div>
        </div>
        
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}


      </div>
    </div>

  );
}