import React from 'react';
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
          </Grid>
          <Box pt={4}>
            <Copyright style={{ paddingTop: 3 }} />
          </Box>
        </Container>
  );
}
