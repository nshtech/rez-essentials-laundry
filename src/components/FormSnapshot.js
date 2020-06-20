import React from 'react';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 5
    },
    weightLimit: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        color: 'white',
        backgroundColor: '#6a09a4',
        width: '47%',
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 2,
        marginRight: 2
    }
});

export default function FormSnapshot() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography gutterBottom variant="h6" component="h2">
                Forms
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Need to change your preferences?
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                Damaged or lost item?
            </Typography>
            <div style={{ displayContents: 'flex', margin: '0 auto' }}>
                <Button className={classes.button}>Preferences</Button>
                <Button className={classes.button}>Inquiries</Button>
            </div>
        </React.Fragment>
    );
}