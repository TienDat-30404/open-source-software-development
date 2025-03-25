import { getItem } from "./apis"
export const getAllAlbum = async (query) => {
    return getItem('albums', query)
}

