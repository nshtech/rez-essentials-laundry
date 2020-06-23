import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import '../App.css';

import firebase from 'firebase/app';
import 'firebase/database';

import PersonIcon from '@material-ui/icons/Person';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
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
    title: {
      flexGrow: 1,
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
    fixedHeight: {
      height: 240,
    },
    media: {
     height: 140,
   },
    cover: {
      width: 151,
    },
    depositContext: {
      paddingBottom: 15
    },
    rezbutton: {
      backgroundColor: '#6a09a4',
      color: 'white'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '40ch',
    },

  }));

  


  export default function Profile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [customerinfo, setCustomerInfo] = React.useState({});
    const theme = useTheme();
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const [edit,setEdit] = React.useState(false);

    useEffect(() => {
      const db = firebase.database().ref().child('/customers/001');

      const getCustomer = snap => {
        console.log(snap.val())
        if (snap.val()) {
          setCustomerInfo(snap.val());
        }
      }
      db.on('value', getCustomer, error => alert(error));
      return () => { db.off('value', getCustomer); };
    }, []);

    //HANDLE PHONE AND EMAIL UPDATE
    function handleInputChange(event) {
      const target=event.target;
      const name = target.name;
      const value = target.value;
      if (name==="phone" && value.length===12) {
        firebase.database().ref('/customers/'+customerinfo.id+'/phone').set(value);
        customerinfo.phone = value;
        console.log('database phone updated');
      }
      else if (name==="email" && value.includes("@") && value.includes('.')) {
        firebase.database().ref('/customers/'+customerinfo.id+'/email').set(value);
        customerinfo.email = value;
        console.log('database email updated')
      } 
    }

    {/*EDIT MODE */}
    if (edit) {
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
                        <b>Customer ID:</b> {customerinfo.id} <br/>
                        <b>Residential Hall:</b> {customerinfo.reshall} <br/>
                      <b>Current Plan:</b> School Year 2019-2020 <br/>
                        <b>Weight Limit:</b> {customerinfo.maxweight} lb/week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Contact Information */}
              <Grid item xs={12}>
                  <Card className={classes.paper}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                      <PermContactCalendarIcon/>Contact Information <Button size="small" variant="contained" className={classes.rezbutton} onClick={() => {setEdit(false)}}><b>SAVE</b></Button>
                    </Typography>
                    <Typography component="p" variant="body1">
                      <b>Phone:</b> <Input name="phone" placeholder={customerinfo.phone} defaultValue={customerinfo.phone} className={classes.textField} onChange={handleInputChange}/> <br/>
                      <b>Email:</b> <Input name="email" placeholder={customerinfo.email} defaultValue={customerinfo.email} className={classes.textField} onChange={handleInputChange}/>
                    </Typography>
                  </Card>
                </Grid>
              <Grid container item xs={12} className={classes.subgrid}>
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
    

    //VIEW MODE
    else {
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
                      <b>Customer ID:</b> {customerinfo.id} <br/>
                      <b>Residential Hall:</b> {customerinfo.reshall} <br/>
                    <b>Current Plan:</b> School Year 2019-2020 <br/>
                      <b>Weight Limit:</b> {customerinfo.maxweight} lb/week
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Contact Information */}
            <Grid item xs={12}>
                <Card className={classes.paper}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                    <PermContactCalendarIcon/>Contact Information <Button size="small" variant="contained" className={classes.rezbutton} onClick={() => {setEdit(true)}}><b>EDIT</b></Button>
                  </Typography>
                  <Typography component="p" variant="body1">
                    <b>Phone:</b> {customerinfo.phone} <br/>
                    <b>Email:</b> {customerinfo.email}
                  </Typography>
                </Card>
              </Grid>
            <Grid container item xs={12} className={classes.subgrid}>
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
      
    ); }
  }