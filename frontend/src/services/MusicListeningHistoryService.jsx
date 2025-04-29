import { getItem, createItem, getItemForToken, addItemUsingToken } from "./apis"
export const getAllHistoryMusicOfUser = async(query, token) => {
    return getItemForToken('history/listening-history', query, token)
}

export const saveHistoryListeningMusic = async(data, token) => {
    return addItemUsingToken('history/listening-history', data, token)
}
