import { auth } from './config';
import { sendPasswordResetEmail } from 'firebase/auth';

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export default sendPasswordReset;