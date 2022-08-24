import React from 'react';
import {Box, CardMedia, Chip} from "@mui/material";
import {useAppSelector} from "../../../hooks/redux";
import {selectMediaRemoteMediaData, selectMediaUserStream} from "../../../store/media/media-selector";
import './WebCamList.css';
import {Face} from '@mui/icons-material';

const WebCamList = () => {


    const myStream = useAppSelector(selectMediaUserStream);
    const remoteStreamsData = useAppSelector(selectMediaRemoteMediaData);

    return (
        <Box sx={{maxHeight: '95%', flexGrow: 1}} className={`webcam__list webcam__list-${remoteStreamsData.length + 1}`}>

            <Box className='webcam__wrapper'>
                <Box className='webcam__info'>
                    <Chip icon={<Face />} label="You" />
                </Box>
                <CardMedia
                    ref={(myCamVideoPlayer: any) => {
                        if (myCamVideoPlayer) myCamVideoPlayer.srcObject = myStream;
                    }}
                    component='video'
                    autoPlay
                    muted
                    className='webcam__item'
                    sx={{height: '90%'}}
                />
            </Box>
            {remoteStreamsData && remoteStreamsData.map((curr) => {
                console.log(curr.stream)
                return (
                    <Box className='webcam__wrapper' key={curr.peerId}>
                        <Box className='webcam__info'>
                            <Chip icon={<Face />} label={curr.userInfo?.nickname} />
                        </Box>


                        <CardMedia
                            ref={(ref: any) => {
                                if (ref) ref.srcObject = curr.stream;
                            }}
                            component='video'
                            autoPlay
                            className='webcam__item'
                            sx={{height: '90%'}}
                        />
                    </Box>
                    )
                })
            }
        </Box>
    );
};

export default WebCamList;