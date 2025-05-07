import { getItem, createItem, getItemForToken, addItemUsingToken, updateItemNotIdByPatch, deleteItem } from "./apis"
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

export const deleteHistoryMusic = async (id, token) => {  
    return deleteItem('history/listening-history', id, token)
}


export const deleteAllHistoryMusic = async (token) => {
    await fetch(`${import.meta.env.VITE_API_URL}/history/listening-history/`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
}