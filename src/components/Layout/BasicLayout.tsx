import {
    AppBar,
    Badge,
    Box,
    Chip,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material';
import React, { FC } from 'react';
import {Inbox, Mail, Menu, AddBox, Logout, Settings, Home, Update, Message} from '@mui/icons-material';
import {privateRoutes, RouteNames} from "../../routes/routes";
import { useNavigate } from 'react-router-dom';
import {useAppDispatch} from "../../hooks/redux";
import {logoutSuccess} from "../../store/user/user-slice";
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
                    width: { sm: `calc(100% - ${drawerMobileWidth}px)`, md: `calc(100% - ${drawerWidth}px)`},
                    ml: { sm: `${drawerMobileWidth}px`, md: `calc(100% - ${drawerWidth}px)` },
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
                        Responsive drawer
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerMobileWidth, md: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="Navigation"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerMobileWidth },
                    }}
                >
                    <Sidebar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { overflow: 'hidden', boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Sidebar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

















//
// const BasicLayout: FC<IBasicLayout> = ({children}) => {
//     return (
//
//         <div>
//             <Header
//                 style={{ background: '#0288d1' }}
//                 elevation={3}
//                 renderMenuIcon={(opened) =>
//                     opened ? <Icon>chevron_left</Icon> : <Icon>menu_rounded</Icon>
//                 }
//             >
//                 {({ screen, collapsed }) =>
//                     data.header && <HeaderEx screen={screen} collapsed={collapsed} />
//                 }
//             </Header>
//             <div></div>
//             <Nav
//                 renderIcon={(collapsed) =>
//                     collapsed ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>
//                 }
//                 header={({ collapsed }) =>
//                     data.nav && <NavHeaderEx collapsed={collapsed} />
//                 }
//             >
//                 {data.nav && <NavContentEx />}
//             </Nav>
//             {children}
//         </div>
//     );
// };
//
export default BasicLayout;