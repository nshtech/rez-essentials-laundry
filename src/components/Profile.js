import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import '../App.css';

import firebase from 'firebase/app';
import 'firebase/database';


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
  
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,

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
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

  export default function Profile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [customerinfo, setCustomerInfo] = React.useState({});
    
    /*useEffect(() => {
      const db = firebase.database().ref().child('/customers/000');

        if (db != null) {
          db.child('/customers/000').on("value")
          .then(snapshot => {
            setCustomerInfo( {
              "name": db.child('/customers/000/name'),
              "laundrystatus": db.child('/customers/000/laundrystatus'),
              "weightstatus": db.child('/customers/000/weightstatus'),
              "customerID": db.child('/customers/000/id'),
              "plan": db.child('/customers/000/plan'),
              "maxweight": db.child('/customers/000/maxweight'),
              "reshall": db.child('/customers/000/reshall'),
              "email": db.child('/customers/000/email'),
              "phone": db.child('/customers/000/phone')
            });
        })
      };
    }, []);*/
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const editing = false;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const db = firebase.database().ref();
    const name = db.child('/customers/000/name');
    const laundrystatus = db.child('/customers/000/laundrystatus');
    const weightstatus = db.child('/customers/000/weightstatus');
    const customerID = db.child('/customers/000/id');
    const plan = db.child('/customers/000/plan');
    const maxweight = db.child('/customers/000/maxweight');
    const reshall = db.child('/customers/000/reshall');
    const email = db.child('/customers/000/email');
    const phone = db.child('/customers/000/phone');



    return (

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={5} sm={5}>
            <Paper className = {classes.paper}>
              <h2>Account Information</h2>
              <p >Customer ID: 000</p>
              <p >Laundry Plan: yearly</p>
              <p >Max Weight: 15 lb/week</p>
            </Paper>
          </Grid>
          <Grid item xs={8} sm={5}>
            <Paper className = {classes.paper}>
              <h2>Contact Information</h2>
              <p>Residential Hall: Delta Gamma</p>
              <p >Email: carolinelobel2022@u.northwestern.edu</p>
              <p >Phone: 2019067437</p>
            </Paper>
          </Grid>
          <Grid item xs={5} sm={5}>
            <Paper className = {classes.paper}>
              <h2>Current Laundry Status</h2>
              <p className='picked-up' style={{ marginRight: 15 }}>picked up</p>
              <p className='overweight'>overweight</p>
            </Paper>
          </Grid>
        </Grid>
      </div>

      
    );
  }
  
  /*<div className="card card-list" style={{marginLeft: 20}}>
          <h1>Caroline Lobel</h1>
          <div style={{ display: 'flex' }}>
              <p style={{marginRight: 15 }}>Laundry Status:</p>
              <p className='picked-up' style={{ marginRight: 15 }}>picked up</p>
              <p className='overweight'>overweight</p>
          </div>
          <div style={{ display: 'flex' }}>
              <div style={{ minWidth: '50%'  }}>
                  <h3 style={{ marginBlockStart: 0, marginBlockEnd: '0.25em' }}>Account Information</h3>
                  <p style={{ marginBlockStart: 0, marginBlockEnd: '0.25em', paddingRight: 15 }}>Customer ID: 000</p>
                  <p style={{ marginBlockStart: 0, marginBlockEnd: '0.25em', paddingRight: 15 }}>Laundry Plan: yearly</p>
                  <p style={{ marginBlockStart: 0, marginBlockEnd: '0.25em', paddingRight: 15 }}>Max Weight: 15 lb/week</p>
              </div>
              <div style = {{minWidth: '50%'}}>
                  <h3 style={{ marginBlockStart: 0, marginBlockEnd: '0.25em' }}>Contact Information</h3>
                  <p style={{ marginBlockStart: 0, marginBlockEnd: '0.25em', paddingRight: 15 }}>Residential Hall: Delta Gamma</p>
                  <p style={{ marginBlockStart: 0, marginBlockEnd: '0.25em', paddingRight: 15 }}>Email: carolinelobel2022@u.northwestern.edu</p>
                  <p style={{ marginBlockStart: 0, marginBlockEnd: '0.25em', paddingRight: 15 }}>Phone: 2019067437</p>
              </div>
          </div>
      </div> */