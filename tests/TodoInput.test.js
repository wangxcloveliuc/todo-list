import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoInput from '../src/components/TodoInput';

describe('TodoInput Component', () => {
    test('renders TodoInput correctly', () => {
        render(<TodoInput addTodo={() => {}} />);
        const inputElement = screen.getByPlaceholderText(/add a new task/i);
        expect(inputElement).toBeInTheDocument();
    });
});
