import { addItemUsingTokenFormData, deleteItem, getItem, updateItemByFormData } from "./apis"
export const getAllPlan = async(query) => {
    return getItem('plans', query)
}

export const createPlan = async({data, token}) => {
    return addItemUsingTokenFormData('plans', data, token)
}

export const updatePlan = async({id, data, token}) => {
    return updateItemByFormData('plans', id, data, token)
}

export const deletePlan = async (id, token) => {  
    return deleteItem('plans', id, token)
}