import { addItemUsingTokenFormData, createItemByFormData, deleteItem, getItem, updateItemByFormData } from "./apis"
export const getAllArtist = async (query) => {
    return getItem('artists', query)
}

export const createArtist = async({data, token}) => {
    return addItemUsingTokenFormData('artists', data, token)
}



export const deleteArtist = async ({id, token}) => {  
    return deleteItem('artists', id, token)
}

export const updateArtist = async({id, data, token}) => {
    return updateItemByFormData('artists', id, data, token)
}
