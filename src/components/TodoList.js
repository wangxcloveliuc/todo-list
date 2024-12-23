import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import useLocalStorage from '../hooks/useLocalStorage';
import './TodoList.css'
import { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const FilterBar = () => (
        <div className="filter-bar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Tasks</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Date Added</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="priority">Priority</option>
            </select>
        </div>
    );

    const EmptyState = () => (
        <div className="empty-state">
            <img src="/empty-state.svg" alt="No tasks yet" />
            <h3>No tasks yet!</h3>
            <p>Add your first task to get started</p>
        </div>
    );

    const addTodo = (text) => {
        const newTodos = [...todos, { id: Date.now(), text, completed: false }];
        setTodos(newTodos);
    };

    const toggleComplete = (id) => {
        const newTodos = todos.map((todo) => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    const removeTodo = (id) => {
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };

    const editTodo = (id, newText) => {
        const newTodos = todos.map((todo) => 
            todo.id === id ? { ...todo, text: newText } : todo
        );
        setTodos(newTodos);
    };
    return (
        <div>
            <TodoInput addTodo={addTodo} />
            <FilterBar />
            {todos.length === 0 ? (
                <EmptyState />
            ) : (
                todos
                    .filter(todo => {
                        switch(filter) {
                            case 'active':
                                return !todo.completed;
                            case 'completed':
                                return todo.completed;
                            case 'all':
                            default:
                                return true;
                        }
                    })
                    .sort((a, b) => {
                        if (sortBy === 'alphabetical') return a.text.localeCompare(b.text);
                        if (sortBy === 'priority') return b.priority - a.priority;
                        return b.id - a.id;
                    })
                    .map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleComplete={toggleComplete}
                            removeTodo={removeTodo}
                            editTodo={editTodo}
                        />
                    ))
            )}
        </div>
    );
};


export default TodoList;
