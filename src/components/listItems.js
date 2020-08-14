import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  active: {
    color: 'purple'
  },
  inactive: {
  color: 'grey'
},
  listitem: {
    paddingBottom: '20px',
    paddingTop: '20px'
  }
})
)

export default function MainListItems({ currentPageState }) {
  const classes = useStyles();

  console.log(currentPageState.currentPage)

  return (
    <List>
      <div>
        <Tooltip title="Dashboard" aria-label="dashboard">
        <ListItem button className={classes.listitem} onClick={() => currentPageState.setCurrentPage('dashboard')}>
          <ListItemIcon >
            <LocalLaundryServiceIcon className={(currentPageState.currentPage ==='dashboard' ? classes.active : classes.inactive)}/>
          </ListItemIcon>
          {/* <ListItemText primary="Dashboard" /> */}
        </ListItem>
        </Tooltip>
        <Tooltip title="Account" aria-label="account">
        <ListItem button className={classes.listitem} onClick={() => currentPageState.setCurrentPage('account')}>
          <ListItemIcon>
            <AccountCircleIcon className={(currentPageState.currentPage === 'account' ? classes.active : classes.inactive)} />
          </ListItemIcon>
          {/* <ListItemText primary="Profile" /> */}
        </ListItem>
        </Tooltip>
        {/* <Tooltip title="Support" aria-label="support">
        <ListItem button className={classes.listitem} onClick={() => currentPageState.setCurrentPage('support')}>
          <ListItemIcon>
            <ContactSupportIcon className={(currentPageState.currentPage === 'support' ? classes.active : classes.inactive)} />
          </ListItemIcon> */}
          {/* <ListItemText primary="Support" /> */}
        {/* </ListItem>
        </Tooltip> */}
        {/* <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Usage" />
        </ListItem> */}
      </div>
    </List>
    )
}
