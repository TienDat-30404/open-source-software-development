import { addItemUsingTokenFormData, getItem } from "./apis"
export const getAllAlbum = async (query) => {
    return getItem('albums', query)
}


export const createAlbum = async ({ data, token }) => {
    return addItemUsingTokenFormData('albums', data, token);
  };