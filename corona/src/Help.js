import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SimpleCard from './SimpleCard';
import { Grid, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 14,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    pos: {
        marginBottom: 12,
    },
}));




function Help(props) {

    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState(0);
    const [price, setPrice] = React.useState(0);


    const updatePrice = (e) => {
        setPrice(e.target.value);
    };

    const handleClickOpen = (id) => {
        console.log("clicked");
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
        props.setPrice(price,id);
    };

    const classes = useStyles();


    return (
        <div className={classes.root}>

            <Grid container className={classes.root} spacing={2}>
                {
                    props.helpList.map(function (item, i) {

                        return <Grid item xs={12} key={i}>
                            <SimpleCard data={item} no={i} handleClickOpen={handleClickOpen} displayButton={true} displayButtonText="Do shopping"/>
                        </Grid>
                    })
                }


            </Grid>

            <div>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Can you do the shopping ?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Thank you for helping {props.helpList[id].name}!
                            <TextField  label="Amount in CHF" variant="outlined"  onChange={updatePrice}/>
          </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Disagree
          </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Agree
          </Button>
                    </DialogActions>
                </Dialog>
            </div>


        </div>
    );
}

export default Help;
