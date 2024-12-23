const auth = {
  register: (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Auth: User registered:', username);
  },

  login: (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    console.log('Auth: User logged in:', username);
    console.log('Auth: User logged in:', password);
    console.log('Auth: User logged in:', user);
    return user || null;
  },

  changePassword: (username, oldPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.username === username && u.password === oldPassword);
    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Auth: Password changed for user:', username);
      return true;
    }
    return false;
  },

  getUserTodos: (username) => {
    const userKey = `${username}-todos`;
    return JSON.parse(localStorage.getItem(userKey)) || [];
  }
};

export default auth;
