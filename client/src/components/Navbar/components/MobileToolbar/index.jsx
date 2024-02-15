import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { setLogout } from '@containers/Client/actions';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

import { setLocale, setTheme } from '@containers/App/actions';

import classes from '../../style.module.scss'

const MobileToolbar = ({ locale, theme }) => {
    const dispatch = useDispatch();
    const [langMenuPosition, setlangMenuPosition] = useState(null);
    const langMenuOpen = Boolean(langMenuPosition);
    const [profileMenuPosition, setprofileMenuPosition] = useState(null);
    const profileMenuOpen = Boolean(profileMenuPosition);

    const handleProfileClick = (event) => {
        setprofileMenuPosition(event.currentTarget);
    };

    const handleProfileClose = () => {
        setprofileMenuPosition(null);
    };

    const handleLangClick = (event) => {
        setlangMenuPosition(event.currentTarget);
    };

    const handleLangClose = () => {
        setlangMenuPosition(null);
    };

    const onSelectLang = (lang) => {
        if (lang !== locale) {
            dispatch(setLocale(lang));
        }
        handleLangClose();
    };

    const handleTheme = () => {
        dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
    };


    const handleLogout = () => {
        dispatch(setLogout());
        handleProfileClose()
    }

    const userDetails = useSelector((state) => state.client.userDetails);

    return (
        <>
            <div className={classes.toolbar}>
                <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
                    {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
                </div>
                <div className={classes.toggle} onClick={handleLangClick}>
                    <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
                    <div className={classes.lang}>{locale}</div>
                    <ExpandMoreIcon />
                </div>
                {userDetails != null ? (
                    <>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText primary={`Hi,` + userDetails?.name} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <div>
                            <p>Hi, {userDetails?.name}</p>
                        </div>
                        <Divider />
                        <Link onClick={handleProfileClose} to={'/profile'}>
                            <FormattedMessage id='profile_myProfile' />
                        </Link>
                        <Link onClick={handleLogout} to={'/login'}>
                            <FormattedMessage id='logout' />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to={'/login'}>
                            <button className={classes["button"]}>
                                <FormattedMessage id='login' />
                            </button>
                        </Link>
                        <Link to={'/register'}>
                            <button className={classes["button"]} >
                                <FormattedMessage id='register' />
                            </button>
                        </Link>
                    </>
                )}
            </div>
            <Menu open={langMenuOpen} anchorEl={langMenuPosition} onClose={handleLangClose}>
                <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
                    <div className={classes.menu}>
                        <Avatar className={classes.menuAvatar} src="/id.png" />
                        <div className={classes.menuLang}>
                            <FormattedMessage id="app_lang_id" />
                        </div>
                    </div>
                </MenuItem>
                <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
                    <div className={classes.menu}>
                        <Avatar className={classes.menuAvatar} src="/en.png" />
                        <div className={classes.menuLang}>
                            <FormattedMessage id="app_lang_en" />
                        </div>
                    </div>
                </MenuItem>
            </Menu>
            <Menu open={profileMenuOpen} anchorEl={profileMenuPosition} onClose={handleProfileClose}>
                <MenuItem disabled>
                    <div>
                        <p>Hi, {userDetails?.name}</p>
                    </div>
                </MenuItem>
                <MenuItem >
                    <div>
                        <Link onClick={handleProfileClose} to={'/profile'}>
                            <FormattedMessage id='profile_myProfile' />
                        </Link>
                    </div>
                </MenuItem>
                <MenuItem >
                    <Link onClick={handleLogout} to={'/login'}>
                        <FormattedMessage id='logout' />
                    </Link>
                </MenuItem>
            </Menu>
        </>
    )
}
export default MobileToolbar