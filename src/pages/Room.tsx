import {Box} from '@mui/material';
import React, {useEffect} from 'react';
import BasicLayout from "../components/Layout/BasicLayout";
import Meet from '../components/Meet/Meet';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {peerDisconnect} from '../store/peer/peer-thunks';
import {joinRoom, leaveRoom} from "../store/socket/socket-thunks";
import {selectSocketCurrentRoomState} from "../store/socket/socket-selector";

const Room = () => {
    const dispatch = useAppDispatch();
    const currentRoomId = useAppSelector(selectSocketCurrentRoomState)


    useEffect(() => {
        // dispatch(peerConnect());
        dispatch(joinRoom(currentRoomId));
        // dispatch(updateStream());
        // dispatch(getStreamSources());

        return () => {

            dispatch(peerDisconnect());
            dispatch(leaveRoom());

        }
    }, [currentRoomId, dispatch])


    return(
        <Box sx={{ width: '100%', padding: 0    }}>
            <BasicLayout>
                <Meet />
            </BasicLayout>
        </Box>
    );
};

export default Room;