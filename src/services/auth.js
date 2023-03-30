import React from 'react';
import { useContext, useState, createContext } from 'react';
import { deleteCookie, setCookie } from './utils';
import { loginRequest, getUserRequest, logoutRequest } from './api';

const AuthContext = createContext(undefined);

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const res = await getUserRequest();
    const data = res.json();
    if (data.success) {
      setUser({ ...data.user, id: data.user._id });
    }
    return data.success;
  };

  const signIn = async form => {
    const res = await loginRequest(form);
    let authToken;
    res.headers.forEach(header => {
      if (header.indexOf('Bearer') === 0) {
        authToken = header.split('Bearer ')[1];
      }
    });
    if (authToken) {
      setCookie('token', authToken);
    }
    const data = res.json();
    if (data.success) {
      setUser({ ...data.user, id: data.user._id });
    }
    return data;    
  };

  const signOut = async () => {
    await logoutRequest();
    setUser(null);
    deleteCookie('token');
  };

  return {
    user,
    getUser,
    signIn,
    signOut
  };
};