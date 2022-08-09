import React, {useEffect, useState} from 'react';
import {Alert, Box, CircularProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {selectMediaError, selectMediaIsMediaConnected} from "../../store/media/media-selector";
import {ConnectingStatus} from "../../types/types";

import { Check, Error } from '@mui/icons-material';
import MeetCreateBarItem from './MeetCreateBarItem';
import './Meet.css';
import {createRoom, joinRoom} from "../../store/socket/socket-thunks";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../routes/routes";

const MeetCreateBar = () => {
    let navigate = useNavigate();

    const connectStatus = useAppSelector(selectMediaIsMediaConnected);
    const error = useAppSelector(selectMediaError);
    const dispatch = useAppDispatch();


    const [isAlert, setIsAlert] = useState(false);
    const ALERT_TIME = 10000;


    useEffect(() => {
        if(connectStatus === ConnectingStatus.CONNECTED || connectStatus === ConnectingStatus.CONNECTING){

            setIsAlert(true);

            setTimeout(() => {
                setIsAlert(false);
            }, ALERT_TIME);
        }
    }, [connectStatus]);



    const onClickCreate = () => {
        dispatch(createRoom())
        console.log('createroom')
    }
    const onClickJoin = (roomId?: string) => {
        navigate(RouteNames.ROOM+'/'+roomId);
        if(roomId) dispatch(joinRoom(roomId))
    }

    const onClickSchedule = () => {
        //
    }
    const onClickScreenShare = () => {
        //
    }


    return (
        <Box>
            <Box>
                {(connectStatus === ConnectingStatus.CONNECTED && isAlert) &&
                    <Alert icon={<Check fontSize="inherit"/>} severity="success">
                        Media Devices ready to work
                    </Alert>
                }


                {(connectStatus === ConnectingStatus.CONNECTING && isAlert) &&
                    <Alert icon={<CircularProgress />} severity="info">
                        Checking Media Devices
                    </Alert>
                }


                {connectStatus === ConnectingStatus.ERROR &&
                    <Alert icon={<Error fontSize="inherit"/>} severity="error">
                        Media Devices not ready. Error: {error}
                    </Alert>
                }



            </Box>

            <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>

                <MeetCreateBarItem type='create' {...{onClickCreate, onClickJoin}} />
                <MeetCreateBarItem type='join' {...{onClickJoin}} />

                <MeetCreateBarItem type='schedule' />
                <MeetCreateBarItem type='screenShare' />


            </Box>
        </Box>
    );
};

export default MeetCreateBar;