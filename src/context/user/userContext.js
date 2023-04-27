'use client';

import { createContext, useContext, useReducer } from 'react';
import userReducer from './userReducer';
import { HANDLE_CHANGE, CLEAR_FORM } from '../actions.js';

const UserContext = createContext();

const initialUserState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearForm = () => {
    dispatch({ type: CLEAR_FORM });
  };

  return (
    <UserContext.Provider value={{ ...state, handleChange, clearForm }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
