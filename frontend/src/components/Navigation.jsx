// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Menu, Layout, Button } from 'antd';
// import { useAuth } from '../contexts/AuthContext';
// import {
//   HomeOutlined,
//   UserOutlined,
//   SettingOutlined,
//   LogoutOutlined,
//   DashboardOutlined,
//   TeamOutlined,
//   PlayCircleOutlined,
//   ProfileOutlined,
// } from '@ant-design/icons';

// const { Header } = Layout;

// const Navigation = () => {
//   const { user, isAdmin, logout } = useAuth();

//   const adminMenuItems = [
//     {
//       key: 'dashboard',
//       icon: <DashboardOutlined />,
//       label: <Link to="/admin/dashboard">Dashboard</Link>,
//     },
//     {
//       key: 'users',
//       icon: <TeamOutlined />,
//       label: <Link to="/admin/user">Users</Link>,
//     },
//     {
//       key: 'songs',
//       icon: <PlayCircleOutlined />,
//       label: <Link to="/admin/song">Songs</Link>,
//     },
//     {
//       key: 'albums',
//       icon: <ProfileOutlined />,
//       label: <Link to="/admin/album">Albums</Link>,
//     },
//   ];

//   const userMenuItems = [
//     {
//       key: 'home',
//       icon: <HomeOutlined />,
//       label: <Link to="/">Home</Link>,
//     },
//     {
//       key: 'profile',
//       icon: <UserOutlined />,
//       label: <Link to="/profile">Profile</Link>,
//     },
//     {
//       key: 'settings',
//       icon: <SettingOutlined />,
//       label: <Link to="/settings">Settings</Link>,
//     },
//   ];

//   return (
//     <Header className="bg-white flex justify-between items-center px-6 shadow-md">
//       <div className="flex items-center">
//         <h1 className="text-xl font-bold mr-8">Music App</h1>
//         <Menu
//           mode="horizontal"
//           className="border-0"
//           items={isAdmin() ? adminMenuItems : userMenuItems}
//         />
//       </div>
//       <div className="flex items-center">
//         <span className="mr-4">Welcome, {user?.full_name}</span>
//         <Button
//           type="primary"
//           icon={<LogoutOutlined />}
//           onClick={logout}
//           danger
//         >
//           Logout
//         </Button>
//       </div>
//     </Header>
//   );
// };

// export default Navigation; 