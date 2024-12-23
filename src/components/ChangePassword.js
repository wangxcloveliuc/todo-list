import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChangePassword = ({ onChangePassword }) => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onChangePassword(username, oldPassword, newPassword);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Change Password</h2>
        <input
          className="auth-input"
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
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="auth-button" type="submit">Update Password</button>
        <div className="auth-links">
          <Link to="/login" className="auth-link">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;