import { getItem } from "./apis"
export const getAllArtist = async (query) => {
    return getItem('artists', query)
}


