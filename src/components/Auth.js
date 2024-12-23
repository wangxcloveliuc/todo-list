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
    return user || null;
  },

  changePassword: (username, oldPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === oldPassword);
    if (user) {
      user.password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Auth: Password changed for user:', username);
      return true;
    }
    return false;
  }
};

export default auth;
