import React, { useState, useEffect } from 'react'
import { paymentVpnReturnService } from '../../services/TransactionService';
import LoadingHamSter from '../../components/LoadingHamster';
import moment from 'moment'
import { buyPremiumService } from '../../services/TransactionService';
import { Link } from 'react-router-dom';
import LoadMoveUp from '../../components/LoadMoveUp';
import Button from '../../components/Button';
export default function PaymentVnpayReturn() {
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    const queryString = window.location.search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await paymentVpnReturnService(queryString)
                console.log(response)
                const informations = localStorage.getItem('informationPayment');
                const parsedInfo = informations ? JSON.parse(informations) : null;
                if (response && response?.status === 200 && informations && response?.statusTransaction === "00") {
                    await buyPremiumService(parsedInfo)
                    localStorage.removeItem('informationPayment')
                }
                setResult(response)
            }
            catch (err) {
                console.log("Lỗi giao dịch ", err)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) {
        return <LoadingHamSter />
    }
    return (
        <div className="bg-black min-h-screen flex items-center justify-center w-screen">
            {result?.statusTransaction === "00" ? (

                <div className="bg-gray-900 min-h-screen flex justify-center items-center py-12 ">
                    <div className=" rounded-lg shadow-xl p-8 text-center text-white">
                        <div className="flex justify-center items-center rounded-full  w-24 h-24 mx-auto mb-6">
                            <LoadMoveUp />
                        </div>

                        {/* Tiêu đề */}
                        <h2 className="text-2xl font-semibold mb-4">Thanh toán thành công</h2>

                        {/* Thông tin đơn hàng */}
                        <div className="mb-4 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm ">Mã đơn:</p>
                            <p className="font-medium">06001529</p>
                        </div>

                        <div className="mb-4 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm">Tổng tiền:</p>
                            <p className="font-medium">120.000 VNĐ</p>
                        </div>

                        <div className="mb-4 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm ">Nội dung thanh toán:</p>
                            <p className="font-medium">Gói Spotify Premium</p> 
                        </div>

                        <div className="mb-6 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm">Thời gian thanh toán:</p>
                            <p className="font-medium">06/04/2025 00:15:51</p>
                        </div>

                        {/* Nút quay về trang chủ */}
                        <Link to = "../">

                            <Button title = "Quay về trang chủ"/>
                        </Link>
                    </div>
                </div>
            ) :
                <div style={{ width: '400px' }} class=" py-5 text-center" >
                    <img style={{ width: '120px' }} src="https://tse2.mm.bing.net/th?id=OIP.2DsT9kz1pM-5dum3u5-rowAAAA&pid=Api&P=0&h=180" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class={`card-title text-danger text-uppercase mt-3`}>Thanh toán thất bại</h5>
                        <a href="http://localhost:3000" class="btn btn-primary mt-3">Quay về trang chủ</a>
                    </div>
                </div>
            }
        </div>

    )
}



/*
    - VNPAY : 
        NCB
        9704198526191432198
        NGUYEN VAN A   
        07/15
        123456 

    - MOMO : 
        name : NGUYEN VAN A
        stk : 5200 0000 0000 1096 (số thể đúng) , 5200 0000 0000 1104 (số thẻ sai)
        05/25	
        cvc : 111
        otp : 1234

    - ZALO pay : 
        Số thẻ : 4111111111111111
        Tên : 	NGUYEN VAN A
        Ngày hết hạn : 	01/25
        Mã CVV	123


*/
