import React, {FC, useState} from 'react';
import {Box, Button, Tooltip} from "@mui/material";
import {
    IosShare,
    Mic,
    MicOff,
    Phone,
    RadioButtonChecked,
    ScreenShare,
    SpeakerNotes, SpeakerNotesOff,
    Videocam,
    VideocamOff
} from '@mui/icons-material';
import {useAppDispatch} from "../../../hooks/redux";
import {setIsAudio, setIsVideo} from "../../../store/media/media-slice";
import {peerDisconnect} from "../../../store/peer/peer-thunks";
import {leaveRoom} from "../../../store/socket/socket-thunks";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../../../routes/routes";


interface MeetNavigationProps {
    chatOpen: boolean;
    setChatOpen: (value: boolean) => void;
}

const MeetNavigation: FC<MeetNavigationProps> = ({ chatOpen, setChatOpen }) => {


    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const [cam, setCam] = useState<boolean>(true);
    const [mic, setMic] = useState<boolean>(true);


    const changeMic = () => {
        dispatch(setIsAudio());
        setMic(!mic);
    }
    const changeCam = () => {
        dispatch(setIsVideo());
        setCam(!cam);
    }

    const endMeet = () => {
        dispatch(peerDisconnect())
        dispatch(leaveRoom())
        navigate(RouteNames.HOME)
    }

    return (
        <Box sx={{
            flexBasis: '130px',
            display: 'flex',
            flexWrap: 'wrap',
            flexGrow: 0,
            border: 0,
            borderColor: 'grey.500',
            borderRadius: '20px',
            height: '400px',
            p: { xs: 0, sm: 0, lg: 4 },
            mt: 2,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{width: { xs: '100%', lg: '35%' }, display: 'flex', justifyContent: 'center', minWidth: '160px'}}>

                {/*MIC*/}
                <Tooltip title={mic ? 'Click to mute' : 'Click to unmute'}>
                    <Button
                        className='MeetNav__button'
                        color={mic ? 'primary' : 'error'}
                        onClick={() => changeMic()}
                        variant="outlined"
                    >
                        {mic ? <Mic /> : <MicOff />}
                    </Button>
                </Tooltip>

                {/*CAM*/}
                <Tooltip title={cam ? 'Click to turn on the camera' : 'Click to turn off the camera'}>
                    <Button
                        className='MeetNav__button'
                        color={cam ? 'primary' : 'error'}
                        onClick={() => changeCam()}
                        variant="outlined"
                    >
                        {cam ? <Videocam /> : <VideocamOff />}
                    </Button>
                </Tooltip>

                {/*SCREENSHARE*/}
                <Button className='MeetNav__button' disabled={true} variant="contained" ><ScreenShare /></Button>
            </Box>

            {/*END MEET*/}
            <Box sx={{width: '25%', justifyContent: 'center',order: {xs: 5, lg: 'initial'}, display: { xs: 'none', lg: 'flex' }}}>
                <Button
                    className='MeetNav__button MeetNav__button_centred'
                    sx={{m: 2, borderRadius: '100px', width: { xs: '300px', lg: '250px' }}}
                    variant="contained"
                    color='error'
                    size={"large"}
                    disableElevation={true}
                    onClick={() => endMeet()}
                >

                    End Meeting

                </Button>
            </Box>

            <Box sx={{width: '100%', justifyContent: 'center',order: {xs: 5, lg: 'initial'}, display: { xs: 'flex', lg: 'none' }}}>
                <Button
                    className='MeetNav__button MeetNav__button_centred'
                    sx={{m: 2, borderRadius: '100px', width: { xs: '100%', lg: '150px' }}}
                    variant="contained"
                    color='error'
                    size={"large"}
                    disableElevation={true}
                    onClick={() => endMeet()}
                >

                    <Phone />

                </Button>
            </Box>



            <Box sx={{width: { xs: '100%', lg: '35%' }, display: 'flex', justifyContent: 'center', minWidth: '160px'}}>
                {/*RECORD*/}
                <Button className='MeetNav__button' disabled={true} variant="contained" ><RadioButtonChecked /></Button>

                {/*SHARE*/}
                <Button className='MeetNav__button' disabled={true} variant="contained" ><IosShare /></Button>

                {/*CHAT BTN*/}
                <Tooltip title={cam ? 'Click to open the chat' : 'Click to close the chat'}>
                    <Button
                        className='MeetNav__button'
                        onClick={() => setChatOpen(!chatOpen)}
                        variant="outlined"
                        color={chatOpen ? 'primary' : 'error'}
                    >

                        {chatOpen ? <SpeakerNotes/> : <SpeakerNotesOff />}

                    </Button>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default MeetNavigation;