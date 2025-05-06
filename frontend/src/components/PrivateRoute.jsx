import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  // Lấy trạng thái xác thực và thông tin người dùng từ Redux
  const { auth, isAuthenticated} = useSelector((state) => state.auth);

  // Kiểm tra nếu người dùng không xác thực, điều hướng đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra nếu cần quyền admin mà người dùng không phải admin
  if (requireAdmin && auth.role_name !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  // Nếu tất cả đều hợp lệ, cho phép render children (tức là nội dung của route)
  return children;
};

export default PrivateRoute;
