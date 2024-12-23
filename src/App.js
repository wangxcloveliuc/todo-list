import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo-container">
                    {/* <img src="/logo.svg" alt="TaskMaster Logo" className="app-logo" /> */}
                    <h1>✓ TaskMaster Pro</h1>
                </div>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {isDarkMode ? '☀️' : '🌙'}
                </button>
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