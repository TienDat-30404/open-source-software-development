import React from 'react';

function BannerPremium() {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-blue-800 text-white  flex items-center justify-center">
      <div className="container w-4/5 max-w-2xl p-10 text-center">
        <h1 className="text-3xl font-bold ">Nghe không giới hạn. Dùng thử miễn phí Premium Individual trong 1 tháng.</h1>
        <p className="text-lg mb-8">Sau đó chỉ 59.000 ₫/tháng. Hủy bất cứ lúc nào.</p>
        <div className="flex justify-center mb-8">
          <button className="bg-white text-black px-8 py-3 rounded-full mr-4">Bắt đầu</button>
          <button className="border border-white px-8 py-3 rounded-full">Xem tất cả các gói</button>
        </div>
        <p className="text-xs mb-2">Chỉ áp dụng cho gói Premium Individual. Miễn phí trong 1 tháng, sau đó là 59.000 ₫/tháng. Chỉ áp dụng ưu đãi nếu bạn chưa từng dùng gói Premium. Có áp dụng điều khoản.</p>
        <p className="text-xs">Ưu đãi kết thúc vào ngày 2 tháng 4, 2025.</p>
      </div>
    </div>
  );
}

export default BannerPremium;