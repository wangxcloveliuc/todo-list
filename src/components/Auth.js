import { useState } from 'react';

const Auth = () => {
  const [user, setUser] = useState(null);

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setUser(user);
      return true;
    }
    return false;
  };

  const changePassword = (username, oldPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === oldPassword);
    if (user) {
      user.password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  };

  return { user, register, login, changePassword };
};

export default Auth;
