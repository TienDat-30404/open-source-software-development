import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SidebarProfile() {
    const navigate = useNavigate();

    return (
        <div className="py-4 px-6  rounded-md shadow-md">
            <h2
                onClick={() => navigate('/profile')}
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600 transition duration-300 ease-in-out py-2"
            >
                Profile
            </h2>
            <h2
                onClick={() => navigate('/favorite')}
                className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-indigo-600 transition duration-300 ease-in-out py-2 mt-2 border-t border-gray-200 pt-2"
            >
                Song Favorite
            </h2>
        </div>
    );
}