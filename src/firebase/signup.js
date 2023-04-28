import { auth } from './config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (err) {
    console.error(err);
    console.log(err.message);
  }
};

export default signUpWithEmail;
