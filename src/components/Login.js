import React, {useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../config/firebase.config';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

const useStyles = makeStyles((theme) => ({
root: {
    width: '100%',
    '& > * + *': {
    marginTop: theme.spacing(1),
    },
},
}));

const Login = ({image, setImage, name, setName, handleRouteChange, setUserUid, userUid}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('');
    const [errMessage, setErrMessage] = useState('')

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const provider = new firebase.auth.GoogleAuthProvider();

    const googleSigninFunc = () => {
  firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;

    setImage(user.photoURL)
    setName(user.displayName)
    setUserUid(user.uid)
    
    if (token) {
        setTimeout(() => {
            handleRouteChange('home')  
        }, 3000);
        setOpen(true);
        setMessage('logged successfully')
    }
  }).catch((error) => {
    const errorMessage = error.message;
    setOpen(true)
    setErrMessage(errorMessage)
  });
}  
    return ( 
        <div>
            <div className={classes.root}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    {
                    (message) ? (
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                        ) : (
                    <Alert onClose={handleClose} severity="error">
                            {errMessage}
                    </Alert> 
                    )
                    }            
                </Snackbar>
            </div>
            <Button  onClick={googleSigninFunc} variant="contained" color="primary">
                Login with Google
            </Button>
        </div>
        
     );
}
 
export default Login;