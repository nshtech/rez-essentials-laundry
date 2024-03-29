import React, { useState, useEffect, useLayoutEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MuiAlert from '@material-ui/lab/Alert';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Snackbar from '@material-ui/core/Snackbar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


import '../App.css';
import planBody from './shared/getPlanName'

import firebase from 'firebase/app';
import 'firebase/database';

// Icons
import PersonIcon from '@material-ui/icons/Person';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { StrictMode } from 'react';
// import classes from '*.module.css';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
      //paddingBottom: theme.spacing(4),

    },
    grid: {
      //justify: "space-evenly",
      alignItems: "stretch",
      width: '100%',
      // height: 300,
    },
    subgrid: {
      alignItems: "stretch",
      width: '99%',
      //  display: 'flex',
      //  flexDirection: 'column',
       overflow: 'auto',
    },
    threegrid: {
      maxWidth: '33%',
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    narrowgrid: {
      width: '100%',
      // maxWidth: '100%',
      padding: theme.spacing(2),
    },
    paper: {
      // paddingLeft: theme.spacing(1),
      // paddingRight: theme.spacing(2),
      width: '100%',
      minHeight:360,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    paperContact: {
      // padding: theme.spacing(2),
      width: '100%',
      minHeight: 360,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column'
    },
    paperPref: {
      // padding: theme.spacing(2),
      width: '100%',
      minHeight: 120,
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
      margin:'auto',
      // position: 'absolute',
      // top: 0,
    },
    rezbutton: {
      borderColor: '#6a09a4',
      color: '#6a09a4',
      backgroundColor: 'white',
      margin: 0,
    },
    textField: {
      // marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '33ch',
      maxWidth: '100%',
      marginBottom: 10
    },
    textFieldLong: {
      marginRight: theme.spacing(1),
      width: '60ch',
      maxWidth: '100%',
      marginBottom: 10
    },
    cardtitle: {
      verticalAlign: 'bottom',
    },
    dividers: {
      color: 'darkgrey',
      marginBottom: 10
    },
    radio:
    {
      colorPrimary: '#6a09a4',
    },
    cardcontent: {
      maxWidth: '100%'
    }

  }));




  export default function Profile() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [customerinfo, setCustomerInfo] = React.useState({});
    const [newphone, setNewPhone] = React.useState(null);
    const [newrequest, setNewRequest] = React.useState(null);
    const [newemail, setNewEmail] = React.useState(null);
    const theme = useTheme();
    const [detergent, setDetergent] = React.useState('None');
    const [fabricsoftener, setFabricSoftener] = React.useState('None');
    const [editpref, setEditPref] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [warnPhone,setWarnPhone] = React.useState(false)
    const [successContact,setSuccessContact] = React.useState(false)
    const [requestSuccess,setRequestSuccess] = React.useState(false)



    const handleDetergentChange = (event) => {
      setDetergent(event.target.value);
    };

    const handleSoftenerChange = (event) => {
      setFabricSoftener(event.target.value);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
    const handlePhoneClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setWarnPhone(false);
      setSuccessContact(false);
    };
    const handleRequestClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setRequestSuccess(false);
    };


    const laundry_times = 13;
    const overweight_times = 5;

    useEffect(() => {
      const userId = localStorage.getItem('user_id');
      const db = firebase.database().ref().child('/customers/' + userId);;

      const getDetergent = snap => {
        console.log(snap.val())
        if (snap.val()) {
          setDetergent(snap.val().detergent);
        }
      }
      db.on('value', getDetergent, error => alert(error));
      return () => { db.off('value', getDetergent); };
    }, []);

    useEffect(() => {
      const userId = localStorage.getItem('user_id');
      const db = firebase.database().ref().child('/customers/' + userId);;

      const getSoftener = snap => {
        console.log(snap.val())
        if (snap.val()) {
          setFabricSoftener(snap.val().fabric_softener);
        }
      }
      db.on('value', getSoftener, error => alert(error));
      return () => { db.off('value', getSoftener); };
    }, []);

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

    function handleEditButton() {
      setEdit(true);
    }


    function savePref() {
      if (detergent !== null) {
        firebase.database().ref('/customers/' + customerinfo.id + '/detergent').set(detergent);
        customerinfo.detergent = detergent;
      }

      if (fabricsoftener !== null) {
        firebase.database().ref('/customers/' + customerinfo.id + '/fabric_softener').set(fabricsoftener);
        customerinfo.fabric_softener = fabricsoftener;
      }
      setOpen(true);
    }

    function saveRequest() {
      if (newrequest !== null) {
        firebase.database().ref('/customers/' + customerinfo.id + '/special_request').set(newrequest);
        customerinfo.special_request = newrequest;
        setRequestSuccess(true);
        //console.log('database phone updated');
      }

    }

    function saveContactInfo() {
      if (newphone !== null && newphone != 'invalid') {
        firebase.database().ref('/customers/'+customerinfo.id+'/phone').set(newphone);
        customerinfo.phone = newphone;
        setSuccessContact(true);
        setWarnPhone(false);
      }
      if (newphone == 'invalid') {
        setWarnPhone(true);
        setSuccessContact(false);
      }
      setEdit(false);
      console.log('edit == ',edit);

    }

    //HANDLE PHONE AND EMAIL UPDATE
    function handleInputChange(event) {
      const target=event.target;
      const name = target.name;
      const value = target.value;
      const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      if (name==="phone" && value[3]==='-' && value[7]==='-' && value.length===12 && value.match(phoneno)) {
        setNewPhone(value);
        //firebase.database().ref('/customers/'+customerinfo.id+'/phone').set(value);
        //customerinfo.phone = value;
        //console.log('state var phone updated');
      }
      else if (name==="phone" && (value[3] !=='-' || value[7] !=='-' || value.length !==12 )) {
        setNewPhone('invalid');
      }
      else if (name==="email" && value.includes("@") && value.includes('.')) {
        setNewEmail(value);
        //firebase.database().ref('/customers/'+customerinfo.id+'/email').set(value);
        //customerinfo.email = value;
        //console.log('state var email updated')
      }
      else if (name==="email" && (!value.includes("@") || !value.includes('.'))) {
        setNewEmail('invalid');
        //firebase.database().ref('/customers/'+customerinfo.id+'/email').set(value);
        //customerinfo.email = value;
        //console.log('state var email updated')
      }

    }

    function handleInputRequest(event) {
      const target = event.target;
      const name = target.name;
      const value = target.value;

      if (value == ''){
        setNewRequest('None');
      } else {
        setNewRequest(value);
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

    console.log(useWindowSize())
    if (useWindowSize()[0] > 900) {
      var grid = classes.threegrid
    } else {
      var grid = classes.narrowgrid
    }

    {/*EDIT MODE */}
    if (edit) {
      return (
        <Container maxWidth="lg" className={classes.container}>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Preferences updated successfully.
            </Alert>
          </Snackbar>
          <Snackbar open={requestSuccess} autoHideDuration={3000} onClose={handleRequestClose}>
            <Alert onClose={handleRequestClose} severity="success">
              Special requests updated successfully.
            </Alert>
          </Snackbar>

          <Grid>
            <Grid container spacing={1} classes={classes.grid} >
              {/* Account Info */}
              <Grid item xs={12} className={grid}>
                <Card className={classes.paper}>
                <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                      <PersonIcon style={{ verticalAlign: 'middle'}}/>{'  '}User Information
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        <Typography variant="body2" component="p" color="textSecondary">CUSTOMER ID <br/></Typography>
                        {customerinfo.id} <br />
                    <Divider className={classes.dividers}/>

                        <Typography variant="body2" component="p" color="textSecondary">RESIDENCE HALL <br/></Typography>
                        {customerinfo.reshall} <br />
                    <Divider className={classes.dividers}/>

                        <Typography variant="body2" component="p" color="textSecondary">CURRENT PLAN <br/></Typography>
                        {planBody(customerinfo)}<br />
                    <Divider className={classes.dividers}/>

                        <Typography variant="body2" component="p" color="textSecondary">WEIGHT LIMIT <br/></Typography>
                        {customerinfo.maxweight} lb/week
                      <Divider className={classes.dividers}/>

                      <Typography variant="body2" component="p" color="textSecondary">Quarter Overages <br/></Typography>
                      {customerinfo.quarter_overages} lbs
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Contact Information */}
              <Grid item xs={12} className={grid}>
                  <Card className={classes.paperContact}>
                <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                      <PermContactCalendarIcon style={{ verticalAlign: 'middle'}}/>{' '}Contact Information
                    </Typography>
                    <Typography component="p" variant="body1" color="textSecondary">
                    <Typography variant="body2" component="p" color="textSecondary">PHONE<br /></Typography>
                      <Input  name="phone" placeholder={customerinfo.phone} defaultValue={customerinfo.phone} className={classes.textField} onChange={handleInputChange}/> <br/>
                    <Typography variant="body2" component="p" color="textSecondary">EMAIL<br /></Typography>
                      {customerinfo.email}
                      <br/> <br/>
                      NOTE: If your email needs to be changed, please contact RezLaundry. This will affect your login information!
                    </Typography>
                  </CardContent>
                    <CardActions>
                    <div className={classes.quickbuttons}>
                    <Button size="large" color="primary" className={classes.rezbutton} onClick={() => {saveContactInfo()}}>
                        SAVE
                    </Button>
                    </div>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid container item xs={12} className={grid}>
                  {/* Laundry History */}
                    <Card className={classes.paperContact}>
                <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon style={{ verticalAlign: 'middle' }} />{' '}Preferences</Typography>
                    {/* {suggestions(laundry_times,overweight_times)} */}
                    <Typography gutterBottom variant="h6" component="h3">
                      <Typography variant="body2" component="p" color="textSecondary">DETERGENT <br /></Typography>
                      <RadioGroup aria-label="gender" name="gender1" value={detergent} onChange={handleDetergentChange}>
                        <FormControlLabel value="unscented" control={<Radio />} label="Hypoallergenic (Unscented)" />
                        <FormControlLabel value="scented" control={<Radio />} label="Regular (Scented)" />
                      </RadioGroup>
                      <Divider className={classes.dividers} />
                      <Typography variant="body2" component="p" color="textSecondary">FABRIC SOFTENER<br /></Typography>
                      <RadioGroup aria-label="gender" name="gender1" value={fabricsoftener} onChange={handleSoftenerChange}>
                        <FormControlLabel value="yes" control={<Radio/>} label="Yes" />
                    <FormControlLabel value="no" control={<Radio/>} label="No" />
                      </RadioGroup>
                    </Typography>
                  </CardContent>
                    <CardActions>
                      <div className={classes.quickbuttons}>
                        <Button size="large" color="primary" className={classes.rezbutton} onClick={() => savePref()}>
                          SAVE NEW PREFERENCES
                        </Button>
                      </div>
                    </CardActions>
                    </Card>
              </Grid>
            </Grid>
            <Grid container spacing={1} className={classes.grid}>
              <Grid container item xs={12} className={classes.subgrid}>
                <Card className={classes.paperPref}>
                  <CardContent className={classes.cardcontent}>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon style={{ verticalAlign: 'middle' }} />{' '}Special Requests</Typography>
                    {/* <Typography variant="body2" component="p" color="textSecondary">PHONE<br /></Typography> */}
                    <Input name="request" placeholder={customerinfo.special_request} defaultValue={customerinfo.special_request} className={classes.textFieldLong} onChange={handleInputRequest} /> <br />
                  </CardContent>
                  <CardActions>
                    <div className={classes.quickbuttons}>
                      <Button size="large" color="primary" className={classes.rezbutton} onClick={() => { saveRequest() }}>
                        SAVE REQUEST
                </Button>
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright style={{ paddingTop: 3 }} />
            </Box>
          </Container>

      );
    }

    else {
      // VIEW MODE
      return(
      <Container maxWidth="lg" className={classes.container}>
        <Snackbar open={warnPhone} autoHideDuration={3000} onClose={handlePhoneClose}>
            <Alert onClose={handlePhoneClose} severity="warning">
              Invalid Phone Number, please try again! Remember, the input style should be ### - ### - ####.
            </Alert>
        </Snackbar>
        <Snackbar open={successContact} autoHideDuration={3000} onClose={handlePhoneClose}>
            <Alert onClose={handlePhoneClose} severity="success">
              Contact information updated successfully.
            </Alert>
        </Snackbar>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Preferences updated successfully.
          </Alert>
        </Snackbar>
        <Snackbar open={requestSuccess} autoHideDuration={3000} onClose={handleRequestClose}>
            <Alert onClose={handleRequestClose} severity="success">
              Special requests updated successfully.
            </Alert>
          </Snackbar>
        <Grid>
        <Grid container spacing={1} classes={classes.grid}>
          {/* Account Info */}
          <Grid item xs={12} className={grid}>
            <Card className={classes.paper}>
              <CardContent className={classes.cardcontent}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                  <PersonIcon style={{ verticalAlign: 'middle' }} />{' '}User Information
                  </Typography>
                  <Typography gutterBottom component="p" variant="body1">
                  <Typography variant="body2" component="p" color="textSecondary">CUSTOMER ID <br /></Typography>
                  {customerinfo.id} <br />
                  <Divider className={classes.dividers} />
                  <Typography variant="body2" component="p" color="textSecondary">RESIDENCE HALL <br /></Typography>
                  {customerinfo.reshall} <br />
                  <Divider className={classes.dividers} />
                  <Typography variant="body2" component="p" color="textSecondary">CURRENT PLAN <br /></Typography>
                  {planBody(customerinfo)} <br />
                  <Divider className={classes.dividers} />
                  <Typography variant="body2" component="p" color="textSecondary">WEIGHT LIMIT<br /></Typography>
                  {customerinfo.maxweight} lb/week <br />
                    <Divider className={classes.dividers}/>
                    <Typography variant="body2" component="p" color="textSecondary">QUARTER OVERAGES <br/></Typography>
                    {customerinfo.quarter_overages} lbs
                </Typography>

              </CardContent>
            </Card>
          </Grid>
          {/* Contact Information */}
          <Grid item xs={12} className={grid}>
            <Card className={classes.paperContact}>
                <CardContent className={classes.cardcontent}>
              <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}>
                <PermContactCalendarIcon style={{ verticalAlign: 'middle' }} />{' '}Contact Information
                  </Typography>
                <Typography component="p" variant="body1" color="textPrimary">

                <Typography variant="body2" component="p" color="textSecondary">PHONE<br /></Typography>
                {customerinfo.phone} <br />
                <Divider className={classes.dividers} />
                <Typography variant="body1" component="p" color="textSecondary">EMAIL <br /></Typography>
                {customerinfo.email} <br />
              </Typography>
                  </CardContent>
              <CardActions>
                <div className={classes.quickbuttons}>
                    <Button size="large" color="primary" className={classes.rezbutton} onClick={() => handleEditButton()}>
                    EDIT CONTACT INFO
                    </Button>
                </div>
              </CardActions>
            </Card>
          </Grid>
          <Grid container item xs={12} className={grid}>
            {/* Laundry History */}
            <Card className={classes.paperContact}>
                <CardContent className={classes.cardcontent}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon style={{ verticalAlign: 'middle' }} />{' '}Preferences</Typography>
                {/* {suggestions(laundry_times,overweight_times)} */}
                <Typography gutterBottom variant="h6" component="h3">
                  <Typography variant="body2" component="p" color="textSecondary">DETERGENT <br /></Typography>
                  <RadioGroup aria-label="gender" name="gender1" value={detergent} onChange={handleDetergentChange}>
                      <FormControlLabel value="unscented" control={<Radio />} label="Hypoallergenic (Unscented)" />
                      <FormControlLabel value="scented" control={<Radio />} label="Regular (Scented)" />
                  </RadioGroup>
                  <Divider className={classes.dividers} />
                  <Typography variant="body2" component="p" color="textSecondary">FABRIC SOFTENER<br /></Typography>
                  <RadioGroup aria-label="gender" name="gender1" value={fabricsoftener} onChange={handleSoftenerChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </Typography>
                </CardContent>
                <CardActions>
                  <div className={classes.quickbuttons}>
                    <Button size="large" color="primary" className={classes.rezbutton} onClick={() => savePref()}>
                      SAVE NEW PREFERENCES
                    </Button>
                  </div>
                </CardActions>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.grid}>
          <Grid container item xs={12} className={classes.subgrid}>
            <Card className={classes.paperPref}>
              <CardContent className={classes.cardcontent}>
                <Typography gutterBottom variant="h5" component="h2" className={classes.cardtitle}><LocalLaundryServiceIcon style={{ verticalAlign: 'middle' }} />{' '}Special Requests</Typography>
                <Typography variant="body2" component="p" color="textSecondary">ADD SPECIAL NOTE<br /></Typography>
                    <Input name="request" placeholder={customerinfo.special_request} defaultValue={customerinfo.special_request} className={classes.textFieldLong} onChange={handleInputRequest}/> <br />
              </CardContent>
              <CardActions>
                <div className={classes.quickbuttons}>
                  <Button size="large" color="primary" className={classes.rezbutton} onClick={() => {saveRequest()}}>
                    SAVE REQUEST
                </Button>
                </div>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright style={{ paddingTop: 3 }}/>
        </Box>
      </Container>

      )
    }
  }

  //<Input margin="dense" name="email" placeholder={customerinfo.email} defaultValue={customerinfo.email} className={classes.textField} onChange={handleInputChange}/>
