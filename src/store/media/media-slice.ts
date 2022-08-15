import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AudioSettings, ConnectingStatus, RemoteMediaData, VideoSettings} from "../../types/types";
import {getStreamSources, updateStream} from "./media-thunks";


export interface MediaState{
    remoteMediaData: RemoteMediaData[];
    userStream: MediaStream | undefined;
    videoSources: MediaDeviceInfo[];
    audioSources: MediaDeviceInfo[];
    selectedCameraId: string;
    selectedAudioId: string;
    isVideo: VideoSettings | boolean;
    isAudio: AudioSettings | boolean;
    isMediaConnected: ConnectingStatus;
    error: string;
}


export const initialState: MediaState = {
    remoteMediaData: [],
    userStream: undefined,
    videoSources: [],
    audioSources: [],
    selectedCameraId: '',
    selectedAudioId: '',
    isVideo: true,
    isAudio: true,
    isMediaConnected: ConnectingStatus.NEVER,
    error: '',
}


const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setStream: (state, action: PayloadAction<MediaStream>) => {
            state.userStream = action.payload;
        },
        setIsVideo: (state) => {
            state.userStream?.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        },
        setIsAudio: (state) => {
            state.userStream?.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        },
        setAudioSources: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
            state.audioSources = action.payload;
        },
        setVideoSources: (state, action: PayloadAction<MediaDeviceInfo[]>) => {
            state.videoSources = action.payload;
        },
        setSelectedAudioId: (state, action: PayloadAction<string>) => {
            state.selectedAudioId = action.payload;
            localStorage.setItem('selectedAudioId', action.payload);
        },
        setSelectedVideoId: (state, action: PayloadAction<string>) => {
            state.selectedCameraId = action.payload;
            localStorage.setItem('selectedCameraId', action.payload);
        },
        addRemoteStream: (state, action: PayloadAction<RemoteMediaData>) => {
            if(!state.remoteMediaData.some((curr) => curr.peerId === action.payload.peerId)) {
                state.remoteMediaData.push(action.payload);

            }
        },
        removeRemoteStream: (state, action: PayloadAction<string>) => {
            // payload PeerId
            state.remoteMediaData = state.remoteMediaData.filter((current) => {
                if(current.peerId === action.payload) return false;
                return true;
            })
        },
        removeRemoteStreams: (state) => {
            state.remoteMediaData = [];
        },
    },
    extraReducers: (builder) => {

        //updateStream
        builder.addCase(updateStream.fulfilled, (state, action) => {
            state.userStream = action.payload;
            state.isMediaConnected = ConnectingStatus.CONNECTED;
        });
        builder.addCase(updateStream.pending, (state, action) => {

            state.isMediaConnected = ConnectingStatus.CONNECTING;
            state.error = '';
        });
        builder.addCase(updateStream.rejected, (state, action) => {

            state.userStream = undefined;
            state.isMediaConnected = ConnectingStatus.ERROR;
            state.error = action.payload!;
        });

        //updateStream
        builder.addCase(getStreamSources.fulfilled, (state, action) => {
            state.videoSources = action.payload.videos;
            state.audioSources = action.payload.audioInputs;
            state.selectedCameraId = action.payload.selectedCameraId;
            state.selectedAudioId = action.payload.selectedAudioId;
            state.isMediaConnected = ConnectingStatus.CONNECTED;
        });
        builder.addCase(getStreamSources.pending, (state, action) => {

            state.isMediaConnected = ConnectingStatus.CONNECTING;
            state.error = '';
        });
        builder.addCase(getStreamSources.rejected, (state, action) => {
            state.videoSources = [];
            state.audioSources = [];
            state.isMediaConnected = ConnectingStatus.ERROR;
            state.error = action.payload!;
        });
    }
})

export const {
    setIsVideo,
    setIsAudio,
    setStream,
    setAudioSources,
    setVideoSources,
    setSelectedAudioId,
    setSelectedVideoId,
    addRemoteStream,
    removeRemoteStream,
    removeRemoteStreams
} = mediaSlice.actions;


export default mediaSlice.reducer;
