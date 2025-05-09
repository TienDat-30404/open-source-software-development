import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import api from '../../services/api';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/authSlice';
import { registerAccount } from '../../services/UserService';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login/', formData);
      console.log("respionse", response.data)
      dispatch(setCredentials(response.data))

      if (response?.data?.data?.role_name === 'Admin') {
        navigate('/admin/dashboard')
      }
      else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginGoogle = async (response) => {
    if (response.error) {
      console.error("Login failed:", response.error);
      return;
    }
    const token = response.credential;
    try {
      const response = await api.post('/auth/login/', {
        email: jwtDecode(token).email,
        full_name: jwtDecode(token).name,
        type_login: "google"
      });
      dispatch(setCredentials(response.data))
      navigate('/');
    }
    catch (err) {
      console.error('An error occurred during Google login:', error);

    }
  }

  return (
    <div className="bg-black min-h-screen flex items-center justify-center w-screen">
      <div className=" p-8 rounded-lg max-w-[400px]">
        <div className="flex justify-center mb-6">
          <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
        </div>
        <h2 className="text-white text-5xl font-bold mb-6 text-center max-w-[300px]">Đăng nhập để bắt đầu nghe</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <input
            type="username"
            name="username"
            placeholder="Username"
            className="w-full p-3 rounded-md bg-[#282828] text-white mb-4"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            className="w-full p-3 rounded-md bg-[#282828] text-white mb-4"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 flex justify-center text-black w-full p-3 rounded-full font-bold mb-6"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="flex items-center justify-center mb-4">
          <div className="border-b border-gray-600 w-1/3"></div>
          <span className="text-white mx-2">hoặc</span>
          <div className="border-b border-gray-600 w-1/3"></div>
        </div>

        <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENTID_AUTH}>
          <GoogleLogin
            buttonText="Login with Google"
            onSuccess={handleLoginGoogle}
            onError={() => setError('Đăng nhập Google thất bại')}
            cookiePolicy="single_host_origin"
            scope="profile username"
          />
        </GoogleOAuthProvider>

        <div className="bg-black text-white text-center p-4">
          <p className="mb-2">
            Nếu chưa có tài khoản? <Link to="/sign-up" className="underline">Đăng ký tại đây.</Link>
          </p>
          <p className="text-xs text-gray-400">
            This site is protected by reCAPTCHA and the Google <a href="/privacy" className="underline">Privacy Policy</a> and <a href="/terms" className="underline">Terms of Service</a> apply.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;