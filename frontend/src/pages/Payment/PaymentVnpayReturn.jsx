import React, { useState, useEffect } from 'react'
import { paymentVpnReturnService } from '../../services/TransactionService';
import LoadingHamSter from '../../components/LoadingHamster';
import moment from 'moment'
import { buyPremiumService } from '../../services/TransactionService';
import { Link } from 'react-router-dom';
import LoadMoveUp from '../../components/LoadMoveUp';
import Button from '../../components/Button';
import TransactionFailed from '../../components/TransactionFailure';
import TransactionSuccess from '../../components/TransactionSuccess';
export default function PaymentVnpayReturn() {
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    const queryString = window.location.search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await paymentVpnReturnService(queryString)
                setResult(response)
                const informations = localStorage.getItem('informationPayment');
                const parsedInfo = informations ? JSON.parse(informations) : null;
                if (response && response?.status === 200 && informations && response?.statusTransaction === "00") {
                    await buyPremiumService(parsedInfo)
                    localStorage.removeItem('informationPayment')
                }
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
                <TransactionSuccess 
                    
                />
                // <div className="bg-gray-900 min-h-screen flex justify-center items-center py-12 ">
                //     <div className=" rounded-lg shadow-xl p-8 text-center text-white">
                //         <div className="flex justify-center items-center rounded-full  w-24 h-24 mx-auto mb-6">
                //             <LoadMoveUp />
                //         </div>

                //         <h2 className="text-2xl font-semibold mb-4">Thanh toán thành công</h2>

                //         <div className="mb-4 text-left flex items-center space-x-2">
                //             <p className="text-gray-400 text-sm ">Mã đơn:</p>
                //             <p className="font-medium">{result?.paymentReferenceId}</p>
                //         </div>

                //         <div className="mb-4 text-left flex items-center space-x-2">
                //             <p className="text-gray-400 text-sm">Tổng tiền:</p>
                //             <p className="font-medium">{(result?.totalPrice / 100).toLocaleString('vi-VN')} VNĐ</p>
                //         </div>

                //         <div className="mb-4 text-left flex items-center space-x-2">
                //             <p className="text-gray-400 text-sm ">Nội dung thanh toán:</p>
                //             <p className="font-medium">Gói Spotify Premium {result?.content}</p>
                //         </div>

                //         <div className="mb-6 text-left flex items-center space-x-2">
                //             <p className="text-gray-400 text-sm">Thời gian thanh toán:</p>
                //             <p className="font-medium">
                //                 {moment(result?.createdAt, "YYYYMMDDHHmmss").format("DD/MM/YYYY HH:mm:ss")}
                //             </p>
                //         </div>

                //         <Link to="../">

                //             <Button title="Quay về trang chủ" />
                //         </Link>
                //     </div>
                // </div>
            ) :
                <TransactionFailed />
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
