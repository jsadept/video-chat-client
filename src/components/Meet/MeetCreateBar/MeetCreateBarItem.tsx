import React, {FC, useState, MouseEvent, useEffect} from 'react';
import {Box, Button, Card, CardActions, CardContent, InputAdornment, IconButton, TextField, Typography, Snackbar, Alert, Chip} from "@mui/material";

import {ScreenShare, Link, EventNote, AddBox} from '@mui/icons-material';
import {useAppSelector} from "../../../hooks/redux";
import {selectSocketCreatedRoomState} from "../../../store/socket/socket-selector";

import { ContentCopy } from '@mui/icons-material';


interface IMeetCreateBarItem {
    type: string;
    onClickCreate?: () => void;
    onClickJoin?: (roomId?: string) => string | void;
}

const MeetCreateBarItem: FC<IMeetCreateBarItem> = ({type, onClickCreate, onClickJoin}) => {

    const createdRoomId = useAppSelector(selectSocketCreatedRoomState);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const [isCardActive, setIsCardActive] = useState<boolean>(false);
    const [roomId, setRoomId] = useState<string>('');

    const onCardClickHandler = () => {
        setIsCardActive(true);
    }

    const onCardActionsClickHandler = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if(!isCardActive){
            setIsCardActive(true);
        }

    }

    useEffect(() => {
        if(isCardActive){
            if(type === 'create' && onClickCreate) onClickCreate();
        }
    }, [isCardActive, onClickCreate, type])



    async function copyTextToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            handleClick();
        } catch (err) {
            console.error('Error in copying text: ', err);
        }
    }

    const handleClick = () => {
        setOpenSnackbar(true);
    };
    const handleClose = () => {
        setOpenSnackbar(false);
    };
    return(
            <Card className='MeetCreateBar__item' onClick={() => onCardClickHandler()}>

            {type === 'create' &&
                <>
                    <CardActions sx={{height: '140px'}} onClick={(e) => onCardActionsClickHandler(e)}>
                        { isCardActive
                            ? (
                                <Box sx={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                                    <TextField
                                        sx={{width: '100%', marginBottom: '20px'}}
                                        id="demo-helper-text-misaligned-no-helper"
                                        label="Copy Room ID"
                                        value={createdRoomId}
                                        autoFocus={true}
                                        InputProps={{
                                            readOnly: true,
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Copy Room Id to share"
                                                    onClick={() => copyTextToClipboard(createdRoomId)}
                                                    edge="end"
                                                >
                                                    <ContentCopy />
                                                </IconButton>
                                            </InputAdornment>)
                                        }}

                                    />
                                    <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                        <Button sx={{width: '47%'}} variant="outlined" onClick={() => onClickJoin ? onClickJoin(createdRoomId) : false}>Join to room</Button>
                                        <Button sx={{width: '47%'}} variant="outlined" onClick={() => onClickCreate ? onClickCreate() : false}>Create new room</Button>
                                    </Box>
                                </Box>
                            )
                            : (

                                <Box component='div' className='meetCreateBar__button'>
                                    <AddBox fontSize="large"/>
                                </Box>

                            )
                        }


                    </CardActions>
                    <CardContent>

                        <Typography variant="h5" component="div">
                            New Meeting
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            set up new meeting
                        </Typography>
                    </CardContent>
                </>
            }

            {type === 'join' &&
                <>
                    <CardActions sx={{height: '140px'}} onClick={(e) => onCardActionsClickHandler(e)}>

                        { isCardActive
                            ? (
                                <>
                                    <Box sx={{display: 'flex', width: '100%', flexWrap: 'wrap', flexGrow: 1}}>
                                        <TextField
                                            sx={{width: '100%', marginBottom: '20px'}}
                                            id="demo-helper-text-misaligned-no-helper"
                                            label="Room ID"
                                            value={roomId}
                                            onChange={(e) => setRoomId(e.target.value)}
                                        />
                                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                            <Button sx={{width: '47%'}} variant="outlined" onClick={() => onClickJoin ? onClickJoin(roomId) : false}>Join to room</Button>

                                        </Box>

                                    </Box>
                                </>
                            )
                            : (
                                <Box component='div' className='meetCreateBar__button'>
                                    <Link fontSize="large"/>
                                </Box>
                            )
                        }


                    </CardActions>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Join Meeting
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            via invitation link
                        </Typography>
                    </CardContent>
                </>
            }

            {type === 'schedule' &&
                <>
                    <CardActions sx={{height: '140px'}} onClick={(e) => onCardActionsClickHandler(e)}>

                        <Box component='div' className='meetCreateBar__button'>
                            <EventNote fontSize="large"/>
                        </Box>

                    </CardActions>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Schedule <Chip label="Feature" />
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            plan your meetings
                        </Typography>
                    </CardContent>
                </>
            }
            {type === 'screenShare' &&
                <>
                    <CardActions sx={{height: '140px'}} onClick={(e) => onCardActionsClickHandler(e)}>

                        <Box component='div' className='meetCreateBar__button'>
                            <ScreenShare fontSize="large"/>
                        </Box>

                    </CardActions>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Share Screen <Chip label="Feature" />
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            show your work
                        </Typography>
                    </CardContent>
                </>
            }


            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={openSnackbar} autoHideDuration={950} onClose={handleClose}>
                <Alert variant="filled" severity="success" sx={{ width: '100%' }}>
                    Copied Room Id!
                </Alert>
            </Snackbar>
            </Card>
    );




};

export default MeetCreateBarItem;