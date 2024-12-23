import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoInput from '../components/TodoInput';

describe('TodoInput Component', () => {
    test('renders TodoInput correctly', () => {
        render(<TodoInput addTodo={() => {}} />);
        const inputElement = screen.getByPlaceholderText(/add a new task/i);
        expect(inputElement).toBeInTheDocument();
    });

    test('calls addTodo with correct input on submit', () => {
        const addTodoMock = jest.fn();
        render(<TodoInput addTodo={addTodoMock} />);
        const input = screen.getByPlaceholderText(/add a new task/i);
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.submit(screen.getByRole('search'));
        expect(addTodoMock).toHaveBeenCalledWith('New Todo');
    });

    test('does not call addTodo when input is empty', () => {
        const addTodoMock = jest.fn();
        render(<TodoInput addTodo={addTodoMock} />);
        fireEvent.submit(screen.getByRole('search'));
        expect(addTodoMock).not.toHaveBeenCalled();
    });
});
