'use client';

import { createContext, useContext, useReducer } from 'react';
import userReducer from './userReducer';
import { HANDLE_CHANGE, CLEAR_FORM } from '../actions.js';
import signUpWithEmail from '@/firebase/signup';
import { useAppContext } from '../app/appContext';
import { signInWithGoogle } from '@/firebase/signin';
import { auth } from '@/firebase/config';

const UserContext = createContext();

const initialUserState = {
  email: '',
  password: '',
  confirmPassword: '',
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const { displayAlert } = useAppContext();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearForm = () => {
    dispatch({ type: CLEAR_FORM });
  };

  const registerUserWithEmail = async (email, password) => {
    try {
      const result = await signUpWithEmail(email, password);

      if (result) {
        await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      displayAlert({
        type: 'error',
        msg: 'Failed to register with email and password',
      });
    }
  };

  const connectWithGoogle = async () => {
    try {
      await signInWithGoogle();
      const user = auth.currentUser;
      const username = user.displayName;
      const email = user.email;

      if (user) {
        await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ email, username }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      displayAlert({
        type: 'error',
        msg: 'Failed to connect with Google',
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleChange,
        clearForm,
        registerUserWithEmail,
        connectWithGoogle,
      }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
