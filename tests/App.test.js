import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
    test('renders App correctly', () => {
        render(<App />);
        expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    });

    test('renders TodoList component', () => {
        render(<App />);
        expect(screen.getByText(/todo list/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    });

    test('initial state has no todos', () => {
        render(<App />);
        expect(screen.queryByText(/no todos/i)).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/add a new task/i);
        const addButton = screen.getByRole('button', { name: /add/i });
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(addButton);
        expect(screen.getByText(/new todo/i)).toBeInTheDocument();
    });
});
