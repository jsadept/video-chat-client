import { configureStore } from '@reduxjs/toolkit'
import {Action, applyMiddleware, combineReducers} from "redux";
import { ThunkAction } from 'redux-thunk';
import authSlice from './auth/auth-slice';
import userSlice from './user/user-slice';
import socketSlice from "./socket/socket-slice";
import mediaSlice from "./media/media-slice";
import peerSlice from "./peer/peer-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        socket: socketSlice,
        media: mediaSlice,
        peer: peerSlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
