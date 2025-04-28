import { createItem, updateItemNotId } from "./apis"

export const registerAccount = async(data) => {
    return createItem('auth/register', data)
}


export const updateProfile = async(data, token) => {
    return updateItemNotId('auth/update-profile', data, token)
}
