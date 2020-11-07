import React, {useEffect, useState} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoValue, setTodoValue] = useState([]);
  const [todoStatus, setTodoStatus] = useState("all");
  const [filteredTodo, setFilteredTodo] = useState([]);


  // hooks only once 
  useEffect(() => {
    handleGetTodo()
  }, [])
  
  // react hooks with use effect
  useEffect(() => {
    handleFilter()
    handleSave()
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
    setTodoValue([
      ...todoValue, 
     { 
      liText: inputValue,
      completed: false,
      id: ID()
    }
    ]);
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

  // save to local storage
  const handleSave = () => {
      localStorage.setItem('todoList', JSON.stringify(todoValue))
  };

  // get todo items from local storage
  const handleGetTodo = () => {
    if (localStorage.getItem('todoList') === null) {
      localStorage.setItem('todoList', JSON.stringify([]));
    } else {
      const savedTodo = JSON.parse(localStorage.getItem('todoList'))
      setTodoValue(savedTodo)
    }
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
      />
    </div>
  );
}

export default App;
