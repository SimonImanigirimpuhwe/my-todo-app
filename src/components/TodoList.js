import React from 'react';
import Todo from './Todo';

const TodoList = ({todoValue, setTodoValue}) => {
    return ( 
        <div className="todoContainer">
            <ul>
            {todoValue.map((todo) => (
            <Todo 
            todo={todo} 
            key={todo.id} 
            todoValue={todoValue}
            setTodoValue={setTodoValue}
            />
            ))}
            </ul>        
        </div>
     );
}
 
export default TodoList;