import React from 'react';
import TodoList from './components/TodoList';

const App = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo-container">
                    <img src="/logo.svg" alt="TaskMaster Logo" />
                    <h1>✓ TaskMaster Pro</h1>
                </div>
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
