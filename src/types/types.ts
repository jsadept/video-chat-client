

export interface RemoteMediaData {
    peerId: string;
    userInfo?: UserResponse;
    stream: MediaStream;
}

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
    roles?: string[];
}

export enum LoadingStatus {
    LOADED = "LOADED",
    LOADING = "LOADING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export enum CheckingStatus {
    CHECKED = "CHECKED",
    CHECKING = "CHECKING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export enum CreatingStatus {
    CREATED = "CREATED",
    CREATING = "CREATING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}

export enum ConnectingStatus {
    CONNECTED = "CONNECTED",
    CONNECTING = "CONNECTING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS"
}


export enum JoiningStatus {
    JOINED = "JOINED",
    JOINING = "JOINING",
    ERROR = "ERROR",
    NEVER = "NEVER",
    SUCCESS = "SUCCESS",
    LEAVING = "LEAVING",
    LEAVED = "LEAVED"
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



export interface VideoSettings {
    deviceId?: string | { exact: string };
    min?: number;
    ideal?: number;
    max?: number;
}



export interface AudioSettings {
    deviceId?: string | { exact: string };
}



export interface ChatMessage {
    user: string;
    message: string;
    time: number;
}