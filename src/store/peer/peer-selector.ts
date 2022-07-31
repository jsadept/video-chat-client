import Peer from "peerjs";
import {ConnectingStatus} from "../../types/types";
import {RootState} from "../index";
import {PeerState} from "./peer-slice";


export const selectPeerState = (state: RootState): PeerState => state.peer;
export const selectPeerInstanceState = (state: RootState): Peer | undefined => selectPeerState(state).peer;
export const selectPeerIsPeerConnectedState = (state: RootState): ConnectingStatus => selectPeerState(state).isPeerConnected;
export const selectPeerIsPeerCallConnectedState = (state: RootState): ConnectingStatus => selectPeerState(state).isPeerCallConnected;
export const selectPeerErrorState = (state: RootState): string => selectPeerState(state).error;
export const selectPeerCallErrorState = (state: RootState): string => selectPeerState(state).callError;
