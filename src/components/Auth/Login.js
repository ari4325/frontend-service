import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../login.css';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  const [user, setUser] = useState({ username: '', password: '' });

  const navigate = useNavigate();

  const { username, password } = user;

  const onChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    navigate('/');
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
