import React, {FC} from 'react';
import {Box, Button, List, ListItem, ListItemIcon, ListItemText, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import {Close, PermIdentity, Person} from "@mui/icons-material";
import Chat from "../../Chat/Chat";
import {useAppSelector} from "../../../hooks/redux";
import {selectMediaRemoteMediaData} from "../../../store/media/media-selector";
import {selectUserFromUserState} from "../../../store/user/user-selector";
import {selectSocketCurrentRoomState} from "../../../store/socket/socket-selector";

interface MeetAdditionalProps {
    chatOpen: boolean;
    setChatOpen: (value: boolean) => void;
}
const MeetAdditional: FC<MeetAdditionalProps> = ({ chatOpen, setChatOpen }) => {

    const remoteStreamsData = useAppSelector(selectMediaRemoteMediaData);
    const user = useAppSelector(selectUserFromUserState);
    const currentRoom = useAppSelector(selectSocketCurrentRoomState);

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', paddingTop: '65px', height: '100%'}}>
            <Box sx={{flexGrow: 1, height: '35%'}}>
                <Box sx={{p: 1, borderBottom: '1px solid rgba(255, 255, 255, 0.12)', width: '100%', height: '74px', display: 'flex', paddingTop: 0}}>

                    <Tooltip title={'Click to close the chat'}>
                        <Button
                            className='MeetNav__button'
                            onClick={() => setChatOpen(!chatOpen)}
                            variant="text"
                            color={chatOpen ? 'primary' : 'error'}
                        >

                            <Close
                                onClick={() => setChatOpen(!chatOpen)}
                                sx={{m: 2, cursor: 'pointer'}}
                            />

                        </Button>
                    </Tooltip>

                    <Typography
                        sx={{ display: 'block', textAlign: 'left' }}
                        component="span"
                        variant="body1"
                        color="text.icon"
                        fontSize={'14px'}
                    >
                        <Typography fontSize={'15px'} variant="body2" color="#ffffff">
                            RoomId:
                        </Typography> {currentRoom}
                    </Typography>
                </Box>

                <Box sx={{p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.12)', width: '100%', height: '74px'}}>
                    <Typography>
                        Users list
                    </Typography>
                </Box>
                <Box sx={{p: 3, overflow: 'auto', height: 'calc(100% - 74px)'}}>
                    <List dense={true}>
                        <ListItem>
                            <ListItemIcon>
                                <PermIdentity />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${user?.nickname} (You)`}
                            />
                        </ListItem>

                        {remoteStreamsData.map((current) => {
                            return (

                                <ListItem key={current.peerId}>
                                    <ListItemIcon>
                                        <Person />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={current.userInfo?.nickname}
                                    />
                                </ListItem>
                            )}
                        )}
                    </List>
                </Box>
            </Box>
            <Box sx={{height: '65%', borderBottom: '1px solid rgba(255, 255, 255, 0.12)', borderTop: '1px solid rgba(255, 255, 255, 0.12)', backgroundColor: '#272727'}}>
                <Box sx={{borderBottom: '1px solid rgba(255, 255, 255, 0.12)', width: '100%', p: 3, height: '74px'}}>
                    <Typography>
                        Text chat
                    </Typography>
                </Box>
                <Box sx={{height: 'calc(100% - 74px)'}}>
                    <Chat />
                </Box>
            </Box>
        </Box>
    );
};

export default MeetAdditional;