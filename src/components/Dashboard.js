import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Title from './Title';
import { Sparklines, SparklinesReferenceLine, SparklinesLine } from 'react-sparklines';
import ProfileSnapshot from './ProfileSnapshot';
import FormSnapshot from './FormSnapshot';
import CurrentPlan from './CurrentPlan';
import Orders from './Orders';
import Cat from './source.gif'
import '../App.css'
import Profile from './Profile';
import WeightSpark from './WeightSpark';
import { CardActionArea } from '@material-ui/core';
import { Redirect } from 'react-router';

import firebase from 'firebase/app';
import 'firebase/database';

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
  title: {
    marginBottom: 40
  },
  header: {
    color: 'purple',
    align: 'center',
    display: 'block',
    marginRight: '20',
    fontSize: '30px',
  },
  title: {
    flexGrow: 1,
  },
  cardtitle: {
    color: '#6a09a4'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
  grid: {
    alignItems: "stretch",
    width: '100%',
    height: '100%'
  },
  subgridleft: {
    maxWidth: '50%',
  },
  subgrid: {
    maxWidth: '50%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    height: 200
  },
  paperflex: {
    padding: theme.spacing(5),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginTop: 10,
    height: 200
  },
  divflex: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardmedia: {
    width: 50,
  },
  ImageCat: {
    width: '20%',
    height: 'auto',
    alignItems: 'center',
    display: 'block',
    margin: '0 auto',
  },
  fixedHeight: {
    height: 240,
  },
  media: {
    height: 340,
  },
  depositContext: {
    paddingBottom: 15
  },
  quickbuttons: {
    padding: 'auto',
    display: 'flex',
    alignItems: 'center',
    margin:'auto'
  },
  rezbutton: {
    backgroundColor: '#6a09a4',
    color: 'white',
    margin: 4
  },
}));

export default function Dashboard({currentPageState}) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [customerinfo, setCustomerInfo] = React.useState({});

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const db = firebase.database().ref().child('/customers/' + userId);;

    const getCustomer = snap => {
      console.log(snap.val())
      if (snap.val()) {
        setCustomerInfo(snap.val());
      }
    }
    db.on('value', getCustomer, error => alert(error));
    return () => { db.off('value', getCustomer); };
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function statusBody(customerinfo) {
    const laundrystatus = customerinfo.laundrystatus;
    if (laundrystatus) {

      if (laundrystatus == 'picked-up') {
        const result = 'Washing and Folding';
        return result;
      }
      else if (laundrystatus == 'out-of-service') {
        const result = 'No service this week';
        return result;
      }
      else if (laundrystatus=== 'delivered-to-dorm') {
        const result = 'Delivered';
        return result;
      }
      else if (laundrystatus === 'delivered-to-SH') {
        const result = 'On the way';
        return result;
      }
    }
  }
  function planBody(customerinfo) {
    const plan = customerinfo.plan;
    if (plan) {

      if (plan.substring(10) === 'F') {
        const result = 'Fall ' + plan.substring(0, 9);
        return result;
      }
      else if (plan.substring(10) === 'W') {
        const result = 'Winter ' + plan.substring(0, 9);
        return result;
      }
      else if (plan.substring(10) === 'S') {
        const result = 'Spring ' + plan.substring(0, 9);
        return result;
      }
      else if (plan.substring(10) === 'F-W-S') {
        const result = 'School Year ' + plan.substring(0, 9);
        return result;
      }
    }
  }
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = useTheme();
  return (
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2} classes={classes.grid}>
            {/* Chart */}
            <Grid item xs={9} className={classes.subgridleft}>
              <Card className={classes.statuscard}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Laundry Status
                  </Typography>
                  <Typography gutterBottom variant="h4" component="p">
                    {statusBody(customerinfo)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Your laundry is currently being washed and will be with you shortly.
                  </Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={Cat}
                  title="Cat"
                />
              </Card>
            </Grid>
            <Grid item xs={12} className={classes.subgrid}>
              <Grid container spacing={2} classes={classes.grid}>
                {/* Current Plan */}
                <Grid item xs={12} className={classes.subgridleft}>
                  <Card className={classes.paper}>
                    <Typography gutterBottom variant="h6" component="h2">Current Plan</Typography>
                    <Typography component="p" variant="h4">
                      {planBody(customerinfo)}
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      will end after Fall quarter.
                    </Typography>
                    <Button size="small" color="primary" className={classes.rezbutton}>
                        Account Details
                    </Button>
                  </Card>
                </Grid>
                {/* Current Weight */}
                <Grid item xs={12} className={classes.subgridleft}>
                  <Card className={classes.paper}>
                    <Typography gutterBottom variant="h6" component="h2">Most Recent Weight</Typography>
                    <Typography component="p" variant="h4">
                      {customerinfo.weekweight} lb
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      of your allowed {customerinfo.maxweight} lb/week limit.
                    </Typography>
                    <Typography>No overage charges this week.</Typography>
                    {/* <Button size="small" color="primary" className={classes.rezbutton}>
                      Upgrade Plan
                    </Button> */}
                    {/* <Typography gutterBottom variant="h6" component="h2">Past Month</Typography> */}
                    {/* <WeightSpark /> */}
                  </Card>
                </Grid>
                </Grid>
              {/* Recent Activity */}
                <Grid item xs={12}>
                <Card className={classes.paperflex}>
                  <Typography gutterBottom variant="h6" component="h2">
                    Customer Support
                  </Typography>
                  <Typography color="textSecondary">
                    Help us offer you the best laundry experience we can.
                  </Typography>
                  
                  <CardActions>
                    <div className={classes.quickbuttons}>
                      <Button size="small" color="primary" className={classes.rezbutton} onClick={() => currentPageState.setCurrentPage('support')}>
                        Submit Feedback</Button>
                      <Button size="small" color="primary" className={classes.rezbutton} onClick={() => currentPageState.setCurrentPage('support')}>
                        Update Preferences</Button>
                      <Button size="small" color="primary" className={classes.rezbutton} onClick={() => currentPageState.setCurrentPage('support')}>
                        Contact RezLaundry</Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright style={{ paddingTop: 3 }} />
          </Box>
        </Container>
  );
}
