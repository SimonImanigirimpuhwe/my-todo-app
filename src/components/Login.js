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
  flexDirection:'column',
  justifyContent: 'center',
  backgroundColor: 'whitesmoke',
  boxShadow: '7px 5px 2px #3f51b5',
  borderRadius: '15px'
},
provider: {
  display: 'flex',
  flexDirection:'row',
  justifyContent: 'center',
  marginTop: 30
},
glogo: {
  width: 100,
  height: 50,
  alignSelf: 'center',
},
tlogo: {
  width: 100,
  height: 70,
  alignSelf: 'center',
},
btn: {
  alignSelf: 'center'
}
}));

const Login = () => {
  const classes = useStyles();

  //states
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState('');
  const [errMessage, setErrMessage] = useState('')

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const twitterProvider =  new firebase.auth.TwitterAuthProvider();

    const authentications = [
      {
        img : "https://blog.hubspot.com/hubfs/image8-2.jpg",
        btn: "login with Google",
        alt:'google logo',
        provider: googleProvider
      },
      {
        img : "https://icons-for-free.com/iconfiles/png/512/logo+twitter+twitter+logo+icon-1320190502069263658.png",
        btn: "login with Twitter",
        alt: "twitter logo",
        provider: twitterProvider
      }
    ]

    const googleSigninFunc = (provider) => {
      console.log(provider)
    firebase.auth().signInWithPopup(provider).then((result) => {
    const token = result.credential.accessToken;
    const user = result.user;


    localStorage.setItem('ImageUrl', user.photoURL)
    localStorage.setItem('name', user.displayName)
    localStorage.setItem('userUid', user.uid)
    if (token) {
        setTimeout(() => {
          window.location='/dashboard';
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
      <div className="login-btn">
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
            <Card className={classes.cardRoot} >
                {
                  authentications.map((authpr) => (
                    <div className={classes.provider}>
                      <img src={authpr.img} alt={authpr.alt} className={(authpr.alt === 'google logo') ? classes.glogo : classes.tlogo}/>
                        <Button  onClick={() => googleSigninFunc(authpr.provider)} variant="contained" color="primary" className={classes.btn}>
                            {authpr.btn}
                      </Button>
                    </div>
                  ))
                }
            </Card>
        </div>
       </div> 
     );
}
 
export default Login;