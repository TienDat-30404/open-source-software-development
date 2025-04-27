import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('')
  const handleSwitchSignUpNext = () => {
    navigate('/sign-up/step=1',
      {
        state: {
          email: email,
          userName : userName
        }
      }
    );
  }
  return (
    <div className="bg-black min-h-screen flex items-center justify-center w-screen">
      <div className=" p-8 rounded-lg max-w-[400px]">
        <div className="flex justify-center mb-6">
          <img className='w-20' src="https://tse3.mm.bing.net/th?id=OIP.ffhuObhbmntvqca2gpkTywAAAA&pid=Api&P=0&h=180" alt="" />
        </div>
        <h2 className="text-white text-5xl font-bold mb-6 text-center max-w-[300px]">Đăng ký để bắt đầu nghe</h2>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded-md bg-[#282828] text-white mb-4"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Địa chỉ email"
          className="w-full p-3 rounded-md bg-[#282828] text-white mb-4"
        />
        <div
          onClick={() => handleSwitchSignUpNext()}
          className="bg-green-500 flex justify-center text-black w-full p-3 rounded-full font-bold mb-6"
        >
          Tiếp theo
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="border-b border-gray-600 w-1/3"></div>
          <span className="text-white mx-2">hoặc</span>
          <div className="border-b border-gray-600 w-1/3"></div>
        </div>
        {/* <button className="flex items-center justify-evenly border border-solid border-white text-white w-full p-3 rounded-full mb-4 font-semibold text-[15px]">
          <img
            style={{ WebkitMaskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)" }}
            className='w-7' src="https://static.vecteezy.com/system/resources/previews/013/760/951/original/colourful-google-logo-in-dark-background-free-vector.jpg" alt=""
          />
          Đăng ký bằng Google
        </button> */}

        <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID_AUTH}  >
          <GoogleLogin
            buttonText="Login with Google"
            // onSuccess={handleLoginGoogle}
            // onFailure={handleLoginFailure}
            cookiePolicy="single_host_origin"
            scope="profile email"
          />
        </GoogleOAuthProvider>


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