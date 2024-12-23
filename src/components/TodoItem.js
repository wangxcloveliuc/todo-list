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
                    <button onClick={handleEdit} title="Save changes to this task" aria-label="Save task">Save</button>
                    <button onClick={handleCancel} title="Cancel editing this task" aria-label="Cancel editing">Cancel</button>
                </>
            ) : (
                <button onClick={() => setIsEditing(true)} title="Edit this task" aria-label="Edit task">Edit Task</button>
            )}
            <button onClick={() => {
                if (window.confirm('Are you sure you want to delete this task?')) {
                    removeTodo(todo.id);
                }
            }} title="Permanently delete this task" aria-label="Delete task">Delete</button>
        </div>
    );
};

export default TodoItem;
