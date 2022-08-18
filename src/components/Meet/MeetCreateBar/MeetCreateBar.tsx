import React, {useEffect, useState} from 'react';
import {Alert, Box} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {CheckingStatus} from "../../../types/types";
import MeetCreateBarItem from './MeetCreateBarItem';
import {checkRoom, createRoom} from "../../../store/socket/socket-thunks";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../../routes/routes";
import {resetIsChecked, setCurrentRoom} from '../../../store/socket/socket-slice';
import {
    selectSocketErrorState,
    selectSocketIsChecked,
    selectSocketIsRoomCreated
} from "../../../store/socket/socket-selector";
import '../Meet.css';

const MeetCreateBar = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const isRoomCreated = useAppSelector(selectSocketIsRoomCreated);
    const isChecked = useAppSelector(selectSocketIsChecked);
    const socketError = useAppSelector(selectSocketErrorState);



    const [isRoomCreatedError, setIsRoomCreatedError] = useState<boolean>(false);
    const [joinRoomId, setJoinRoomId] = useState<string>('');
    const [connectionError, setConnectionError] = useState<string>('');
    const ALERT_TIME = 5000;




    const onClickCreate = () => {
        dispatch(createRoom())
    }
    const onClickJoin = (roomId?: string) => {
        dispatch(checkRoom(roomId!));
        setJoinRoomId(roomId!);
    }

    // const onClickSchedule = () => {}
    // const onClickScreenShare = () => {}

    useEffect(() => {
        if(isChecked === CheckingStatus.CHECKED){
            if(isRoomCreated){
                dispatch(setCurrentRoom(joinRoomId!));
                dispatch(resetIsChecked());
                navigate(RouteNames.ROOM+'/'+joinRoomId);
            }
            else{
                setIsRoomCreatedError(true);
                setTimeout(() => {
                    setIsRoomCreatedError(false);
                }, ALERT_TIME);
                console.log('room not created')
            }
        }
        if(isChecked === CheckingStatus.ERROR){
            setConnectionError(socketError);
        }
    }, [isChecked, dispatch, isRoomCreated, joinRoomId, navigate, socketError])

    return (
        <Box>

            <Box>
                {connectionError &&
                    <Alert variant={"filled"} severity="error">{connectionError}</Alert>
                }
                {isRoomCreatedError &&
                    <Alert variant={"filled"} severity="error">Bad Room ID</Alert>
                }

            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>

                <MeetCreateBarItem type='create' {...{onClickCreate, onClickJoin}} />
                <MeetCreateBarItem type='join' {...{onClickJoin, isRoomCreatedError}} />

                <MeetCreateBarItem type='schedule' />
                <MeetCreateBarItem type='screenShare' />


            </Box>
        </Box>
    );
};

export default MeetCreateBar;