import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth';
import Login from './components/Login';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';
import TodoList from './components/TodoList';

const App = () => {
  const [user, setUser] = useState(null);
  const auth = Auth();

  const handleLogin = (username, password) => {
    if (auth.login(username, password)) {
      setUser(username);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login onLogin={handleLogin} />
        </Route>
        <Route path="/register">
          <Register onRegister={auth.register} />
        </Route>
        <Route path="/change-password">
          <ChangePassword onChangePassword={auth.changePassword} />
        </Route>
        <Route path="/">
          {user ? <TodoList onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
