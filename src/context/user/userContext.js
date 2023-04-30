'use client';

import { createContext, useContext, useReducer } from 'react';
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

import { useRouter } from 'next/navigation';

const UserContext = createContext();

const user = localStorage.getItem('user');

const initialUserState = {
  email: '',
  password: '',
  confirmPassword: '',
  user: user ? JSON.parse(user) : null,
};

const UserProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  const { displayAlert } = useAppContext();

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

  const navigate = (path) => {
    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

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
        addUserToLocalStorage(data);
        displayAlert({
          type: 'success',
          msg: 'Your account has been created: welcome!',
        });
        navigate('/');
      }
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
        addUserToLocalStorage(data);
        navigate('/');
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
      const result = await signInWithEmailAndPassword(auth, email, password);
      if (result) {
        const res = await fetch(`/api/user?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (data) {
          dispatch({ type: SETUP_USER, payload: data });
          addUserToLocalStorage(data);
          displayAlert({
            type: 'success',
            msg: 'You are signed in!',
          });
          navigate('/');
        } else {
          displayAlert({
            type: 'error',
            msg: 'Failed to signin with email and password',
          });
        }
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
      navigate('/signin');
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
    removeUserFromLocalStorage();
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
