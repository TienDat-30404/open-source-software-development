import { getItem } from "./apis"
export const getAllPaymentMethod = async(query) => {
    return getItem('payment-methods', query)
}