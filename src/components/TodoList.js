import React, { useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import useLocalStorage from '../hooks/useLocalStorage';

const TodoList = () => {
    const [todos, setTodos] = useLocalStorage('todos', []);

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

    return (
        <div>
            <TodoInput addTodo={addTodo} />
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                />
            ))}
        </div>
    );
};

export default TodoList;
