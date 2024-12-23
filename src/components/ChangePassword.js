import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangePassword = ({ onChangePassword }) => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleNewPasswordChange = (e) => {
    const newPass = e.target.value;
    setNewPassword(newPass);
    checkPasswordStrength(newPass);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(username, oldPassword, newPassword);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Change Password</h2>
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
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          className="auth-input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <div className="password-strength">
          <div className={`strength-bar strength-${passwordStrength}`}>
            <div className="strength-level" style={{ width: `${passwordStrength * 25}%` }}></div>
          </div>
          <span className="strength-text">
            {passwordStrength === 0 && 'Very Weak'}
            {passwordStrength === 1 && 'Weak'}
            {passwordStrength === 2 && 'Medium'}
            {passwordStrength === 3 && 'Strong'}
            {passwordStrength === 4 && 'Very Strong'}
          </span>
        </div>
        <button className="auth-button" type="submit">Update Password</button>
        <div className="auth-links">
          <Link to="/" className="auth-link">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
