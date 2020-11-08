import React from 'react';
import Todo from './Todo';

const TodoList = ({todoValue, handleDelete, setTodoValue, filteredTodo}) => {
    return ( 
        <div className="todoContainer">
            <ul>
            {filteredTodo.map((todo) => (
            <Todo 
            todo={todo} 
            key={todo.id} 
            handleDelete={handleDelete}
            setTodoValue={setTodoValue}
            todoValue={todoValue}
            />
            ))}
            </ul>        
        </div>
     );
}
 
export default TodoList;