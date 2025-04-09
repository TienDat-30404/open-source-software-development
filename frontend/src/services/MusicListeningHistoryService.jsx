import { getItem, createItem } from "./apis"
export const getAllHistoryMusicOfUser = async(query) => {
    return getItem('history/listening-history', query)
}

export const saveHistoryListeningMusic = async(data) => {
    return createItem('history/listening-history', data)
}
