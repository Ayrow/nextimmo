'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, deleteUser, getAuth } from 'firebase/auth';
import { auth } from '../../firebase/config';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ColorTypes, useAppContext } from '../app/appContext';
import { ObjectId } from 'mongoose';

export type UserFromDB = {
  _id: ObjectId;
  username: string;
  email: string;
  saved: [ObjectId];
  role: string;
};

type AuthContextType = {
  user: UserFromDB;
  firebaseUser: User;
  signInWithEmail: (email: string, password: string) => void;
  registerUserWithEmail: (email: string, password: string) => void;
  connectWithGoogle: () => void;
  sendPasswordReset: (email: string) => void;
  deleteUserFromFirebase: () => void;
  signOutUser: () => void;
};

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider = ({ children }) => {
  const { actions } = useAppContext();
  const { displayAlert } = actions;
  const userSession =
    typeof window != 'undefined'
      ? window.sessionStorage.getItem('storedUser')
      : null;
  const storedUser = userSession ? JSON.parse(userSession) : null;

  const router = useRouter();
  const [user, setUser] = useState<UserFromDB>(storedUser);
  const [firebaseUser, setFirebaseUser] = useState<User>(null);

  const addUserToSessionStorage = (user: UserFromDB) => {
    sessionStorage.setItem('storedUser', JSON.stringify(user));
  };

  const removeUserFromSessionStorage = () => {
    sessionStorage.removeItem('storedUser');
  };

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        console.log('user is signed in');
        setFirebaseUser(authUser);
      } else {
        console.log('user is signed out');
        setFirebaseUser(null);
        setUser(null);
        removeUserFromSessionStorage();
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  const navigate = (path: string) => {
    setTimeout(() => {
      router.push(path);
    }, 1500);
  };

  const registerUserWithEmail = async (email: string, password: string) => {
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
        setUser(data);
        addUserToSessionStorage(data);
        displayAlert({
          type: ColorTypes.Success,
          msg: 'Your account has been created: welcome!',
        });
        navigate('/');
      }
    } catch (error) {
      displayAlert({
        type: ColorTypes.Error,
        msg: 'Failed to register with email and password',
      });
    }
  };

  const connectWithGoogle = async () => {
    try {
      const googleProvider = new GoogleAuthProvider();
      await signInWithPopup(auth, googleProvider);
      const user = auth.currentUser;
      const username = user.displayName;
      const email = user.email;

      const metadata = auth.currentUser.metadata;
      console.log('metadata', metadata);
      if (metadata?.creationTime == metadata.lastSignInTime) {
        const res = await fetch('/api/user', {
          method: 'POST',
          body: JSON.stringify({ email, username }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setUser(data);
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
        setUser(data);
        addUserToSessionStorage(data);
      }
      displayAlert({
        type: ColorTypes.Success,
        msg: 'You are signed in!',
      });
    } catch (error) {
      displayAlert({
        type: ColorTypes.Error,
        msg: 'Failed to connect with Google',
      });
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
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
          setUser(data);
          addUserToSessionStorage(data);
          displayAlert({
            type: ColorTypes.Success,
            msg: 'You are signed in!',
          });
          navigate('/');
        } else {
          displayAlert({
            type: ColorTypes.Error,
            msg: 'Failed to signin with email and password',
          });
        }
      }
    } catch (error) {
      displayAlert({
        type: ColorTypes.Error,
        msg: 'Failed to signin with email and password',
      });
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      displayAlert({
        type: ColorTypes.Success,
        msg: 'Email to reset password successfully sent.',
      });
      navigate('/signin');
    } catch (err) {
      displayAlert({
        type: ColorTypes.Error,
        msg: 'Failed to to send reset password email',
      });
    }
  };

  const signOutUser = () => {
    router.push('/');
    signOut(auth);
    setUser(null);
    removeUserFromSessionStorage();
  };

  const deleteUserFromFirebase = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    deleteUser(user);
    signOutUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        registerUserWithEmail,
        sendPasswordReset,
        signOutUser,
        signInWithEmail,
        connectWithGoogle,
        deleteUserFromFirebase,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
