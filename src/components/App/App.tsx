import * as React from 'react';

import AppRouter from "../AppRouter/AppRouter";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const App = () => {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <AppRouter />
        </ThemeProvider>
    );
};
export default App;
