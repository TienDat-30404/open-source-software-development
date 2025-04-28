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
import { useSelector } from 'react-redux';
export default function PaymentVnpayReturn() {
    const {accessToken} = useSelector(state => state.auth)
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(true);


    const queryString = window.location.search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await paymentVpnReturnService(queryString, accessToken)
                setResult(response)
                const informations = localStorage.getItem('informationPayment');
                const parsedInfo = informations ? JSON.parse(informations) : null;
                if (response && response?.status === 200 && informations && response?.statusTransaction === "00") {
                    console.log("parsedInfor", parsedInfo)
                    console.log("accessToke", accessToken)
                    await buyPremiumService(parsedInfo, accessToken)
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
                    paymentReferenceId = {result?.paymentReferenceId}
                    totalPrice = {result?.totalPrice / 100}
                    content = {result?.content}
                />
              
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
