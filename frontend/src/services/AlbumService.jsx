import { addItemUsingTokenFormData, deleteItem, getItem, updateItemByFormData } from "./apis"
export const getAllAlbum = async (query) => {
    return getItem('albums', query)
}


export const createAlbum = async ({ data, token }) => {
    return addItemUsingTokenFormData('albums', data, token);
  };

  export const updateAlbum = async({id, data, token}) => {
    return updateItemByFormData('albums', id, data, token)
}


export const deleteAlbum = async (id, token) => {  
  return deleteItem('albums', id, token)
}