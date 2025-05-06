import React from 'react';
import { Check } from 'lucide-react';
import { useGetAllPaymentMethod } from '../../hooks/usePlaymentMethod';

function IntroducePremium() {
    const { data: paymentMethods, isLoading, isError, error, refetch } = useGetAllPaymentMethod("");

    return (
        <div className=" text-white flex flex-col items-center justify-center p-5">
            <div className="text-center max-w-3xl">
                <h1 className="text-3xl font-bold mb-6">Gói hợp túi tiền cho mọi hoàn cảnh</h1>
                <p className="text-[18px] font-normal mb-8">
                    Chọn một gói Premium để nghe nhạc không quảng cáo thỏa thích trên điện thoại, loa và các thiết bị khác. Thanh toán theo nhiều cách. Hủy bất cứ lúc nào.
                </p>
                <div className="mb-6">
                    <div className='flex items-center justify-center mb-2 space-x-3'>
                        <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png" className="h-11 w-14" />
                        <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" alt="Visa" className="h-11 w-14" />
                        <img src="https://cardtot.com/wp-content/uploads/2020/01/zalopay.png" alt="American Express" className="h-11 w-14" />
                    </div>
                    <span className="text-white font-semibold underline">+ 3 phương thức khác</span>
                </div>

                <div className='flex items-center justify-around'>
                    <h2 className="text-2xl font-bold ">Lợi ích của tất cả các gói Premium</h2>
                    <ul className="space-y-2 text-left">
                        <li className="flex items-center">
                            <Check />
                            Nghe nhạc không quảng cáo
                        </li>
                        <li className="flex items-center">
                            <Check />
                            Tải xuống để nghe không cần mạng
                        </li>
                        <li className="flex items-center">
                            <Check />
                            Phát nhạc theo thứ tự bất kỳ
                        </li>
                        <li className="flex items-center">
                            <Check />
                            Chất lượng âm thanh cao
                        </li>
                        <li className="flex items-center">
                            <Check />
                            Nghe cùng bạn bè theo thời gian thực
                        </li>
                        <li className="flex items-center">
                            <Check />
                            Sắp xếp danh sách chờ nghe
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default IntroducePremium;