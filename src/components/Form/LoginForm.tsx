import {Visibility, VisibilityOff } from '@mui/icons-material';
import {Box,
    Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import { RouteNames } from '../../routes/routes';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {login} from "../../store/auth/auth-thunks";
import {selectAuthIsLogin} from "../../store/auth/auth-selector";


const LoginForm = () => {

    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(selectAuthIsLogin);
    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        showPassword: false,
    });

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
        dispatch(login({email: values.email, password: values.password}))
    }

    useEffect(() => {
        if(isAuth){
            navigate(RouteNames.HOME);
        }else{
            setValues({
                email: '',
                password: '',
                showPassword: false,
            })
        }
    }, [isAuth])

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '0' }}>
            <FormControl sx={{ m: 1, width: '25ch', height: '56px' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    type={'email'}
                    value={values.email}
                    onChange={handleChange('email')}
                    label="Password"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch', height: '56px' }} variant="outlined">
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
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch', height: '56px' }} variant="outlined">
                <Button onClick={() => submitForm()} sx={{height: '100%'}} variant="outlined">Login</Button>
            </FormControl>
        </Box>
    );
};

export default LoginForm;