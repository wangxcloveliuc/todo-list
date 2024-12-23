import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import useLocalStorage from '../hooks/useLocalStorage';
import './TodoList.css'
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = () => {
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');

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
        </div>
    );

    const EmptyState = () => (
        <div className="empty-state">
            {/* <img src="/empty-state.svg" alt="No tasks yet" /> */}
            <h3>No tasks yet!</h3>
            <p>Add your first task to get started</p>
        </div>
    );

    const addTodo = (text, dueDate, reminder) => {
        const newTodos = [...todos, { id: Date.now(), text, completed: false, dueDate, reminder }];
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

        const items = Array.from(todos);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setTimeout(() => {
            setTodos(items);
        }, 0);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div>
                <TodoInput addTodo={addTodo} />
                <FilterBar />
                <Droppable droppableId="droppable-todos" mode="standard" type="DEFAULT">
                    {(provided) => (
                        <div 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            style={{ minHeight: '100px' }}
                        >
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
                                    .map((todo, index) => (
                                        <Draggable key={`${todo.id}-${index}`} draggableId={String(todo.id)} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <TodoItem
                                                        todo={todo}
                                                        toggleComplete={toggleComplete}
                                                        removeTodo={removeTodo}
                                                        editTodo={editTodo}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default TodoList;
