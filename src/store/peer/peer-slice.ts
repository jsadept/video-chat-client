import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {peerCall, peerConnect, peerDisconnect} from "./peer-thunks";
import Peer, {MediaConnection} from "peerjs";
import {ConnectingStatus} from "../../types/types";


export interface PeerState{
    peer: Peer | undefined;
    isPeerConnected: ConnectingStatus;
    isPeerCallConnected: ConnectingStatus;
    error: string;
    callError: string;
}


export const initialState: PeerState = {
    peer: undefined,
    isPeerConnected: ConnectingStatus.NEVER,
    isPeerCallConnected: ConnectingStatus.NEVER,
    error: '',
    callError: '',
}


export const peerSlice = createSlice({
    name: 'peer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(peerConnect.fulfilled, (state, action: PayloadAction<Peer>) => {
            state.peer = action.payload;
            state.isPeerConnected = ConnectingStatus.CONNECTED;
        });
        builder.addCase(peerConnect.pending, (state, action) => {
            state.isPeerConnected = ConnectingStatus.CONNECTING;
            state.error = '';
        });
        builder.addCase(peerConnect.rejected, (state, action) => {
            state.isPeerConnected = ConnectingStatus.ERROR;
            state.error = action.payload!;
        });



        builder.addCase(peerDisconnect.fulfilled, (state, action) => {
            state.isPeerConnected = ConnectingStatus.CONNECTED;
        });
        builder.addCase(peerDisconnect.pending, (state, action) => {
            state.isPeerConnected = ConnectingStatus.CONNECTING;
            state.error = '';
        });
        builder.addCase(peerDisconnect.rejected, (state, action) => {
            state.isPeerConnected = ConnectingStatus.ERROR;
            state.error = action.payload!;
        });



        builder.addCase(peerCall.fulfilled, (state, action: PayloadAction<MediaConnection>) => {
            state.isPeerCallConnected = ConnectingStatus.CONNECTED;
        });
        builder.addCase(peerCall.pending, (state, action) => {
            state.isPeerCallConnected = ConnectingStatus.CONNECTING;
            state.callError = '';
        });
        builder.addCase(peerCall.rejected, (state, action) => {
            state.isPeerCallConnected = ConnectingStatus.ERROR;
            state.callError = action.payload!;
        });
    }
})


export default peerSlice.reducer;