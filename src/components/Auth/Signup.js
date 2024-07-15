import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../../login.css";

const Signup = (props) => {
  const authContext = useContext(AuthContext);
  const { signup } = authContext;

  const [user, setUser] = useState({ username: '', password: '' });

  const navigate = useNavigate();

  const { username, password } = user;

  const onChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup({ username, password });
    navigate('/login');
  };

  return (
    <div className='login-container'>
      <h1>Signup</h1>
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
        <button type="submit" className="login-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
