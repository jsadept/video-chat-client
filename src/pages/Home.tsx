import {Box, Button, Card, CardActions, CardContent, Chip, Grid, Paper, styled, Typography,} from '@mui/material';
import React, {useEffect} from 'react';
import BasicLayout from '../components/Layout/BasicLayout';

import MeetCreateBar from "../components/Meet/MeetCreateBar/MeetCreateBar";
import {useAppDispatch} from "../hooks/redux";
import {getStreamSources} from "../store/media/media-thunks";
import {peerConnect} from "../store/peer/peer-thunks";


const Home = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(peerConnect());
        dispatch(getStreamSources());
    }, [dispatch])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ width: '100%'}}>
            <BasicLayout>
                <Grid container>
                    <Grid item xs={12} lg={7}>
                        <Item sx={{textAlign: 'left', marginBottom: '50px'}}>

                            <MeetCreateBar />

                        </Item>
                    </Grid>
                    <Grid item xs={12} lg={5} sx={{p: 2, paddingTop: 0}}>
                        <Item sx={{marginBottom: '40px'}}>
                            <Typography sx={{ fontSize: 38 }} color="text.secondary" gutterBottom>
                                Planned meetings
                            </Typography>
                            <Card sx={{ minWidth: 275, margin: '5px 0', p: 2 , backgroundColor: '#5121a5'}}>
                                <CardContent sx={{ p: 1, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <b>Date:</b> 24.02.2023
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <b>Time:</b> 12:40-13:30
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        Design meeting
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button disabled={true} variant={"outlined"} size="small">Connect</Button>
                                    <Typography component={'span'} sx={{ fontSize: 14 }} color="text.secondary">
                                        <Chip label="1c32b8fd-ec1b-447d-8ee6-f6540d18ee0a" />
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Item>
                        <Item sx={{marginBottom: '40px'}}>
                            <Card sx={{ minWidth: 275, margin: '5px 0', p: 2, backgroundColor: '#5121a5' }}>
                                <CardContent sx={{ p: 1, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <b>Date:</b> 28.02.2023
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <b>Time:</b> 09:20-10:20
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        Stand Up Tech Conference
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button disabled={true} variant={"outlined"} size="small">Connect</Button>
                                    <Typography component={'span'} sx={{ fontSize: 14 }} color="text.secondary">
                                        <Chip label="91c979eb-8a91-486c-8757-6e0260746b76"/>
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Item>
                        <Item sx={{marginBottom: '40px'}}>
                            <Card sx={{ minWidth: 275, margin: '5px 0', p: 2, backgroundColor: '#5121a5' }}>
                                <CardContent sx={{ p: 1, textAlign: 'left' }}>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <b>Date:</b> 30.02.2023
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        <b>Time:</b> 11:20-14:00
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        Marketing Strategy Development
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
                                    <Button disabled={true} variant={"outlined"} size="small">Connect</Button>
                                    <Typography component={'span'} sx={{ fontSize: 14 }} color="text.secondary">
                                        <Chip label="27272b55-7eb4-4dad-adf7-638eb5223a00"/>
                                    </Typography>
                                </CardActions>
                            </Card>
                        </Item>
                    </Grid>
                </Grid>

            </BasicLayout>
        </Box>
    );

};


export default Home;