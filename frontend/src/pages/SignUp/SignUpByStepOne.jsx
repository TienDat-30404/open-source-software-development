import React from 'react';
import { EyeOff, Check, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
function SignUpByStepOne() {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center w-screen">
            <div className="flex justify-center mb-6">
                <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
            </div>
            <div className='flex'>
                <Link to = "/sign-up">
                    <ChevronLeft size={30} className='text-gray-400 mt-2' />
                </Link>
                <div className="bg-[#080808] px-2 rounded-lg w-[350px]">

                    <div className="flex items-center mb-6 space-x-3">
                        <div>
                            <span className="text-gray-400">Bước 1 của 3</span>
                            <h2 className="text-white  font-bold">Tạo mật khẩu</h2>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-white font-semibold block mb-2">Mật khẩu</label>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full p-2 rounded-md bg-[#282828] text-white border border-white"
                            />
                            <button className="absolute right-3 top-2">
                                <EyeOff className="text-gray-300" />
                            </button>
                        </div>
                    </div>
                    <p className="text-white text-sm font-semibold mb-4">Mật khẩu của bạn phải có ít nhất :</p>
                    <ul className="text-white text-sm list-inside mb-6 list-none space-y-2">
                        <li className='flex items-center text-xs font-bold'>
                            <Check size={14} className='text-green-400 mr-2' />
                            1 chữ cái
                        </li>

                        <li className='flex items-center text-xs font-bold'>
                            <Check size={14} className='text-green-400 mr-2' />
                            1 chữ số hoặc ký tự đặc biệt (ví dụ: # ? ! &)
                        </li>

                        <li className='flex items-center text-xs font-bold'>
                            <Check size={14} className='text-green-400 mr-2' />
                            10 ký tự
                        </li>
                    </ul>
                    <Link to="/sign-up/step=2">
                        <div className="bg-green-500 flex justify-center text-black w-full p-3 rounded-full font-bold mb-6">
                            Tiếp theo
                        </div>
                    </Link>
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