import {Box, Button, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material';
import React, {useRef, useState} from 'react';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Typography from "@mui/material/Typography/Typography";


const Home = () => {


    const [roomId, setRoomId] = useState('');
    const [newRoomId, setNewRoomId] = useState('');
    const [newCam, setNewCam] = useState(true);



    const createRoomId = async () => {

    };


    const connectToRoom = () => {

    };

    return (
        <Box sx={{ width: '100%'}}>
            <Typography variant="h2" component="h2" gutterBottom align="center" sx={{marginTop: '30px', marginBottom: '30px'}}>
                Enter to room,<br /> create or connect
            </Typography>


            <Typography variant="h4" component="h4" gutterBottom align="center" sx={{marginTop: '80px', marginBottom: '50px'}}>
                Connect to room
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <FormControl  variant="outlined" sx={{marginRight: '20px', width: '100%', maxWidth: '400px'}}>

                    <InputLabel htmlFor="input-roomId2">Enter room id</InputLabel>
                    <FilledInput  sx={{height: '56px'}} id="input-roomId2" type={'text'} value={roomId} onChange={(e) => setRoomId(e.target.value)} />

                </FormControl>
                <Button onClick={() => connectToRoom()} sx={{height: '56px'}} variant="outlined">Enter</Button>
            </Box>


            <Typography variant="h4" component="h4" gutterBottom align="center" sx={{marginTop: '80px', marginBottom: '50px'}}>
                Create new room
            </Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                {
                    <FormControl  variant="outlined" sx={{marginRight: '20px', width: '100%', maxWidth: '400px'}}>

                        <InputLabel htmlFor="input-roomId2">New room id copy and paste</InputLabel>
                        <FilledInput inputProps={{readOnly: true}} sx={{height: '56px'}} id="input-roomId2" type={'text'} value={newRoomId} />

                    </FormControl>
                }
                <Button onClick={() => createRoomId()} sx={{height: '56px'}} variant="outlined">Create</Button>
            </Box>
        </Box>
    );

};


export default Home;