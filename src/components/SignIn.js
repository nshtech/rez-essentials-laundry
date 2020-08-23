import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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

import rezImage from '../images/wash.png';

import firebase from './shared/firebase'
import 'firebase/database';

import { Redirect } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://rezessentials.com/">
                Rez Essentials Laundry
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
        backgroundImage: `url(${rezImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#6a09a4',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignIn() {
    const classes = useStyles();
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    // const [password, setPassword] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [allemails, setAllEmails] = useState([]);
    const [allids, setAllIds] = useState([]);

    const [open, setOpen] = React.useState(false);

    // useEffect(() => {
    //     const db = firebase.database().ref().child('/customers');
    //     const emailArray = [];
    //     firebase.database().ref('/customers').on('value', function (snapshot) {
    //         snapshot.forEach(function (childSnapshot) {
    //             emailArray.push(childSnapshot.val().email);
    //         })});

    //     setAllEmails(emailArray);

    // }, [allemails]);
    // useEffect(() => {
    //     const db = firebase.database().ref().child('/customers');

    //     const getIds = snap => {
    //         if (snap.val()) {
    //             setAllIds(Object.values(snap.val()));
    //         }
    //     }
    //     db.on('value', getIds, error => alert(error));
    //     return () => { db.off('value', getIds); };
    // }, [allids]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const updateEmailInput = (event) => {
        console.log(event.target.value)
        setEmail(event.target.value)
    }
    const updateIdInput = (event) => {
        console.log(event.target.value)
        setId(event.target.value)
    }

    // const updatePasswordInput = (event) => {
    //     setPassword(event.target.value)
    // }

    const checkUser = () => {
        const db = firebase.database().ref()
        console.log(email)
        // console.log(password)
        if (email != null && id != null) {
            
                
            db.child('/customers/').on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    console.log(data.val().email)
                    console.log(data.val().id)
                    if (data.val().email == email & data.val().id == id) {
                        localStorage.setItem('user_email', email);
                        localStorage.setItem('user_id', id);
                        // localStorage.setItem('user_password', password);
                        setLoggedIn(true)
                    }
                });
            });
            
            // const isuser = localStorage.getItem('user_id');
            // console.log(isuser)
            // if (!isuser) {
            //     setOpen(true);
            // }
        // }
    }
    };

    const uservalidated = localStorage.getItem('user_id');
    
    if (loggedIn) {
        console.log("TRYING TO REDIRECT")
        return <Redirect to="/dashboard"></Redirect>
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        Incorrect email or password.
                    </Alert>
                </Snackbar>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={updateEmailInput}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="id"
                            label="Customer Id"
                            name="id"
                            autoComplete="id"
                            onChange={updateIdInput}
                            autoFocus
                        />
                        {/* <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={updatePasswordInput}
                        /> */}
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={checkUser}>
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="mailto:rezessentials@studentholdings.org" variant="body2">
                                    Forgot customer ID?
                                </Link>
                            </Grid>
                            {/* <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid> */}
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );}
