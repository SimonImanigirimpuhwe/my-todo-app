import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Todo from './Todo';
import { makeStyles } from '@material-ui/core';



// add alerts
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

// styling
const useStyles = makeStyles((theme) => ({
    rootAlert: {
      width: '100%',
      '& > * + *': {
      marginTop: theme.spacing(2)
      },
    },
    pos: {
        marginTop: '-170vh',
      }
  }));

const TodoList = ({todoValue, handleDelete, setTodoValue, filteredTodo, message, errMessage, handleClose, open, setOpen, setMessage, setErrMessage, userUid}) => {
    const classes = useStyles()

    return ( 
        <div className="todoContainer">
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
            <ul>
            {filteredTodo.map((todo) => (
            <Todo 
            todo={todo} 
            key={todo.id} 
            handleDelete={handleDelete}
            setTodoValue={setTodoValue}
            todoValue={todoValue}
            setOpen={setOpen}
            setErrMessage={setErrMessage}
            setMessage={setMessage}
            userUid={userUid}
            />
            ))}
            </ul>        
        </div>
     );
}
 
export default TodoList;