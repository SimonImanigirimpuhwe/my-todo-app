import React, {useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
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
pos: {
  marginTop: '-170vh'
},
cardRoot: {
  minWidth: 400,
  minHeight: 300,
  display: 'flex',
  flexDirection:'row',
  justifyContent: 'center',
  backgroundColor: 'whitesmoke',
  boxShadow: '7px 5px 2px #3f51b5',
  borderRadius: '15px'
},
logo: {
  width: 100,
  height: 50,
  alignSelf: 'center',
},
btn: {
  alignSelf: 'center'
}
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
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
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
            <Card className={classes.cardRoot}>
            <img src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="google logo" className={classes.logo}/>
            <Button  onClick={googleSigninFunc} variant="contained" color="primary" className={classes.btn}>
                Login with Google
            </Button>
            </Card>
        </div>
        
     );
}
 
export default Login;