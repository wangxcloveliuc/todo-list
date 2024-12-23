import React, { useState } from 'react';
import './TodoItem.css';

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
        <div className="todo-item">
            <div className="todo-item-left">
                <input
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                />
                {!isEditing ? (
                    <label
                        htmlFor={`todo-${todo.id}`}
                        className={`todo-text ${todo.completed ? 'completed' : ''}`}
                    >
                        {todo.text}
                    </label>
                ) : (
                    <input
                        type="text"
                        className="todo-edit-input"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        onBlur={handleEdit}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEdit();
                            } else if (e.key === 'Escape') {
                                handleCancel();
                            }
                        }}
                        autoFocus
                    />
                )}
            </div>
            <div className="todo-actions">
                {!isEditing ? (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                ) : (
                    <button onClick={handleEdit}>Save</button>
                )}
                <button 
                    onClick={() => removeTodo(todo.id)}
                    aria-label={`Delete task: ${todo.text}`}
                    className="delete-button"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
