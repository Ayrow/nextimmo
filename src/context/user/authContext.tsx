'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
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
import { useAppContext } from '../app/appContext';
import { ObjectId } from 'mongoose';

type userFromDB = {
  _id: ObjectId;
  username: string;
  email: string;
  saved: [ObjectId];
  role: string;
};

type AuthContextType = {
  user: userFromDB;
  firebaseUser: User;
  signInWithEmail: (email: string, password: string) => void;
  registerUserWithEmail: (email: string, password: string) => void;
  connectWithGoogle: () => void;
  sendPasswordReset: (email: string) => void;
  signOutUser: () => void;
};

const AuthContext = createContext<AuthContextType>(null);

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<userFromDB>(null);
  const [firebaseUser, setFirebaseUser] = useState<User>(null);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setFirebaseUser(authUser);
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
    });
    return () => unregisterAuthObserver();
  }, []);

  const { displayAlert } = useAppContext();

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

  const sendPasswordReset = async (email: string) => {
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
    router.push('/');
    signOut(auth);
    setUser(null);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
