import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App Component', () => {
    test('renders App correctly', () => {
        render(<App />);
        expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    });
});
