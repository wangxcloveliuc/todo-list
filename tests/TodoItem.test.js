import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoItem from '../src/components/TodoItem';

describe('TodoItem Component', () => {
    const todo = { id: 1, text: 'Test Todo', completed: false };

    test('renders TodoItem correctly', () => {
        render(<TodoItem todo={todo} toggleComplete={() => {}} removeTodo={() => {}} />);
        expect(screen.getByText(/test todo/i)).toBeInTheDocument();
    });
});
