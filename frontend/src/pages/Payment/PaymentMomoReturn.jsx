import React, { useState, useEffect } from 'react'
import LoadingHamster from '../../components/LoadingHamster';
import { buyPremiumService, checkTransactionMomo } from '../../services/TransactionService';
import LoadMoveUp from '../../components/LoadMoveUp';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import moment from 'moment';
import TransactionFailed from '../../components/TransactionFailure';
import TransactionSuccess from '../../components/TransactionSuccess';
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
                <TransactionSuccess 
                    orderId = {result?.orderId}
                    orderInfo = {orderInfo}
                    amount = {result?.amount}
                    responseTime = {result?.responseTime}

                />
            ) :
                <TransactionFailed />
            }
        </div>

    )
}

