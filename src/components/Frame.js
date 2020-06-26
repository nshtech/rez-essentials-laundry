import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import { Redirect } from 'react-router-dom'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems from './listItems';
// import { mainListItems, secondaryListItems } from './listItems';
import Button from '@material-ui/core/Button';

//Firebase
import firebase from './shared/firebase.js';
import 'firebase/database';

import '../App.css'
import Dashboard from './Dashboard';
import Profile from './Profile';
import Form from './form';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">

            <Link color="inherit" href="https://rezessentials.com/">
                Student Holdings Rez Laundry
      </Link>{' © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        maxWidth: '325',
        height: '100%'
    },
    header: {
        color: 'purple',
        align: 'center',
        display: 'block',
        marginRight: '20',
        fontSize: '30px',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        backgroundColor: '#6a09a4',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    }
}));



export default function Frame({user}) {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [signout, setSignout] = useState(false)
    const [currentPage, setCurrentPage] = React.useState('Dashboard');
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const theme = useTheme();

    const signOutUser = () => {
        // handleClose()
        console.log("singin out")
        firebase.auth().signOut()
        localStorage.setItem("user", null)
        console.log(user)
        setSignout(true)
    }

    const Content = ({ currentPage }) => {
        if (currentPage == 'Dashboard') {
            return<Dashboard />
        } else if (currentPage == 'Profile') {
            return <Profile />
        } else if (currentPage == 'Form') {
            return <Form />
        } 
    }

    if (signout) {
        return <Redirect to="/"></Redirect>
    }

    if (user == null) {
        return <Redirect to="/"></Redirect>
    }


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Hello, Patrice</Typography>
                    <Button onClick={signOutUser} color="inherit">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
                <Drawer variant="permanent" classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose), }} open={open}>
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <MainListItems currentPageState={{currentPage, setCurrentPage}}></MainListItems>
                    <Divider />
                </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Content currentPage={currentPage} />
            </main>
        </div>

    );
}
