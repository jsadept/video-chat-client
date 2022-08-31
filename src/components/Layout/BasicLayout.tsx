import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import React, { FC } from 'react';
import {Menu} from '@mui/icons-material';
import Sidebar from "./Sidebar/Sidebar";

interface IBasicLayout {
    children: React.ReactNode;
    window?: () => Window;
}

const drawerWidth = 60;
const drawerMobileWidth = 240;

const BasicLayout: FC<IBasicLayout> = (props) => {

    const { window, children } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 100,
                    width: mobileOpen ? { sm: `calc(100% - ${drawerMobileWidth}px)`, lg: `calc(100% - ${drawerWidth}px)`} : { xs: `100%`, sm: `calc(100% - ${drawerWidth}px)`},
                    ml: { sm: `0`, lg: `calc(100% - ${drawerWidth}px)` },
                    height: 60
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        VMeet
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { xs: '0',sm: mobileOpen ? { xs: drawerMobileWidth, sm: drawerWidth } : drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Navigation"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        zIndex: (theme) => theme.zIndex.drawer + 100,
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerMobileWidth },
                    }}
                >
                    <Sidebar {...{mobileOpen, setMobileOpen}} />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { overflow: 'hidden', boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Sidebar {...{mobileOpen, setMobileOpen}}/>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ height: '100vh', padding: '90px 30px 30px 30px',flexGrow: 1, width: { xs: '100%', sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default BasicLayout;