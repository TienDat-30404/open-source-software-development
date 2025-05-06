import { addItemUsingToken, addItemUsingTokenFormData, createItem, deleteItem, getItemForToken, updateItemByFormData, updateItemNotId } from "./apis"


export const registerAccount = async(data) => {
    return createItem('auth/register', data)
}


export const updateProfile = async(data, token) => {
    return updateItemNotId('auth/update-profile', data, token)
}

export const getAllUser = async(query, token) => {
    return getItemForToken('users', query, token)
}


export const createUser = async({data, token}) => {
    return addItemUsingTokenFormData('users', data, token)
}

export const updateUser = async({id, data, token}) => {
    return updateItemByFormData('users', id, data, token)
}

export const deleteUser = async (id, token) => {  
    return deleteItem('users', id, token)
}

