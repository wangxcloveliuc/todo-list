import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import google_icon from '../assets/google-icon.svg';
import github_icon from '../assets/github-icon.svg';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Add validation state
  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(username, password);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create Account</h2>
        <input
          className="auth-input username-input"
          type="text"
          placeholder="Choose Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Choose Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.username && <span className="error-message">{errors.username}</span>}
        {errors.password && <span className="error-message">{errors.password}</span>}
        <button className="auth-button" type="submit">Sign Up</button>
        <div className="auth-links">
          <Link to="/" className="auth-link">Already have an account?</Link>
        </div>
        <div className="social-auth-divider">
            <span>or continue with</span>
        </div>
        <div className="social-auth">
            <button className="social-btn google">
                <img src={google_icon} alt="Google" />
                Sign up with Google
            </button>
            <button className="social-btn github">
                <img src={github_icon} alt="GitHub" />
                Sign up with GitHub
            </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
