import { createItemDraft, getItem } from "./apis"

export const buyPremiumService = async(data) => {
    return createItemDraft('transactions/purchase', data)
}

export const paymentByVnpService = async(data) => {
    return createItemDraft('transactions/payment-create-vnpay', data)
}


export const paymentVpnReturnService = async(query) => {
    return getItem('transactions/payment-return-vnpay', query)
}


// zalopay
export const paymentZalopayService = async(data) => {
    return createItemDraft('transactions/payment-create-zalopay', data)
}

export const checkTranSactionZaloPay = async(data) => {
    return createItemDraft('transactions/check-transaction-zalopay', data)
}

// momo
export const paymentMomoService = async(data) => {
    return createItemDraft('transactions/payment-create-momo', data)
}

export const checkTransactionMomo = async(data) => {
    return createItemDraft('transactions/check-transaction-momo', data)
}

