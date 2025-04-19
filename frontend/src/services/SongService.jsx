import { createItem, createItemByFormData, getItem } from "./apis"
export const getAllSong = async (query) => {
    return getItem('songs', query)
}


export const createSong = async(data) => {
    return createItemByFormData('songs', data)
}


export const chatWithAI = async (query) => {
    return createItem('songs/suggest-songs-ai', query)
}

export const getHistoryChatAI = async (query) => {
    return getItem('songs/get-history-chat-ai', query)
}


