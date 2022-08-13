import {createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../index";
import axios, { AxiosError } from "axios";
import {API_BASE_URL, ROOM_CHECK, ROOM_CREATE, ROOM_JOIN, ROOM_LEAVE} from "../../constants";
import {peerCall, peerDisconnect} from "../peer/peer-thunks";


export const joinRoom = createAsyncThunk<
        string,
        string,
        {state: RootState,  rejectValue: string }
    >('socket/join', async (roomId, thunkAPI) => {
    try {
        const socketId = thunkAPI.getState().socket.socket.id;
        const socket = thunkAPI.getState().socket.socket;
        const userInfo = thunkAPI.getState().user.user;
        const myPeerId = thunkAPI.getState().peer.peer?.id;
        const token = localStorage.getItem('token');

        await axios.post(API_BASE_URL+ROOM_JOIN, {token, socketId, peerId: myPeerId, roomId, userInfo}).then(() => {
            socket.on('newUser', (data) => {
                    thunkAPI.dispatch(peerCall({userInfo: data.userInfo, peerId: data.peerId}))

            });

        });

        return roomId;
    }
    catch (err) {
        const error = err as AxiosError;
        return thunkAPI.rejectWithValue(error.message)
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

        return await axios.post(API_BASE_URL+ROOM_CREATE, {token, socketId})
            .then((response) => response.data.roomId)
            .catch((error) => thunkAPI.rejectWithValue(error));
    } catch (err) {
        const error = err as AxiosError;
        return thunkAPI.rejectWithValue(error.message)
    }
});


export const leaveRoom = createAsyncThunk<
        string,
        void,
        {state: RootState,  rejectValue: string }
    >('socket/leaveRoom', async (_, thunkAPI) => {
    try {
        console.log('leaveRoom???')
        const socketId = thunkAPI.getState().socket.socket.id;
        const roomId = thunkAPI.getState().socket.currentRoom;
        const token = localStorage.getItem('token');

        await axios.post(API_BASE_URL+ROOM_LEAVE, {token, socketId, roomId});
        thunkAPI.dispatch(peerDisconnect());

        return '';
    } catch (err) {
        const error = err as AxiosError;
        return thunkAPI.rejectWithValue(error.message)
    }
});

export const checkRoom = createAsyncThunk<
    boolean,
    string,
    {state: RootState,  rejectValue: string }
    >('socket/checkRoom', async (roomId, thunkAPI) => {
        try {
            return await axios.post(API_BASE_URL+ROOM_CHECK, {roomId}).then((response) => response.data.result);
        }
        catch (err) {
            const error = err as AxiosError;
            return thunkAPI.rejectWithValue(error.message)
        }
})