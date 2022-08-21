import React, {FC} from 'react';
import {Box, CssBaseline, Drawer} from "@mui/material";

import MeetAdditional from "./MeetAdditional";


interface IMeetLayout {
    chatOpen: boolean;
    setChatOpen: (value: boolean) => void;
    children: React.ReactNode;
    window?: () => Window;
}

const drawerWidth = 320;

const MeetLayout: FC<IMeetLayout> = (props) => {

    const { window, children, chatOpen, setChatOpen } = props;


    // const handleDrawerToggle = () => {
    //     setChatOpen(!chatOpen);
    // };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', height: '100%', overflow: 'hidden'}}>
            <CssBaseline />
            <Box
                component="main"
                sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {children}
            </Box>

            <Box
                component="nav"
                sx={{ height: '100vh', padding: chatOpen ? '90px 30px 30px 30px' : 0,  width: chatOpen ? drawerWidth : 0, flexShrink: { sm: 0 } }}
                aria-label="Navigation"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    anchor={"right"}
                    container={container}
                    variant="temporary"
                    open={chatOpen}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, height: '100vh', overflow: 'hidden' },
                    }}
                >
                    <MeetAdditional  {...{chatOpen, setChatOpen}}/>
                </Drawer>

                <Drawer

                    anchor={"right"}
                    variant="persistent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open={chatOpen}
                >
                    <MeetAdditional {...{chatOpen, setChatOpen}}/>
                </Drawer>
            </Box>
        </Box>
    );
}

export default MeetLayout;