import React from 'react';
import TodoList from './components/TodoList';

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>✓ TaskMaster</h1>
                <p className="app-subtitle">Organize your day, achieve more</p>
            </header>
            <main className="main-content">
                <TodoList />
            </main>
            <footer className="app-footer">
                <p>Made with ♥️ for productivity</p>
            </footer>
        </div>
    );
};

export default App;
