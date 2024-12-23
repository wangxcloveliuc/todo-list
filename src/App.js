import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import auth from './components/Auth';
import Login from './components/Login';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';
import TodoList from './components/TodoList';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (username, password) => {
    const loggedInUser = auth.login(username, password);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={auth.register} />} />
        <Route path="/change-password" element={<ChangePassword onChangePassword={auth.changePassword} />} />
        <Route path="/" element={user ? <TodoList onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
};

export default App;
