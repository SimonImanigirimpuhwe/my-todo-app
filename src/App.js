import React, {useState} from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  const [inputValue, setInputValue] = useState("");
  const handleText = (e) => {
    e.preventDefault();
    // console.log(e.target.value)
    setInputValue(e.target.value)
  }
  return (
    <div className="container">
      <h1>My todo's list {inputValue}</h1>
      <Form handleText={handleText}/>
    </div>
  );
}

export default App;
