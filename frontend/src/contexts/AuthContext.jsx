// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const {auth, isAuthenticated} = useSelector(state => state.auth)
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in
//     // const token = localStorage.getItem('access_token');
//     // const userData = localStorage.getItem('user');
//     if (isAuthenticated) {
//       setUser(JSON.parse(auth.data));
//     }
//     setLoading(false);
//   }, []); 

//   // const login = (userData, tokens) => {
//   //   setUser(userData);
//   //   localStorage.setItem('access_token', tokens.access_token);
//   //   localStorage.setItem('refresh_token', tokens.refresh_token);
//   //   localStorage.setItem('user', JSON.stringify(userData));
    
//   //   // Redirect based on role
//   //   if (userData.role?.name === 'admin') {
//   //     navigate('/admin/dashboard');
//   //   } else {
//   //     navigate('/');
//   //   }
//   // };

//   // const logout = () => {
//   //   setUser(null);
//   //   localStorage.removeItem('access_token');
//   //   localStorage.removeItem('refresh_token');
//   //   localStorage.removeItem('user');
//   //   navigate('/login');
//   // };

//   const isAdmin = () => {
//     return user?.role?.name === 'admin';
//   };

//   const value = {
//     user,
//     // login,
//     // logout,
//     isAdmin,
//     loading
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }; 