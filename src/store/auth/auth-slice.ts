import {LoadingStatus} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initAuth, login, registration} from "./auth-thunks";


// create initialState
// create interface
// createSlice


export interface AuthState {
    loadingState: LoadingStatus;
    isRegistered: boolean;
    isLogin: boolean;
    success: string;
    error: string;
}




export const initialState: AuthState = {
    loadingState: LoadingStatus.LOADING,
    isRegistered: false,
    isLogin: false,
    success: "",
    error: "",
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoadingState(state, action: PayloadAction<LoadingStatus>){
            state.loadingState = action.payload;
        },
        resetAuthState: () => initialState

    },
    extraReducers: (builder) =>{
        //init
        builder.addCase(initAuth.fulfilled, (state, action) => {
            state.isLogin = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(initAuth.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
            state.error = "";
        });
        builder.addCase(initAuth.rejected, (state, action) => {
            state.error = action.payload!;
        });

        // login
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLogin = true;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(login.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
            state.error = "";
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.payload!;
        });

        //registration
        builder.addCase(registration.fulfilled, (state, action) => {
            state.isRegistered = true;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(registration.pending, (state, action) => {
            state.loadingState = LoadingStatus.LOADING;
            state.error = "";
        });
        builder.addCase(registration.rejected, (state, action) => {
            state.error = action.payload!;
        });
    }
})


export const {setAuthLoadingState, resetAuthState} = authSlice.actions;

export default authSlice.reducer;