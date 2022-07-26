import {createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../index";
import axios from "axios";
import {API_BASE_URL, AUTH_LOGIN, ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE} from "../../constants";
import {setUser} from "../user/user-slice";









export const joinRoom = createAsyncThunk<
        string,
        string,
        {state: RootState,  rejectValue: string }
    >('socket/join', async (roomId, thunkAPI) => {
    try {
        const socket = thunkAPI.getState().socket.socket;
        const token = localStorage.getItem('token');

        await axios.post(API_BASE_URL+ROOM_JOIN, {token, socket, roomId});
        return roomId;
    }
    catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(e)
    }
})




export const createRoom = createAsyncThunk<
        string,
        string,
        {state: RootState,  rejectValue: string }
    >('socket/createRoom', async (token, thunkAPI) => {
    try {
        const socket = thunkAPI.getState().socket.socket;

        const result = await axios.post(API_BASE_URL+ROOM_CREATE, {token, socket});
        const roomId = result.data.roomId;

        return roomId;
    } catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(error.response.data);
    }
})





export const leaveRoom = createAsyncThunk<
    string,
        string,
        {state: RootState,  rejectValue: string }
    >('socket/createRoom', async (token, thunkAPI) => {
    try {
        const socket = thunkAPI.getState().socket.socket;
        const result = await axios.post(API_BASE_URL+ROOM_LEAVE, {token, socket});
        return '';
    } catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(e)
    }
})

