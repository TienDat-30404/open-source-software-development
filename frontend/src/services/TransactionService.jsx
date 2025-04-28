import { addItemUsingToken, createItemDraft, getItem, getItemUsingToken } from "./apis"

export const buyPremiumService = async(data, token) => {
    return addItemUsingToken('transactions/purchase', data, token)
}

export const paymentByVnpService = async(data, token) => {
    return addItemUsingToken('transactions/payment-create-vnpay', data, token)
}


export const paymentVpnReturnService = async(query, token) => {
    return getItemUsingToken('transactions/payment-return-vnpay', query, token)
}


// zalopay
export const paymentZalopayService = async(data, token) => {
    return addItemUsingToken('transactions/payment-create-zalopay', data, token)
}

export const checkTranSactionZaloPay = async(data, token) => {
    return addItemUsingToken('transactions/check-transaction-zalopay', data, token)
}

// momo
export const paymentMomoService = async(data, token) => {
    return addItemUsingToken('transactions/payment-create-momo', data, token)
}

export const checkTransactionMomo = async(data, token) => {
    return addItemUsingToken('transactions/check-transaction-momo', data, token)
}

