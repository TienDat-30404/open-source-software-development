import { createItem, deleteItem, getItem, updateItemByFormData } from "./apis"
export const getAllCategory = async (query) => {
    return getItem('categories', query)
}

export const createCategory = async(data) => {
    return createItem('categories', data)
}


export const updateCategory = async(id, data) => {
    return updateItemByFormData('categories', id, data)
}


export const deleteCategory = async (id) => {  
    return deleteItem('categories', id)
}