import {RootState} from "../index";
import {SocketState} from "./socket-slice";
import {Socket} from "socket.io-client";
import {CheckingStatus, CreatingStatus, JoiningStatus} from "../../types/types";



export const selectSocketState = (state: RootState): SocketState => state.socket;
export const selectSocketSocketState = (state: RootState): Socket => selectSocketState(state).socket;
export const selectSocketIsJoinedState = (state: RootState): JoiningStatus => selectSocketState(state).isJoined;
export const selectSocketIsCreatedState = (state: RootState): CreatingStatus => selectSocketState(state).isCreated;
export const selectSocketCurrentRoomState = (state: RootState): string => selectSocketState(state).currentRoom;
export const selectSocketCreatedRoomState = (state: RootState): string => selectSocketState(state).createdRoom;
export const selectSocketErrorState = (state: RootState): string => selectSocketState(state).error;
export const selectSocketIsRoomCreated = (state: RootState): boolean | null => selectSocketState(state).isRoomCreated;
export const selectSocketIsChecked = (state: RootState): CheckingStatus => selectSocketState(state).isChecked;