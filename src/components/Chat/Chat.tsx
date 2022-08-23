import { Box, Button, FormControl, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography/Typography";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {initChat, sendChatMessage} from "../../store/chat/chat-thunks";
import {selectChatMessages} from "../../store/chat/chat-selector";


const Chat = () => {

    const [myMessage, setMyMessage] = useState<string>('');
    const dispatch = useAppDispatch();

    const messages = useAppSelector(selectChatMessages);

    const sendMessage = () => {
        if(myMessage !== '') dispatch(sendChatMessage(myMessage));
        setMyMessage('');
    }

    useEffect(() => {
        dispatch(initChat());
    }, [dispatch])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Box sx={{flexGrow: 1, overflow: 'auto', p: 2}}>
                <Typography
                    sx={{ display: 'block', textAlign: 'center' }}
                    component="span"
                    variant="body1"
                    color="text.icon"
                >
                    Welcome to the chat
                </Typography>
                <List sx={{ width: '100%', maxWidth: 360 }}>
                    {
                        messages.map((current, index, array) => {

                            const isAnotherUser = array[index - 1]?.user !== current.user;

                            return (
                                <ListItem key={current.user+current.time} sx={{marginTop: isAnotherUser ? '0px' : '-15px', paddingTop: 0, flexWrap: 'wrap'}}>

                                    <Typography
                                        sx={{ display: 'block', width: '100%', marginTop: isAnotherUser ? '20px' : '0' }}
                                        component="span"
                                        variant="body2"
                                        color="#64BDF9"
                                    >
                                        {isAnotherUser ? current.user : ''}
                                    </Typography>
                                    <ListItemText
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {current.message}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
            <Box sx={{height: '112px', p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.12)'}}>
                <FormControl fullWidth sx={{ m: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} variant="standard">
                    <TextField  sx={{width: '65%', maxHeight: '70px'}} value={myMessage} label="Message to chat" id="fullWidth"  onChange={(e) => setMyMessage(e.target.value)}/>
                    <Button sx={{width: '30%'}} onClick={() => sendMessage()} variant="outlined">Send</Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default Chat;