import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check for stored credentials on component mount
    const storedUser = localStorage.getItem('rememberedUser');
    if (storedUser) {
      const { username: savedUsername, password: savedPassword } = JSON.parse(storedUser);
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle remember me functionality
    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify({ username, password }));
    } else {
      localStorage.removeItem('rememberedUser');
    }

    onLogin(username, password);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">TODO List</h2>
        <input
          className="auth-input username-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="remember-me">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button className="auth-button" type="submit">Sign In</button>
        <div className="auth-links">
          <Link to="/register" className="auth-link">Create Account</Link>
          <Link to="/change-password" className="auth-link">Change Password</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;