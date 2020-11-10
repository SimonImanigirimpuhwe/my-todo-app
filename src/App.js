import React, {useEffect, useState} from 'react';
import './App.css';
import Form from './components/Form';
import Login from './components/Login';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import db from './config/firebase.config';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoValue, setTodoValue] = useState([]);
  const [todoStatus, setTodoStatus] = useState("all");
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [route, setRoute] = useState('signin');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");
  const [errMessage, setErrMessage] = useState("")

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
  }, []) // similar to componentDidMount

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
    setTodoValue([
      ...todoValue, 
     { 
      liText: inputValue,
      completed: false,
      id: ID()
    }
    ]);
    db.firestore().collection('todos').add({
      liText: inputValue,
      completed: false,
      id: ID()
    })
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
    const savedData = await db.firestore().collection('todos').get();
    const result = savedData.docs.map((item) => item.data());
    setTodoValue(result)
  };

  // handle route change
  const handleRouteChange = (route) => {
    if (route === 'signin') {
      setRoute(false);
      setIsLoggedIn(false)
    } else if (route === 'home') {
      setRoute(true);
      setIsLoggedIn(true);
    }
    setRoute(route)
  }

  return (
    <div>
      <Navbar 
      image={image} 
      setImage={setImage} 
      isLoggedIn={isLoggedIn} 
      handleRouteChange={handleRouteChange} 
      route={route}
      name={name}
      setName={setName}
      />
      {
        (route === 'home') ?
      (
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
      />
      </div>
      ) : (
            <div className="login-btn">
              <Login 
              image={image} 
              setImage={setImage} 
              handleRouteChange={handleRouteChange}
              name={name}
              setName={setName}
              />
            </div>
          )          
      }
    </div>
  );
}

export default App;
