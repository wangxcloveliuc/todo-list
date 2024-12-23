import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
    test('renders TodoList correctly', () => {
        render(<TodoList />);
        const inputElement = screen.getByPlaceholderText(/add a new task/i);
        expect(inputElement).toBeInTheDocument();
    });
});
