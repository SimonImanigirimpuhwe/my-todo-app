import React from 'react';

const Todo = ({todo}) => {
    return ( 
        <div className="todo">         
            <li>{todo.liText}</li>
            <button className="check"><i className="fa fa-check"></i></button>
            <button className="trash"><i className="fa fa-trash"></i></button>
        </div>
     );
}
 
export default Todo;