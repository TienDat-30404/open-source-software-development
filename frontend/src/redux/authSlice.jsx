import { createSlice } from "@reduxjs/toolkit";
import { persistStore } from 'redux-persist';

const initialState = {
    auth: {},
    isAuthenticated : false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const {  data } = action.payload;
            state.auth = data; 
            state.isAuthenticated = true
        },

        logout : (state) => {
            state.auth = {},
            state.isAuthenticated = false
        }
    }
})

export const {setCredentials, logout} = authSlice.actions
export default authSlice.reducer