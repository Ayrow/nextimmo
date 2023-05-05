'use client';

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from '../../firebase/config';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

// import { useRouter } from 'next/navigation';

// type User = auth.User || null;

{
  /* 
  
  const initialUserState: IAuthState = {
  email: '',
  password: '',
  confirmPassword: '',
  user: user ? JSON.parse(user) : null,
};
  
  */
}

interface ExtendedUserMetadata extends firebase.auth.UserMetaData {
  getCreationTimestamp(): number;
}

const AuthContext = createContext<User>(null);

const AuthProvider = ({ children }) => {
  //  const router = useRouter();

  const [user, setUser] = useState(null);
  //  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(user);
      }
    });
    return () => unregisterAuthObserver();
  }, [auth]);

  //  const [state, dispatch] = useReducer(userReducer, initialUserState);

  const { displayAlert } = useAppContext();

  {
    /*

  const addUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };

*/
  }

  const navigate = (path) => {
    setTimeout(() => {
      //  router.push(path);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      if (
        metadata.getCreationTimestamp() == metadata.getLastSignInTimestamp()
      ) {
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
    //  router.push('/');
    signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleChange,
        clearForm,
        registerUserWithEmail,
        connectWithGoogle,
        signInWithEmail,
        sendPasswordReset,
        signOutUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };
