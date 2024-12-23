import React, { useState } from 'react';

const TodoItem = ({ todo, toggleComplete, removeTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const handleEdit = () => {
        editTodo(todo.id, newText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewText(todo.text);
        setIsEditing(false);
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
            ) : (
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            )}
            {isEditing ? (
                <>
                    <button onClick={handleEdit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
    );
};

export default TodoItem;
