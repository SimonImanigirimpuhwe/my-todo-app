import React, {useState} from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoValue, setTodoValue] = useState([]);

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
  return (
    <div className="container">
      <h1>My todo's list</h1>
      <Form inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} handleText={handleText}/>
      <TodoList todoValue={todoValue}/>
    </div>
  );
}

export default App;
