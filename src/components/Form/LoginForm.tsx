import {Visibility, VisibilityOff} from '@mui/icons-material';
import {Alert, Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {RouteNames} from '../../routes/routes';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {login} from "../../store/auth/auth-thunks";
import {selectAuthErrorMessage, selectAuthIsLogin} from "../../store/auth/auth-selector";
import {isValidPassword} from "../../utils/isValidPassword";
import {isValidEmail} from "../../utils/isValidEmail";


const LoginForm = () => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectAuthIsLogin);
    const authError = useAppSelector(selectAuthErrorMessage);
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });


    const [loginError, setLoginError] = useState<boolean>(false);
    const [passwordError, setPasswordError] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<boolean>(false);

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


        if(!isValidPassword(values.password) && !isValidEmail(values.email)) {
            if(!isValidPassword(values.password)) setPasswordError(true);
            if(!isValidEmail(values.email)) setEmailError(true);
        }
        else{
            dispatch(login({email: values.email, password: values.password}));
        }

    }


    useEffect(() => {
        setLoginError(false);
        if(isAuth){
            navigate(RouteNames.HOME);
        }
        else if(!isAuth && authError){
            setLoginError(true);
            setValues({
                email: '',
                password: '',
                showPassword: false,
            })
        }
        else{
            setValues({
                email: '',
                password: '',
                showPassword: false,
            })
        }
    }, [isAuth, authError, navigate])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {loginError && (
                <Alert variant={"outlined"} severity="error">Login error. Try again</Alert>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0', flexDirection: 'column', alignItems: 'center'  }}>
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
                    <Button onClick={() => submitForm()} sx={{height: '100%'}} variant="outlined">Login</Button>
                </FormControl>
            </Box>
        </Box>
    );
};

export default LoginForm;