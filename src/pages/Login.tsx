import { Link } from '@mui/material';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/Form/LoginForm';
import { RouteNames } from '../routes/routes';


const Login = () => {

    let navigate = useNavigate();

    function handleClick() {
        navigate(RouteNames.REG);
    }

    return (
        <div>
            <Typography variant="h2" component="h2" gutterBottom align="center" sx={{marginTop: '80px', marginBottom: '50px'}}>
                Log In
            </Typography>


           <LoginForm />


            <Typography variant="subtitle1" component="div" gutterBottom align="center" sx={{marginTop: '20px', marginBottom: '80px'}}>

                or <Link href="#"  onClick={handleClick} underline="none">sign up</Link>
            </Typography>
        </div>
    );
};

export default Login;