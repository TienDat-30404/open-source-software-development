import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';
export default function CardPremium({ id, title, price, duration, description }) {
    const navigate = useNavigate();
    const descriptionList = description.split(',').map(item => item.trim()).filter(item => item.length > 0);
    const handleClickNavigatePayment = () => {
        navigate('/payment', {
            state: {
                id: id,
                title: title,
                price: price,
                duration: duration
            }
        });
    }

    return (
        <div
            key={id}
            className="relative bg-[#2a2a2a] text-white p-6 rounded-lg shadow-2xl max-w-[350px]">
            <h2 className="absolute top-0 left-0 text-sm bg-yellow-500 text-black px-2 py-1 rounded-br-lg font-bold mb-3">
                {price}đ cho {duration} tháng
            </h2>
            <div className="flex items-center my-3">
                <img
                    className="w-9"
                    style={{ WebkitMaskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)" }}
                    src="https://static.vecteezy.com/system/resources/previews/023/986/728/original/spotify-logo-spotify-logo-transparent-spotify-icon-transparent-free-free-png.png"
                />
                <span className="font-bold text-base">Premium</span>

            </div>
            <h2 className="text-3xl font-bold mb-3">{title}</h2>
            <p className="text-base mb-4 font-bold">{price}₫ cho {duration} tháng</p>
            <div className='w-full border border-solid border-gray-600 '></div>
            <ul className="list-disc list-inside my-4 font-semibold text-[15px]">
                {descriptionList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <button
                className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full w-full mb-2"
                onClick={() => handleClickNavigatePayment()}>
                Thanh toán ngay
            </button>
           
            <p className="text-xs text-center">Có áp dụng điều khoản.</p>
        </div>
    )
}
