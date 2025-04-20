import { createItemByFormData, getItem } from "./apis"
export const getAllAlbum = async (query) => {
    return getItem('albums', query)
}


export const createAlbum = async(data) => {
    return createItemByFormData('albums', data)
}
