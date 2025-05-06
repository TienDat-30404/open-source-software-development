import React from 'react';
import LoadHand from './LoadHand';
import { Link } from 'react-router-dom';
const TransactionFailed = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-sm w-full  p-6 rounded-lg shadow-lg">
        <div className="flex justify-center mb-10">
          <LoadHand />
        </div>
        <h2 className="text-xl font-bold text-center text-red-600">Giao dịch thất bại</h2>
        <p className="mt-4 text-center text-gray-300">Rất tiếc, giao dịch của bạn đã gặp sự cố. Vui lòng thử lại sau.</p>
        <Link to='../'>
            <button className="mt-6 w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600">
            Quay về trang chủ 
            </button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionFailed;
