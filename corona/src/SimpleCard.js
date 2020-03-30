import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 200,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {



    const classes = useStyles();

    let button = "";
    if (props.displayButton) {
        console.log(true);
        button = (
            <Button size="small" onClick={() => props.handleClickOpen(props.no)}>{props.displayButtonText}</Button>
        );
    } else {
        console.log(false);
        // button = (<Button size="small" onClick={props.handleClickOpen}>Do shopping</Button>);
    }


    let price = "";
    if (props.data.price) {
        price = "Price:" + props.data.price;

    }

    return (
        <Card className={classes.root} key={props.no}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.data.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.data.order}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.data.quant}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.data.location}
                </Typography>
                <Typography variant="body2" component="p">
                    {price}

                </Typography>
            </CardContent>
            <CardActions>
                {button}
            </CardActions>
        </Card>
    );
}