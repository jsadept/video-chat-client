
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LoadingStatus, UserResponse } from "../../types/types";


// create initialState
// create interface
// createSlice



export interface UserState {
    user?: UserResponse;
    loadingStatus: string;
    successMessage: string;
}

export const initialState: UserState = {
    user: undefined,
    loadingStatus: LoadingStatus.LOADING,
    successMessage: ''
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserResponse>){
            state.user = action.payload;
            state.loadingStatus = LoadingStatus.LOADED;
        },
        logoutSuccess(state) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            state.user = undefined;
        }
    }
})


export const { setUser, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;