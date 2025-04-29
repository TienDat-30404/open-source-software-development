import { createSlice } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';

const initialState = {
    auth: {},
    accessToken : "",
    isAuthenticated : false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {  data, accessToken } = action.payload;
            state.auth = data; 
            state.accessToken = accessToken
            state.isAuthenticated = true
        },

        logout : (state) => {
            state.auth = {},
            state.accessToken = ""
            state.isAuthenticated = false
        },

        updateProfileRedux : (state, action) => {
            state.auth = {
                ...state.auth,
                ...action.payload
            }
        }
    }
})

export const {setCredentials, logout, updateProfileRedux} = authSlice.actions
export default authSlice.reducer