import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import AuthState from '../src/context/AuthState';
import Login from '../src/components/Auth/Login';
import Signup from '../src/components/Auth/Signup';
import Lists from '../src/components/Lists/Lists';
import List from '../src/components/Lists/List';
import Search from '../src/components/Search/Search';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthState>
        <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Search />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="/lists/:id" element={<List />} />
              </Route>
          </Routes>
        </BrowserRouter>
    </AuthState>
  );
};

export default App;
