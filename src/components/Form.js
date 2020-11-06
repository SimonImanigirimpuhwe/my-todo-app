import React from 'react';

const Form = ({handleText}) => {
    return ( 
        <form>
            <input onChange={handleText} type="text" placeholder="Enter todo" />
            <div className="select">
                <select>
                    <option value="All">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
     );
}
 
export default Form;