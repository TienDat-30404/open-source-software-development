import React, { useState } from 'react'
import { useGetAllPaymentMethod } from '../../hooks/usePlaymentMethod';
import { useLocation } from 'react-router-dom';
import { calculateStartDayWithDuration } from '../../until/function';
import { buyPremiumService, paymentMomoService, paymentZalopayService } from '../../services/TransactionService';
import { toast, ToastContainer } from 'react-toastify';
import { paymentByVnpService } from '../../services/TransactionService';
import { useSelector } from 'react-redux';
export default function Payment() {
    const {accessToken} = useSelector(state => state.auth)
    const { data: paymentMethods, isLoading, isError, error, refetch } = useGetAllPaymentMethod("", accessToken);
    console.log("payment", paymentMethods)
    const location = useLocation();
    const { id, title, price, duration } = location.state || {};
    const startDate = calculateStartDayWithDuration(duration);
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(null);
    const handleBuyPremium = async () => {
        try {
            if (id) {
                if(selectPaymentMethod === null)
                {
                    toast.error("Vui lòng chọn phương thức thanh toán")
                }
                const paymentMethod = paymentMethods?.data?.find(payment => payment.id === selectPaymentMethod);
                localStorage.setItem('informationPayment', JSON.stringify({
                    plan_id: id,
                    payment_method_id: selectPaymentMethod,
                }))
                if (paymentMethod?.name === 'ZALOPAY') {
                    const response = await paymentZalopayService({
                        amount: price
                    }, accessToken)

                    window.location.href = response.order_url

                }

                else if (paymentMethod?.name === 'VNPAY') {
                    const response = await paymentByVnpService({
                        amount: price,
                        content: title,
                        
                    }, accessToken)

                    window.location.href = response.url

                }

                else if (paymentMethod?.name === 'MOMO') {
                    const response = await paymentMomoService({
                        amount: price,
                        orderInfo: title
                    }, accessToken)

                    window.location.href = response.payUrl

                }
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }
    return (
        <div className=" min-h-screen flex items-center justify-center w-screen">
            <ToastContainer
                className="text-base"
                fontSize="10px"
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className=" p-8 rounded-lg max-w-[500px]">
                <div className='flex items-center mb-4 space-x-2'>
                    <img
                        className="w-9"
                        style={{ WebkitMaskImage: "radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 100%)" }}
                        src="https://static.vecteezy.com/system/resources/previews/023/986/728/original/spotify-logo-spotify-logo-transparent-spotify-icon-transparent-free-free-png.png"
                    />
                    <p className='text-base font-bold'>Spotify</p>
                </div>

                <h2 className="text-[22px] font-bold ">Thanh toán</h2>

                <div className='flex justify-end cursor-pointer mb-2'>
                    <p className="text-sm text-end text-gray-600 underline hover:text-blue-600">
                        Thay đổi gói
                    </p>
                </div>
                <div className='border border-solid border-gray-100 mb-3'></div>

                <div className="flex items-center">
                    <div className='flex items-center'>
                        <img
                            src="https://checkout.spotifycdn.com/premium-product-images/4c33c49c-ee13-4fa6-ba48-9980bb5cb90e.png"
                            className="w-11 mr-3 rounded-sm"
                        />
                        <div className="">
                            <h3 className="text-[15px] font-bold">Premium {title}</h3>
                            <p className="text-sm text-gray-500">Tài khoản Premium</p>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-[16px] font-bold">{price.toLocaleString('vi-VN')}đ</p>
                        <p className="text-sm text-gray-600">Cho {duration} tháng</p>
                    </div>

                </div>

                <ul className="text-[15px] font-[Roboto]  mt-1 list-disc pl-5">
                    <li>
                        <span className='text-gray-600 font-semibold'>Hôm nay : </span>
                        2 tháng với giá {price.toLocaleString('vi-VN')} ₫</li>
                    <li> Bắt đầu từ {startDate}: {price.toLocaleString('vi-VN')} ₫/tháng</li>
                    <li> Hủy bất cứ lúc nào trên mạng. <a href="#" className="underline">Có áp dụng các điều khoản ưu đãi.</a></li>
                </ul>

                <div className='border border-solid border-gray-100 mt-5 mb-5'></div>


                <div>
                    <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
                    {paymentMethods && paymentMethods?.data?.length > 0 && paymentMethods?.data?.map((payment, index) => (
                        <label key={index} className="flex items-center mb-3 cursor-pointer">
                            <input
                                onChange={(e) => setSelectPaymentMethod(payment.id)}
                                checked={selectPaymentMethod === payment.id}
                                type="radio"
                                name="paymentMethod"
                                className="form-radio h-4 w-4 text-green-500 focus:ring-green-500 mr-2"
                            />
                            <div className="flex items-center">
                                <span className="font-semibold">{payment?.name}</span>
                                <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square-1024x1024.png" alt="MoMo" className="h-6 ml-2" />
                            </div>
                        </label>
                    ))}

                    {/* <label className="flex items-center mb-3 cursor-pointer">
                        <input type="radio" name="paymentMethod" className="form-radio h-4 w-4 text-green-500 focus:ring-green-500 mr-2" />
                        <div className="flex items-center">
                            <span className="font-semibold">vnpay</span>
                            <img src="https://vnpay.vn/s1/statics.vnpay.vn/2023/9/06ncktiwd6dc1694418196384.png" alt="MoMo" className="h-6 ml-2" />

                        </div>
                    </label>

                    <label className="flex items-center mb-3 cursor-pointer">
                        <input type="radio" name="paymentMethod" className="form-radio h-4 w-4 text-green-500 focus:ring-green-500 mr-2" />
                        <div className="flex items-center">
                            <span className="font-semibold">PayPal</span>
                            <img src="https://cardtot.com/wp-content/uploads/2020/01/zalopay.png" alt="PayPal" className="h-5 ml-2" />
                        </div>
                    </label> */}
                </div>

                <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-md mt-6 text-sm">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block mr-1">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4v-4h2v4h-2z" />
                    </svg>
                    Từ ngày 1/7/2023, người dùng MoMo cần có tài khoản đã được xác thực trực tiếp để thanh toán cho gói Premium. <a href="#" className="underline">Tìm hiểu cách xác thực tài khoản MoMo.</a>
                </div>


                <div
                    className="flex justify-end mt-4"
                    onClick={() => handleBuyPremium()}
                >
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full">
                        Thanh toán
                    </button>
                </div>
            </div>

        </div>
    )
}



/* 
     - MOMO : 
        name : NGUYEN VAN A
        stk : 5200 0000 0000 1096 (số thể đúng) , 5200 0000 0000 1104 (số thẻ sai)
        05/25	
        cvc : 111
        otp : 1234
*/