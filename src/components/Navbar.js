import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
  rootAlert: {
    width: '100%',
    '& > * + *': {
    marginTop: theme.spacing(1),
    },
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
  },
  header: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'center',
  },
  pos: {
    marginTop: '-170vh'
  }
}));

// add alerts
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};


export default function ButtonAppBar({props}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("")
  
  const userUid = localStorage.getItem('userUid');
  const name = localStorage.getItem('name');
  const image =localStorage.getItem('ImageUrl');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
 // handle signout
 const handleSignout = () => {
    firebase.auth().signOut().then(() => {
        setTimeout(() => {
          window.location='/';
          localStorage.removeItem('userUid');
          localStorage.removeItem('name');
          localStorage.removeItem('ImageUrl');    
        }, 4000);
        setOpen(true)
        setMessage('logged out successfully')
    }).catch((err) => {
        setOpen(true)
        setErrMessage(err.message)
    })
 }
  return (
    <div className={classes.root}>
    <ElevationScroll {...props}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <>
            {(userUid) ? <img className={classes.profile} src={image} alt="user profile" /> : ''}
            </>
          </IconButton>
          <>
          {(userUid) ? 
          (<Typography variant="h6" className={classes.title}>
            {name}
          </Typography>)  : 
          (<Typography variant="h6" className={classes.header}>
            Welcome to an amazing Todo Web App
          </Typography>) 
          }
          </> 
          <>
          {(userUid)? <Button color="inherit" onClick={handleSignout}>Sign out</Button> : ''}
          </>                
        </Toolbar>
      </AppBar>
      </ElevationScroll>
      <div className={classes.rootAlert}>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            {
            (message) ? (
            <Alert onClose={handleClose} severity="success" className={classes.pos}>
                {message}
            </Alert>
                ) : (
            <Alert onClose={handleClose} severity="error" className={classes.pos}>
                    {errMessage}
            </Alert> 
            )
            }            
        </Snackbar>
      </div>
    </div>
  );
}
