


export interface IMediaData {
    videoSources: [];
    audioSources: [];
    userStream: MediaStream;
    streams: IStreamData[];
}

export interface IStreamData {
    isVideo: boolean;
    isAudio: boolean;
    user: IUser;
}

export interface IUser {
    userId?: string;
    email: string;
    nickname: string;
    roles: string[];
    isAuth: boolean;
    socketData: [];
    peerData: [];
    mediaData: IMediaData;
}

export interface UserResponse{
    userId?: string;
    email: string;
    nickname: string;
    roles: string[];
}

export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export interface UserData {
    email: string;
    password: string;
}

export interface UserRegistration {
    nickName: string;
    email: string;
    password: string;
}