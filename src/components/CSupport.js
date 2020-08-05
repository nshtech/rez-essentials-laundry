import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import feedback from '../images/weekly_rescaled_1.png'
import preference from '../images/preference_rescaled_1.png'
import contact from '../images/contact_rescaled_1.png'

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

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: "theme.palette.background.paper",
        padding: theme.spacing(4, 0, 0),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: "purple",
        padding: theme.spacing(6),
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
}));

const cards = [1, 2, 3];

export default function Album({ currentPageState }) {
    const classes = useStyles();
    const handleWebsiteClick = () => {
        window.location.assign('https://rezessentials.com/pages/contact-us');
    }

    const handleFeedbackClick = () => {
        window.location.assign('https://forms.gle/UuVCpWVWSPCnRS4K7');
    }

    const handlePreferenceClick = () => {
        window.location.assign('https://forms.gle/bquf321KEXTLXPUEA');
    }
    
    const handleEmailClick = () => {
        window.location.assign('mailto:rezessentials@studentholdings.org');
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="md">
                        <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                            We're here for you.
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Feel free to contact RezLaundry about any of your needs, present or future!
                        </Typography>
                        {/* <div className={classes.quickbuttons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button color="primary" className={classes.rezbutton}>
                                        RezLaundry
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button color="primary" className={classes.rezbutton}>
                                        Student Holdings
                                    </Button>
                                </Grid>
                            </Grid>
                        </div> */}
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing ={1}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={feedback}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Weekly Feedback Form
                                        </Typography>
                                        <Typography>
                                            Please provide us feedback on our past week's service so we can better serve you in the future!
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" className={classes.rezbutton} onClick={handleFeedbackClick}>
                                            View
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        <Grid item xs={6} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={preference}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Preference Form
                                    </Typography>
                                    <Typography>
                                        Please provide us your preferences on your choice of detergent and fabric softener!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" className={classes.rezbutton} onClick={handlePreferenceClick}>
                                        View
                                    </Button>
                                </CardActions>
                            </Card>
                    </Grid>
                        <Grid item xs={6} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={contact}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Contact Rez
                                    </Typography>
                                    <Typography>
                                        Please feel free to contact us at rezessentials@studentholdings.org or our website's contact form!
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" className={classes.rezbutton} onClick={handleEmailClick}>
                                        Email
                                    </Button>
                                    <Button size="small" color="primary" className={classes.rezbutton} onClick={handleWebsiteClick}>
                                        Website
                                    </Button>
                                </CardActions>
                            </Card>
                    </Grid>
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
            {/* Footer */}
            {/* End footer */}
        </React.Fragment>
    );
}