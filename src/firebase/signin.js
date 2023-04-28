import { auth } from './config';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    console.log('first', first);
  }
  return { result, error };
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    user.updateProfile({ role: 'user' }).then(() => {
      console.log('User role added successfully');
    });
  } catch (err) {
    alert(err);
  }
};

export { signInWithEmail, signInWithGoogle };
