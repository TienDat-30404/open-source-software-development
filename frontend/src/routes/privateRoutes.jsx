import AdminLayout from '../layouts/Admin/AdminLayout';
// import UserLayout from '../layouts/User/UserLayout';
// import User from '../pages/Admin/User/User';
import Song from '../pages/Admin/Song/Song';
import Album from '../pages/Admin/Album/Album';
// import Home from '../pages/User/Home';
// import Profile from '../pages/User/Profile';
// import Settings from '../pages/User/Settings';
import Artist from "../pages/Admin/Artist/Artist";
import Category from "../pages/Admin/Category/Category";

import Plan from "../pages/Admin/Plan/Plan";
import Role from "../pages/Admin/Role/Role";
import ProfileLayout from '../layouts/ProfileLayout/ProfileLayout';
import PersonalInformation from '../pages/Profile/Content/PersonalInformation';
import SongOfFavorite from '../pages/Profile/Content/SongOfFavorite';
import User from '../pages/Admin/User/User';
import DashBoard from '../pages/Admin/Dashboard/DashBoard';

export const privateRoutes = [
    {path : '/admin/dashboard', page : DashBoard, layout : AdminLayout, requireAdmin: true},
    {path : 'admin/artist', page : Artist, layout : AdminLayout, requireAdmin: true },
    {path : '/admin/song', page : Song, layout : AdminLayout, requireAdmin: true},
    {path : '/admin/album', page : Album, layout : AdminLayout, requireAdmin: true},
    {path : '/admin/plan', page : Plan, layout : AdminLayout, requireAdmin: true},
    {path : '/admin/category', page : Category, layout : AdminLayout, requireAdmin: true},
    {path : '/admin/role', page : Role, layout : AdminLayout, requireAdmin: true},
    {path : '/admin/user', page : User, layout : AdminLayout, requireAdmin: true},
    {path : '/admin/dashboard', page : DashBoard, layout : AdminLayout, requireAdmin: true},


    { path: '/profile', page: PersonalInformation, layout: ProfileLayout, requireAdmin: false  },
    { path: '/favorite', page: SongOfFavorite, layout: ProfileLayout, requireAdmin: false  },

]

// export const userRoutes = [
//     { path: '/', page: Home, layout: UserLayout },
//     { path: '/profile', page: Profile, layout: UserLayout },
//     { path: '/settings', page: Settings, layout: UserLayout },
// ];

// export const privateRoutes = [...adminRoutes, ...userRoutes];
