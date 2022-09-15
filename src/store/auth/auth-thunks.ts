import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {UserData, UserRegistration, UserResponse} from "../../types/types";
import {API_BASE_URL, AUTH_LOGIN, AUTH_REG} from "../../constants";
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
        } catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
});

export const login = createAsyncThunk<
        UserResponse,
        UserData,
        { rejectValue: string }
    >('auth/login', async (userData, thunkAPI) => {
    try {
        const result = await axios.post(API_BASE_URL+AUTH_LOGIN, userData);
        // const token = result.data.token;
        localStorage.setItem("token", JSON.stringify(result.data.token));
        localStorage.setItem("user", JSON.stringify(result.data.user));

        thunkAPI.dispatch(setUser({...result.data.user}));
        return result.data;
    } catch (err) {
        const error = err as Error;
        return thunkAPI.rejectWithValue(error.message)
    }
})



export const registration = createAsyncThunk<
        boolean,
        UserRegistration,
        { rejectValue: string }
    >('auth/registration', async ( UserRegistrationData, thunkAPI ) => {
        try {
            console.log(API_BASE_URL+AUTH_REG)
            console.log(UserRegistrationData)
            const result = await axios.post(API_BASE_URL+AUTH_REG, UserRegistrationData).then((res) => {
                console.log(res)
                return res.data;
            }).catch((e) => {
                console.log(e)
            });
            console.log(result)
            return result.data;
        } catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
})