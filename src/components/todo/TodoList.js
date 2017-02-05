import React from 'react';
import {TodoItem} from "./TodoItem";

export const TodoList = (props) => {
    return (    
        <div className="Todo-List">
        <ul>
        {props.todos.map(todo => <TodoItem handleToggle={props.handleToggle} 
        key={todo.id} {...todo} handleRemove={props.handleRemove} />)}
        </ul>
       </div>   
    )
}

TodoList.PropTypes = {
    todos: React.PropTypes.array.isRequired
}