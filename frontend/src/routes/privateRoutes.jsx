import AdminLayout from '../layouts/Admin/AdminLayout';
import UserLayout from '../layouts/User/UserLayout';
import DashBoard from '../pages/Admin/DashBoard';
import User from '../pages/Admin/User/User';
import Song from '../pages/Admin/Song/Song';
import Album from '../pages/Admin/Album/Album';
import Home from '../pages/User/Home';
import Profile from '../pages/User/Profile';
import Settings from '../pages/User/Settings';
import Artist from "../pages/Admin/Artist/Artist";
import Category from "../pages/Admin/Category/Category";
import Plan from "../pages/Admin/Plan/Plan";
import Role from "../pages/Admin/Role/Role";

export const adminRoutes = [
    { path: '/admin/dashboard', page: DashBoard, layout: AdminLayout },
    { path: '/admin/user', page: User, layout: AdminLayout },
    { path: '/admin/song', page: Song, layout: AdminLayout },
    { path: '/admin/album', page: Album, layout: AdminLayout },
];

export const userRoutes = [
    { path: '/', page: Home, layout: UserLayout },
    { path: '/profile', page: Profile, layout: UserLayout },
    { path: '/settings', page: Settings, layout: UserLayout },
];

export const privateRoutes = [...adminRoutes, ...userRoutes];