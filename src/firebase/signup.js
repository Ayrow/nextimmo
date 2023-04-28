import { auth } from './config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const signUpWithEmail = async (email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, { role: 'user' });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export default signUpWithEmail;
