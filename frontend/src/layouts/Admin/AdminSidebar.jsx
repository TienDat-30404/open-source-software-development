import React from 'react';
import {
  LayoutDashboard,
  PersonStanding,
  Music,
  Album,
  Crown,
  User,
  ShieldUser
} from 'lucide-react'; // Import các icon từ lucide-react
import { useNavigate } from 'react-router-dom'
export default function AdminSidebar() {
  const navigate = useNavigate()
  return (
    <aside className="bg-gray-900 shadow-md flex flex-col h-full sticky top-0 p-4">
      <div className="flex items-center">
        <img className='w-10' src="https://static.vecteezy.com/system/resources/previews/018/930/750/original/spotify-app-logo-spotify-icon-transparent-free-png.png" />
        <h1 className="text-xl font-semibold text-white">Spotify</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <div
          className="flex items-center space-x-2 text-gray-400 cursor-pointer hover:bg-gray-100 p-3 rounded-md"
          onClick={() => navigate('/admin/dashboard')}
        >
          <LayoutDashboard />
          <div className="text-xs font-semibold  uppercase tracking-wide">
            DashBoard
          </div>
        </div>

        <div
          onClick={() => navigate('/admin/artist')}
          className="p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md  text-gray-400"
        >
          <PersonStanding />
          <div
            className="text-xs font-semibold uppercase tracking-wide">
            Artist
          </div>
          <div className="space-y-1">

          </div>
        </div>

        <div
          onClick={() => navigate('/admin/category')}
          className="p-3 flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-md  text-gray-400"
        >
          <PersonStanding />
          <div
            className="text-xs font-semibold uppercase tracking-wide">
            Category
          </div>
          <div className="space-y-1">

          </div>
        </div>

        <div
          onClick={() => navigate('/admin/song')}
          className="p-3 flex items-center space-x-2 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-md"
        >
          <Music />
          <div className="text-xs font-semibold uppercase tracking-wide">
            Song
          </div>
          <div className="space-y-1">

          </div>
        </div>
        <div
          onClick={() => navigate('/admin/album')}
          className="p-3 flex items-center space-x-2 text-gray-400 cursor-pointer text-gray-40 hover:bg-gray-100 rounded-md"
        >
          <Album />
          <div className="text-xs font-semibold  uppercase tracking-wide">
            Album
          </div>
          <div className="space-y-1">

          </div>
        </div>

        <div
          className="p-3 flex items-center space-x-2 text-gray-400 cursor-pointer text-gray-40 hover:bg-gray-100 rounded-md"
          onClick={() => navigate('/admin/plan')}
        >
          <User />
          <div className="text-xs font-semibold  uppercase tracking-wide">
            User
          </div>
          <div className="space-y-1">

          </div>
        </div>

        <div
          className="p-3 flex items-center space-x-2 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-md"
          onClick={() => navigate('/admin/plan')}
        >
          <Crown />
          <div className="text-xs font-semibold uppercase tracking-wide">
            Plan
          </div>
          <div className="space-y-1">

          </div>
        </div>

        <div
          className="p-3 flex items-center space-x-2 text-gray-400 cursor-pointer hover:bg-gray-100 rounded-md"
          onClick={() => navigate('/admin/plan')}
        >
          <ShieldUser />
          <div className="text-xs font-semibold uppercase tracking-wide">
            Role
          </div>
          <div className="space-y-1">

          </div>
        </div>




      </nav>
    </aside>
  );
};