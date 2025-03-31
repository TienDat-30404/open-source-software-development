import React from 'react';
import { Link } from 'react-router-dom';
function SignUp() {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center w-screen">
      <div className=" p-8 rounded-lg max-w-[400px]">
        <div className="flex justify-center mb-6">
          <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
        </div>
        <h2 className="text-white text-5xl font-bold mb-6 text-center max-w-[300px]">Đăng ký để bắt đầu nghe</h2>
        <input
          type="email"
          placeholder="Địa chỉ email"
          className="w-full p-3 rounded-md bg-[#282828] text-white mb-4"
        />
        <button className="text-green-500 block mb-4">Dùng số điện thoại</button>
        <Link to="/sign-up/step=1">
          <div className="bg-green-500 flex justify-center text-black w-full p-3 rounded-full font-bold mb-6">
            Tiếp theo
          </div>
        </Link>
        <div className="flex items-center justify-center mb-4">
          <div className="border-b border-gray-600 w-1/3"></div>
          <span className="text-white mx-2">hoặc</span>
          <div className="border-b border-gray-600 w-1/3"></div>
        </div>
        <button className="flex items-center justify-evenly border border-solid border-white text-white w-full p-3 rounded-full mb-4 font-semibold text-[15px]">
          <img
            style={{ WebkitMaskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)" }}
            className='w-7' src="https://static.vecteezy.com/system/resources/previews/013/760/951/original/colourful-google-logo-in-dark-background-free-vector.jpg" alt=""
          />
          Đăng ký bằng Google
        </button>
        {/* <button className="flex items-center justify-center bg-[#1877F2] text-white w-full p-3 rounded-full mb-4">
          <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 8h-2v6h-2v-6h-2v-2h2v-2h2v2h2v2z" />
          </svg>
          Đăng ký bằng Facebook
        </button>
        <button className="flex items-center justify-center bg-white text-black w-full p-3 rounded-full">
          <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3 8h-2v6h-2v-6h-2v-2h2v-2h2v2h2v2z" />
          </svg>
          Đăng ký bằng Apple
        </button> */}


        <div className="bg-black text-white text-center p-4">
          <p className="mb-2">
            Bạn đã có tài khoản? <a href="/login" className="underline">Đăng nhập tại đây.</a>
          </p>
          <p className="text-xs text-gray-400">
            This site is protected by reCAPTCHA and the Google <a href="/privacy" className="underline">Privacy Policy</a> and <a href="/terms" className="underline">Terms of Service</a> apply.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;