export const peerConfig = {
    secure: false,
    debug: 1, // from 0 up to 3
    config: {
        'iceServers': [
            { url: 'stun:stun.l.google.com:19302' },
        ]
    }
}