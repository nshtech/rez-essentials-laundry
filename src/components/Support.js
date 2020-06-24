import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        width: 320
    },
    media: {
        height: 140
    }
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid container spacing={1}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="slivka.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                How will my laundry be done?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Your clothes will receive high-quality care. Clothes are washed in
                                cold water with your choice of detergent and fabric softener.
                                Colors and whites are separated to prevent bleeding. Clothes are
                                dried on low heat to maintain quality. Throughout our cleaning
                                process, we inspect your clothes in additional quality control
                                checks to ensure your clothes are clean.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                What type of detergent do you use?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                We use either scented or hypoallergenic detergent, with or without fabric softener.
                                After you place your order, we will send out a form for you to choose your detergent
                                preferences. You can update your preferences by emailing us at
                                rezlaundry@studentholdings.org
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Who does my laundry?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Experienced laundry professionals at our premium cleaning partner care are trained to
                                care for your clothes.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Do you take special requests?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                We will do our best! Just place a piece of paper in your laundry bag detailing the
                                clothing item and additional instructions.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Have questions about RezLaundry?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Email us at: rezessentials@studentholdings.org
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
            <Grid container spacing={1}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="slivka.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                How long does it take for my laundry to come back?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Next-day delivery is part of our guarantee! Just drop it off and it’ll be back in your hands in no time.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Where do I leave my laundry?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                We will pick up laundry in the lobby of your residence hall or sorority house. Just make sure to put it in one of our specialized bags and drop it off by 11:00 am on the day of your pickup.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                How much clothes can I wash?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Each load is 15 lbs. Most students do not go over this limit, but in the event that this is the case you will be charged an additional per pound fee.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                What happens if something gets lost or damaged?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                We will take excellent care of your clothes, but in the rare chance that something is lost or damaged, we’re prepared. Just let us know and we’ll refund you according to our insurance policy.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                Have a lost or damaged item?
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Fill out our form HERE
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}
