import React, {useEffect, useState} from 'react';
import Form from './Form';
import TodoList from './TodoList';
import db from '../config/firebase.config';

const User = () => {
    const [inputValue, setInputValue] = useState("");
    const [todoValue, setTodoValue] = useState([]);
    const [todoStatus, setTodoStatus] = useState("all");
    const [filteredTodo, setFilteredTodo] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState("");
    const [errMessage, setErrMessage] = useState("");



    const userUid = localStorage.getItem('userUid')
    //handle alters
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };


    // hooks once only when app get renered
    useEffect(() => {
        handleFirebaseData()
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [userUid]) // similar to componentDidMount

    // react hooks with use effect
    useEffect(() => {
        handleFilter()
        // eslint-disable-next-line  react-hooks/exhaustive-deps
    }, [todoValue, todoStatus])

    // generate unique random IDs
    const ID = () => {
        return '_#@$' + Math.random().toString(36).substr(2, 9);
    };

    // handle text on input event change
    const handleText = (e) => {
        e.preventDefault();
        setInputValue(e.target.value)
    };

    // handle input submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue === '') return
    
        db.firestore().collection('todos').add({
        liText: inputValue,
        completed: false,
        id: ID(),
        authorId: userUid
        })
        .then(() => {
        setTodoValue([
        ...todoValue, 
        { 
        liText: inputValue,
        completed: false,
        id: ID(),
        authorId: userUid
        }
        ]);
        })
        .catch((err) => console.log(err))
        setInputValue('')
    }

    // handle filtered todo items
    const handleFilter = () => {
        switch (todoStatus) {
        case 'completed':
            setFilteredTodo(todoValue.filter(item => item.completed === true))
            break;
        case 'uncompleted':
            setFilteredTodo(todoValue.filter(item => item.completed === false))
            break;
        default:
            setFilteredTodo(todoValue);
        }; 
    };
    
    // get data from firebase
    const handleFirebaseData = async() => {
        const savedData = await db.firestore().collection('todos').where('authorId', '==', `${userUid}`).get();
        const result = savedData.docs.map((item) => item.data());
        setTodoValue(result)
    };

    return (  
        <div className="container">
          <h1>My todo's list</h1>
          <Form 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          handleSubmit={handleSubmit} 
          handleText={handleText}
          setTodoStatus={setTodoStatus}
          />
          <TodoList 
          todoValue={todoValue} 
          setTodoValue={setTodoValue}
          filteredTodo={filteredTodo}
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          message={message}
          errMessage={errMessage}
          setMessage={setMessage}
          setErrMessage={setErrMessage}
          userUid={userUid}
          />
          </div>
    );
}
 
export default User;