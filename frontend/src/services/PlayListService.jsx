import { getItem, createItem, deleteItem, updateItemByFormData, addItemToItem, deleteItemOutOfIem, getItemForToken, addItemUsingToken } from "./apis"
export const getAllPlaylist = async(query, token) => {
    return getItemForToken('playlists', query, token)
}

export const createPlayList = async(data, token) => {
    return addItemUsingToken('playlists', data, token)
}

export const deletePlaylist = async (id, token) => {  
    return deleteItem('playlists', id, token)
}

export const updatePlaylist = async({id, data, token}) => {
    return updateItemByFormData('playlists', id, data, token)
}


export const addSongOnPlaylist = async(id, data, token) => {
    return addItemToItem('playlists', id, 'add-song-to-playlist', data, token)
}

export const deleteSongOutOfPlaylist = async({idPlaylist, idSong, token}) => {
    return deleteItemOutOfIem('playlists', idPlaylist, 'remove-song-out-playlist', idSong, token)
}


