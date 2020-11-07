import React from 'react';

const Todo = ({ todo,todoValue, setTodoValue }) => {
    
    // handle delete
    const handleDelete = (e) => {
        e.preventDefault();
        setTodoValue(todoValue.filter((el) => el.id !== todo.id))
    };

    return ( 
        <div className="todo">         
            <li>{todo.liText}</li>
            <button className="check"><i className="fa fa-check"></i></button>
            <button onClick={handleDelete} className="trash"><i className="fa fa-trash"></i></button>
        </div>
     );
}
 
export default Todo;