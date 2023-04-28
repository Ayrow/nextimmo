import { auth } from './config';

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log('error', error);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const usersRef = firestore.collection('users');
    const query = usersRef.where('uid', '==', user.uid);
    const [data] = useCollectionData(query);

    if (data.length === 0) {
      await updateProfile(user, { role: 'user' });
    }
  } catch (error) {
    console.log('error', error);
  }
};

export { signInWithEmail, signInWithGoogle };
