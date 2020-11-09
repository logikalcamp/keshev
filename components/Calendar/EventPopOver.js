import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import cx from "classnames";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export const SimplePopover = ({draggable,dragged, setDragged,onDrag,event}) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
        <React.Fragment>
            <div 
            onDrag={()=>setDragged(event.id)}
            id={event.id} 
            draggable={draggable} 
            aria-describedby={id}
            variant="contained" 
            color="primary" 
            onClick={handleClick}
            className={
                cx(
                "bg-red-300 text-sm truncate border-r-8 m-1 rounded-sm border-green-500 cursor-pointer",
                {"cursor-move": dragged!=''}
            )}>
            {event.name}
            </div>
            <Popover
            id={id}
            style={{maxWidth:"200px !important"}}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
            <Typography className={classes.typography}>The content of the Popover. ASNALKSFNALKSFNLASNFLASKNFLAN</Typography>
            </Popover>
        </React.Fragment>

    )
}

