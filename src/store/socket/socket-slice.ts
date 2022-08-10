
import { io, Socket } from "socket.io-client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WEBSOCKET_BASE_URL} from "../../constants";
import {createRoom, joinRoom, leaveRoom} from "./socket-thunks";
import {CreatingStatus, JoiningStatus} from "../../types/types";



// create initialState
// create interface
// createSlice


export interface SocketState{
    socket: Socket;
    isJoined: JoiningStatus;
    isCreated: CreatingStatus;
    currentRoom: string;
    createdRoom: string;
    error: string;
}

export const initialState: SocketState = {
    socket: io(WEBSOCKET_BASE_URL),
    isJoined: JoiningStatus.NEVER,
    isCreated: CreatingStatus.NEVER,
    currentRoom: '',
    createdRoom: '',
    error: ''
}



export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {

        // create
        builder.addCase(createRoom.fulfilled, (state, action: PayloadAction<string>) => {
            console.log('test2')
            state.createdRoom = action.payload;
            state.isCreated = CreatingStatus.CREATED;
        });
        builder.addCase(createRoom.pending, (state, action) => {
            state.isCreated = CreatingStatus.CREATING;
            state.error = '';
        });
        builder.addCase(createRoom.rejected, (state, action) => {
            state.isCreated = CreatingStatus.ERROR;
            state.error = action.payload!;
        });

        // join
        builder.addCase(joinRoom.fulfilled, (state, action) => {

            state.currentRoom = action.payload;
            state.isJoined = JoiningStatus.JOINED;
        });
        builder.addCase(joinRoom.pending, (state, action) => {

            state.isJoined = JoiningStatus.JOINING;
            state.error = '';
        });
        builder.addCase(joinRoom.rejected, (state, action) => {

            state.isJoined = JoiningStatus.ERROR;
            state.error = action.payload!;
        });

        // leave
        builder.addCase(leaveRoom.fulfilled, (state, action) => {

            state.currentRoom = '';
            state.isJoined = JoiningStatus.LEAVED;
        });
        builder.addCase(leaveRoom.pending, (state, action) => {

            state.isJoined = JoiningStatus.LEAVING;
            state.error = '';
        });
        builder.addCase(leaveRoom.rejected, (state, action) => {

            state.isJoined = JoiningStatus.ERROR;
            state.error = action.payload!;
        });
    }
})


export default socketSlice.reducer;