import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import '../App.css';

import firebase from 'firebase/app';
import 'firebase/database';

import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';




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
    cardtitle: {
      color: '#6a09a4'
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
      width: '100%',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
  
    },
    grid: {
      //justify: "space-evenly",
      //alignItems: "stretch",
      width: '100%',
    },
    subgrid: {
       maxWidth: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    paperbottom: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
      marginTop: 10
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
     height: 140,
   },
    leftside: {
      align: 'left',
      width: '50%',
      display: 'flex',
    },
    rightside: {
      align: 'right',
      width: '10%',
      display: 'flex',
    },
    buttongrad: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      width: 100,
      padding: '0 30px',
    },
    buttonmore: {
    background: 'linear-gradient(45deg, #24D8F3 20%, #6513CA  90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      width: 100,
      padding: '0 30px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    cover: {
      width: 151,
    },
    media: {
      height: 300,
    },
    depositContext: {
      paddingBottom: 15
    },
    rezbutton: {
      backgroundColor: '#6a09a4',
      color: 'white'
    }

  }));

  export default function Profile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [customerinfo, setCustomerInfo] = React.useState({});
    const theme = useTheme();
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

      <main className="classes.content">
      <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1} classes={classes.grid} direction="row">
            {/* Account Info */}
            <Grid item xs={12} className={classes.subgrid}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                    <PersonIcon/>User Information
                  </Typography>
                  <Typography gutterBottom variant="body1" component="p">
                    <b>Customer ID:</b> 001 <br/>
                    <b>Residential Hall:</b> Delta Gamma <br/>
                    <b>Current Plan:</b> School Year 2019-2020 <br/>
                    <b>Weight Limit:</b> 20 lb/week
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Contact Information */}
            <Grid item xs={12}>
                <Card className={classes.paper}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                    <PermContactCalendarIcon/>Contact Information
                  </Typography>
                  <Typography component="p" variant="body1">
                  <b>Phone:</b> 617-244-9360 <br/>
                  <b>Email:</b> patricepower@studentholdings.org
                  </Typography>
                </Card>
              </Grid>
            <Grid container item xs={12} className={classes.subgrid}>
              
              {/* Current Laundry Status 
              <Grid item xs={12}>
                <Card className={classes.paperbottom}>
                  <Typography gutterBottom variant="h5" component="h2">Current Laundry Status</Typography>
                  <Typography component="p" variant="body1" className="picked-up">
                    picked up
                  </Typography>
                  <Typography  className="overweight" component="p" variant="body1">
                    overweight
                  </Typography>
                </Card>
              </Grid>*/}
              {/* Laundry History */}
              <Grid item xs={12}>
                <Card className={classes.paperbottom}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon/>Account Trends</Typography>
                  <Typography component="p" variant="body1" >
                    My bag has been overweight <b>10/13</b> times this year.  I should increase my weekly weight limit!   <Button size="small" variant="contained" className={classes.rezbutton}><b>Upgrade Plan</b></Button>
                  </Typography>
                  
    
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright style={{ paddingTop: 3 }} />
          </Box>
        </Container>
      </main>
      </div>
      
    );
  }