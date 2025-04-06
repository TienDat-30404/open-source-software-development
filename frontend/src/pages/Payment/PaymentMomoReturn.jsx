import React, { useState, useEffect } from 'react'
import LoadingHamster from '../../components/LoadingHamster';
import { buyPremiumService, checkTransactionMomo } from '../../services/TransactionService';
import LoadMoveUp from '../../components/LoadMoveUp';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import moment from 'moment';
import TransactionFailed from '../../components/TransactionFailure';
export default function PaymentMomoReturn() {
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    let params
    let orderId;
    let orderInfo
    if (window.location.search) {
        params = new URLSearchParams(window.location.search);
        orderId = params.get('orderId')
        orderInfo = params.get('orderInfo')
    }
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await checkTransactionMomo({ orderId })
                setResult(response)
                const informations = localStorage.getItem('informationPayment');
                const parsedInfo = informations ? JSON.parse(informations) : null;
                if (response?.resultCode === 0) {
                    await buyPremiumService(parsedInfo)
                    localStorage.removeItem('informationPayment')
                }
            }
            catch (err) {
                console.log("Lỗi giao dịch", err)
            }
            finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])
    if (isLoading) {
        return <LoadingHamster />
    }
    console.log("result", result)
    return (
        <div className="bg-black min-h-screen flex items-center justify-center w-screen">
            {result?.resultCode === 0 ? (

                <div className="bg-gray-900 min-h-screen flex justify-center items-center py-12 ">
                    <div className=" rounded-lg shadow-xl p-8 text-center text-white">
                        <div className="flex justify-center items-center rounded-full  w-24 h-24 mx-auto mb-6">
                            <LoadMoveUp />
                        </div>

                        <h2 className="text-2xl font-semibold mb-4">Thanh toán thành công</h2>

                        <div className="mb-4 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm ">Mã đơn:</p>
                            <p className="font-medium">{result?.orderId}</p>
                        </div>

                        <div className="mb-4 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm">Tổng tiền:</p>
                            <p className="font-medium">{(result?.amount).toLocaleString('vi-VN')}</p>
                        </div>

                        <div className="mb-4 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm ">Nội dung thanh toán:</p>
                            <p className="font-medium">Gói Spotify Premium {orderInfo}</p>
                        </div>

                        <div className="mb-6 text-left flex items-center space-x-2">
                            <p className="text-gray-400 text-sm">Thời gian thanh toán:</p>
                            <p className="font-medium">
                                {moment(result?.responseTime).format('YYYY-MM-DD HH:mm:ss')}
                            </p>
                        </div>

                        <Link to="../">

                            <Button title="Quay về trang chủ" />
                        </Link>
                    </div>
                </div>
            ) :
                <TransactionFailed />
            }
        </div>

    )
}

