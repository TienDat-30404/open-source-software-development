import { getItem, createItem, getItemForToken, addItemUsingToken, updateItemNotIdByPatch } from "./apis"
export const getAllHistoryMusicOfUser = async(query, token) => {
    return getItemForToken('history/listening-history', query, token)
}

export const saveHistoryListeningMusic = async(data, token) => {
    return addItemUsingToken('history/listening-history', data, token)
}


export const updateViewsSong = async(data, token) => {
    return updateItemNotIdByPatch('history/listening-history', data, token)
}

export const getTopSong = async (query) => {
    return getItem('history/top-songs', query)
}
