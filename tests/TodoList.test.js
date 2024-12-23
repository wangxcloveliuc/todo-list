import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../src/components/TodoList';

describe('TodoList Component', () => {
    test('renders TodoList correctly', () => {
        render(<TodoList />);
        const inputElement = screen.getByPlaceholderText(/add a new task/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('renders todo items correctly', () => {
        const todos = [{ id: 1, text: 'Test Todo', completed: false }];
        render(<TodoList todos={todos} toggleComplete={() => {}} removeTodo={() => {}} />);
        expect(screen.getByText(/test todo/i)).toBeInTheDocument();
    });

    test('calls toggleComplete when checkbox is clicked', () => {
        const toggleCompleteMock = jest.fn();
        const todos = [{ id: 1, text: 'Test Todo', completed: false }];
        render(<TodoList todos={todos} toggleComplete={toggleCompleteMock} removeTodo={() => {}} />);
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(toggleCompleteMock).toHaveBeenCalledWith(1);
    });

    test('calls removeTodo when remove button is clicked', () => {
        const removeTodoMock = jest.fn();
        const todos = [{ id: 1, text: 'Test Todo', completed: false }];
        render(<TodoList todos={todos} toggleComplete={() => {}} removeTodo={removeTodoMock} />);
        const removeButton = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeButton);
        expect(removeTodoMock).toHaveBeenCalledWith(1);
    });
});
