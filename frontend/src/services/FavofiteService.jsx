import { getItem, createItem, deleteItem, updateItemByFormData, addItemToItem, deleteItemOutOfIem, getItemForToken, addItemUsingToken } from "./apis"
export const getAllFavoriteOfUser = async(query, token) => {
    return getItemForToken('favorites', query, token)
}

export const addSongFavorite = async(data, token) => {
    return addItemUsingToken('favorites', data, token)
}

export const deleteSongFavorite = async (id, token) => {  
    return deleteItem('favorites', id, token)
}




