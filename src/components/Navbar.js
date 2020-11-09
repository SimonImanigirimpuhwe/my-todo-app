import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import firebase from '../config/firebase.config';


// handle scroll
function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };

// styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  profile: {
      borderRadius: '100%',
      width: '50px',
      height: '50px',
  }
}));

export default function ButtonAppBar({props, route, handleRouteChange, image}) {
  const classes = useStyles();

 // handle signout
 const handleSignout = () => {
    firebase.auth().signOut().then(() => {
        setTimeout(() => {
            handleRouteChange('signin')          
        }, 2000);
    }).catch((err) => console.log(err))
 }
  return (
    <div className={classes.root}>
    <ElevationScroll {...props}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <>
            {(route === 'home') ? <img className={classes.profile} src={image} alt="user profile" /> : ''}
            </>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography> 
          <Button color="inherit" onClick={handleSignout}>{(route === 'home')? 'Sign out' : ''}</Button>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
    </div>
  );
}
