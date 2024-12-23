import React, { useState, useRef, useEffect } from 'react';
import './TodoInput.css';

const TodoInput = ({ addTodo }) => {
    const [inputValue, setInputValue] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [reminder, setReminder] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue.trim(), dueDate, reminder, category, tags.split(',').map(tag => tag.trim()));
            setInputValue('');
            setDueDate('');
            setReminder('');
            setCategory('');
            setTags('');
            inputRef.current.focus();
        }
    };

    const handleClear = () => {
        setInputValue('');
        setCategory('');
        setTags('');
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

    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="todo-input-form" role='search'>
            <div className="todo-input-basic">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Add a new task..."
                    ref={inputRef}
                    className="todo-input-field"
                />
                <button type="button" onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}>
                    {showAdvancedOptions ? 'Less' : 'More'}
                </button>
            </div>

            {showAdvancedOptions && (
                <div className="todo-input-advanced">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="todo-input-date"
                        placeholder="Due Date"
                    />
                    <input
                        type="time"
                        value={reminder}
                        onChange={(e) => setReminder(e.target.value)}
                        className="todo-input-time"
                        placeholder="Reminder"
                    />
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="todo-input-category"
                        placeholder="Category"
                    />
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="todo-input-tags"
                        placeholder="Tags (comma separated)"
                    />
                </div>
            )}
            
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
