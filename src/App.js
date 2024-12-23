import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import auth from './components/Auth';
import Login from './components/Login';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';
import TodoList from './components/TodoList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const handleRegister = (username, password) => {
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    auth.register(username, password);
    toast.success('Registration successful! Please login.');
    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/change-password" element={<ChangePassword onChangePassword={auth.changePassword} />} />
          <Route path="/" element={user ? <TodoList user = {user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;