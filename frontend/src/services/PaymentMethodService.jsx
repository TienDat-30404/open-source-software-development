import { getItem, getItemUsingToken } from "./apis"
export const getAllPaymentMethod = async(query, token) => {
    return getItemUsingToken('payment-methods', query, token)
}