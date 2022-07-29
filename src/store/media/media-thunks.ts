import {createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../index";
import {setAudioSources, setVideoSources, setStream } from "./media-slice";


export const updateStream = createAsyncThunk<
    MediaStream,
    void,
    {state: RootState,  rejectValue: string }
    >('media/updateStream', async (_, thunkAPI) => {
        try {
            const { isVideo, isAudio, selectedCameraId, selectedAudioId } = thunkAPI.getState().media;

            return await navigator.mediaDevices.getUserMedia({
                video: isVideo && { deviceId: selectedCameraId },
                audio: isAudio && { deviceId: selectedAudioId }
            }).then((myStream: MediaStream) => {
                return myStream;
            }).catch((e) => {
                // @ts-ignore
                return thunkAPI.rejectWithValue(e)
            });
        } catch (e) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(e)
        }
})


export const getStreamSources = createAsyncThunk<
    {audioInputs: MediaDeviceInfo[], videos: MediaDeviceInfo[]},
    void,
    {rejectValue: string }
    >('media/getStreamSources', async (_, thunkAPI) => {
        try {
            if (navigator.mediaDevices) {

                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(device => device.kind === 'audioinput');
                const videos = devices.filter(device => device.kind === 'videoinput');

                return {audioInputs, videos};
            }
            else{
                return thunkAPI.rejectWithValue('No media devices');
            }
        } catch (e) {
            // @ts-ignore
            return thunkAPI.rejectWithValue(e);
        }
});