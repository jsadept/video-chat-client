import { configureStore } from '@reduxjs/toolkit'
import {Action, applyMiddleware, combineReducers} from "redux";
import thunk, { ThunkAction } from 'redux-thunk';
//import reducers from './reducers';

//const rootReducer = combineReducers(reducers)

//export const store = createStore(rootReducer, applyMiddleware(thunk))


export const store = configureStore({
    reducer: {
        //counter: counterReducer,
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
