import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {UserData, UserRegistration, UserResponse} from "../../types/types";
import {API_BASE_URL, AUTH_LOGIN} from "../../constants";
import { setUser } from "../user/user-slice";


export const initAuth = createAsyncThunk<
    boolean,
    void,
    { rejectValue: string }
    >('auth/initAuth', async (_, thunkAPI) => {
        try {
            const localUser = localStorage.getItem('user');
            if(localUser){
                thunkAPI.dispatch(setUser(JSON.parse(localUser)));
                return true;
            }
            return false;
        } catch (e) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(error.response.data);
        }
});

export const login = createAsyncThunk<
        UserResponse,
        UserData,
        { rejectValue: string }
    >('auth/login', async (userData, thunkAPI) => {
    try {
        const result = await axios.post(API_BASE_URL+AUTH_LOGIN, userData);
        const token = result.data.token;
        localStorage.setItem("token", result.data.token);

        thunkAPI.dispatch(setUser(result.data.user));
        return result.data;
    } catch (error) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(error.response.data);
    }
})



export const registration = createAsyncThunk<
        boolean,
        UserRegistration,
        { rejectValue: string }
    >('auth/registration', async ( UserRegistrationData, thunkAPI ) => {
        try {
            const result = await axios.post(API_BASE_URL+AUTH_LOGIN, UserRegistrationData);
            return result.data;
        } catch (error){
            // @ts-ignore
            return thunkAPI.rejectWithValue(error.response.data);
        }
})