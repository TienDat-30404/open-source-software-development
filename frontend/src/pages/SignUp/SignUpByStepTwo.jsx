import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';

function SignUpByStepTwo() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        full_name: '',
        gender: '',
        date_of_birth: '',
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

        const password = localStorage.getItem('signup_password');
        if (!password) {
            setError('Vui lòng quay lại bước tạo mật khẩu');
            setLoading(false);
            return;
        }

        try {
            const response = await api.post('/auth/register/', {
                ...formData,
                password
            });

            // Xóa mật khẩu tạm thời
            localStorage.removeItem('signup_password');

            // Chuyển hướng đến trang đăng nhập
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center w-screen">
            <div className="flex justify-center mb-6">
                <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
            </div>
            <div className='flex space-x-2'>
                <Link to="/sign-up/step=1">
                    <ChevronLeft size={30} className='text-gray-400 mt-2' />
                </Link>
                <div className="bg-[#0b0b0b] rounded-lg w-[350px]">
                    <div className="flex items-center mb-6 space-x-3">
                        <div>
                            <span className="text-gray-400">Bước 2 của 3</span>
                            <h2 className="text-white font-bold">Giới thiệu thông tin về bản thân bạn</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="text-white text-[14px] font-semibold block mb-2">Tên</label>
                            <p className="text-sm text-gray-400 mb-2">Tên này sẽ xuất hiện trên hồ sơ của bạn</p>
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-md bg-[#282828] text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="text-white text-[14px] font-semibold block mb-2">Giới tính</label>
                            <p className="text-sm text-gray-400 mb-2">Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng cáo phù hợp với bạn.</p>
                            <div className="grid grid-cols-3 gap-2">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span className="text-white">Nam</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span className="text-white">Nữ</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="non_binary"
                                        checked={formData.gender === 'non_binary'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <span className="text-white">Phi nhị giới</span>
                                </label>
                            </div>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={formData.gender === 'other'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-white">Giới tính khác</span>
                            </label>
                            <label className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="prefer_not_to_say"
                                    checked={formData.gender === 'prefer_not_to_say'}
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <span className="text-white">Không muốn nêu cụ thể</span>
                            </label>
                        </div>
                        <div className="mb-4 mt-2">
                            <label className="text-white text-[14px] font-semibold block mb-2">Ngày sinh</label>
                            <div className="relative max-w-sm">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formData.date_of_birth}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !formData.full_name || !formData.gender || !formData.date_of_birth}
                            className={`w-full p-3 rounded-full font-bold ${
                                loading || !formData.full_name || !formData.gender || !formData.date_of_birth
                                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                    : 'bg-green-500 text-black'
                            }`}
                        >
                            {loading ? 'Đang xử lý...' : 'Hoàn tất đăng ký'}
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-6 text-center">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="/privacy" className="underline">Privacy Policy</a> and{' '}
                        <a href="/terms" className="underline">Terms of Service</a> apply.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpByStepTwo;