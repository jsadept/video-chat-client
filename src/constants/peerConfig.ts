import {PEER_BASE_URL, PEER_PORT} from "./index";

export const peerConfig = {
    host: PEER_BASE_URL,
    port: PEER_PORT,
    secure: false,
    path: '/peerServer',
    debug: 0 // from 0 up to 3
}