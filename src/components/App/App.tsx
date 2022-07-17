import * as React from 'react';

import {useState} from "react";
import Navbar from '../Navbar/Navbar';
import AppRouter from "../AppRouter/AppRouter";
import Main from "../Main/Main";

const App = () => {

    const [navHeight, setNavHeight] = useState<number>(0)
    const setHeight = (height: number) => {
        setNavHeight(height);
      return;
    }

    return (
        <>
            <Navbar {...{setHeight}} />
            <Main {...{navHeight}}>
                <AppRouter />
            </Main>
        </>
    );
};
export default App;
