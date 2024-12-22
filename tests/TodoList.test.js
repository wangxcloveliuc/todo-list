import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoList from '../src/components/TodoList';

describe('TodoList Component', () => {
    test('renders TodoList correctly', () => {
        render(<TodoList />);
        const inputElement = screen.getByPlaceholderText(/add a new task/i);
        expect(inputElement).toBeInTheDocument();
    });
});
