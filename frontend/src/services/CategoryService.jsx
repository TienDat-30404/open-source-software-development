import { addItemUsingToken, createItem, deleteItem, getItem, updateItemByFormData } from "./apis"
export const getAllCategory = async (query) => {
    return getItem('categories', query)
}

export const createCategory = async({data, token}) => {
    return addItemUsingToken('categories', data, token)
}


export const updateCategory = async({id, data, token}) => {
    return updateItemByFormData('categories', id, data, token)
}


export const deleteCategory = async ({id, token}) => {  
    return deleteItem('categories', id, token)
}