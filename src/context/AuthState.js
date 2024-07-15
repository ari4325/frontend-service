import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

const AuthState = (props) => {
  const initialState = { token: localStorage.getItem('token'), isAuthenticated: null, loading: true, user: null, error: null };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = async (formData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, formData);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };

  const login = async (formData) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData);
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };

  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider value={{ token: state.token, isAuthenticated: state.isAuthenticated, loading: state.loading, user: state.user, error: state.error, signup, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
