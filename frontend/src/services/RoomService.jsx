import { getItem, createItem, deleteItem, getItemForToken, addItemUsingToken } from "./apis"
export const getAllRoom = async (query, token) => {
    return getItemForToken('conversations/rooms', query, token)
}

export const getMessageByRoom = async (roomName, query, token) => {
    return getItemForToken(`conversations/messages/${roomName}`, query, token)
}


export const createRoom = async(data, token) => {
    return addItemUsingToken('conversations/rooms', data, token)
}


export const deleteRoom = async (id, token) => {  
    return deleteItem('conversations/rooms', id, token)
}