import React from 'react';

const Todo = ({ todo,todoValue, setTodoValue }) => {
    
    // handle delete
    const handleDelete = (e) => {
        e.preventDefault();
        setTodoValue(todoValue.filter((el) => el.id !== todo.id))
    };

    // handle completed todo
    const handleCompleted = () => {
        setTodoValue(todoValue.map(el => {
            if (el.id === todo.id) {
                return {
                    ...el,
                    completed: !el.completed
                };
            }
            return el;
        }));
    }; 

    return ( 
        <div className="todo">         
            <li 
            className={(todo.completed === true) ? 'checked' : ''}>
                {todo.liText}
            </li>
            
            <button 
            onClick={handleCompleted} 
            className="check">
                <i className="fa fa-check"></i>
            </button>

            <button 
            onClick={handleDelete} 
            className="trash">
                <i className="fa fa-trash"></i>
            </button>
        </div>
     );
}
 
export default Todo;