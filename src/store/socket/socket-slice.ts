
import { io, Socket } from "socket.io-client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WEBSOCKET_BASE_URL} from "../../constants";
import {checkRoom, createRoom, joinRoom, leaveRoom} from "./socket-thunks";
import {CheckingStatus, CreatingStatus, JoiningStatus} from "../../types/types";



export interface SocketState{
    socket: Socket;
    isJoined: JoiningStatus;
    isCreated: CreatingStatus;
    currentRoom: string;
    createdRoom: string;
    error: string;
    isRoomCreated: boolean | null;
    isChecked: CheckingStatus;
}

export const initialState: SocketState = {
    socket: io(WEBSOCKET_BASE_URL),
    isJoined: JoiningStatus.NEVER,
    isCreated: CreatingStatus.NEVER,
    currentRoom: '',
    createdRoom: '',
    error: '',
    isRoomCreated: null,
    isChecked: CheckingStatus.NEVER
}



export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setCurrentRoom: (state, action: PayloadAction<string>) => {
            state.currentRoom = action.payload;
        },
        resetIsChecked: (state) => {
            state.isChecked = CheckingStatus.NEVER;
        }
    },
    extraReducers: (builder) => {

        // create
        builder.addCase(createRoom.fulfilled, (state, action: PayloadAction<string>) => {
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

        // check
        builder.addCase(checkRoom.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isRoomCreated = action.payload;
            state.isChecked = CheckingStatus.CHECKED;
        });
        builder.addCase(checkRoom.pending, (state, action) => {
            state.isRoomCreated = null;
            state.isChecked = CheckingStatus.CHECKING;
        });
        builder.addCase(checkRoom.rejected, (state, action) => {
            state.isRoomCreated = null;
            state.isChecked = CheckingStatus.ERROR;
            state.error = action.payload!;
        });
    }
})



export const {
    setCurrentRoom,
    resetIsChecked
} = socketSlice.actions;


export default socketSlice.reducer;