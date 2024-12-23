import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoItem from '../src/components/TodoItem';

describe('TodoItem Component', () => {
    const todo = { id: 1, text: 'Test Todo', completed: false };

    test('renders TodoItem correctly', () => {
        render(<TodoItem todo={todo} toggleComplete={() => {}} removeTodo={() => {}} />);
        expect(screen.getByText(/test todo/i)).toBeInTheDocument();
    });

    test('calls toggleComplete when checkbox is clicked', () => {
        const toggleCompleteMock = jest.fn();
        render(<TodoItem todo={todo} toggleComplete={toggleCompleteMock} removeTodo={() => {}} />);
        const checkbox = screen.getByRole('checkbox');
        checkbox.click();
        expect(toggleCompleteMock).toHaveBeenCalledWith(todo.id);
    });

    test('calls removeTodo when remove button is clicked', () => {
        const removeTodoMock = jest.fn();
        render(<TodoItem todo={todo} toggleComplete={() => {}} removeTodo={removeTodoMock} />);
        const removeButton = screen.getByRole('button', { name: /remove/i });
        removeButton.click();
        expect(removeTodoMock).toHaveBeenCalledWith(todo.id);
    });

    test('renders completed todo with strikethrough', () => {
        const completedTodo = { ...todo, completed: true };
        render(<TodoItem todo={completedTodo} toggleComplete={() => {}} removeTodo={() => {}} />);
        expect(screen.getByText(/test todo/i)).toHaveStyle('text-decoration: line-through');
    });

    test('renders empty todo correctly', () => {
        const emptyTodo = { id: 2, text: '', completed: false };
        render(<TodoItem todo={emptyTodo} toggleComplete={() => {}} removeTodo={() => {}} />);
        expect(screen.getByText(/empty todo/i)).toBeInTheDocument();
    });
});
