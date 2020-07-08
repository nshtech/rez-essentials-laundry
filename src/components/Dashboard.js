import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

// Material UI Core
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
import { CardActionArea } from '@material-ui/core';

// Material UI Icons
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FeedbackIcon from '@material-ui/icons/Feedback';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactSupportIcon from '@material-ui/icons/ContactSupport'; 

// Components
import '../App.css'
import Title from './Title';
import { Sparklines, SparklinesReferenceLine, SparklinesLine } from 'react-sparklines';
import Orders from './Orders';
import Profile from './Profile';
import WeightSpark from './WeightSpark';
import statusImage from './shared/getStatusImage'
import planBody from './shared/getPlanName'
import statusBody from './shared/getStatusName'

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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),

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
  subgridright: {
    maxWidth: '50%',
    minHeight: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 200
  },
  paperflex: {
    padding: theme.spacing(2),
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
    // width: '20%',
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
    borderColor: '#6a09a4',
    color: '#6a09a4',
    backgroundColor: 'white',
    margin: 0,
  },
  rezbuttonsupport: {
    borderColor: '#6a09a4',
    color: '#6a09a4',
    backgroundColor: 'white',
    margin: 15,
    marginTop: 20,
    padding: 10
  },
}));

export default function Dashboard({currentPageState}) {

  const classes = useStyles();
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


  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = useTheme();
  return (
        <Container maxWidth="lg" className={classes.container}>
          {/* <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
            My Dashboard
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {customerinfo.name}
          </Typography> */}
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
                  image={statusImage(customerinfo)}
                  title="Cat"
                />
              </Card>
            </Grid>
            <Grid item xs={12} className={classes.subgridright}>
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
                    <CardActions>
                  <div className={classes.quickbuttons}>
                    <Button size="small" color="primary" className={classes.rezbutton} onClick={() => currentPageState.setCurrentPage('account')}>
                        Account Details
                    </Button>
                    </div>
                    </CardActions>
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
                  <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<SentimentVerySatisfiedIcon />} onClick={() => currentPageState.setCurrentPage('support')}>
                        Give Feedback</Button>
                  <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<AssignmentIcon />} onClick={() => currentPageState.setCurrentPage('support')}>
                        Weekly Preferences</Button>
                  <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<ContactSupportIcon />} onClick={() => currentPageState.setCurrentPage('support')}>
                    Support Page</Button>
                      {/* <Button size="small" color="primary" className={classes.rezbutton} onClick={() => currentPageState.setCurrentPage('support')}>
                        Support Page</Button> */}
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
