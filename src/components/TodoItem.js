import React, { useState, useEffect } from 'react';
import './TodoItem.css';
import Modal from './Modal';

const TodoItem = ({ todo, toggleComplete, removeTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeadlineModal, setShowDeadlineModal] = useState(false);

    const handleEdit = () => {
        editTodo(todo.id, newText);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewText(todo.text);
        setIsEditing(false);
    };

    useEffect(() => {
        if (todo.dueDate) {
            const currentTime = new Date();
            const dueDate = new Date(todo.dueDate);
            if (currentTime >= dueDate) {
                setShowDeadlineModal(true);
            }
        }
    }, [todo.dueDate]);

    return (
        <div className="todo-item">
            <Modal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    removeTodo(todo.id);
                    setShowDeleteModal(false);
                }}
                message="Are you sure you want to delete this task?"
            />
            <Modal
                isOpen={showDeadlineModal}
                onClose={() => setShowDeadlineModal(false)}
                onConfirm={() => setShowDeadlineModal(false)}
                message="The deadline for this task has been reached!"
            />
            <div className="todo-item-left">
                <div className="drag-handle" aria-label="Drag handle">
                    ☰
                </div>
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
                        {todo.dueDate && <div className="todo-due-date">Due: {todo.dueDate}</div>}
                        {todo.reminder && <div className="todo-reminder">Reminder: {todo.reminder}</div>}
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
                    <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
                ) : (
                    <button onClick={handleEdit} className="save-button">Save</button>
                )}
                <button 
                    onClick={() => setShowDeleteModal(true)}
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
