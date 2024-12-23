import React, { useState, useRef, useEffect } from 'react';
import './TodoInput.css';

const TodoInput = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue.trim());
            setInputValue('');
            inputRef.current.focus();
        }
    };

    const handleClear = () => {
        setInputValue('');
        inputRef.current.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSubmit(e);
        }
    };

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="todo-input-form" role='search'>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new task..."
                ref={inputRef}
                className="todo-input-field"
            />
            <button type="submit" className="todo-add-button" aria-label="Add new task">
                Add
            </button>
            {inputValue && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="todo-clear-button"
                    aria-label="Clear input"
                >
                    Clear
                </button>
            )}
        </form>
    );
};

export default TodoInput;
