import { getItem } from "./apis"
export const getAllSong = async (query) => {
    return getItem('songs', query)
}


export const chatWithAI = async (query) => {
    return getItem('songs/suggest-songs-ai', query)
}

