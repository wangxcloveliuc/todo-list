import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../components/TodoItem';

test('shows modal when deadline is reached', () => {
    const todo = {
        id: 1,
        text: 'Test Task',
        completed: false,
        dueDate: new Date().toISOString(), // Set the dueDate to the current time
    };
    const toggleComplete = jest.fn();
    const removeTodo = jest.fn();
    const editTodo = jest.fn();

    render(
        <TodoItem
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            editTodo={editTodo}
        />
    );

    // Check if the modal is shown
    const modalMessage = screen.getByText('The deadline for this task has been reached!');
    expect(modalMessage).toBeInTheDocument();
});
