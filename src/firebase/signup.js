import { auth } from './config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUpWithEmail = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    user.updateProfile({ role: 'user' }).then(() => {
      console.log('User role added successfully');
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export default signUpWithEmail;
