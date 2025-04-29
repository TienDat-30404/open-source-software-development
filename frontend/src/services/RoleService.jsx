import { addItemUsingToken, createItem, deleteItem, getItem, getItemForToken, updateItemByFormData } from "./apis"
export const getAllRole = async (query, token) => {
    return getItemForToken('roles', query, token)
}

export const createRole = async({data, token}) => {
    return addItemUsingToken('roles', data, token)
}


export const updateRole = async({id, data, token}) => {
    return updateItemByFormData('roles', id, data, token)
}


export const deleteRole = async ({id, token}) => {  
    return deleteItem('roles', id, token)
}