import { getItem, createItem, deleteItem } from "./apis"
export const getAllRoom = async (query) => {
    return getItem('conversations/rooms', query)
}


export const createRoom = async(data) => {
    return createItem('conversations/rooms', data)
}


export const deleteRoom = async (id) => {  
    return deleteItem('conversations/rooms', id)
}