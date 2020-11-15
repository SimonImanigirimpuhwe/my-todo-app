import React from 'react';


const Form = ({inputValue, setTodoStatus, handleSubmit, setInputValue}) => {

     // handle text on input event change
    const handleText = (e) => {
        e.preventDefault();
        setInputValue(e.target.value)
    };
    
    // handle status change
    const handleStatus = (e) => {
        setTodoStatus(e.target.value)
    }

    return ( 
        <div className="container">
        <form>
            <input 
            value={inputValue} 
            onChange={handleText} 
            type="text" 
            placeholder="Enter todo" 
            />
            <button onClick={handleSubmit}><i className="fas fa-plus-square"></i></button>
            <div className="select">
                <select onChange={handleStatus}>
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
        </div>
     );
}
 
export default Form;
