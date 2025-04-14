import React from 'react';
import {
  Home,
  LayoutDashboard,
  Type,
  Bell,
  Lock,
  UserPlus,
  Image,
  File,
} from 'lucide-react'; // Import các icon từ lucide-react
import { useNavigate } from 'react-router-dom'
export default function AdminSidebar() {
  const navigate = useNavigate()
  return (
    <aside className="bg-white shadow-md flex flex-col h-full sticky top-0 p-4">
      <div className="flex items-center">
        <img className='w-10' src="https://static.vecteezy.com/system/resources/previews/018/930/750/original/spotify-app-logo-spotify-icon-transparent-free-png.png" />
        <h1 className="text-xl font-semibold text-gray-800">Spotify</h1>
      </div>
      <nav className="flex-1 px-2 py-4">
        <div
          className="space-y-2"
          onClick={() => navigate('/dashboard')}
        >
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            DashBoard
          </div>
          <div className="space-y-1">

          </div>
        </div>
        <div
          onClick={() => navigate('/artist')}
          className="mt-6 space-y-2"
        >
          <div
            onClick={() => navigate('/artist')}
            className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Artist
          </div>
          <div className="space-y-1">

          </div>
        </div>
        <div
          onClick={() => navigate('/song')}
          className="mt-6 space-y-2"
        >
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Song
          </div>
          <div className="space-y-1">

          </div>
        </div>
        <div
          onClick={() => navigate('/album')}

          className="mt-6 space-y-2">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Album
          </div>
          <div className="space-y-1">

          </div>
        </div>

        <div
          className="mt-6 space-y-2"
          onClick={() => navigate('/plan')}
        >
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Plan
          </div>
          <div className="space-y-1">

          </div>
        </div>


      </nav>
    </aside>
  );
};