import React from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import useLocalStorage from '../hooks/useLocalStorage';
import './TodoList.css'

const TodoList = () => {
    const [todos, setTodos] = useLocalStorage('todos', []);

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
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
