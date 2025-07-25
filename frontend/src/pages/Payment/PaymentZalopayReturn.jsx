import React, { useState, useEffect } from 'react'

import { checkTranSactionZaloPay, buyPremiumService } from '../../services/TransactionService';
import LoadingHamster from '../../components/LoadingHamster';
import TransactionFailed from '../../components/TransactionFailure';
import TransactionSuccess from '../../components/TransactionSuccess';
import { useSelector } from 'react-redux';
export default function PaymentZalopayReturn() {
    const {accessToken} = useSelector(state => state.auth)
    const [result, setResult] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    let params
    let apptransid;
    if (window.location.search) {
        params = new URLSearchParams(window.location.search);
        apptransid = params.get('apptransid')

    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await checkTranSactionZaloPay({ apptransid }, accessToken)
                setResult(response)
                const informations = localStorage.getItem('informationPayment');
                const parsedInfo = informations ? JSON.parse(informations) : null;
                console.log("response", response)
                if (response && informations && response?.returncode === 1) {
                    console.log("222")
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
        return <LoadingHamster />
    }
    return (
        <div className="bg-black min-h-screen flex items-center justify-center w-screen">
            {result?.returncode === 1 ? (
                <TransactionSuccess
                    idOrderZaloPay={result?.zptransid}
                    totalPriceZaloPay={result?.amount}
                    orderInfo={""}
                    createdAtZaloPay={result?.apptime}
                />
            ) :
                <TransactionFailed />
            }
        </div>

    )
}




/* 
    - ZALO pay : 
        Số thẻ : 4111111111111111
        Tên : 	NGUYEN VAN A
        Ngày hết hạn : 	01/25
        Mã CVV	123
*/