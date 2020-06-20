import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
    paddingBottom: 10
  },
  weightLimit: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    color: '#6a09a4',
    backgroundColor: 'lightgrey'
  }
});

export default function CurrentPlan() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography gutterBottom variant="h6" component="h2">My Plan</Typography>
      <Typography component="p" variant="h4">
        20lb Annual Plan
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        ends June 2021
      </Typography>
    </React.Fragment>
  );
}