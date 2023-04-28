'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';
import userReducer from './userReducer';
import {
  HANDLE_CHANGE,
  CLEAR_FORM,
  SETUP_USER,
  CLEAR_USER,
} from '../actions.js';
import { useAppContext } from '../app/appContext';
import { auth } from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const UserContext = createContext();

const initialUserState = {
  email: '',
  password: '',
  confirmPassword: '',
  user: null,
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
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (result) {
        let username = email;
        const res = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ email, username }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch({ type: SETUP_USER, payload: data });
        displayAlert({
          type: 'success',
          msg: 'Your account has been created: welcome!',
        });
      }
      console.log('user', user);
      console.log('auth.currentUser', auth.currentUser);
    } catch (error) {
      alert(error);
      displayAlert({
        type: 'error',
        msg: 'Failed to register with email and password',
      });
    }
  };

  const connectWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;
      const username = user.displayName;
      const email = user.email;

      const metadata = auth.currentUser.metadata;
      if (
        metadata.getCreationTimestamp() == metadata.getLastSignInTimestamp()
      ) {
        await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ email, username }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch({ type: SETUP_USER, payload: data });
      } else {
        const res = await fetch('/api/user', {
          method: 'GET',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        dispatch({ type: SETUP_USER, payload: data });
      }
      displayAlert({
        type: 'success',
        msg: 'You are signed in!',
      });
    } catch (error) {
      displayAlert({
        type: 'error',
        msg: 'Failed to connect with Google',
      });
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const res = await fetch(`/api/user?email=${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('data', data);
      if (data) {
        dispatch({ type: SETUP_USER, payload: data });
        displayAlert({
          type: 'success',
          msg: 'You are signed in!',
        });
      } else {
        displayAlert({
          type: 'error',
          msg: 'Failed to signin with email and password',
        });
      }
    } catch (error) {
      alert(error);
      displayAlert({
        type: 'error',
        msg: 'Failed to signin with email and password',
      });
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      displayAlert({
        type: 'success',
        msg: 'Email to reset password successfully sent.',
      });
    } catch (err) {
      displayAlert({
        type: 'error',
        msg: 'Failed to to send reset password email',
      });
    }
  };

  const signOutUser = () => {
    signOut(auth);
    dispatch({ type: CLEAR_USER });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        handleChange,
        clearForm,
        registerUserWithEmail,
        connectWithGoogle,
        signInWithEmail,
        sendPasswordReset,
        signOutUser,
      }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
