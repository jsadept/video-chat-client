import React from 'react';
import Typography from "@mui/material/Typography/Typography";
import {Link} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '../routes/routes';
import RegisterForm from '../components/Form/RegisterForm';

const Registration = () => {


    let navigate = useNavigate();

    function handleClick() {
        navigate(RouteNames.LOGIN);
    }


    return (
        <div>
            <Typography variant="h2" component="h2" gutterBottom align="center" sx={{marginTop: '80px', marginBottom: '50px'}}>
                Sign up
            </Typography>

            <RegisterForm />

            <Typography variant="subtitle1" component="div" gutterBottom align="center" sx={{marginTop: '20px', marginBottom: '80px'}}>

                or <Link href="#" onClick={handleClick} underline="none">log in</Link>
            </Typography>
        </div>
    );
};

export default Registration;