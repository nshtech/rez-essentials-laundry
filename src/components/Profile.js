import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import '../App.css';
import planBody from './shared/getPlanName'

import firebase from 'firebase/app';
import 'firebase/database';

// Icons
import PersonIcon from '@material-ui/icons/Person';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { StrictMode } from 'react';




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
      alignItems: "stretch",
      width: '100%',
      height: 300,
    },
    subgrid: {
       maxWidth: '50%',
       padding: theme.spacing(2),
       display: 'flex',
       flexDirection: 'column',
       //overflow: 'auto',
    },
    paper: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(2),
      height:300,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    paperContact: {
      padding: theme.spacing(2),
      height:300,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
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
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '33ch',
    },
    cardtitle: {
      verticalAlign: 'bottom',
    },
    dividers: {
      color: 'darkgrey',
    }

  }));

  


  export default function Profile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [customerinfo, setCustomerInfo] = React.useState({});
    const [newphone, setNewPhone] = React.useState(null);
    const [newemail, setNewEmail] = React.useState(null);
    const theme = useTheme();
    const handleDrawerOpen = () => {
      setOpen(true);
    };
    const handleDrawerClose = () => {
      setOpen(false);
    };
    const [edit,setEdit] = React.useState(false);

    const laundry_times = 13;
    const overweight_times = 5;

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

    function saveContactInfo() {
      if (newphone !== null) {
        firebase.database().ref('/customers/'+customerinfo.id+'/phone').set(newphone);
        customerinfo.phone = newphone;
        //console.log('database phone updated');
      }
      if (newemail !== null) {
        firebase.database().ref('/customers/'+customerinfo.id+'/email').set(newemail);
        customerinfo.email = newemail;
        //console.log('database email updated');
      }
      setEdit(false);
      //console.log('edit == false');
      
    }

    //HANDLE PHONE AND EMAIL UPDATE
    function handleInputChange(event) {
      const target=event.target;
      const name = target.name;
      const value = target.value;
      if (name==="phone" && value.length===12) {
        setNewPhone(value);
        //firebase.database().ref('/customers/'+customerinfo.id+'/phone').set(value);
        //customerinfo.phone = value;
        //console.log('state var phone updated');
      }
      else if (name==="email" && value.includes("@") && value.includes('.')) {
        setNewEmail(value);
        //firebase.database().ref('/customers/'+customerinfo.id+'/email').set(value);
        //customerinfo.email = value;
        //console.log('state var email updated')
      } 
    }
    //plan upgrade suggestion
    function suggestions(laundry_times,overweight_times) {
      if (overweight_times/laundry_times > 0.5) {
        return (
          <Typography component="p" variant="body1" >My bag has been overweight <b>{overweight_times}/{laundry_times}</b> times this year.  I should increase my weekly weight limit!   <Button size="small" variant="contained" className={classes.rezbutton}><b>Upgrade Plan</b></Button>
          </Typography>
        );
      }
      else {
        return ( <Typography component="p" variant="body1" >My bag has been overweight <b>{overweight_times}/{laundry_times}</b> times this year.
        </Typography>);
      }
    }


    {/*EDIT MODE */}
    if (edit) {
      return (
        <Container maxWidth="lg" className={classes.container}>
          {/* <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
            {customerinfo.name}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Feel free to contact RezLaundry about any of your needs, present or future!
          </Typography> */}
            <Grid container spacing={1} classes={classes.grid} >
              {/* Account Info */}

              <Grid item xs={12} sm={8} className={classes.subgrid}>
                <Card className={classes.paper}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                      <PersonIcon style={{ verticalAlign: 'middle'}}/>{'  '}User Information
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h3">
                        <Typography variant="body2" component="p" color="textSecondary">CUSTOMER ID <br/></Typography>
                        {customerinfo.id} <br/>
                        <Divider />
    
                        <Typography variant="body2" component="p" color="textSecondary">RESIDENCE HALL <br/></Typography>
                        {customerinfo.reshall} <br/>
                        <Divider />

                        <Typography variant="body2" component="p" color="textSecondary">CURRENT PLAN <br/></Typography>
                        {planBody(customerinfo)}<br/>
                        <Divider />

                        <Typography variant="body2" component="p" color="textSecondary">WEIGHT LIMIT <br/></Typography>
                        {customerinfo.maxweight} lb/week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Contact Information */}
              <Grid item xs={12} sm={8} className={classes.subgrid}>
                  <Card className={classes.paperContact}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                      <PermContactCalendarIcon style={{ verticalAlign: 'middle'}}/>{' '}Contact Information
                    </Typography>
                    <Typography component="p" variant="body1" color="textSecondary">
                      PHONE: <Input  name="phone" placeholder={customerinfo.phone} defaultValue={customerinfo.phone} className={classes.textField} onChange={handleInputChange}/> <br/>
                      EMAIL: <Input margin="dense" name="email" placeholder={customerinfo.email} defaultValue={customerinfo.email} className={classes.textField} onChange={handleInputChange}/>
                    </Typography>
                    <CardActions>
                    <div className={classes.quickbuttons}>
                    <Button size="large" color="primary" className={classes.rezbutton} onClick={() => {saveContactInfo()}}>
                        SAVE
                    </Button>
                    </div>
                    </CardActions>
                  </Card>
                </Grid>
              <Grid container item xs={12} className={classes.grid}>
                {/* Laundry History */}
                <Grid item xs={12}>
                  <Card className={classes.paperbottom}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon style={{ verticalAlign: 'middle'}}/>{' '}Account Trends</Typography>
                    {suggestions(laundry_times,overweight_times)}
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
    

    //VIEW MODE
    else {
    return (
      
      <Container maxWidth="lg" className={classes.container}>
        {/* <Typography variant="h5" align="center" color="textSecondary" paragraph>
          {customerinfo.email}
        </Typography> */}
          <Grid container spacing={1} classes={classes.grid}>
            {/* Account Info */}
              <Grid item xs={12} sm={8}className={classes.subgrid}>
              <Card className={classes.paper}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                    <PersonIcon style={{ verticalAlign: 'middle'}}/>{' '}User Information
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h3">
                        <Typography variant="body2" component="p" color="textSecondary">CUSTOMER ID <br/></Typography> 
                        {customerinfo.id} <br/>
                        <Divider />
                    <Typography variant="body2" component="p" color="textSecondary">RESIDENCE HALL <br/></Typography> 
                        {customerinfo.reshall} <br/>
                        <Divider />
                    <Typography variant="body2" component="p" color="textSecondary">CURRENT PLAN <br/></Typography> 
                      {planBody(customerinfo)} <br/>
                        <Divider />
                    <Typography variant="body2" component="p" color="textSecondary">WEIGHT LIMIT<br/></Typography> 
                        {customerinfo.maxweight} lb/week <br/>
                    </Typography>
                  
                </CardContent>
              </Card>
            </Grid>
            {/* Contact Information */}
            <Grid item xs={12} sm={8} className={classes.subgrid}>
                <Card className={classes.paperContact}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                    <PermContactCalendarIcon style={{ verticalAlign: 'middle'}}/>{' '}Contact Information
                  </Typography>
                  <Typography component="h3" variant="h6">

                  <Typography variant="body2" component="p" color="textSecondary">PHONE<br/></Typography>
                  {customerinfo.phone} <br/>
                  <Divider />
                  <Typography variant="body2" component="p" color="textSecondary">EMAIL <br/></Typography>
                  {customerinfo.email} <br/>
                  </Typography>
                  <CardActions>
                  <div className={classes.quickbuttons}>
                    <Button size="large" color="primary" className={classes.rezbutton} onClick={() => {setEdit(true)}}>
                        EDIT CONTACT INFO
                    </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            <Grid container item xs={12} className={classes.grid}>
              {/* Laundry History */}
              <Grid item xs={12}>
                <Card className={classes.paperbottom}>
                  <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon style={{ verticalAlign: 'middle'}}/>{' '}Account Trends</Typography>
                  {suggestions(laundry_times,overweight_times)}
                  
    
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright style={{ paddingTop: 3 }} />
          </Box>
        </Container>
      
    ); }
  }