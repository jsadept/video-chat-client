import { createAsyncThunk } from "@reduxjs/toolkit";
import Peer, { MediaConnection } from "peerjs";
import { getRandomId } from "../../utils/getRandomId";
import { peerConfig } from "../../constants/peerConfig";
import { addRemoteStream, removeRemoteStream, removeRemoteStreams } from "../media/media-slice";
import { RootState } from "../index";
import { updateStream } from "../media/media-thunks";
import { UserResponse } from "../../types/types";

export const peerConnect = createAsyncThunk<
    Peer,
    void,
    {state: RootState,  rejectValue: string }
    >('peer/peerConnect', async ( _, thunkAPI) => {
        try {
            await thunkAPI.dispatch(await updateStream());
            const { userStream } = thunkAPI.getState().media;

            const peer = new Peer(String(getRandomId()), peerConfig);

            peer?.on('call', (call) => {
                call.answer(userStream);
                call.on('stream', (peerStream: MediaStream) => {
                    thunkAPI.dispatch(addRemoteStream({
                        stream: peerStream,
                        peerId: call.peer,
                        userInfo: call.metadata.userInfo
                    }));
                });

                call.on('close', () => {
                    thunkAPI.dispatch(removeRemoteStream(call.peer));
                });

                call.on('error', () => {
                    thunkAPI.dispatch(removeRemoteStream(call.peer));
                });

                call.on('iceStateChanged', (e) => {
                    if(e === 'disconnected'){
                        thunkAPI.dispatch(removeRemoteStream(call.peer));
                        call.close();
                    }
                })

            });
            return peer;
        }
        catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
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
            thunkAPI.dispatch(removeRemoteStreams());
        }
        catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);

export const peerCall = createAsyncThunk<
    MediaConnection,
    { userInfo: UserResponse, peerId: string },
    {state: RootState,  rejectValue: string }
    >('peer/peerCall', async ({userInfo, peerId}, thunkAPI) => {
        try {

            const { peer } = thunkAPI.getState().peer;
            const { userStream } = thunkAPI.getState().media;
            const myInfo = thunkAPI.getState().user.user;
            const call = peer!.call(peerId, userStream!, {metadata: {userInfo: myInfo}});

            call.on('stream', (peerStream: MediaStream) => {

                thunkAPI.dispatch(addRemoteStream({
                    stream: peerStream,
                    peerId: peerId,
                    userInfo: userInfo
                }));
            });


            call.on('close', () => {
                thunkAPI.dispatch(removeRemoteStream(call.peer));
            });

            call.on('error', () => {
                thunkAPI.dispatch(removeRemoteStream(call.peer));
            });

            call.on('iceStateChanged', (e) => {
                if(e === 'disconnected'){
                    thunkAPI.dispatch(removeRemoteStream(call.peer));
                    call.close();
                }

            })

            return call;

        }
        catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
    }
);