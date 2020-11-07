import React from 'react';
import Todo from './Todo';

const TodoList = ({todoValue}) => {
    return ( 
        <div className="todoContainer">
            <ul>
            {todoValue.map((todo) => (<Todo todo={todo} key={todo.id}/>))}
            </ul>        
        </div>
     );
}
 
export default TodoList;