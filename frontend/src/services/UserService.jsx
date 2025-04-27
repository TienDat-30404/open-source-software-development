import {createItem } from "./apis"

export const registerAccount = async(data) => {
    return createItem('auth/register', data)
}
