import { Box } from '@mui/material';
import React, { FC } from 'react';


interface IMain {
    navHeight: number;
    children: React.ReactNode;
}

const Main: FC<IMain> = ({navHeight, children}) => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 2, height: `calc(100vh - ${navHeight}px)` }} >
            {children}
        </Box>
    );
};

export default Main;