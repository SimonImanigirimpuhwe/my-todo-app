import React from 'react';
import db from '../config/firebase.config';

const Todo = ({ todo,todoValue, setTodoValue }) => {
    
    // handle delete
    const handleDelete = async(e) => {
        e.preventDefault();
        e.stopPropagation()
        const docRef =db
        .firestore()
        .collection('todos');

      await docRef
        .where('id', '==', `${todo.id}`)
        .get()
        .then((result) => {
            result.docs.map(item => (
                db
                .firestore()
                .collection('todos')
                .doc(item.id)
                .delete()
                .then(() => alert('Todo item deleted'))
                .catch(err => alert('something went wrong!', err.message)) 
            ))
        })
        .catch((err) => console.log('delete Error', err))

        setTodoValue(todoValue.filter((el) => el.id !== todo.id))
    };

    // handle completed todo
    const handleCompleted = async() => {
        setTodoValue(todoValue.map(el => {
            if (el.id === todo.id) {
                const docRef =db
                .firestore()
                .collection('todos');
        
              docRef
                .where('id', '==', `${todo.id}`)
                .get()
                .then((result) => {
                    result.docs.map(item => (
                        db
                        .firestore()
                        .collection('todos')
                        .doc(item.id)
                        .set({
                            completed: !el.completed
                        }, {merge: true})
                        .then(() => alert('Todo item toggled'))
                        .catch(err => alert('something went wrong!', err.message)) 
                    ))
                })
                .catch((err) => console.log('delete Error', err))
        
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