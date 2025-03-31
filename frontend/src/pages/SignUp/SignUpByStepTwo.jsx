import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
function SignUpByStepTwo() {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center w-screen">
            <div className="flex justify-center mb-6">
                <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
            </div>
            <div className='flex space-x-2'>
                <Link to = "/sign-up/step=1">
                    <ChevronLeft size={30} className='text-gray-400 mt-2' />
                </Link>
                <div className="bg-[#0b0b0b] rounded-lg w-[350px]">
                    <div className="flex items-center mb-6 space-x-3">
                        <div>
                            <span className="text-gray-400">Bước 2 của 3</span>
                            <h2 className="text-white  font-bold">Giới thiệu thông tin về bản thân bạn</h2>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="text-white text-[14px] font-semibold block mb-2">Tên</label>
                        <p className="text-sm text-gray-400 mb-2">Tên này sẽ xuất hiện trên hồ sơ của bạn</p>
                        <input
                            type="text"
                            className="w-full p-3 rounded-md bg-[#282828] text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="text-white text-[14px] font-semibold block mb-2">Giới tính</label>
                        <p className="text-sm text-gray-400 mb-2">Giới tính của bạn giúp chúng tôi cung cấp nội dung đề xuất và quảng cáo phù hợp với bạn.</p>
                        <div className="grid grid-cols-3 gap-2">
                            <label className="flex items-center">
                                <input type="radio" name="gender" className="mr-2" />
                                <span className="text-white">Nam</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="gender" className="mr-2" />
                                <span className="text-white">Nữ</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="gender" className="mr-2" />
                                <span className="text-white">Phi nhị giới</span>
                            </label>
                        </div>
                        <label className="flex items-center mt-2">
                            <input type="radio" name="gender" className="mr-2" />
                            <span className="text-white">Giới tính khác</span>
                        </label>
                        <label className="flex items-center mt-2">
                            <input type="radio" name="gender" className="mr-2" />
                            <span className="text-white">Không muốn nêu cụ thể</span>
                        </label>
                    </div>
                    <div className="mb-4 mt-2">
                        <label className="text-white text-[14px] font-semibold block mb-2">Ngày sinh</label>
                        <div class="relative max-w-sm">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input id="default-datepicker" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Chọn ngày" />
                            </div>
                    </div>
                    <button className="bg-green-500 text-black w-full p-3 rounded-full font-bold">Tiếp theo</button>
                    <p className="text-xs text-gray-400 mt-6 text-center">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="/privacy" className="underline">Privacy Policy</a> and{' '}
                        <a href="/terms" className="underline">Terms of Service</a> apply.
                    </p>
                </div>
            </div>
            <div class="flex items-center mb-4">
                <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default radio</label>
            </div>
        </div>
    );
}

export default SignUpByStepTwo;