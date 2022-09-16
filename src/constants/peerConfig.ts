export const peerConfig = {
    key: "peerjs",
    debug: 2,
    secure: process.env.REACT_APP_ENV === "PRODUCTION" ? true : false, // secure : false for http connection
};
