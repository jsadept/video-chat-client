import * as React from 'react';

import {useState} from "react";
import Navbar from '../Navbar/Navbar';
import AppRouter from "../AppRouter/AppRouter";
import Main from "../Main/Main";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {

    const [navHeight, setNavHeight] = useState<number>(0)
    const setHeight = (height: number) => {
        setNavHeight(height);
      return;
    }

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />


            <Navbar {...{setHeight}} />
            <Main {...{navHeight}}>
                <AppRouter />
            </Main>
        </ThemeProvider>
    );
};
export default App;
