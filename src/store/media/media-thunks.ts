import {createAsyncThunk} from "@reduxjs/toolkit";
import { RootState } from "../index";


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
            }).catch((err) => {
                const error = err as Error;
                return thunkAPI.rejectWithValue(error.message);
            });
        } catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
})


export const getStreamSources = createAsyncThunk<
    {audioInputs: MediaDeviceInfo[], videos: MediaDeviceInfo[], selectedCameraId: string, selectedAudioId: string},
    void,
    {rejectValue: string }
    >('media/getStreamSources', async (_, thunkAPI) => {
        try {
            if (navigator.mediaDevices) {

                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(device => device.kind === 'audioinput');
                const videos = devices.filter(device => device.kind === 'videoinput');
                const selectedCameraId = localStorage.getItem('selectedCameraId') || '';
                const selectedAudioId = localStorage.getItem('selectedAudioId') || '';


                return {audioInputs, videos, selectedCameraId, selectedAudioId};
            }
            else{
                return thunkAPI.rejectWithValue('No media devices');
            }
        } catch (err) {
            const error = err as Error;
            return thunkAPI.rejectWithValue(error.message)
        }
});