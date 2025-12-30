/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { api } from '../api.js'

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }) => {
  // initialize from localStorage to avoid calling setState inside an effect
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      const saved = localStorage.getItem('user');
      return token && saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error(err);
      return null;
    }
  });

  const login = async (email, password) => {
    const { user: loggedUser } = await api.login(email, password);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
