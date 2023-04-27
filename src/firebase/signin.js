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
    alert(e.message);
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
    console.error(err);
    alert(err.message);
  }
};

export { signInWithEmail, signInWithGoogle };
