import React, { useState, useEffect, Fragment } from 'react';
import Tickets from '../tickets/Tickets';
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button, Fab} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ShoppingBasket from './ShoppingBasket';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    fixed: {
      position: 'fixed',
      zIndex: '9',
      right: '12px',
      bottom: '12px'
    },
  }));

const Content = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => { 
        setIsLoaded(props.data.isLoaded);
        setData(props.data.data);
    })

    const getSelected = (d) => {
        console.log('data from content', d)
        setSelectedData(d);
    }
    
    if (isLoaded) {
        return(
            <Fragment>
                <Tickets data={data} getSelected={getSelected}/>
                <Fab color="secondary" aria-label="edit" className={classes.fixed}onClick={handleClickOpen}>
                    <ShoppingBasketIcon />
                </Fab>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">{"Shopping basket"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Confirm if you would like to order all tickets:
                        </DialogContentText>
                    <ShoppingBasket data={selectedData}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleClose} color="primary">
                            Order
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    } else {
        return(
            <p>Loading...</p>
        )
    }
}

export default Content;