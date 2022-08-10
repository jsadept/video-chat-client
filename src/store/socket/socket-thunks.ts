import {createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../index";
import axios from "axios";
import {API_BASE_URL, AUTH_LOGIN, ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE} from "../../constants";
import {peerCall} from "../peer/peer-thunks";
import {Socket} from "socket.io-client";









export const joinRoom = createAsyncThunk<
        string,
        string,
        {state: RootState,  rejectValue: string }
    >('socket/join', async (roomId, thunkAPI) => {
    try {
        const socket = thunkAPI.getState().socket.socket;
        const token = localStorage.getItem('token');

        await axios.post(API_BASE_URL+ROOM_JOIN, {token, socket, roomId});

        socket.on('newUser', ({ userInfo, peerId }) => {
            thunkAPI.dispatch(peerCall({ userInfo, peerId }))
        })

        return roomId;
    }
    catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(e)
    }
});




export const createRoom = createAsyncThunk<
        string,
        void,
        {state: RootState,  rejectValue: string }
    >('socket/createRoom', async (_, thunkAPI) => {
    try {
        const socketId = thunkAPI.getState().socket.socket.id;
        const token = localStorage.getItem('token');
        console.log('test')
        console.log('test2')
        console.log(socketId)
        const result = await axios.post(API_BASE_URL+ROOM_CREATE, {token, socketId})
            .then((response) => response.data.roomId)
            .catch((error) => thunkAPI.rejectWithValue(error))
        console.log('test4')
        console.log(result)
        const roomId = result;
        console.log('test5')


        return roomId;
    } catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(error.response.data);
    }
});





export const leaveRoom = createAsyncThunk<
        string,
        void,
        {state: RootState,  rejectValue: string }
    >('socket/leaveRoom', async (_, thunkAPI) => {
    try {
        const socket = thunkAPI.getState().socket.socket;
        const token = localStorage.getItem('token');

        const result = await axios.post(API_BASE_URL+ROOM_LEAVE, {token, socket});
        return '';
    } catch (e) {
        // @ts-ignore
        return thunkAPI.rejectWithValue(e)
    }
});

