import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        width: '100%',
        backgroundColor: '#f5f5f5',
        height: '70px',
        bottom: 0,
    },
    footer: {
      textAlign: 'center',
      marginTop: theme.spacing(2),
      fontWeight: 'bolder'
    }
  }));
  

export default function Footer() {
    const classes = useStyles();
   
  return (
    <div className={classes.root}>
        <Typography className={classes.footer}>
        ©Simon 2020
        </Typography>
    </div>     
  );
}
