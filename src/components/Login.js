
import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import firebase from './shared/firebase'
import 'firebase/database';

import { Redirect } from 'react-router-dom';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                RezEssentials
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(//cdn.shopify.com/s/files/1/0233/2095/t/21/assets/hero_slide_4.jpg?v=17865731954443641065)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default function Login({ user, uid }) {
    const classes = useStyles();
    const [userID, setUserID] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false)

    const uiConfig = {
        signInFlow: 'popup',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccessWithAuthResult: () => {
                setLoggedIn(true)
            }
        }
    };

    useEffect(() => {
        const db = firebase.database().ref()
        if (user != null) {
            db.child('/customers/').on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    if (data.val().email == user.email) {
                        console.log("email found!!!")
                        console.log(data.val().id)
                        setUserID(data.val().id)
                    }
                });
            });
            console.log(userID)
        }

        if (user != null && userID != null) {
            db.child('/users/' + userID).once("value")
                .then(snapshot => {
                    if (!snapshot.val()) {
                        db.child('/users/' + userID).set({
                            username: user.displayName,
                            email: user.email
                        })
                    }
                })
            localStorage.setItem('user', JSON.stringify(user))
        }
        
    }, [user])

    const checkUser = () => {

        const db = firebase.database().ref()
        if (user != null) {
            db.child('/customers/').on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    if (data.val().email == user.email) {
                        console.log("email found!!!")
                        console.log(data.val().id)
                        setUserID(data.val().id)                    }
                });
            });
            console.log(userID)
        }
    };

    if (loggedIn) {
        return <Redirect to="/home"></Redirect>
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    {/* {user ?
                        <Button color="primary" onClick={() => setLoggedIn(true)} color="inherit">Go Home</Button> :
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    } */}
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </div>
            </Grid>
        </Grid>
    )
}