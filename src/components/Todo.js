import React from 'react';
import db from '../config/firebase.config';

const Todo = ({ todo,todoValue, setTodoValue, setMessage, setErrMessage, setOpen, userUid }) => {

    // handle delete
    const handleDelete = async(e) => {
        e.preventDefault();
        e.stopPropagation()

        const docRef =db
        .firestore()
        .collection('todos')
        .where('authorId', '==', `${userUid}`);

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
                .then(() => {
                    setOpen(true)
                    setMessage('Todo item deleted successfully')
                })
                .catch(err => {
                    setOpen(true)
                    setErrMessage('something went wrong!', err.message)
                }) 
            ))
        })
        .catch((err) => {
            setOpen(true)
            setErrMessage('Delete error!', err.message)
        })

        setTodoValue(todoValue.filter((el) => el.id !== todo.id))
};

    // handle completed todo
    const handleCompleted = async() => {
        setTodoValue(todoValue.map(el => {
            if (el.id === todo.id) {
                const docRef =db
                .firestore()
                .collection('todos')
                .where('authorId', '==', `${userUid}`);
        
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
                        .then(() => {
                            setOpen(true)
                            setMessage('Todo item toggled')
                        })
                        .catch(err => {
                            setOpen(true)
                            setErrMessage('something went wrong!', err.message)
                        }) 
                    ))
                })
                .catch((err) => {
                    setOpen(true)
                    setErrMessage('Toggle error', err.message)
                })
        
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