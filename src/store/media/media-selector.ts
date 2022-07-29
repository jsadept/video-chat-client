import {RootState} from "../index";
import {MediaState} from "./media-slice";
import {AudioSettings, ConnectingStatus, RemoteMediaData, VideoSettings} from "../../types/types";


export const selectMediaState = (state: RootState): MediaState => state.media;
export const selectMediaRemoteMediaData = (state: RootState): RemoteMediaData[] => selectMediaState(state).remoteMediaData;
export const selectMediaUserStream = (state: RootState): MediaStream | undefined => selectMediaState(state).userStream;
export const selectMediaVideoSources = (state: RootState): MediaDeviceInfo[] => selectMediaState(state).videoSources;
export const selectMediaAudioSources = (state: RootState): MediaDeviceInfo[] => selectMediaState(state).audioSources;
export const selectMediaSelectedCameraId = (state: RootState): string => selectMediaState(state).selectedCameraId;
export const selectMediaSelectedAudioId = (state: RootState): string => selectMediaState(state).selectedAudioId;
export const selectMediaIsVideo = (state: RootState): VideoSettings | boolean => selectMediaState(state).isVideo;
export const selectMediaIsAudio = (state: RootState): AudioSettings | boolean => selectMediaState(state).isAudio;
export const selectMediaIsMediaConnected = (state: RootState): ConnectingStatus => selectMediaState(state).isMediaConnected;
export const selectMediaError = (state: RootState): string => selectMediaState(state).error;
