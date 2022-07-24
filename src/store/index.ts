import { configureStore } from '@reduxjs/toolkit'
import {Action, applyMiddleware, combineReducers} from "redux";
import { ThunkAction } from 'redux-thunk';
import userSlice, { UserState } from './user/user-slice';

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        user: userSlice
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
