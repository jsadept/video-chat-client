import {Box} from '@mui/material';
import React from 'react';
// import {useAuth} from "../hooks/useAuth";

import {useLocation} from 'react-router-dom';
import MeetNavigation from "../components/Meet/MeetNavigation";
import MeetAdditional from "../components/Meet/MeetAdditional";
import WebcamList from '../components/Meet/WebcamList';
// import {useRemoteStreams} from "../hooks/useRemoteStreams";
// import WebCamList from "../components/Meet/WebCamList";
// import ChatNavigation from "../components/Chat/ChatNavigation";
// import MeetAdditional from "../components/Meet/MeetAdditional";
// import MeetNavigation from '../components/Meet/MeetNavigation';

interface locState {
    roomId: string;
    myPeerID: string;
}

const Room = () => {


    const location = useLocation().state as locState;
    console.log(location)
    console.log(useLocation())
    //
    // let roomId = location.roomId;
    // let myPeerID = location.myPeerID;
    //
    // const currentSocketId = socket.getSocket().id;
    // console.log(currentSocketId, roomId, myPeerID)
    //const result = auth.joinRoom(currentSocketId, roomId, myPeerID);
    //
    // const videoRef = useRef<HTMLVideoElement>(null);

    // navigator.mediaDevices.getUserMedia({
    //     audio: true,
    //     video: true,
    // }).then((stream) => {
    //     if(videoRef.current){
    //         // videoRef.current.srcObject = stream;
    //         return stream;
    //     }
    // });

    // const currentSocketId = socket.getSocket().id;
    // const {remoteStreams, addRemoteStream, removeRemoteStream} = useRemoteStreams();


    return(
        <Box sx={{height: '100%', display: 'flex', p: 1}}>
            <Box sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}>
                <WebcamList />
                <MeetNavigation />
            </Box>
            <Box sx={{flexBasis: '20%', p: 1}}>
                <MeetAdditional />
            </Box>
        </Box>
    );
};

export default Room;