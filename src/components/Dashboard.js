import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import Slivka from './slivka.jpg'
import '../App.css'

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),

  },
  grid: {
    alignItems: "stretch",
    width: '100%'
  },
  subgrid: {
    maxWidth: '50%',
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
  }
}));

export default function Dashboard() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const theme = useTheme();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>Hello, Patrice</Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),}} open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          <List>{mainListItems}</List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1} classes={classes.grid}>
            {/* Chart */}
            <Grid item xs={12} className={classes.subgrid}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    Laundry Status
                  </Typography>
                  <Typography gutterBottom variant="h4" component="p">
                    Washing
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
              {/* Recent Activity */}
              <Grid item xs={12}>
                <Card className={classes.paper}>
                  <Typography gutterBottom variant="h6" component="h2">
                    Next Pickup
                  </Typography>
                  <Typography component="p" variant="h4">
                    Wed, March 16th
                  </Typography>
                  <Typography color="textSecondary">
                    on 7/15/2020
                  </Typography>
                </Card>
              </Grid>
              {/* Current Plan */}
              <Grid item xs={12}>
                <Card className={classes.paperbottom}>
                  <Typography gutterBottom variant="h6" component="h2">Most Recent Weight</Typography>
                    <Typography component="p" variant="h4">
                      15.7 lbs
                  </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      on 7/15/2020
                  </Typography>
                  <Sparklines data={[5, 10, 5, 20]}>
                    <SparklinesLine />
                    <SparklinesReferenceLine type="min" />
                  </Sparklines>
                </Card>
              </Grid>
            </Grid>
            {/* <Grid item xs={12} className={classes.subgrid}>
              <Grid item xs={12}>
                <Card className={classes.paper}>
                  <CurrentPlan />
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.paperbottom}>
                  <FormSnapshot />
                </Card>
              </Grid>
            </Grid> */}
          </Grid>
          <Box pt={4}>
            <Copyright style={{ paddingTop: 3}} />
          </Box>
        </Container>
      </main>
    </div>
    
  );
}
