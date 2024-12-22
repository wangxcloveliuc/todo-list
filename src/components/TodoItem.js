import React from 'react';

const TodoItem = ({ todo, toggleComplete, removeTodo }) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
    );
};

export default TodoItem;
