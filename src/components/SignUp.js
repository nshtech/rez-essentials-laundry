import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebase from './shared/firebase'
import 'firebase/database';

import { Redirect } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [userId, setUserId] = useState(null);

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [fname, setFName] = useState(null);
    const [lname, setLName] = useState(null);

    const [emailthere, setEmailThere] = useState(false);
    const [resignup, setReSignUp] = useState(false);
    const [signupfinished, setSignupFinished] = useState(false);


    const updateLNameInput = (event) => {
        console.log(event.target.value)
        setLName(event.target.value)
    }

    const updateFNameInput = (event) => {
        setFName(event.target.value)
    }

    const updateEmailInput = (event) => {
        console.log(event.target.value)
        setEmail(event.target.value)
    }

    const updatePasswordInput = (event) => {
        setPassword(event.target.value)
    }

    const createUser = () => {
        const db = firebase.database().ref()
        console.log(email)
        console.log(password)
        if (fname != null && lname != null && email != null && password != null) {
            db.child('/customers/').on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    if (data.val().email == email) {
                        console.log("email found!!!")
                        console.log(data.val().id)
                        setUserId(data.val().id)
                        setEmailThere(true)
                    }
                });
            });
            console.log(userId)
        }
        if (emailthere) {
            db.child('/users/').on("value", function (snapshot) {
                console.log(snapshot.val());
                snapshot.forEach(function (data) {
                    if (data.val().email == email) {
                        console.log("this is already a user")
                        setReSignUp(true)
                    }
                });
            });
        }

        if (userId && resignup == false) {
            console.log("JERE WE GO")
            db.child('/users/' + userId).on("value", function (snapshot) {
                console.log(snapshot.val());
                if (!snapshot.val()) {
                    db.child('/users/' + userId).set({
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: password,
                        id: userId
                    })
                    setSignupFinished(true)
                }
            });
        }
    };

    if (signupfinished) {
        return <Redirect to="/"></Redirect>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={updateFNameInput}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={updateLNameInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={updateEmailInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={updatePasswordInput}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={createUser}
                    >
                        Sign Up
          </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Already have an account? Sign in
              </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}