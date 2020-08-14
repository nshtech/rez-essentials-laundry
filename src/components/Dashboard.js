import React, { useState, useEffect, useLayoutEffect } from 'react';
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
import { CardActionArea, TextareaAutosize } from '@material-ui/core';

// Material UI Icons
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
import getWeight from './shared/getWeight'
import description from './shared/getDescription'

// Firebase
import firebase from 'firebase/app';
import 'firebase/database';
import { green } from '@material-ui/core/colors';

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
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
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
    maxWidth: '55%',
  },
  subgridleftsmall: {
    minHeight: '100%',
  },
  subgridaccount: {
    maxWidth: '50%'
  },
  // subgridweight: {
  //   maxWidth: '50%'
  // },
  subgrid: {
    maxWidth: '50%',
  },
  subgridright: {
    maxWidth: '45%',
    minHeight: '100%',
    alignItems: "stretch",
  },
  subgridrightsmall: {
    minHeight: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 200
  },
  paperweight: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 180
  },
  statuscard: {
    minHeight: 200
  },
  paperaccount: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    minHeight: 200
  },
  paperflex: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginTop: 10,
    minHeight: 100
  },
  paperflexone: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    marginTop: 10,
    minHeight: 170
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
    margin:'auto',
    paddingTop:0
  },
  preferences: {
    display: 'flex',
    alignItems: 'left',
    paddingBottom: 10
  },
  perferencesdetergent: {
    paddingRight: 10,
    paddingLeft: 0,
  },
  rezbutton: {
    borderColor: '#6a09a4',
    color: '#6a09a4',
    backgroundColor: 'white',
    margin: 0,
  },
  rezbuttonsupport: {
    borderColor: '#6a09a4',
    borderWidth: 5,
    color: '#6a09a4',
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    // padding: 10
  },
  underweight: {
    color: 'green'
  },
  overweight: {
    color: 'red'
  },
  noweight: {
    color: 'grey'
  }
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

  function weightLimit(customerinfo, classes) {
    const weekweight = customerinfo.weekweight;
    if (customerinfo.weekweight) {
      if (customerinfo.weekweight == 'N/A') {
        return classes.noweight;
      }
      else if (customerinfo.weekweight > customerinfo.maxweight) {
        return classes.overweight;
      }
      else{
        return classes.underweight;
      }
    }
  }

  function detergentName(customerinfo) {
    const deterg = customerinfo.detergent;
    if (deterg == 'scented') {
      return "Regular (scented)"
    } else if (deterg == 'unscented') {
      return "Hypoallergenic (unscented)"
    }
  }

  console.log(useWindowSize())
  if (useWindowSize()[0] > 900) {
    var rightgrid = classes.subgridright
    var leftgrid = classes.subgridleft
  } else {
    var rightgrid = classes.subgridrightsmall
    var leftgrid = classes.subgridleftsmall
  }

  const handleFeedbackClick = () => {
    window.location.assign('https://forms.gle/UuVCpWVWSPCnRS4K7');
  }


  const handleEmailClick = () => {
    window.location.assign('mailto:rezessentials@studentholdings.org');
  }


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = useTheme();
  return (
    
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={2} classes={classes.grid}>
            {/* Chart */}
            <Grid item xs={12} className={leftgrid}>
              <Card className={classes.statuscard}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Laundry Status
                  </Typography>
                  <Typography gutterBottom variant="h4" component="p">
                    {statusBody(customerinfo)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {description(customerinfo)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Updated: {customerinfo.last_status_updated}
                  </Typography>
                </CardContent>
                <CardMedia
                  className={classes.media}
                  image={statusImage(customerinfo)}
                  title="Cat"
                />
              </Card>
            </Grid>
            <Grid item xs={12} className={rightgrid}>
              <Grid container spacing={2} classes={classes.grid}>

                <Grid item xs={12} className={classes.subgridweight}>
                  <Card className={classes.paperweight}>
                    <Typography gutterBottom variant="h6" component="h2">Most Recent Weight</Typography>
                    <Typography component="h2" variant="h4" className={weightLimit(customerinfo, classes)}>
                    {getWeight(customerinfo)} lb
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      of your allowed {customerinfo.maxweight} lb/week limit.
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Updated: {customerinfo.last_weight_updated}
                    </Typography>
                    {/* <Typography>No overage charges this week.</Typography> */}
                    {/* <Button size="small" color="primary" className={classes.rezbutton}>
                      Upgrade Plan
                    </Button> */}
                    {/* <Typography gutterBottom variant="h6" component="h2">Past Month</Typography> */}
                    {/* <Typography gutterBottom variant="h6" component="h2">Weight Usage</Typography>
                    <WeightSpark customerinfo={customerinfo} /> */}
                  </Card>
                  
                </Grid>
                </Grid>
                <Grid item xs={12} className={classes.customergrid}>
                  <Card className={classes.paperflexone}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Wash Preferences
                            </Typography>
                  <Typography gutterBottom variant="body2" component="p">
                    <div className={classes.preferences}>
                    
                  <Typography variant="body2" component="p" color="textSecondary" className={classes.perferencesdetergent}>DETERGENT</Typography>
                      {detergentName(customerinfo)}
                      </div> 
                  <div className={classes.preferences}>
                  <Typography variant="body2" component="p" color="textSecondary" className={classes.perferencesdetergent}>FABRIC SOFTENER</Typography>
                    {customerinfo.fabric_softener}
                
                </div> 
                <div className={classes.preferences}>
                  <Typography variant="body2" component="p" color="textSecondary" className={classes.perferencesdetergent}>SPECIAL NOTES</Typography>
                  {customerinfo.special_request}

                </div>   
              </Typography>
                    
                    {/* <CardActions>
                      <div className={classes.quickbuttons}>
                        <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<AssignmentIcon />} onClick={() => currentPageState.setCurrentPage('account')}>
                          Update Preferences</Button>
                      </div>
                    </CardActions> */}

                  </Card>
                </Grid>
              {/* Recent Activity */}
                <Grid item xs={12} className={classes.customergrid}>
                <Card className={classes.paperflex}>
                    <Typography gutterBottom variant="h6" component="h2">
                      Customer Support
                    </Typography>
                  <CardActions>
                    <div className={classes.quickbuttons}>
                  <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<SentimentVerySatisfiedIcon />} onClick={handleFeedbackClick}>
                        Give Feedback</Button>
                  <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<ContactSupportIcon />} onClick={handleEmailClick}>
                        Contact Rez</Button>
                  <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<AssignmentIcon />} onClick={() => currentPageState.setCurrentPage('account')}>
                        Update Preferences</Button>
                    </div>
                {/* <Button size="small" color="primary" className={classes.rezbuttonsupport} startIcon={<ContactSupportIcon />} onClick={() => currentPageState.setCurrentPage('support')}>
                  Support Page</Button> */}
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
