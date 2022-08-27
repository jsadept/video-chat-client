import React, { FC } from 'react';
import {
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Tooltip
} from "@mui/material";
import {RouteNames} from "../../../routes/routes";
import {Close, Duo, Home, Logout, Message, Settings, Update} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {logoutSuccess} from "../../../store/user/user-slice";
import {useAppDispatch} from "../../../hooks/redux";
import { resetAuthState } from '../../../store/auth/auth-slice';

interface SidebarProps{
    mobileOpen: boolean;
    setMobileOpen: (isOpen: boolean) => void;
}



const Sidebar: FC<SidebarProps> = ({mobileOpen, setMobileOpen}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const menuHandleClick = (url: string) => {
        navigate(url);
    }

    const logOut = () => {
        dispatch(logoutSuccess());
        dispatch(resetAuthState());
        navigate(RouteNames.LOGIN);
    }


    return (
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <Toolbar  sx={{marginBottom: '100px', padding: '0 0 0 5px!important', display: 'flex', justifyContent: 'space-between'}} >
                <Box sx={{padding: '10px 12px', backgroundColor: 'rgba(81, 33, 165, 1)', borderRadius: '50px'}}>
                    <Duo sx={{marginBottom: '-5px'}} />
                </Box>
                <Box sx={{p: 2, width: '59px', height: '64px', cursor: 'pointer', marginLeft: '30px'}} onClick={() => setMobileOpen(!mobileOpen)}>
                    <Close />
                </Box>


            </Toolbar>
            <List sx={{flexGrow: '1'}}>
                <ListItem disablePadding onClick={() => menuHandleClick(RouteNames.HOME)} >
                    <Tooltip title="Home" placement="right">
                        <ListItemButton>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText sx={{whiteSpace: 'nowrap'}} primary={'Home'} />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>


                <ListItem disabled disablePadding>
                    <Tooltip title="Updates" placement="right">
                        <ListItemButton>
                            <ListItemIcon>
                                <Update />
                            </ListItemIcon>
                            <ListItemText sx={{whiteSpace: 'nowrap'}} primary={'Updates'} />
                            <Chip label="Feature" sx={{fontSize: 10, height: '25px'}}  />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>

                <ListItem disabled disablePadding>
                    <Tooltip title="Messenger" placement="right">
                        <ListItemButton>
                            <ListItemIcon>
                                <Message />
                            </ListItemIcon>
                            <ListItemText sx={{whiteSpace: 'nowrap'}} primary={'Messenger'} />
                            <Chip label="Feature" sx={{fontSize: 10, height: '25px'}}  />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>

            </List>
            <Divider sx={{flexGrow: 0}} />
            <List>

                <ListItem  disablePadding onClick={() => menuHandleClick(RouteNames.SETTINGS)} >
                    <Tooltip title="Settings" placement="right">
                        <ListItemButton>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText sx={{whiteSpace: 'nowrap'}} primary={'Settings'} />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>


                <ListItem disablePadding onClick={() => logOut()}>
                    <Tooltip title="Log out" placement="right" >
                        <ListItemButton>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText sx={{whiteSpace: 'nowrap'}} primary={'Log out'} />
                        </ListItemButton>
                    </Tooltip>
                </ListItem>
            </List>
        </Box>
    );
};

export default Sidebar;