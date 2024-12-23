import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
    test('renders App correctly', () => {
        render(<App />);
        expect(screen.getByText(/Add your first task to get started/i)).toBeInTheDocument();
    });

    test('renders TodoList component', () => {
        render(<App />);
        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    });

    test('initial state shows empty state', () => {
        render(<App />);
        expect(screen.getByText(/no tasks yet!/i)).toBeInTheDocument();
    });

    test('adds a new todo', () => {
        render(<App />);
        const input = screen.getByPlaceholderText(/add a new task/i);
        const form = screen.getByRole('search');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.submit(form);
        expect(screen.getByText(/new todo/i)).toBeInTheDocument();
    });
});