import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {isValidPassword} from "../../utils/isValidPassword";
import {isValidEmail} from "../../utils/isValidEmail";
import {registration} from "../../store/auth/auth-thunks";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {RouteNames} from "../../routes/routes";
import {selectAuthErrorMessage, selectAuthIsRegistered} from "../../store/auth/auth-selector";

const RegisterForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isRegistered = useAppSelector(selectAuthIsRegistered);
    const authError = useAppSelector(selectAuthErrorMessage);

    const [values, setValues] = React.useState({
        email: '',
        nickname: '',
        password: '',
        showPassword: false,
    });

    const [registrationError, setRegistrationError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);
    const [isNowRegistred, setIsNowRegistred] = useState<boolean>(false);

    const handleChange =
        (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({ ...values, [prop]: event.target.value });
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const submitForm = async () => {
        setPasswordError(false);
        setEmailError(false);


        if(!isValidPassword(values.password) || !isValidEmail(values.email)) {
            if(!isValidPassword(values.password)) setPasswordError(true);
            if(!isValidEmail(values.email)) setEmailError(true);
        }
        else{
            setIsNowRegistred(true);
            dispatch(registration({nickName: values.nickname, email: values.email, password: values.password}));
        }

    }


    useEffect(() => {
        if(isRegistered && isNowRegistred){
            setIsNowRegistred(false);
            navigate(RouteNames.LOGIN);
        }
        else if(!isRegistered && authError){
            setRegistrationError(true);
            setValues({
                nickname: '',
                email: '',
                password: '',
                showPassword: false,
            })
        }
        else{
            setValues({
                nickname: '',
                email: '',
                password: '',
                showPassword: false,
            })
        }
    }, [isRegistered, authError, navigate, isNowRegistred])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {registrationError && (
                <Alert variant={"outlined"} severity="error">Registration error. Try again</Alert>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0', flexDirection: 'column', alignItems: 'center' }}>
                <FormControl sx={{ m: 1, width: '25ch', height: '56px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-nickname">Nickname</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-nickname"
                        type={'text'}
                        value={values.nickname}
                        onChange={handleChange('nickname')}
                        label="Nickname"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch', height: '56px', marginBottom: emailError ? '65px' : '0px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-email"
                        type={'email'}
                        value={values.email}
                        onChange={handleChange('email')}
                        label="Email"
                    />
                    {emailError && (
                        <Alert severity="error">Email is invalid</Alert>
                    )}
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch', height: '56px', marginBottom: passwordError ? '65px' : '0px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                    {passwordError && (
                        <Alert severity="error">Password must contain at least 6 characters</Alert>
                    )}
                </FormControl>
                <FormControl sx={{ m: 1, width: '25ch', height: '56px' }} variant="outlined">
                    <Button onClick={() => submitForm()} sx={{height: '100%'}} variant="outlined">Create user</Button>
                </FormControl>
            </Box>
        </Box>

    );
};

export default RegisterForm;