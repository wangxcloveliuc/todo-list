import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import useLocalStorage from '../hooks/useLocalStorage';
import './TodoList.css';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = ({ user, onLogout }) => {
    const [todos, setTodos] = useLocalStorage('todos', [], user.username);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const uniqueCategories = [...new Set(todos.map(todo => todo.category).filter(Boolean))];

    const FilterBar = () => (
        <div className="filter-bar" role="toolbar" aria-label="Task filter options">
            <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                aria-label="Filter tasks"
            >
                <option value="all">📋 All Tasks</option>
                <option value="active">🔵 Active</option>
                <option value="completed">✅ Completed</option>
            </select>
            <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort tasks"
            >
                <option value="date">⏱️ Date Added</option>
                <option value="alphabetical">📝 Alphabetical</option>
                <option value="priority">🔥 Priority</option>
            </select>
            <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                aria-label="Filter by category"
            >
                <option value="all">📁 All Categories</option>
                {uniqueCategories.map(category => (
                    <option key={category} value={category}>🗂️ {category}</option>
                ))}
            </select>
        </div>
    );
    const EmptyState = () => (
        <div className="empty-state">
            <h3>No tasks yet!</h3>
            <p>Add your first task to get started</p>
        </div>
    );

    const addTodo = (text, dueDate, reminder, category, tags) => {
        const newTodos = [...todos, { id: String(Date.now()), text, completed: false, dueDate, reminder, category, tags }];
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

    const handleDragEnd = (result) => {
        if (!result.destination) return;
        
        const reorderedTodos = Array.from(todos);
        const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
        reorderedTodos.splice(result.destination.index, 0, movedTodo);
        
        setTodos(reorderedTodos);
    };      

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h2>{user.username}'s Todo List</h2>
                <button 
                    className="logout-button"
                    onClick={onLogout}
                >
                    🚪 Logout
                </button>
            </div>
            <TodoInput addTodo={addTodo} />
            <FilterBar />
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="todo-list-droppable">
                    {(provided) => (
                        <ul
                            className="todo-items-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {todos.length === 0 ? (
                                <li style={{ listStyle: 'none' }}> </li>
                            ) : (
                                todos
                                    .filter(todo => {
                                        if (categoryFilter !== 'all' && todo.category !== categoryFilter) return false;
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
                                    .map((todo, index) => (
                                        <Draggable key={todo.id} draggableId={todo.id} index={index}>
                                        {(provided) => (
                                            <TodoItem
                                            todo={todo}
                                            provided={provided}
                                            toggleComplete={toggleComplete}
                                            removeTodo={removeTodo}
                                            editTodo={editTodo}
                                            />
                                        )}
                                        </Draggable>
                                    ))
                            )}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            {todos.length === 0 && <EmptyState />}
        </div>
    );
};

export default TodoList;