import { addItemUsingToken, addItemUsingTokenFormData, createItem, createItemByFormData, getItem, getItemUsingToken, updateItemByFormData } from "./apis"
export const getAllSong = async (query) => {
    return getItem('songs', query)
}


export const createSong = async(data, token) => {
    return addItemUsingTokenFormData('songs', data, token)
}

export const updateSong = async({id, data, token}) => {
    return updateItemByFormData('songs', id, data, token)
}


export const chatWithAI = async (query, token) => {
    return addItemUsingToken('songs/suggest-songs-ai', query, token)
}

export const getHistoryChatAI = async (query, token) => {
    return getItemUsingToken('songs/get-history-chat-ai', query, token)
}


