import React from 'react'
import { Link } from 'react-router-dom'
import LoadMoveUp from './LoadMoveUp'
import moment from 'moment'
import Button from './Button'
export default function TransactionSuccess(
    {
        orderId,
        orderInfo,
        amount,
        responseTime,

        // vnpay
        paymentReferenceId,
        totalPrice,
        content,
        createdAt,

        idOrderZaloPay,
        totalPriceZaloPay,
        createdAtZaloPay

    }) 
    {
   
    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center py-12 ">
            <div className=" rounded-lg shadow-xl p-8 text-center text-white">
                <div className="flex justify-center items-center rounded-full  w-24 h-24 mx-auto mb-6">
                    <LoadMoveUp />
                </div>

                <h2 className="text-2xl font-semibold mb-4">Thanh toán thành công</h2>

                <div className="mb-4 text-left flex items-center space-x-2">
                    <p className="text-gray-400 text-sm ">Mã đơn:</p>
                    <p className="font-medium">{paymentReferenceId || orderId || idOrderZaloPay}</p>
                </div>

                <div className="mb-4 text-left flex items-center space-x-2">
                    <p className="text-gray-400 text-sm">Tổng tiền:</p>
                    <p className="font-medium"> {(totalPrice || amount || totalPriceZaloPay).toLocaleString('vi-VN')} VNĐ</p>
                </div>

                <div className="mb-4 text-left flex items-center space-x-2">
                    <p className="text-gray-400 text-sm ">Nội dung thanh toán:</p>
                    <p className="font-medium">{`Gói Spotify Premium ${content || orderInfo}`}</p>
                </div>

                <div className="mb-6 text-left flex items-center space-x-2">
                    <p className="text-gray-400 text-sm">Thời gian thanh toán:</p>
                    <p className="font-medium">
                        {moment(createdAt || responseTime || createdAtZaloPay).format('YYYY-MM-DD HH:mm:ss')}
                    </p>
                </div>

                <Link to="../">

                    <Button title="Quay về trang chủ" />
                </Link>
            </div>
        </div>
    )
}
