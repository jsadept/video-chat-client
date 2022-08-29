import {Box, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import BasicLayout from "../components/Layout/BasicLayout";
import Meet from '../components/Meet/Meet';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {getStreamSources, updateStream } from '../store/media/media-thunks';
import {peerConnect, peerDisconnect} from '../store/peer/peer-thunks';
import {joinRoom, leaveRoom} from "../store/socket/socket-thunks";
import {selectSocketCurrentRoomState} from "../store/socket/socket-selector";
import {getCurrentDate} from "../utils/getCurrentDate";

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
    }, [])


    return(
        <Box sx={{ width: '100%', padding: 0    }}>
            <BasicLayout>
                <Meet />
            </BasicLayout>
        </Box>
    );
};

export default Room;