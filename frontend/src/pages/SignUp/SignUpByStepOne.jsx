import React, { useState } from 'react';
import { EyeOff, Eye, Check, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpByStepOne() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (pass) => {
        const hasLetter = /[a-zA-Z]/.test(pass);
        const hasNumberOrSpecial = /[\d\W]/.test(pass);
        const isLongEnough = pass.length >= 10;

        return {
            hasLetter,
            hasNumberOrSpecial,
            isLongEnough,
            isValid: hasLetter && hasNumberOrSpecial && isLongEnough
        };
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        // Lưu mật khẩu vào localStorage để sử dụng ở bước tiếp theo
        localStorage.setItem('signup_password', newPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validation = validatePassword(password);
        
        if (validation.isValid) {
            navigate('/sign-up/step=2');
        } else {
            setError('Vui lòng đảm bảo mật khẩu đáp ứng tất cả các yêu cầu.');
        }
    };

    const validation = validatePassword(password);

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center w-screen">
            <div className="flex justify-center mb-6">
                <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
            </div>
            <div className='flex'>
                <Link to="/sign-up">
                    <ChevronLeft size={30} className='text-gray-400 mt-2' />
                </Link>
                <div className="bg-[#080808] px-2 rounded-lg w-[350px]">
                    <div className="flex items-center mb-6 space-x-3">
                        <div>
                            <span className="text-gray-400">Bước 1 của 3</span>
                            <h2 className="text-white font-bold">Tạo mật khẩu</h2>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="text-white font-semibold block mb-2">Mật khẩu</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full p-2 rounded-md bg-[#282828] text-white border border-white"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <Eye className="text-gray-300" />
                                    ) : (
                                        <EyeOff className="text-gray-300" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <p className="text-white text-sm font-semibold mb-4">Mật khẩu của bạn phải có ít nhất:</p>
                        <ul className="text-white text-sm list-inside mb-6 list-none space-y-2">
                            <li className={`flex items-center text-xs font-bold ${validation.hasLetter ? 'text-green-400' : 'text-gray-400'}`}>
                                <Check size={14} className={validation.hasLetter ? 'text-green-400' : 'text-gray-400'} />
                                1 chữ cái
                            </li>
                            <li className={`flex items-center text-xs font-bold ${validation.hasNumberOrSpecial ? 'text-green-400' : 'text-gray-400'}`}>
                                <Check size={14} className={validation.hasNumberOrSpecial ? 'text-green-400' : 'text-gray-400'} />
                                1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)
                            </li>
                            <li className={`flex items-center text-xs font-bold ${validation.isLongEnough ? 'text-green-400' : 'text-gray-400'}`}>
                                <Check size={14} className={validation.isLongEnough ? 'text-green-400' : 'text-gray-400'} />
                                10 ký tự
                            </li>
                        </ul>
                        <button
                            type="submit"
                            className={`w-full p-3 rounded-full font-bold mb-6 ${
                                validation.isValid
                                    ? 'bg-green-500 text-black'
                                    : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            }`}
                            disabled={!validation.isValid}
                        >
                            Tiếp theo
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

export default SignUpByStepOne;
