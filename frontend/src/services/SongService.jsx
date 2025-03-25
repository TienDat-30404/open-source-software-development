import { getItem } from "./apis"
export const getAllSong = async (query) => {
    return getItem('songs', query)
}

