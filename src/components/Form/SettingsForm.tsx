import {Box, FormControl, FormHelperText, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {
    selectMediaAudioSources, selectMediaSelectedAudioId,
    selectMediaSelectedCameraId,
    selectMediaVideoSources
} from "../../store/media/media-selector";
import { setSelectedVideoId } from '../../store/media/media-slice';
import { setSelectedAudioId } from '../../store/media/media-slice';
import {updateStream} from "../../store/media/media-thunks";

const SettingsForm = () => {
    const dispatch = useAppDispatch();
    const cameraDevicesList = useAppSelector(selectMediaVideoSources);
    const audioDevicesList = useAppSelector(selectMediaAudioSources);
    const currentVideoDeviceId = useAppSelector(selectMediaSelectedCameraId);
    const currentAudioDeviceId = useAppSelector(selectMediaSelectedAudioId);


    const handleVideoSourceChange = (id: string) => {
        dispatch(setSelectedVideoId(id))
        dispatch(updateStream());
    }


    const handleAudioSourceChange = (id: string) => {
        dispatch(setSelectedAudioId(id))
        dispatch(updateStream());
    }



    return (
        <Box>

            <FormControl sx={{ m: 1, minWidth: 120, marginBottom: '50px'}}>
                <InputLabel id="settings-camera-select">Camera</InputLabel>
                <Select
                    labelId="settings-camera-select"
                    id="settings-camera-select"
                    value={currentVideoDeviceId}
                    label="Camera"
                >
                    {cameraDevicesList.map((current) => {
                        return (
                            <MenuItem
                                key={current.deviceId}
                                value={current.deviceId}
                                onClick={() => {
                                    handleVideoSourceChange(current.deviceId);
                                }}
                            >
                                {current.label}
                            </MenuItem>
                        )
                    })}

                </Select>
                <FormHelperText>Choose camera for meets</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="settings-mic-select">Microphone</InputLabel>
                <Select
                    labelId="settings-mic-select"
                    id="settings-mic-select"
                    value={currentAudioDeviceId}
                    label="Microphone"
                >
                    {audioDevicesList.map((current) => {
                        return (
                            <MenuItem
                                key={current.deviceId}
                                value={current.deviceId}
                                onClick={() => {
                                    handleAudioSourceChange(current.deviceId);
                                }}
                            >
                                {current.label}
                            </MenuItem>
                        )
                    })}

                </Select>
                <FormHelperText>Choose microphone for meets</FormHelperText>
            </FormControl>
        </Box>
    );
};

export default SettingsForm;