import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

    const useStyles = makeStyles({
        root: {
            width: 300
    }
    });

    function valuetext(value) {
        return `${value}°C`;
    }

    export default function FormPropsTextFields() {
        const classes = useStyles();

        return (
            <Grid>
                <div style={{padding: 20}}>
                    <h1> RezLaundry Weekly Feedback Form</h1>
                    <small> Hello RezLaundry customers! Please fill out this weekly feedback form so that we can better serve you and meet your needs. Please rate us on each of these metrics and there is space for additional comments/concerns if you would like to give additional feedback! Thank you for your time. </small>
            <Grid
                    container
                    direction = "column"
                    justify="space-between"
                    alignItems="left">
                <div>
                    <TextField
                        required
                        id="standard-required"
                        label="Email Address"
                        placeholder="Valid Email Address"
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="standard-required"
                        label="Full Name"
                        placeholder="First + Last"
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="standard-password-input"
                        label="Comments/Concerns"
                        placeholder="First + Last"
                    />
                </div>
                </Grid>
                </div>
                <div style={{padding: 20}}>
                <Grid
                        container
                        direction = "column"
                        justify="space-between"
                        alignItems="left">
                    <div className={classes.root}>
                <Typography id="discrete-slider-small-steps" gutterBottom>
                    Wash Quality
                </Typography>
                <Slider
                    defaultValue={3}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-small-steps"
                    step={1}
                    marks
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </div>
                    <div className={classes.root}>
            <Typography id="discrete-slider-small-steps" gutterBottom>
                Speed of Service
            </Typography>
            <Slider
                defaultValue={3}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={1}
                marks
                min={1}
                max={5}
                valueLabelDisplay="auto"
            />
        </div>
                    <div className={classes.root}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Customer Service
                    </Typography>
                    <Slider
                        defaultValue={3}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                    />
                </div>
                    <div className={classes.root}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Privacy + Security
                    </Typography>
                    <Slider
                        defaultValue={3}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                    />
                </div>
                    <div className={classes.root}>
                    <Typography id="discrete-slider-small-steps" gutterBottom>
                        Overall Satisfaction
                    </Typography>
                    <Slider
                        defaultValue={3}
                        getAriaValueText={valuetext}
                        aria-labelledby="discrete-slider-small-steps"
                        step={1}
                        marks
                        min={1}
                        max={5}
                        valueLabelDisplay="auto"
                    />
                </div>
                </Grid>
                    <Button variant="contained" color="primary" Submit>
                        Submit
                    </Button>
                </div>
            </Grid>
        );
    }