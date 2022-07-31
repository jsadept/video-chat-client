import {createAsyncThunk} from "@reduxjs/toolkit";
import Peer from "peerjs";
import {getRandomId} from "../../utils/getRandomId";
import {peerConfig} from "../../constants/peerConfig";
import {addRemoteStream, removeRemoteStream} from "../media/media-slice";
import {RootState} from "../index";

export const peerConnect = createAsyncThunk<
    Peer,
    { userInfo: string, peerId: string },
    {state: RootState,  rejectValue: string }
    >('peer/peerConnect', async ({ userInfo, peerId }, thunkAPI) => {
        try {
            const { userStream } = thunkAPI.getState().media;

            const peer = new Peer(String(getRandomId()), peerConfig);

            peer.on('call', (call) => {
                call.answer(userStream);
                call.on('stream', (peerStream: MediaStream) => {
                    thunkAPI.dispatch(addRemoteStream({
                        stream: peerStream,
                        peerId: call.peer,
                        userInfo: call.metadata
                    }));
                });

                call.on('close', () => {
                    thunkAPI.dispatch(removeRemoteStream(call.peer));
                });

                call.on('error', () => {
                    thunkAPI.dispatch(removeRemoteStream(call.peer));
                });

            });
            return peer;
        } catch (e){
            // @ts-ignore
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const peerDisconnect = createAsyncThunk<
    void,
    void,
    {state: RootState,  rejectValue: string }
    >('peer/peerDisconnect', async (_, thunkAPI) => {

        const { peer } = thunkAPI.getState().peer;
        try {
            peer!.disconnect();
            peer!.destroy();
        } catch (e){
            // @ts-ignore
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const peerCall = createAsyncThunk<
    void,
    { userInfo: string, peerId: string },
    {state: RootState,  rejectValue: string }
    >('peer/peerDisconnect', async ({ userInfo, peerId }, thunkAPI) => {
        try {

            const { peer } = thunkAPI.getState().peer;
            const { userStream } = thunkAPI.getState().media;

            const call = peer!.call(peerId, userStream!, {metadata: {userInfo}});
            call.on('stream', (peerStream: MediaStream) => {
                thunkAPI.dispatch(addRemoteStream({
                    peerId,
                    stream: peerStream,
                    userInfo: userInfo
                }))
            });

            call.on('close', () => {
                thunkAPI.dispatch(removeRemoteStream(call.peer));
            });

            call.on('error', () => {
                thunkAPI.dispatch(removeRemoteStream(call.peer));
            });

        } catch (e){
            // @ts-ignore
            return thunkAPI.rejectWithValue(e);
        }
    }
);