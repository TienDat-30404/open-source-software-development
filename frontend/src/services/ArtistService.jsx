import { createItemByFormData, deleteItem, getItem, updateItemByFormData } from "./apis"
export const getAllArtist = async (query) => {
    return getItem('artists', query)
}

export const createArtist = async(data) => {
    return createItemByFormData('artists', data)
}



export const deleteArtist = async (id) => {  
    return deleteItem('artists', id)
}

export const updateArtist = async(id, data) => {
    return updateItemByFormData('artists', id, data)
}
